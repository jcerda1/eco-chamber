const { EventRegistry, QueryEventsIter, ReturnInfo, QueryItems, QueryEvents, RequestEventsUriList } = require('eventregistry');
const EVENT_REGISTRY_API_KEY = require('../config/config.js');
const er = new EventRegistry({apiKey: 'EVENT_REGISTRY_API_KEY'});


//get category IDs for top few categories, save as constants

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

const sourcesURI = {
  fox: 'foxnews.com',
  breitbart: 'breitbart.com',
  huffington: 'huffingtonpost.com',
  msnbc: 'msnbc.com',
  hill: 'thehill.com',
  ap: 'hosted.ap.org',
  times: 'nytimes.com'
};

const sourcesAll = ['foxnews.com', 'breitbart.com', 'huffingtonpost.com', 'msnbc.com', 'thehill.com', 'hosted.ap.org', 'nytimes.com'];

const eventUris = [];


//get the top 10 events in the last days for each cagegory

const q = new QueryEvents({
    categoryUri: 'dmoz/Science',
    eventBatchSize: 10,
});

const eventUriList = new RequestEventsUriList();
q.setRequestedResult(eventUriList);
er.execQuery(q) // execute the query and return the promise
  .then(result => console.log(result));





