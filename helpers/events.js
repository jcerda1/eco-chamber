const util = require('util');

//event registry API
const { EventRegistry, QueryEventsIter, ReturnInfo, QueryItems, QueryEvents } = require('eventregistry');
const er = new EventRegistry({apiKey: process.env.EVENT_REGISTRY_API_KEY});

//db models
const { Event, Article, Concept, Source, Category } = require('../db/index.js');

//mock data
const { testEvents } = require('../db/largeTestDataER.js');

//helper functions to format dates for API
const moment = require('moment');
const getDateToday = () => moment().format('YYYY-MM-DD');
const getDateYesterday = () => moment().subtract(1, 'day').format('YYYY-MM-DD');

//our top 10 categories.  Use these URIs to communicated with ER
const categoriesURI = { 
  business: 'dmoz/Business',
  arts: 'dmoz/Arts',
  computers: 'dmoz/Computers',
  games: 'dmoz/Games',
  health: 'dmoz/Health',
  home: 'dmoz/Home',
  recreation: 'dmoz/Recreation',
  reference: 'dmoz/Reference',
  science: 'dmoz/Science',
  shopping: 'dmoz/Shopping',
  society: 'dmoz/Society',
  sports: 'dmoz/Sports'
};
//in list format for certain API calls
const categoriesAll = ['dmoz/Business','dmoz/Arts','dmoz/Computers','dmoz/Games', 'dmoz/Health', 'dmoz/Home', 'dmoz/Recreation','dmoz/Reference',
  'dmoz/Science','dmoz/Shopping','dmoz/Society','dmoz/Sports'];

//our MVP seven news sources.  Use these URIs to communicate with ER
const sourcesURI = {
  fox: 'foxnews.com',
  breitbart: 'breitbart.com',
  huffington: 'huffingtonpost.com',
  msnbc: 'msnbc.com',
  hill: 'thehill.com',
  ap: 'hosted.ap.org',
  times: 'nytimes.com'
};

//in list format for certain API calls
const sourcesAll = ['foxnews.com', 'breitbart.com', 'huffingtonpost.com', 'msnbc.com', 'thehill.com', 'hosted.ap.org', 'nytimes.com'];

//once every 24 hours, get the top twenty events for all our 10 categories.
const getAllTopTen = async () => {
  for (const category of categoriesURI) {
    await getTopTenEvents(category, getDateYesterday());
  }
}

//helper function to retrieve top events, format and save them to DB
//alone, categoryURI works, dateStart works to return data as expcted
const getTopEvents = async (date) => {
  const sources = new QueryItems.OR(sourcesAll);
  const q = new QueryEventsIter(er, {
    sourceUri: sources,
    dateStart: date,
    sortBy: 'size',
    // eventBatchSize: 50,
    // maxItems: 10,
    // minArticlesInEvent: 10,
    // lang: "eng",
  });

  q.execQuery(async (events) => {
    for (const event of events) {  
      //console.log(util.inspect(event, {showHidden: false, depth: null}));
      if (event.uri.split('-')[0] !== 'eng') {
        console.log('This event is not in english');
      } else {
        if (event.totalArticleCount > 10) {
          await buildSaveEvent(event);
          await associateConceptsOrCategories(event.categories, 'category', event.uri);
          await associateConceptsOrCategories(event.concepts, 'concept', event.uri); 
        } else {
          console.log('This event is not large enough to save');
        }       
      }      
    }
  }, () => console.log('Events saved'))
  .catch(err => console.log(err));
}

//format instances to conform to DB models
const formatEvent = (event) => {
  return Event.build({
    uri: event.uri,
    date: event.eventDate,
    title: event.title.eng || event.title || "",
    summary: event.summary.eng || event.summary || ""
  });
}

const formatConcept = (concept) => {
  return Concept.build({
    description: concept.description,
    uri: concept.uri,
    type: concept.type
  }); 
}

const formatCategory = (category) => {
  return Category.build({
    uri: category.uri,
    baseUri: category.uri.split('/')[1]
  }); 
}

//save events in DB, and send message info to queue to be processed for retrieving articles
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

//helper function to save concept or category in DB
const buildSaveConceptOrCategory = (obj, type) => {
  let formatted = type === 'concept'? formatConcept(obj) : formatCategory(obj);
  let model = type === 'concept'? Concept : Category;

  return model.find({where: {uri: obj.uri}}).then(result => {
      if (result === null) {
        formatted.save().then(saved => {
          return saved;
        }).catch(err => console.log(err));
      } else {
        return result;
      }
  }).catch(err => console.log(err));
}

// save arrays of either concepts or categories and associate each one with the event
const associateConceptsOrCategories = async (conceptsOrCategories, type, eventUri) => {
  const event = await Event.find({where: { uri: eventUri }});

  if (event) {
    for (const item of conceptsOrCategories) {
      let saved = await buildSaveConceptOrCategory(item, type);

      if (type === 'concept') {
        await event.addConcept(saved).catch(err => console.log(err));
      } else if (type === 'category') {
        if (item.wgt > 50) {
          await event.addCategory(saved).catch(err => console.log(err));
        }       
      }
    }
  } else {
    console.log('We encountered an error retrieving the event: ' + eventUri);
  }  
}

//test function to save many events from mock data
const testDataSaving = async () => {

  for (const event of testEvents) {
    await buildSaveEvent(event); 
    await associateConceptsOrCategories(event.concepts, 'concept', event.uri);
    await associateConceptsOrCategories(event.categories, 'category', event.uri);
  }  
  console.log('done');
}

//testDataSaving();

// getTopEvents(getDateYesterday());
