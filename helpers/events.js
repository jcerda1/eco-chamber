const util = require('util');

//event registry API
const { EventRegistry, QueryEventsIter, ReturnInfo, QueryItems, QueryEvents, RequestEventsUriWgtList } = require('eventregistry');
const er = new EventRegistry({apiKey: process.env.EVENT_REGISTRY_API_KEY});

//db models
const { Event, Article, Concept, Source, Category, Subcategory } = require('../db/index.js');

//mock data
const { sampleUrisObj, sampleUrisObj2 } = require('./sampleUriList.js');
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

//lodash
const _ = require('lodash');

//helper functions to format dates for API
const moment = require('moment');

const getDate = (daysAgo) => {
  return daysAgo 
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
  let sources = 
  {
    fox: await getEventUrisByNewsSource(sourcesURI.fox, date),
    breitbart: await getEventUrisByNewsSource(sourcesURI.breitbart, date),
    huffington: await getEventUrisByNewsSource(sourcesURI.huffington, date),
    msnbc: await getEventUrisByNewsSource(sourcesURI.msnbc, date),
    hill: await getEventUrisByNewsSource(sourcesURI.hill, date),
    ap: await getEventUrisByNewsSource(sourcesURI.ap, date),
    times: await getEventUrisByNewsSource(sourcesURI.times, date),
  }

  //strip the wgt value and only pass along the events in english
  for (const item in sources) {
    uris[item] = sources[item].uriWgtList.results.map(x => x.split(":")[0]).filter(x => x.split("-")[0] === "eng");
  } 
  return uris;
};

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

  return { rightAll, rightAny, leftAll, leftAny, centerAll, centerAny, allSet, allArray, spectrumSet, spectrumArray };
};

//helper function to retrive detailed event info by event uri list
const getEventInfo = async(uriList) => {
  const q = new QueryEvents.initWithEventUriList(uriList);
  er.execQuery(q).then(async (events) => {
    console.log("EVENTS LENGTH: ", events.events.results.length);
    // for (const x of events.events.results) {
    //   counter++;
    //   await buildSaveEvent(x);
    //   await associateConceptsOrSubcategories(x.categories, 'subcategory', x.uri);
    //   await associateConceptsOrSubcategories(x.concepts, 'concept', x.uri); 
    // }
    console.log(util.inspect(events.events.results)); 
  }).catch(err => console.log(err));
};

//single function that does all of the retreiving relevant event info by date,
//saving only the unsaved relevent events to the DB it all into the DB
//COSTS 35 tokens
const getUrisAndEventsByDate = async (date) => {
  let unsavedUris = [];
  const uriObj = await getEventUrisByAllSources(date);
  const relevent = extractReleventEvents(uriObj);
  const releventUris = relevent.spectrumArray;
  for (var i = 0; i < releventUris.length; i++) {
    let found = await Event.find({where:{uri: releventUris[i]}});
    if (!found) {
      unsavedUris.push(releventUris[i]);
    }
  }
  
  let chunks = _.chunk(unsavedUris, 20);  
  for (const array of chunks) {
    await getEventInfo(array);
  } 
  console.log('fetched all events');
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
  extractReleventEvents,
}

console.log([... new Set(sampleUrisObj2.fox)].length)



