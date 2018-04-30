//fake data
const { testEvents, event0Articles, event1Articles } = require('../db/largeTestDataER.js');
//models
const { Event, Category, Article, Source, clearDB, clearTable } = require('../db/index.js');
//functions to test
const { formatArticle, extractFormatSource, buildSaveArticle, calculateBias } = require('../helpers/articles.js');
const { buildSaveEvent } = require('../helpers/events.js');

describe('formatArticle', function() {
  it('should return an instance of sequelize article model', function(done) {
    const article = event0Articles[0];  
    let result = formatArticle(article);
  
    expect(result).toBeInstanceOf(Article);
    expect(result._options.isNewRecord).toBe(true);
    expect(result.dataValues).toBeTruthy();
    done();
  });

  it('should have a uri category', function(done) {
    let result = formatArticle(event0Articles[0]);
    
    expect(result.dataValues).toHaveProperty('uri');
    expect(typeof result.dataValues.uri).toBe('string');
    expect(result.dataValues.uri).toBeTruthy();
    done();
  });

  it('should have a title', function(done) {
    let result = formatArticle(event0Articles[0]);

    expect(result.dataValues).toHaveProperty('title');
    expect(typeof result.dataValues.title).toBe('string');
    done();
  });

  it('should have a body', function(done) {
    let result = formatArticle(event0Articles[0]);

    expect(result.dataValues).toHaveProperty('body');
    expect(typeof result.dataValues.body).toBe('string');
    done();
  });

  it('should ignore unnecessary data returned from Event Registry', function(done) {    
    let result = formatArticle(event0Articles[0]);

    expect(result).not.toHaveProperty('lang');
    expect(result).not.toHaveProperty('isDuplicate');
    expect(result).not.toHaveProperty('source');
    done();
  });
});

describe('extractFormatSource', function() {
  it('should return an instance of sequelize source model', function(done) {
    const article = event0Articles[0];  
    const source = article.source;
    let result = extractFormatSource(article);
  
    expect(result).toBeInstanceOf(Source);
    expect(result._options.isNewRecord).toBe(true);
    expect(result.dataValues).toBeTruthy();
    done();
  });

  it('should have a uri category', function(done) {
    const article = event0Articles[0];  
    const source = article.source;
    let result = extractFormatSource(article);
    
    expect(result.dataValues).toHaveProperty('uri');
    expect(typeof result.dataValues.uri).toBe('string');
    expect(result.dataValues.uri).toBeTruthy();
    done();
  });

  it('should have a title', function(done) {
    const article = event0Articles[0];  
    const source = article.source;
    let result = extractFormatSource(article);

    expect(result.dataValues).toHaveProperty('title');
    expect(typeof result.dataValues.title).toBe('string');
    done();
  });

  it('should ignore unnecessary data returned from Event Registry', function(done) {   
    const article = event0Articles[0];  
    const source = article.source;
    let result = extractFormatSource(article); 
    expect(result.id).not.toEqual(source.id);
    done();
  });
});

// describe('buildASaveArticle', function() {
//   beforeEach(() => {
//     return clearDB().then(async() => await buildSaveEvent(testEvents[1]));
//   });

//   // afterEach(() => {
//   //   return clearDB();
//   // });

//   it('should save a formatted article if it does not exist in DB', async function(done) {
//     expect.assertions(3);

//     const test = event1Articles[1];
//     const before = await Article.findAll({where: {}});
//     expect(before.length).toEqual(0);

//     const saved = await buildSaveArticle(test);
//     const after = await Article.find({where:{uri: test.uri}});
  
//     expect(after).toBeTruthy();
//     expect(after.dataValues.uri).toEqual(saved.dataValues.uri);
//     done();
//   });

//   xit('should retrive an article if it does exist in the DB', async function(done) {
//     expect.assertions(5);

//     const test = event1Articles[2];
//     const before = await Article.findAll({where: {}});
//     expect(before.length).toEqual(0);

//     const saved = await buildSaveArticle(test);
//     const after1 = await Article.findAll({where:{}});
//     const savedAgain = await buildSaveArticle(test);
//     const after2 = await Article.findAll({where:{}});

//     expect(after1.length).toBeGreaterThan(0);
//     expect(after2.length).toBeGreaterThan(0);
//     expect(savedAgain.dataValues.uri).toEqual(saved.dataValues.uri);
//     expect(after2.length).toEqual(after1.length);
//     done();
//   });

//   xit('should associate the source to the article', async function(done) {
//     expect.assertions(5);
//     const test = event1Articles[4];
//     const saved = await buildSaveArticle(test);
//     await Article.find({where:{}}).then(article => {
//       expect(article.dataValues).toHaveProperty('SourceId');
//       expect(article.dataValues.SourceId).toBeTruthy();
//     });
//     const source = await Source.find({where: {uri: test.source.uri}});
//     const articles = await source.getArticles();
    
//     expect(source.dataValues.uri).toEqual(test.source.uri);
//     expect(articles.length).toBeGreaterThan(0);
//     expect(articles[0].dataValues.uri).toEqual(test.uri);
//     done();
//   }); 

//   xit('should call format source if the source does not exist yet', async function(done) {
    
//   });

//   xit('should not call format source if the source already exists', async function(done) {
   
//   }); 
// });

// // xdescribe('calculateBias', function() {

// // });