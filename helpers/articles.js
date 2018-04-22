const util = require('util');
//event registry API
const { 
  EventRegistry, 
  QueryEventsIter, 
  ReturnInfo, 
  QueryItems, 
  QueryEvents,
  QueryEvent, 
  RequestEventInfo,
  RequestEventArticles,
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

const { testEvents } = require('../db/largeTestDataER.js');
const { buildSaveConceptOrCategory } = require('./events.js');

let eventUriList = [
  'eng-3850133',
  'eng-3863384',
  'eng-3912189',
  'eng-3878323',
  'eng-3866211',
  'eng-3856710',
  'eng-3881510',
  'eng-3848756',
  'eng-3850781',
  'eng-3875139',
  'eng-3907227',
  'eng-3863714'
];

//needs to listen for messages from the queue that contain an event ID. 

const getTestArticles1 = (eventUriList) => {

  for (const uri of eventUriList) {
    const q = new QueryEvent(uri);
    q.setRequestedResult(new RequestEventArticles({count: 50, lang: ["eng"]}));
    er.execQuery(q).then(result => {
      console.log(util.inspect(result, {showHidden: false, depth: null}));
    });
  }
};

// const getTestArticles2 = (eventUriList) => {

//   for (const uri of eventUriList) {
//     const iter = new QueryEventArticlesIter(er, uri, {
//       lang: "eng",
//       articleBatchSize: 50
//     });

//     iter.execQuery(async (articles)) => {
      
//     }

//   }
 
// }


const getArticlesByEventUri = async (eventUri) => {
  const iter = new QueryEventArticlesIter(er, eventUri, {
    lang: "eng",
    articleBatchSize: 200
  });
  iter.execQuery(async (articles) => {
    for (const article of articles) {
      await buildSaveArticle(article, eventId); 
    }
  }, () => {
    //send message to DB to mark this event as having been processed???
    console.log('articles saved');
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
    bias: calculateBias(article.source.title);
  });
};

const calculateBias = (sourceTitle) => {
  //TO DO: Rank top US news sources with bias
  return null;
}

const buildSaveArticle = async (article) => {
  let formatted = await formatArticle(article);
  let event = await Event.find({where: {uri: article.eventUri}});
  let source = await extractFormatSource(article);
  let article;

  Article.find({where: {uri: article.uri}}).then(result => {
    article = result ? result : await formatted.save();
    
    if (event) {
      await event.addArticle(article).catch(err => console.log(err));
    } else {
      console.log('We encountered an error retrieving the event ' + article.eventUri);
    }
    
    await article.addSource(source).catch(err => console.log(err));
  }).catch(err => console.log(err));
}

 
 


