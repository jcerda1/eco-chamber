//fake data
const { testEvents } = require('../db/largeTestDataER.js');

//db models
const { Event, Category, Concept, clearDB, clearTable } = require('../db/index.js');

const { testDataSaving, associateConceptsOrCategories, buildSaveConceptOrCategory, buildSaveEvent, formatCategory,
  formatConcept, formatEvent, getTopEvents } = require('../helpers/events.js');

describe('formatEvent', function() {
  it('should return an instance of sequelize event model', function(done) {
    let result = formatEvent(testEvents[0]);

    expect(result).toBeInstanceOf(Event);
    expect(result._options.isNewRecord).toBe(true);
    expect(result.dataValues).toBeTruthy();
    done();
  });

  it('should have a uri category', function(done) {
    let result = formatEvent(testEvents[2]);
    
    expect(result.dataValues).toHaveProperty('uri');
    expect(typeof result.dataValues.uri).toBe('string');
    expect(result.dataValues.uri).toBeTruthy();
    done();
  });

  it('should have a title', function(done) {
    let result = formatEvent(testEvents[4]);

    expect(result.dataValues).toHaveProperty('title');
    expect(typeof result.dataValues.title).toBe('string');
    done();
  });

  it('should ignore unnecessary data returned from Event Registry', function(done) {
    let result = formatEvent(testEvents[0]);

    expect(result).not.toHaveProperty('location');
    expect(result).not.toHaveProperty('categories');
    expect(result).not.toHaveProperty('wgt');
    done();
  });
});

describe('formatConcept', function() {
  it('should return an instance of sequelize concept model', function(done) {
    let result = formatConcept(testEvents[0].concepts[0]);

    expect(result).toBeInstanceOf(Concept);
    expect(result._options.isNewRecord).toBe(true);
    expect(result.dataValues).toBeTruthy();
    done();
  });

  it('should have a uri category', function(done) {
    let result = formatConcept(testEvents[0].concepts[0]);

    expect(result.dataValues).toHaveProperty('uri');
    expect(typeof result.dataValues.uri).toBe('string');
    expect(result.dataValues.uri).toBeTruthy();
    done();
  });
});

describe('formatCategory', function() {
  it('should return an instance of sequelize category model', function(done) {
    let result = formatCategory(testEvents[0].categories[0]);

    expect(result).toBeInstanceOf(Category);
    expect(result._options.isNewRecord).toBe(true);
    expect(result.dataValues).toBeTruthy();
    done();
  });

  it('should have a uri category', function(done) {
    let result = formatCategory(testEvents[0].categories[0]);

    expect(result.dataValues).toHaveProperty('uri');
    expect(typeof result.dataValues.uri).toBe('string');
    expect(result.dataValues.uri).toBeTruthy();
    expect(result.dataValues.uri).toContain('dmoz');
    done();
  });

  it('should have a baseUri category derived from the dmoz uri category', function(done) {
    let result = formatCategory(testEvents[0].categories[0]);

    expect(result.dataValues).toHaveProperty('baseUri');
    expect(typeof result.dataValues.baseUri).toBe('string');
    expect(result.dataValues.baseUri).not.toContain('dmoz');
    expect(result.dataValues.baseUri).toEqual(result.dataValues.uri.split('/')[1]);
    done();
  });
});

describe('buildSaveEvent', function() {
  beforeAll(() => {
    // Clears the database 
    // Jest will wait for this promise to resolve before running tests.
    return clearDB();
  });

  it('should save a formatted event if it doesn\'t already exist in the database', async function(done) {
    expect.assertions(3);

    const before = await Event.find({where:{uri:testEvents[0].uri}});

    expect(before).not.toBeTruthy();

    await buildSaveEvent(testEvents[0]);
    
    const after = await Event.find({where:{uri:testEvents[0].uri}});
    expect(after).toBeTruthy();
    expect(after._options.isNewRecord).toBe(false);
    done();
  });

  it('should retrieve a matching event if it is already in the database', async function(done) {
    expect.assertions(2);

    await buildSaveEvent(testEvents[4]);

    const afterCreate = await Event.find({where:{uri:testEvents[4].uri}});
    expect(afterCreate).toBeTruthy();

    const buildSaveAfterCreate = await buildSaveEvent(testEvents[4]);
    expect(afterCreate.dataValues).toEqual(buildSaveAfterCreate.dataValues);
    done();
  });
});

describe('buildSaveConceptOrCategory', async function(done) {
  beforeAll(() => {
    return clearDB();
  });

  it('should save a formatted concept if it doesn\'t already exist in the database', async function(done) {

  });

  it('should retrieve a matching concept if it is already in the database', async function(done) {

  });

  it('should save a formatted category if it doesn\'t already exist in the database', async function(done) {

  });

  it('should retrieve a matching category if it is already in the database', async function(done) {

  });

  it('should accept a category with a non-english char in the uri', async function(done) {

  });

  it('should accept a concept with a non-english char in the uri', async function(done) {

  });

});
