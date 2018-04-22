const util = require('util');

//event registry API
const { 
  EventRegistry, 
  QueryEventsIter, 
  ReturnInfo, 
  QueryItems, 
  QueryEvents,
  RequestEventsUriList
} = require('eventregistry');
//db models
const {
  Event,
  Article,
  Concept,
  Source,
  Category
} = require('../db/index.js');

const { testEvents } = require('../db/largeTestDataER.js');

const { EVENT_REGISTRY_API_KEY } = require('../config/config.js');
const er = new EventRegistry({apiKey: EVENT_REGISTRY_API_KEY});
const moment = require('moment');


//helper functions to format dates for API
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
const categoriesAll = [
  'dmoz/Business',
  'dmoz/Arts',
  'dmoz/Computers',
  'dmoz/Games', 
  'dmoz/Health', 
  'dmoz/Home', 
  'dmoz/Recreation',
  'dmoz/Reference',
  'dmoz/Science',
  'dmoz/Shopping',
  'dmoz/Society',
  'dmoz/Sports'
];

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
let uris = [];
//in list format for certain API calls
const sourcesAll = ['foxnews.com', 'breitbart.com', 'huffingtonpost.com', 'msnbc.com', 'thehill.com', 'hosted.ap.org', 'nytimes.com'];

//once every 24 hours, get the top twenty events for all our 10 categories.
const getAllTopTen = async () => {
  for (const category of categoriesURI) {
    await getTopTenEvents(category, getDateYesterday());
  }
}
//helper function to retrieve top 10 events by category, format and save them to DB
const getTopEvents = async (category, date) => {

  const sources = new QueryItems.OR(sourcesAll);

  //alone, categoryURI works, dateStart works

  const q = new QueryEventsIter(er, {
    sourceUri: sources,
    dateStart: getDateYesterday(),
    sortBy: 'size',
    // eventBatchSize: 50,
    // maxItems: 10,
    // minArticlesInEvent: 10,
    // lang: "eng",
  });

  q.execQuery(async (events) => {
    // console.log(events.length);
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

const getUriList = (category, date) => {
 const q = new QueryEvents({
    categoryUri: categoriesURI.category,
    eventBatchSize: 50,
    maxItems: 10,
    dateStart: date,
    lang: "eng",
    sortBy: "size",
    minArticlesInEvent: 100
  });

const eventUriList = new RequestEventsUriList();
q.setRequestedResult(eventUriList);

er.execQuery(q) // execute the query and return the promise
  .then(result => {
    uris = result;
    console.log(uris);
  }).catch(err => console.log(err));
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
    parentUri: category.parentUri,
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
        //console.log(util.inspect(savedEvent.dataValues, {showHidden: false, depth: null}));
        return savedEvent;
      }).catch(err => console.log(err));
    } else {
      console.log('This event already exists')
      //console.log(util.inspect(result.dataValues, {showHidden: false, depth: null}));
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
        //console.log(`this ${type} already exists: ${result.dataValues.uri}`);
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

//getTopEvents();
//getUriList('science', getDateYesterday());

const testDataSaving = async () => {

  for (const event of testEvents) {
    await buildSaveEvent(event); 
    await associateConceptsOrCategories(event.concepts, 'concept', event.uri);
    await associateConceptsOrCategories(event.categories, 'category', event.uri);
  }  
  console.log('done');
}

module.exports = {
  buildSaveConceptOrCategory
}

//testDataSaving();


    










