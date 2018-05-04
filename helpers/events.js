//axios
const axios = require('axios');

//db models
const { Event, Article, Concept, Source, Category, Subcategory } = require('../db/index.js');

//lodash
const _ = require('lodash');

//moment
const moment = require('moment');

//get the uris that are shared between news outlets
const extractReleventEvents = (urisObj) => {
  //right
  let fox = new Set(urisObj.fox);
  let breitbart = new Set(urisObj.breitbart);
  //both outlets have reported
  let rightAll = new Set([...fox].filter(x => breitbart.has(x)));
  //at least one outlet has reported
  let rightAny = new Set([...fox, ...breitbart]);

  //left
  let huffington = new Set(urisObj.huffington);
  let msnbc = new Set(urisObj.msnbc);
  //both outlets have reported
  let leftAll = new Set([...huffington].filter(x => msnbc.has(x)));
  //at least one outlet has reported
  let leftAny = new Set([...huffington, ...msnbc]);

  //center
  let ap = new Set(urisObj.ap);
  let times = new Set(urisObj.times);
  let hill = new Set(urisObj.hill);
  //all outlets have reported
  let centerAll = new Set([...ap].filter(x => hill.has(x) && times.has(x)));
  //at least one outlet has reported
  let centerAny = new Set([...ap, ...times, ...hill]);

  //all 7 sources have reported
  let allSet = new Set([...rightAll].filter(x => leftAll.has(x) && centerAll.has(x)));
  let allArray = [...allSet];

  //at least one of left, right and center have reported
  let spectrumSet = new Set([...rightAny].filter(x => leftAny.has(x) && centerAny.has(x)));
  let spectrumArray = [...spectrumSet];

  return spectrumArray;
};

//format instances to conform to DB models
const formatEvent = (event) => {
  return Event.build({
    uri: event.uri,
    date: moment(event.eventDate, "YYYY-MM-DD"),
    title: event.title.eng || event.title || "",
    summary: event.summary.eng || event.summary || ""
  });
};

const formatConcept = (concept) => {
  return Concept.build({
    uri: concept.uri,
    type: concept.type
  }); 
};

const formatSubcategory = (subcategory) => {
  return Subcategory.build({
    uri: subcategory.uri,
  }); 
};

const formatArticle = (article) => {
  return Article.build({
    uri: article.uri,
    url: article.url,
    title: article.title,
    body: article.body,
    date: article.date,
    sentiment: article.sentiment,
    image: article.image,
  });
};

const extractFormatSource = (article) => {
  return Source.build({
    uri: article.source.uri,
    title: article.source.title,
    importance: article.source.importance,
    image: article.source.image,
    thumbImage: article.source.thumbImage,
    bias: calculateBias(article.source.title)
  });
};

const calculateBias = (sourceTitle) => {
  //TO DO: Rank top US news sources with bias
  return null;
}

const buildSaveArticle = async (article) => {
  let formatted = await formatArticle(article);
  let event = await Event.find({where: {uri: article.eventUri}});
  let source = await Source.find({where: {uri: article.source.uri}}).then(result => result);
  let savedArticle;

  if (!source) {
    source = await extractFormatSource(article);
    source.save().then(saved => console.log('saved source: ' + saved.dataValues.uri));
  }

  await Article.find({where: {uri: article.uri}}).then(async result => {
    if (result) {
      savedArticle = result;
    } else {
      savedArticle = await formatted.save();
    }  
    if (event) {
      await event.addArticle(savedArticle).catch(err => console.log(err));
    } else {
      console.log('We encountered an error retrieving the event ' + article.eventUri);
    }
   
    await source.addArticle(savedArticle).catch(err => console.log(err));
  }).catch(err => console.log(err));

  return savedArticle;
}

const buildSaveEvent = async (event) => {
  const formatted = await formatEvent(event);

  return Event.find({where: {uri: event.uri}}).then(result => {
    if (result === null) {
      formatted.save().then(savedEvent => {
        //send this saved event info in a message through AWS queue to articles service
        console.log('event saved, sending to articles service');
        return savedEvent;
      }).catch(err => console.log(err));
    } else {
      console.log('This event already exists')
      return result;
     }
  }).catch(err => console.log(err));
};

const buildSaveSubcategory = ({ uri }) => {
  return Subcategory.findOrCreate({ where: { uri } })
    .spread((newSubcategory, created) => {
      if (created) {
        const name = newSubcategory.uri.split('/')[1];
        Category.findOne({ where: { name } })
          .then(category => category.addSubcategory(newSubcategory));
      }

      return newSubcategory;
    });
};

//helper function to save concept or category in DB
const buildSaveConcept = (concept) => {
  return Concept.findOrCreate({ where: { uri: concept.uri } })
    .spread((newConcept, created) => newConcept);
};

// save arrays of either concepts or categories and associate each one with the event
const associateConceptsOrSubcategories = async (conceptsOrSubcategories, type, eventUri) => {
  const event = await Event.find({where: { uri: eventUri }});

  if (event) {
    for (const item of conceptsOrSubcategories) {
      if (type === 'concept') {
        const saved = await buildSaveConcept(item);
        await event.addConcept(saved).catch(err => console.log(err));
      } else if (type === 'subcategory') {
        const saved = await buildSaveSubcategory(item);
        if (item.wgt > 50) {
          await event.addSubcategory(saved).catch(err => console.log(err));
        }       
      }
    }
  } else {
    console.log('We encountered an error retrieving the event: ' + eventUri);
  }  
};


//get the uris for the events we care about across all news sources
const getUris = async() => {
  const response = await axios.get('https://6ytsqbsj8c.execute-api.us-east-2.amazonaws.com/test/eventUris');
  return extractReleventEvents(response.data.data);  
};

//get detailed event info for any events we have not already saved
const getEventInfo = async(uris) => {
  let unsaved = [];
  for (const uri in uris) {
    let saved = await Event.find({where:{uri: event.uri}});
    if (!saved) {
      unsaved.push(uri);
    }
  }

  const response = await axios.post('https://6ytsqbsj8c.execute-api.us-east-2.amazonaws.com/test/eventInfo', { uris: unsaved });

  for (const event of response.data.events) {
    await buildSaveEvent(event); 
    await associateConceptsOrSubcategories(event.concepts, 'concept', event.uri);
    await associateConceptsOrSubcategories(event.categories, 'subcategory', event.uri); 
  }
};

//get the articles associated with each event
const getArticles = async(uris) => {
  const response = await axios.post('https://6ytsqbsj8c.execute-api.us-east-2.amazonaws.com/test/articles', { uris });
  for (const article of response.data.data) {
    await buildSaveArticle(article);  
  }
};

//once every 24 hours, hit all three lambda functions to get our data into the DB
const dailyFetch = async() => {
  const uris = await getUris();
  await getEventInfo(uris);
  await getArticles(uris);
  console.log('fetched!');
};

module.exports = {
  associateConceptsOrSubcategories,
  buildSaveConcept,
  buildSaveSubcategory,
  buildSaveEvent,
  formatSubcategory,
  formatConcept,
  formatEvent,
  formatArticle,
  extractReleventEvents,
  extractFormatSource,
  buildSaveArticle,
  calculateBias
}

//dailyFetch();



