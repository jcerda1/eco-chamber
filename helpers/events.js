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
const getAllTopTen = async () => {
  for (const category of categoriesURI) {
    await getTopTenEvents(category, getDateYesterday());
  }
}

//helper function to retrieve top 10 events by category, format and save them to DB
const getTopTenEvents = async (category, date) => {
  
  const q = new QueryEventsIter(er, {
    categoryUri: categoriesURI.category,
    dateStart: date,
    sortBy: 'size',
    maxItems: 10,
    minArticlesInEvent: 100,
    lang: "eng",
  });

  q.execQuery(async (events) => {
    console.log(events.length);

    for (const event of events) {    
      await buildSaveEvent(event);  
      await associateConceptsOrCategories(event.categories, 'category', event.uri);
      await associateConceptsOrCategories(event.concepts, 'concept', event.uri); 

    }
  }, () => console.log('Events saved'));
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
        console.log('event saved, sending to articles service ' + savedEvent.dataValues);
        return savedEvent;
      }).catch(err => console.log(err));
    } else {
      console.log('This event already exists' + result.dataValues);
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
const associateConceptsOrCategories = async (conceptsOrCategories, type, id) => {
  const event = await Event.find({where: { id }});

  if (event) {
    for (const item of conceptsOrCategories) {
      let saved = await buildSaveConceptOrCategory(item, type);

      if (type === 'concept') {
        event.addConcept(saved).catch(err => console.log(err));
      } else if (type === 'category') {
        event.addCategory(saved).catch(err => console.log(err));
      }
    }
  } else {
    console.log('We encountered an error retrieving the event: ' + eventUri);
  }  
}

getTopTenEvents('science', getDateToday());

// const testDataSaving = async () => {
//   const testEvent = 
//   {
//     id: 8051511,
//     uri: 'testy',
//     concepts: 
//      [ { uri: 'http://en.wikipedia.org/wiki/Earthquake',
//          id: '18666',
//          type: 'wiki',
//          score: 100,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Iran',
//          id: '99',
//          type: 'loc',
//          score: 96,
//          label: [Object],
//          location: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Nuclear_power_plant',
//          id: '112995',
//          type: 'wiki',
//          score: 79,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Bushehr_Province',
//          id: '262354',
//          type: 'loc',
//          score: 74,
//          label: [Object],
//          location: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Moment_magnitude_scale',
//          id: '181208',
//          type: 'wiki',
//          score: 72,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Bahrain',
//          id: '21',
//          type: 'loc',
//          score: 47,
//          label: [Object],
//          location: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Persian_Gulf',
//          id: '20063',
//          type: 'loc',
//          score: 38,
//          label: [Object],
//          location: null },
//        { uri: 'http://en.wikipedia.org/wiki/Province',
//          id: '18921',
//          type: 'wiki',
//          score: 35,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Fault_(geology)',
//          id: '26040',
//          type: 'wiki',
//          score: 24,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/United_States_Geological_Survey',
//          id: '18647',
//          type: 'org',
//          score: 24,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Tehran',
//          id: '367',
//          type: 'loc',
//          score: 22,
//          label: [Object],
//          location: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Epicenter',
//          id: '39860',
//          type: 'wiki',
//          score: 20,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Kaki_District',
//          id: '1680693',
//          type: 'loc',
//          score: 19,
//          label: [Object],
//          location: null },
//        { uri: 'http://en.wikipedia.org/wiki/Dubai',
//          id: '7194',
//          type: 'loc',
//          score: 16,
//          label: [Object],
//          location: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Saudi_Arabia',
//          id: '182',
//          type: 'loc',
//          score: 16,
//          label: [Object],
//          location: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Bushehr',
//          id: '2203',
//          type: 'loc',
//          score: 15,
//          label: [Object],
//          location: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Bam,_Iran',
//          id: '160771',
//          type: 'loc',
//          score: 14,
//          label: [Object],
//          location: null },
//        { uri: 'http://en.wikipedia.org/wiki/International_Red_Cross_and_Red_Crescent_Movement',
//          id: '29384',
//          type: 'org',
//          score: 11,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/State_(polity)',
//          id: '16689',
//          type: 'wiki',
//          score: 11,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Brick',
//          id: '24755',
//          type: 'wiki',
//          score: 10,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Iraq',
//          id: '17373',
//          type: 'loc',
//          score: 10,
//          label: [Object],
//          location: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Qatar',
//          id: '177',
//          type: 'loc',
//          score: 9,
//          label: [Object],
//          location: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/University_of_Tehran',
//          id: '168197',
//          type: 'org',
//          score: 8,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Clay',
//          id: '26677',
//          type: 'wiki',
//          score: 8,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Doha',
//          id: '7073',
//          type: 'loc',
//          score: 8,
//          label: [Object],
//          location: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Kuwait_City',
//          id: '6814',
//          type: 'loc',
//          score: 8,
//          label: [Object],
//          location: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Social_media',
//          id: '21029',
//          type: 'wiki',
//          score: 7,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Richter_magnitude_scale',
//          id: '18638',
//          type: 'wiki',
//          score: 7,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Rural_area',
//          id: '16986',
//          type: 'wiki',
//          score: 7,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Television',
//          id: '16204',
//          type: 'wiki',
//          score: 7,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Associated_Press',
//          id: '997155',
//          type: 'org',
//          score: 6,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Seismology',
//          id: '20097',
//          type: 'wiki',
//          score: 6,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Ankara',
//          id: '8811',
//          type: 'loc',
//          score: 6,
//          label: [Object],
//          location: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Tasnim_News_Agency',
//          id: '1261558',
//          type: 'wiki',
//          score: 5,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Television_set',
//          id: '28668',
//          type: 'wiki',
//          score: 5,
//          label: [Object] },
//        { uri: 'http://en.wikipedia.org/wiki/Russia',
//          id: '180',
//          type: 'loc',
//          score: 5,
//          label: [Object],
//          location: [Object] } ],
//     eventDate: '2018-04-19',
//     title: 
//      { eng: 'Earthquake strikes near Iranian nuclear plant',
//        por: 'Terremoto de magnitude 5,5 atinge a região sul do Irã - Internacional - Estadão' },
//     summary: 
//      { eng: 'TEHRAN, Iran -- An earthquake of at least magnitude 5.5 struck in southern Iran near the country\'s sole nuclear power plant on Thursday morning, shaking countries across the Persian Gulf. There was no immediate report of damage or injuries.\n\nThe U.S. Geological Survey said the quake struck at 0634 GMT some 60 miles east of Bushehr. That\'s home to the Bushehr Nuclear Power, the only operating nuclear power plant in the Islamic Republic.\n\nThe USGS put the earthquake\'s magnitude at 5.5 while Iranian',
//        por: 'DUBAI - Um terremoto de magnitude 5,5 atingiu a região sul do Irã, segundo informou o Serviço de Levantamento Geológico dos Estados Unidos (USGS) nesta quinta-feira, 19. O abalo ocorreu próximo da única usina nuclear em operação no país e foi sentido também nos países ao redor do Golfo Pérsico. Não houve relatos imediatos de danos ou ferimentos. O USGS afirma que o terremoto ocorreu às 6h34 local, a cerca de 100 quilômetros a leste de Bushehr, cidade onde fica a usina.\n\nA televisã' },
//     location: null,
//     categories: 
//      [ { uri: 'dmoz/Science/Earth_Sciences',
//          id: 192,
//          label: 'dmoz/Science/Earth Sciences',
//          wgt: 95 },
//        { uri: 'dmoz/Science/Earth_Sciences/Geophysics',
//          id: 1245,
//          label: 'dmoz/Science/Earth Sciences/Geophysics',
//          wgt: 100 },
//        { uri: 'dmoz/Arts/Television/Guides',
//          id: 2323,
//          label: 'dmoz/Arts/Television/Guides',
//          wgt: 83 } ],
//     totalArticleCount: 57,
//     articleCounts: { eng: 50, por: 7 },
//     wgt: 1 
//   }

//   await associateConceptsOrCategories(testEvent.concepts, 'concept', testEvent.uri); 
//   await associateConceptsOrCategories(testEvent.categories, 'category', testEvent.uri);
// }









