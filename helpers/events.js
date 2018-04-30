const util = require('util');

//event registry API
const { EventRegistry, QueryEventsIter, ReturnInfo, QueryItems, QueryEvents, RequestEventsUriWgtList } = require('eventregistry');
const er = new EventRegistry({apiKey: process.env.EVENT_REGISTRY_API_KEY});

//db models
const { Event, Article, Concept, Source, Category, Subcategory } = require('../db/index.js');

//mock data
const { sampleUrisObj } = require('./sampleUriList.js');
const { testEvents } = require('../db/largeTestDataER.js');
let uris = [];
let uniqueEvents = [];

for (let i = 0; i < testEvents.length; i++) {
  const event  = testEvents[i];
  if (!uris.includes(event.uri)) {
    uniqueEvents.push(event);
    uris.push(event.uri);
  }
}

//helper functions to format dates for API
const moment = require('moment');

const getDate = (daysAgo) => {
  daysAgo 
    ? moment().subtract(daysAgo, 'day').format('YYYY-MM-DD') 
    : moment().format('YYYY-MM-DD');
};

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

//our MVP seven news sources.  Use these URIs to communicate with ER
const sourcesURI = {
  fox: new QueryItems.OR(['foxsports.com', 'foxnews.com','foxbusiness.com', 'nation.foxnews.com', 'fox11online.com', 'q13fox.com', 'radio.foxnews.com', 'fox5ny.com']),
  breitbart: 'breitbart.com',
  huffington: 'huffingtonpost.com',
  msnbc: 'msnbc.com',
  hill: 'thehill.com',
  ap: 'hosted.ap.org',
  times: 'nytimes.com'
};
//in list format for certain API calls
const sourcesAll = ['foxnews.com', 'breitbart.com', 'huffingtonpost.com', 'msnbc.com', 'thehill.com', 'hosted.ap.org', 'nytimes.com'];
const foxAll = ['foxsports.com', 'foxnews.com','foxbusiness.com', 'nation.foxnews.com', 'fox11online.com', 'q13fox.com', 'radio.foxnews.com', 'fox5ny.com'];

//get lists of event uris by individual news sources
const getEventUrisByNewsSource = (newsUri, date) => {
  const q = new QueryEvents({
        sourceUri: newsUri,
        dateStart: date,
    });
  
    const requestEventsUriList = new RequestEventsUriWgtList();
    q.setRequestedResult(requestEventsUriList);
    return er.execQuery(q); // execute the query and return the promise
};

//get all the uris for all 7 of our MVP news sources
const getEventUrisByAllSources = async (date) => {
  let uris = {};
  
  const fox = await getEventUrisByNewsSource(sourcesURI.fox, date);
  const breitbart = await getEventUrisByNewsSource(sourcesURI.breitbart, date);
  const huffington = await getEventUrisByNewsSource(sourcesURI.huffington, date);
  const msnbc = await getEventUrisByNewsSource(sourcesURI.msnbc, date);
  const hill = await getEventUrisByNewsSource(sourcesURI.hill, date);
  const ap = await getEventUrisByNewsSource(sourcesURI.ap, date);
  const times = await getEventUrisByNewsSource(sourcesURI.times, date);

  uris['fox'] = fox.uriWgtList.results.map(item => item.split(":")[0]);
  uris['breitbart'] = breitbart.uriWgtList.results.map(item => item.split(":")[0]);
  uris['huffington'] = huffington.uriWgtList.results.map(item => item.split(":")[0]);
  uris['msnbc'] = breitbart.uriWgtList.results.map(item => item.split(":")[0]);
  uris['hill'] = hill.uriWgtList.results.map(item => item.split(":")[0]);
  uris['ap'] = ap.uriWgtList.results.map(item => item.split(":")[0]);
  uris['times'] = times.uriWgtList.results.map(item => item.split(":")[0]);

  return uris;
}

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
  let allLangs = new Set([...rightAll].filter(x => leftAll.has(x) && centerAll.has(x)));
  let all = [...allLangs].filter(uri => uri.split('-')[0] === 'eng');

  //at least one of left, right and center have reported
  let spectrumLangs = new Set([...rightAny].filter(x => leftAny.has(x) && centerAny.has(x)));
  let spectrum = [...spectrumLangs].filter(uri => uri.split('-')[0] === 'eng');

  return { rightAll, rightAny, leftAll, leftAny, centerAll, centerAny, all, spectrum };
};


//helper function to retrive detailed event info by event uri list
const getEventInfo = async(uriList) => {
  const q = new QueryEventsIter.initWithEventUriList(uriList);
  er.execQuery(q).then(async (events) => {
    for (const x of events.events.results) {
      await buildSaveEvent(x);
      await associateConceptsOrSubcategories(x.categories, 'subcategory', x.uri);
      await associateConceptsOrCategories(x.concepts, 'concept', x.uri); 
    }
  }).catch(err => console.log(err));
}

const testUris = [ 'eng-3930372',
  'eng-3935597',
  'eng-3933940',
  'eng-3932941',
  'eng-3932823',
  'eng-3934188',
  'eng-3933294',
  'eng-3936137',
  'eng-3934190',
  'eng-3933704',
  'eng-3935404',
  'eng-3934355',
  'eng-3933761',
  'eng-3935589',
  'eng-3934872',
  'eng-3935085' ]


//helper function to retrieve top events, format and save them to DB
//alone, categoryURI works, dateStart works to return data as expcted
const getTopEvents = async (date) => {
  const sources = new QueryItems.OR(sourcesAll);
  const q = new QueryEventsIter(er, {
    sourceUri: sources,
    dateStart: date,
    sortBy: 'size',
  });

  q.execQuery(async (events) => {
    for (const event of events) {  
      //console.log(util.inspect(event, {showHidden: false, depth: null}));
      if (event.uri.split('-')[0] !== 'eng') {
        console.log('This event is not in english');
      } else {
        if (event.totalArticleCount > 10) {
          await buildSaveEvent(event);
          await associateConceptsOrSubcategories(event.categories, 'subcategory', event.uri);
          await associateConceptsOrSubcategories(event.concepts, 'concept', event.uri); 
        } else {
          console.log('This event is not large enough to save');
        }       
      }      
    }
  }, () => console.log('Events saved'))
  .catch(err => console.log(err));
};


//format instances to conform to DB models
const formatEvent = (event) => {
  return Event.build({
    uri: event.uri,
    date: event.eventDate,
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
}

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
}

//test function to save many events from mock data
const testDataSaving = async () => {
  for (const event of uniqueEvents) {
    await buildSaveEvent(event); 
    await associateConceptsOrSubcategories(event.concepts, 'concept', event.uri);
    await associateConceptsOrSubcategories(event.categories, 'subcategory', event.uri);
  }

  console.log('done');
}

module.exports = {
  testDataSaving,
  associateConceptsOrSubcategories,
  buildSaveConcept,
  buildSaveSubcategory,
  buildSaveEvent,
  formatSubcategory,
  formatConcept,
  formatEvent,
  getTopEvents,
  extractReleventEvents,
}
