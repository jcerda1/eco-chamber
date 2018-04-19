//event registry API
const { 
  EventRegistry, 
  QueryEventsIter, 
  ReturnInfo, 
  QueryItems, 
  QueryEvents, 
  RequestEventsUriList, 
  ArticleInfoFlags, 
  StoryInfoFlags, 
  RequestEventsInfo,
  EventInfoFlags,
  QueryEventArticlesIter
} = require('eventregistry');
//db models
const {
  Event,
  Article,
  Concept,
  Source,
  Category
} = require('../db/index.js');

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
//in list format for certain API calls
const sourcesAll = ['foxnews.com', 'breitbart.com', 'huffingtonpost.com', 'msnbc.com', 'thehill.com', 'hosted.ap.org', 'nytimes.com'];

//once every 24 hours, get the top twenty events for all our 10 categories.
// const getAllTopTen = () => {
//   for (var category in categoriesURI) {
//     getTopTwentyEvents(category, getDateYesterday());
//   }
// }

//helper function to retrieve top 10 events by category, format and save them to DB
const getTopTenEvents = (category, date) => {
  console.log(category, categoriesURI.category);
  const q = new QueryEventsIter(er, {
    categoryUri: categoriesURI.category,
    dateStart: date,
    sortBy: 'size',
    maxItems: 10,
    minArticlesInEvent: 50,
    lang: "eng",
  });

  q.execQuery(async (events) => {
    console.log(events.length);
    for (const event of events) {
      //console.log(event);
      await buildSaveEvent(event);   
    }
  }, () => console.log('Events saved'));
}

//format events for DB
const buildSaveEvent = async (event) => {
  console.log(event.categories);
  //let concepts = await buildSaveConepts(concepts);
  //let categories = await event.categories.map(concept => buildSaveConcept(concept));
 
  let formattedEvent = Event.build({
    uri: event.uri,
    date: event.eventDate,
    title: event.title.eng || event.title || "",
    summary: event.summary.eng || event.summary || ""
  });

  Event.find({where: {uri: event.uri}}).then(result => {
    if (result === null) {
      formattedEvent.save().then(savedEvent => {
        //send this saved event info in a message through AWS queue to articles service
        console.log('event saved, sending to queue')

      }).catch(err => console.log(err));
    } else {
      console.log('This event already exists');
    }
  }).catch(err => console.log(err));
};

const buildSaveConcepts = async (concepts) => {
  let formattedConcepts = concepts.map(concept => Concept.build({
    description: concept.description,
    uri: concept.uri,
    type: uri.type
  })); 

  console.log(formattedConcepts.length);

  for (const concept of concepts) {
    
    await Concept.find({where: {uri: concept.uri}}).then(result => {
      if (result === null) {
        built.save().then(savedConcept => console.log(savedConcept.dataValues));
      } else {
        console.log('this concept already exists:', result);
      }
    })
  }
}

const buildSaveCategories = (categories) => {
  let formattedCategories = categories.map(category => Category.build({
    parentUri: catgory.parentUri,
    uri: category.uri,
    baseUri: category.uri.split('/')[1]
  })); 

  for (var i = 0; i < categories.length; i++) {
    let built = categories[i];
    Category.findOrCreate({where: {uri: built.uri}, defaults: {parentUri: built.parentUri, baseUri: built.baseUri}});
  }
}
//save events to DB
const saveEvent = (formattedEvent) => {
  //TODO: save to DB
};

//after retrieving the events, for each eventId, retrieve the associated articles from ER, format and save to DB
const getAllArticles = () => {

};


const getArticlesByEventId = (eventId) => {
  const iter = new QueryEventArticlesIter(er, eventId);
  iter.execQuery((articles) => {
    for (const article in articles) {
      let formatted = buildArticle(article);
      saveArticle(formatted);
    }
  });
};

const buildArticle = (article) => {
  let formattedArticle;
  //TODO: function to transform an article returned to hte format we need for DB
  return formattedArticle;
};

const saveArticle = (formattedArticle) => {
  //TODO: save formatted article to DB
};

const getEventsAndArticles = function () {
  
};

getTopTenEvents('science', getDateYesterday());
//console.log(buildSaveEvent({uri:'test5', date: 'test', title: 'hello', summary: 'lkjlkjlkj'}));



// getEventsBySource = (sourceUri) => {
//     // query for events reported by BBC News
//     const query = new QueryEvents({sourceUri});
//     // return details about 30 events that have been most recently reported by BBC
//     const requestEventsInfo = new RequestEventsInfo({count: 50, dateStart: getDateYesterday()});
//     query.setRequestedResult(requestEventsInfo);
//     er.execQuery(query)
//       .then(result => {
//         console.log(result).events.results[0];
//       });
// }


// const getEventsUris = (categoryUri, date) => {
//   const q = new QueryEvents({
//     categoryUri: categoryUri,
//     dateStart: date,
//     sortBy: 'size'
//   });

//   const eventUriList = new RequestEventsUriList();
//   q.setRequestedResult(eventUriList);
//   er.execQuery(q) // execute the query and return the promise
//     .then(result => {
//       eventsUri = result;
//       console.log(eventsUri)
//     });
// };





//retrives the uri list for all events for our top 10 categories that occured yesterday
//to get events for a single category, use an individual categoryUri
//getEventsUri(categoriesAll, getDateYesterday());



//getEventsBySource(sourcesAll);
//getArticlesByEventId('eng-2940883');




// er.getCategoryUri("Trump").then((conceptUri) => {
//     const q = new QueryEventsIter(er, { conceptUri: conceptUri, sortBy: "date"});
//     q.execQuery((events) => {
//       console.log(events);
//         for(const event of events) {
//             console.info(event);
//         }
//     });
// }).catch(err => console.log(err));

// Promise.all([er.getConceptUri("Obama"), er.getNewsSourceUri("bbc")])
//   .then(([conceptUri, sourceUri]) => {
//     const q = new QueryEvents({
//         conceptUri: conceptUri, // get events related to Barack Obama
//         sourceUri: sourceUri, // that have been reported also by BBC
//     });
//     // return top 5 locations and organizations mentioned the most in these events
//     const returnInfo = new ReturnInfo({conceptInfo: new ConceptInfoFlags({type: ["org", "loc"]})});
//     const requestEventsConceptAggr = new RequestEventsConceptAggr({conceptCount: 5, returnInfo: returnInfo});
//     q.setRequestedResult(requestEventsConceptAggr );
//     return er.execQuery(q); // execute the query and return the promise
// });


// const q = new QueryEventsIter(er, { categoryUri: categoriesURI.society, sortBy: "date"});
// q.execQuery((events) => {
//   console.log(events);
//     for(const event of events) {
//         console.info(event);
//     }
// });







