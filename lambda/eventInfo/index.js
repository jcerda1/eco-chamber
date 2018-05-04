exports.handler = async (event, context) => {
  const eventsInfo = await getEventInfo(event.uris); 
  return {events: eventsInfo};
};

//event registry API
const { EventRegistry, QueryEventsIter, ReturnInfo, QueryItems, QueryEvents, RequestEventsUriWgtList } = require('eventregistry');
const er = new EventRegistry({apiKey: process.env.EVENT_REGISTRY_API_KEY});

//lodash
const _ = require('lodash');

const getEventInfo = async(uriList) => {
  const q = QueryEvent.initWithEventUriList(uriList);
  const response = await er.execQuery(q);
  return response.events.results
}

//note, above is untested, waiting to have more tokens available

//helper function to retrive detailed event info by event uri list
// const getEventInfo = async(uriList) => {
//   let unsavedEvents = [];
//   const q = new QueryEventsIter.initWithEventUriList(uriList);
//   return er.execQuery(q).then(events => {
//     for (const x of events.events.results) {
//       unsavedEvents.push(x);
//     }
//     return unsavedEvents;
//   }).catch(err => console.log(err)); 
// };

// const getEventsByChunk = async(uriList) => {
//   let returnEvents = [];
//   const chunks = _.chunk(uriList, 20);

//   for (const chunk of chunks) {
//     let current = await getEventInfo(chunk); 
//     returnEvents = returnEvents.concat(current)
//   }

//   return returnEvents;
// }