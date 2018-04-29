//fake data
const { testEvents } = require('../db/largeTestDataER.js');
let uris = [];
let uniqueEvents = [];

for (let i = 0; i < testEvents.length; i++) {
  const event  = testEvents[i];
  if (!uris.includes(event.uri)) {
    uniqueEvents.push(event);
    uris.push(event.uri);
  }
}

console.log(uniqueEvents.map(x => x.title.eng))

//db models
const { Event, Category, Subcategory, Concept, clearDB, clearTable } = require('../db/index.js');

const { testDataSaving, associateConceptsOrSubcategories, buildSaveConcept, buildSaveSubcategory, buildSaveEvent, formatSubcategory,
  formatConcept, formatEvent } = require('../helpers/events.js');

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
    console.log(allEvent);
    expect(allEvent.length).toEqual(0);

    done();
  });
});

xdescribe('associateConceptsOrCategories', function() {
  beforeEach(() => {
    return clearDB();
  });

});
