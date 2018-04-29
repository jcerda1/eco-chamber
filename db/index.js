const { db_name, db_user, db_password, db_host } = process.env;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(db_name, db_user, db_password, {
  dialect: 'mysql',
  host: db_host,
  logging: false,
  operatorsAliases: false,
});

const seed = require('./testData.js');

const Event = sequelize.define('Event', {
  uri: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
  },
  summary: {
    type: Sequelize.TEXT,
  },
  date: Sequelize.STRING
});

const Article = sequelize.define('Article', {
  uri: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  url: Sequelize.STRING,
  title: Sequelize.STRING,
  body: Sequelize.STRING,
  description: Sequelize.STRING,
  date: Sequelize.STRING,
  sentiment: Sequelize.STRING,
  image: Sequelize.STRING,
});

const Concept = sequelize.define('Concept', {
  description: Sequelize.STRING,
  uri: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  type: Sequelize.STRING,
});

const Source = sequelize.define('Source', {
  uri: Sequelize.STRING,
  title: Sequelize.STRING,
  importance: Sequelize.INTEGER,
  image: Sequelize.STRING,
  thumbImage: Sequelize.STRING,
  bias: Sequelize.INTEGER
});

const Category = sequelize.define('Category', {
  name: Sequelize.STRING,
});

const Subcategory = sequelize.define('Subcategory', {
  uri: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
});

Event.hasMany(Article);
Article.belongsTo(Event);

Source.hasMany(Article);
Article.belongsTo(Source);

Concept.belongsToMany(Event, {through: 'EventConcept'});
Event.belongsToMany(Concept, {through: 'EventConcept'});

Subcategory.belongsToMany(Event, {through: 'EventSubcategory'});
Event.belongsToMany(Subcategory, {through: 'EventSubcategory'});

Category.hasMany(Subcategory);
Subcategory.belongsTo(Category);

//HELPER FUNCTIONS FOR TESTING

const clearDB = () => {
  return sequelize.sync({force: true});
};

const clearTable = (tableName) => {
  return  tableName.destroy({
    where: {}
  });
};

const getEventsWithArticles = async (baseCategory) => {
  //to do, helper functino to get all events that match the category

};

///// USE THIS TO SEED DB ///////

// sequelize.sync({ force: true }).then(async () => {
//   const categories = await Category.bulkCreate(seed.sampleCategories);
//   console.log('synced');
// });

// sequelize.sync({ force: true }).then(async () => {
//   const events = await Event.bulkCreate(seed.sampleEvents);
//   const sources = await Source.bulkCreate(seed.sampleSources);
//   const articles = await Article.bulkCreate(seed.sampleArticles);
//   const categories = await Category.bulkCreate(seed.sampleCategories);
//   const subcategories = await Subcategory.bulkCreate(seed.sampleSubcategories);

//   // associate articles with news outlets

//   await sources[0].addArticle(articles[0]);
//   await sources[0].addArticle(articles[7]);
//   await sources[1].addArticle(articles[1]);
//   await sources[1].addArticle(articles[8]);
//   await sources[2].addArticle(articles[2]);
//   await sources[2].addArticle(articles[9]);
//   await sources[3].addArticle(articles[3]);
//   await sources[3].addArticle(articles[10]);
//   await sources[4].addArticle(articles[4]);
//   await sources[4].addArticle(articles[11]);
//   await sources[5].addArticle(articles[5]);
//   await sources[5].addArticle(articles[12]);
//   await sources[6].addArticle(articles[6]);
//   await sources[6].addArticle(articles[13]);

//   // associate articles with first sample event
//   await events[0].addArticle(articles[0]);
//   await events[0].addArticle(articles[1]);
//   await events[0].addArticle(articles[2]);
//   await events[0].addArticle(articles[3]);
//   await events[0].addArticle(articles[4]);
//   await events[0].addArticle(articles[5]);
//   await events[0].addArticle(articles[6]);

//   //associate articles with second sample event
//   await events[1].addArticle(articles[7]);
//   await events[1].addArticle(articles[8]);
//   await events[1].addArticle(articles[9]);
//   await events[1].addArticle(articles[10]);
//   await events[1].addArticle(articles[11]);
//   await events[1].addArticle(articles[12]);
//   await events[1].addArticle(articles[13]);

//   // category event with subcategory
//   await categories[0].addSubcategory(subcategories[0]);
//   await categories[1].addSubcategory(subcategories[1]);

//   // associate event with category
//   await events[0].addSubcategory(subcategories[0]);
//   await events[1].addSubcategory(subcategories[1]);
// });

/////////////////////////////

module.exports = {
  Event,
  Article,
  Concept,
  Source,
  Category,
  Subcategory,
  clearTable,
  clearDB
};
