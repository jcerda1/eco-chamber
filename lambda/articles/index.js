exports.handler = async (event) => {
  let articleInfo = await getAllArticles(event.uris);
  return {message: "success", data: articleInfo};
};

//event registry API
const { EventRegistry, ArticleInfoFlags, ReturnInfo, QueryEvent, RequestEventArticles } = require('eventregistry');
const er = new EventRegistry({apiKey: process.env.EVENT_REGISTRY_API_KEY});

const getAllArticles = async(uriList) => {
  let eventsArticles = {};
  for (const uri of uriList) {
    let current = await getArticlesByEventUri(uri);
    eventsArticles[uri] = current;
  }
  return eventsArticles;
}

const getArticlesByEventUri = async(uri) => {
  const q = new QueryEvent(uri);
  q.setRequestedResult(new RequestEventArticles({page: 1, count: 100}));
  const res = er.execQuery(q);  
  return res;
};

