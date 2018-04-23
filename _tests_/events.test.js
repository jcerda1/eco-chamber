const assert = require('chai').assert;
const expect = require('chai').expect;
//fake data
const { testEvents } = require('../db/largeTestDataER.js');

//db models
const { Event, Category, Concept } = require('../db/index.test.js');

const { testDataSaving, associateConceptsOrCategories, buildSaveConceptOrCategory, buildSaveEvent, formatCategory,
  formatConcept, formatEvent, getTopEvents } = require('../helpers/events.js');

describe('formatEvent', function() {
  it('should return an instance of sequelize event model', function(done) {
    let result = formatEvent(testEvents[0]);

    expect(result).to.have.property('dataValues');
    done();
  });

  it('should have a uri category', function(done) {
    let result = formatEvent(testEvents[2]);

    expect(result.dataValues).to.have.property('uri');
    expect(result.dataValues.uri).to.be.a('string');
    expect(result.dataValues.uri).to.not.be.a('null');
    done();
  });

  it('should have a title', function(done) {
    let result = formatEvent(testEvents[4]);

    expect(result.dataValues).to.have.property('title');
    expect(result.dataValues.title).to.be.a('string');
    done();
  });

  it('should ignore unnecessary data returned from Event Registry', function(done) {
    let result = formatEvent(testEvents[0]);

    expect(result).to.not.have.property('location');
    expect(result).to.not.have.property('categories');
    expect(result).to.not.have.property('wgt');
    done();
  });
});

describe('formatConcept', function() {
  it('should return an instance of sequelize concept model', function(done) {
    let result = formatConcept(testEvents[0].concepts[0]);

    expect(result).to.have.property('dataValues');
    done();
  });

  it('should have a uri category', function(done) {
    let result = formatConcept(testEvents[0].concepts[0]);

    expect(result.dataValues).to.have.property('uri');
    expect(result.dataValues.uri).to.be.a('string');
    expect(result.dataValues.uri).to.not.be.a('null');
    done();
  });
});

describe('formatCategory', function() {
  it('should return an instance of sequelize category model', function(done) {
    let result = formatCategory(testEvents[0].categories[0]);

    expect(result).to.have.property('dataValues');
    done();
  });

  it('should have a uri category', function(done) {
    let result = formatCategory(testEvents[0].categories[0]);

    expect(result.dataValues).to.have.property('uri');
    expect(result.dataValues.uri).to.be.a('string');
    expect(result.dataValues.uri).to.not.be.a('null');
    expect(result.dataValues.uri).to.include('dmoz');
    done();
  });

  it('should have a baseUri category derived from the dmoz uri category', function(done) {
    let result = formatCategory(testEvents[0].categories[0]);

    expect(result.dataValues).to.have.property('baseUri');
    expect(result.dataValues.baseUri).to.be.a('string');
    expect(result.dataValues.baseUri).to.not.include('dmoz');
    expect(result.dataValues.baseUri).to.equal(result.dataValues.uri.split('/')[1]);
    done();
  });
});

