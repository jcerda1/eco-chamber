//fake data
const { sampleUrisObj } = require('../helpers/sampleUriList.js');
const { testEvents } = require('../db/largeTestDataER.js');
console.log(testEvents.length);
let eventUris = [];
let uniqueEvents = [];

for (let i = 0; i < testEvents.length; i++) {
  const event  = testEvents[i];
  if (!eventUris.includes(event.uri)) {
    uniqueEvents.push(event);
    eventUris.push(event.uri);
  }
}

//db models
const { Event, Category, Subcategory, Concept, clearDB, clearTable } = require('../db/index.js');

const { testDataSaving, associateConceptsOrSubcategories, buildSaveConcept, buildSaveSubcategory, buildSaveEvent, formatSubcategory,
  formatConcept, formatEvent, extractReleventEvents } = require('../helpers/events.js');

describe('formatEvent', function() {
  it('should return an instance of sequelize event model', function(done) {
    let result = formatEvent(uniqueEvents[0]);

    expect(result).toBeInstanceOf(Event);
    expect(result._options.isNewRecord).toBe(true);
    expect(result.dataValues).toBeTruthy();
    done();
  });

  it('should have a uri category', function(done) {
    let result = formatEvent(uniqueEvents[2]);
    
    expect(result.dataValues).toHaveProperty('uri');
    expect(typeof result.dataValues.uri).toBe('string');
    expect(result.dataValues.uri).toBeTruthy();
    done();
  });

  it('should have a title', function(done) {
    let result = formatEvent(uniqueEvents[4]);

    expect(result.dataValues).toHaveProperty('title');
    expect(typeof result.dataValues.title).toBe('string');
    done();
  });

  it('should ignore unnecessary data returned from Event Registry', function(done) {
    let result = formatEvent(uniqueEvents[0]);

    expect(result).not.toHaveProperty('location');
    expect(result).not.toHaveProperty('categories');
    expect(result).not.toHaveProperty('wgt');
    done();
  });
});

describe('formatConcept', function() {
  it('should return an instance of sequelize concept model', function(done) {
    let result = formatConcept(uniqueEvents[0].concepts[0]);

    expect(result).toBeInstanceOf(Concept);
    expect(result._options.isNewRecord).toBe(true);
    expect(result.dataValues).toBeTruthy();
    done();
  });

  it('should have a uri category', function(done) {
    let result = formatConcept(uniqueEvents[0].concepts[1]);

    expect(result.dataValues).toHaveProperty('uri');
    expect(typeof result.dataValues.uri).toBe('string');
    expect(result.dataValues.uri).toBeTruthy();
    done();
  });
});

describe('formatSubcategory', function() {

  beforeEach(() => { 
    return clearDB();
  });

  it('should return an instance of sequelize subcategory model', function(done) {
    let result = formatSubcategory(uniqueEvents[0].categories[0]);

    expect(result).toBeInstanceOf(Subcategory);
    expect(result._options.isNewRecord).toBe(true);
    expect(result.dataValues).toBeTruthy();
    done();
  });

  it('should have a uri category', function(done) {
    let result = formatSubcategory(uniqueEvents[0].categories[1]);

    expect(result.dataValues).toHaveProperty('uri');
    expect(typeof result.dataValues.uri).toBe('string');
    expect(result.dataValues.uri).toBeTruthy();
    expect(result.dataValues.uri).toContain('dmoz');
    done();
  });

  it('should relate to a higher level Category from the dmoz system', async function(done) {
    let result = formatSubcategory(uniqueEvents[0].categories[2]);
    let base = result.dataValues.uri.split('/')[1];
    let category = await Category.find({where: {name: base}});
  
    expect(category.dataValues.name).not.toContain('dmoz');
    expect(base).toEqual(category.dataValues.name);
    done();
  });
});

describe('buildSaveConcept', function() {
  beforeEach(() => {
    return clearDB();
  });

  it('should save a formatted concept if it does not exist in DB', async function(done) {
    expect.assertions(3);

    const test = uniqueEvents[4].concepts[0];
    const before = await Concept.findAll({where: {}});
    expect(before.length).toEqual(0);

    await buildSaveConcept(test);

    const after = await Concept.find({where:{uri: test.uri}});
    expect(after).toBeTruthy();
    expect(after.dataValues.uri).toEqual(test.uri);
    done();
  });

  it('should save concepts whose uri contains nonenglish chars', async function(done) {
    expect.assertions(4)

    const test = uniqueEvents[5].concepts[0];
    const saved = await buildSaveConcept(test);
    expect(saved).toBeTruthy();

    const found = await Concept.find({where: {uri: test.uri}});
    expect(found).toBeTruthy();
    expect(found.dataValues.uri).toEqual(test.uri);
    expect(found.dataValues.uri).toContain('ć');
    done();
  });
});

describe('buildSaveEvent', function() {
  beforeEach(() => {
    // Clears the database 
    // Jest will wait for this promise to resolve before running tests.
    return clearDB();
  });

  it('should save a formatted event if it doesn\'t already exist in the database', async function(done) {
    expect.assertions(4);

    const before = await Event.find({where:{uri:uniqueEvents[0].uri}});
    expect(before).not.toBeTruthy();

    await buildSaveEvent(uniqueEvents[0]);
    
    const after = await Event.find({where:{}});
    expect(after).toBeTruthy();
    expect(after.dataValues.uri).toEqual(uniqueEvents[0].uri);
    expect(after._options.isNewRecord).toBe(false);
    done();
  });

  it('should retrieve a matching event if it is already in the database', async function(done) {
    expect.assertions(3);
    let id;

    const before = await Event.find({where:{}});
    expect(before).not.toBeTruthy();
    
    await buildSaveEvent(uniqueEvents[4]);
   
    await Event.find({where:{}}).then(event => {
      expect(event).toBeTruthy();
      id = event.id;
    });  
    
    const buildSaveAfterCreate = await buildSaveEvent(uniqueEvents[4]);
    expect(buildSaveAfterCreate.dataValues.id).toEqual(id);
    done();
  });

  it('should not save the event if event has no uri', async function(done) {
    expect.assertions(2);

    const badEvent = {
      title: 'bad event',
      summary: 'fail fail all the live long day'
    };

    const event= await buildSaveEvent(badEvent);
    expect(event).not.toBeTruthy();

    const allEvent = await Event.findAll({});
    expect(allEvent.length).toEqual(0);

    done();
  });
});

describe('buildSaveSubcategory', function() {
  beforeEach(() => {
    return clearDB().then(async() => await buildSaveEvent(uniqueEvents[9]));
  });

  it('should save a subcategory if it is not already in the db', async function(done) {
    expect.assertions(4);

    const testCategories = uniqueEvents[9].categories;
    const before = await Subcategory.find({where:{}});
    expect(before).not.toBeTruthy();

    await buildSaveSubcategory(testCategories[0]);
    
    const after = await Subcategory.find({where:{}});
    expect(after).toBeTruthy();
    expect(after.dataValues.uri).toEqual(testCategories[0].uri);
    expect(after._options.isNewRecord).toBe(false);
    done();
  });

  it('should retrieve a subcategory if it is already in the db', async function(done) {
    expect.assertions(3);
    const testCategories = uniqueEvents[9].categories;
    let id;

    const before = await Subcategory.find({where:{}});
    expect(before).not.toBeTruthy();
    
    await buildSaveSubcategory(testCategories[0]);
   
    await Subcategory.find({where:{}}).then(x => {
      expect(x).toBeTruthy();
      id = x.id;
    });  
    
    const buildSaveAfterCreate = await buildSaveSubcategory(testCategories[0]);
    expect(buildSaveAfterCreate.dataValues.id).toEqual(id);
    done();
  });

  it('should associate each subcategory with its higher level dmoz Category', async function(done) {
    expect.assertions(4);
    const testCategories = uniqueEvents[9].categories;

    const saved = await buildSaveSubcategory(testCategories[0]);
    const name = saved.dataValues.uri.split('/')[1];

    const category = await Category.find({where:{name}});
    const sub = await Subcategory.find({where:{uri:testCategories[0].uri}});
    expect(category).toBeTruthy();
    expect(sub).toBeTruthy();
    
    const subs = await category.getSubcategories();
    expect(subs.length).toBe(1);
    expect(subs[0].dataValues.uri).toEqual(saved.dataValues.uri);   
    done();
  });
});

describe('associateConceptsOrSubcategories', function() {
  beforeEach(async() => {
    return clearDB().then(async() => {
      const testEvent = uniqueEvents[6];
      await buildSaveEvent(testEvent);
    }); 
  });

  it('should save all concepts associated with the input event', async function(done) {
    expect.assertions(4);

    const testEvent = uniqueEvents[6]; 
    await Event.findAll({where:{}}).then(result => {
      expect(result.length).toBe(1);
    });

    await Concept.findAll({where:{}}).then(result => {
      expect(result.length).toBe(0);
    });

    await associateConceptsOrSubcategories(testEvent.concepts, 'concept', testEvent.uri);

    await Concept.findAll({where:{}}).then(result => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toEqual(testEvent.concepts.length);
    })

    done();
  });

  it('should associate all concepts through EventConcept table', async function(done) {
    expect.assertions(3);

    const testConcepts = uniqueEvents[6].concepts;

    const event = await Event.find({where:{}});
    const concepts = await event.getConcepts();
    expect(concepts.length).toBe(0);

    await associateConceptsOrSubcategories(testConcepts, 'concept', uniqueEvents[6].uri);

    const savedConcepts = await event.getConcepts();
    expect(savedConcepts.length).toBeGreaterThan(0);
    expect(savedConcepts.length).toEqual(testConcepts.length);
    done();
  });

  it('should save all subcategories associated with the input event', async function(done) {
    expect.assertions(4);

    const testEvent = uniqueEvents[6]; 
    await Event.findAll({where:{}}).then(result => {
      expect(result.length).toBe(1);
    });
    await Subcategory.findAll({where:{}}).then(result => {
      expect(result.length).toBe(0);
    });
    await associateConceptsOrSubcategories(testEvent.categories, 'subcategory', testEvent.uri);
    await Subcategory.findAll({where:{}}).then(result => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toEqual(testEvent.categories.length);
    });
    done();
  });

  it('should associate all subcategories greater than weight 50 through EventSubcategory table', async function(done) {
    expect.assertions(3);

    const testCategories = uniqueEvents[6].categories;
    const weighted = testCategories.filter(x => x.wgt > 50);
    const rejects = testCategories.filter(x => x.wgt <= 50);

    const event = await Event.find({where:{}});
    const subcategories = await event.getSubcategories();
    expect(subcategories.length).toBe(0);

    await associateConceptsOrSubcategories(testCategories, 'subcategory', uniqueEvents[6].uri);

    const savedSubcategories = await event.getSubcategories();

    expect(savedSubcategories.length).toBeGreaterThan(0);
    expect(savedSubcategories.length).toEqual(weighted.length);
    done();
  });
});

describe('extractReleventEvents', function() {

  it('given an object of uris by news source, should return properties related to the policital spectrum', function(done) { 
  
    const uris = extractReleventEvents(sampleUrisObj);
 
    expect(uris).toHaveProperty('rightAll');
    expect(uris).toHaveProperty('rightAny');
    expect(uris).toHaveProperty('leftAll');
    expect(uris).toHaveProperty('leftAny');
    expect(uris).toHaveProperty('centerAll');
    expect(uris).toHaveProperty('centerAny');
    expect(uris).toHaveProperty('allSet');
    expect(uris).toHaveProperty('allArray');
    expect(uris).toHaveProperty('spectrumSet');
    expect(uris).toHaveProperty('spectrumArray');
    done();
  });

  it('should return subsets of the original uris', function(done) {
    const uris = extractReleventEvents(sampleUrisObj);
    const concat = sampleUrisObj.fox.concat(sampleUrisObj.breitbart);
    const subsets = uris.rightAll;

    expect(subsets).toBeInstanceOf(Set);
    expect([...subsets].length).toBeLessThan(concat.length);
    done();
  });

  it('should return events that have been reported on by right, middle and center', function(done) {
    const uris = extractReleventEvents(sampleUrisObj);
    const spectrum = uris.spectrumArray;
    const right = sampleUrisObj.fox.concat(sampleUrisObj.breitbart);
    const left = sampleUrisObj.huffington.concat(sampleUrisObj.msnbc);
    const center = sampleUrisObj.ap.concat(sampleUrisObj.times.concat(sampleUrisObj.hill));

    for (const uri of spectrum) {
      expect(right).toContain(uri);
      expect(left).toContain(uri);
      expect(center).toContain(uri);
    }

    done();
  });
});