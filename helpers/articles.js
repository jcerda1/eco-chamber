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



// import { EventRegistry } from "eventregistry";
// const er = new EventRegistry({apiKey: "YOUR_API_KEY"});
// const iter = new QueryEventArticlesIter(er, "eng-2940883", {lang: "eng"});
// iter.execQuery((items) => {
//     for(const item of items) {
//         console.info(item);
//     }
// });

//needs to listen for messages from the queue that contain an event ID. 

const getArticlesByEventId = async (eventId) => {
  const iter = new QueryEventArticlesIter(er, eventId, {
    lang: "eng",
    articleBatchSize: 200
  });
  iter.execQuery((articles) => {
    for (const article in articles) {
      await buildSaveArticle(article, eventId); 
    }
  }, () => {
    //send message to DB to mark this event as having been processed???
  });
};

const buildSaveArticle = (article, eventId) => {
  let formattedArticle;

  Article.find({where: {uri: article.uri}}).then(result => {
    if (result === null) {
      formattedArticle.save().then(article => {
        Event.find({where: uri: eventId}).then(event => {
          event.addArticle(article);
        })
      })
    } else {
      Event.find({where: uri: eventId}).then(event => {
        event.addArticle(article);
      })
    }
  })

  
  //TODO: function to transform an article returned to hte format we need for DB
 
};

