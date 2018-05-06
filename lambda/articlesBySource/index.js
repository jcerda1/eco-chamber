exports.handler = async (event) => {
  const allArticles = await getAllArticles();
  const allUris = extractUris(allArticles);
  console.log("LARGE FUNCTION: ", allArticles);
  console.log(allUris);
  return {articles: allArticles, uris: allUris};
};

//event registry API
const { EventRegistry, QueryArticles, ArticleInfoFlags, ReturnInfo, SourceInfoFlags, RequestArticlesInfo } = require('eventregistry');
const er = new EventRegistry({apiKey: process.env.EVENT_REGISTRY_API_KEY});

//moment
const moment = require('moment');

//format the date for API call
const getDate = (daysAgo) => {
  return daysAgo 
    ? moment().subtract(daysAgo, 'day').format('YYYY-MM-DD') 
    : moment().format('YYYY-MM-DD');
};

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

//helper to retrieve all articles published yesterday by news outlet
const getArticlesBySource = async(sourceUri) => { 
  const q = new QueryArticles({
    lang: ["eng"],
    dateStart: getDate(1),
    sourceUri: sourceUri
  });
  const sourceInfo = new SourceInfoFlags({image:true});
  const articleInfo = new ArticleInfoFlags({image: true});
  const returnInfo = new ReturnInfo({articleInfo: articleInfo, sourceInfo: sourceInfo});
  const requestArticlesInfo = new RequestArticlesInfo({page: 1, count: 100, returnInfo: returnInfo});
  q.setRequestedResult(requestArticlesInfo);
  const response = await er.execQuery(q);
  return response.articles.results;
};

//retrieve articles for all seven news sources
const getAllArticles = async() => {
  let articles = 
  {
    fox: await getArticlesBySource(sourcesURI.fox),
    breitbart: await getArticlesBySource(sourcesURI.breitbart),
    huffington: await getArticlesBySource(sourcesURI.huffington),
    msnbc: await getArticlesBySource(sourcesURI.msnbc),
    hill: await getArticlesBySource(sourcesURI.hill),
    ap: await getArticlesBySource(sourcesURI.ap),
    times: await getArticlesBySource(sourcesURI.times),
  };
  return articles;
};

//get just the uris for analysis on server
const extractUris = (articlesObj) => {
  let uris = {};
  for (const source in articlesObj) {
    uris[source] = articlesObj[source].map(article => article.eventUri).filter(uri => uri);
  } 
  return uris;
};



