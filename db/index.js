const Sequelize = require('sequelize');
const sequelize = new Sequelize('eco_dev', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
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
  category: Sequelize.STRING,
  title: Sequelize.STRING,
  summary: Sequelize.STRING,
  titleSource: Sequelize.STRING,
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
  name: Sequelize.STRING,
  uri: Sequelize.STRING,
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
  uri: Sequelize.STRING,
  parentUri: Sequelize.STRING,
  baseUri: Sequelize.STRING
});

Event.hasMany(Article);
Article.belongsTo(Event);

Source.hasMany(Article);
Article.belongsTo(Source);

Concept.belongsToMany(Event, {through: 'EventConcept' });
Event.belongsToMany(Concept, {through: 'EventConcept'});

Concept.belongsToMany(Article, {through: 'ArticleConcept' });
Article.belongsToMany(Concept, {through: 'ArticleConcept' });

Category.belongsToMany(Event, { through: 'EventCategory' });
Event.belongsToMany(Category, { through: 'EventCategory'});

Category.belongsToMany(Article, { through: 'ArticleCategory' });
Article.belongsToMany(Category, { through: 'ArticleCategory' });


///// USE THIS TO SEED DB ///////

sequelize.sync({ force: true }).then(async () => {
  const events = await Event.bulkCreate(seed.sampleEvents);
  const sources = await Source.bulkCreate(seed.sampleSources);
  const articles = await Article.bulkCreate(seed.sampleArticles);

  //associate articles with news outlets

  await sources[0].addArticle(articles[0]);
  await sources[0].addArticle(articles[7]);
  await sources[1].addArticle(articles[1]);
  await sources[1].addArticle(articles[8]);
  await sources[2].addArticle(articles[2]);
  await sources[2].addArticle(articles[9]);
  await sources[3].addArticle(articles[3]);
  await sources[3].addArticle(articles[10]);
  await sources[4].addArticle(articles[4]);
  await sources[4].addArticle(articles[11]);
  await sources[5].addArticle(articles[5]);
  await sources[5].addArticle(articles[12]);
  await sources[6].addArticle(articles[6]);
  await sources[6].addArticle(articles[13]);

  //associate articles with first sample event
  await events[0].addArticle(articles[0]);
  await events[0].addArticle(articles[1]);
  await events[0].addArticle(articles[2]);
  await events[0].addArticle(articles[3]);
  await events[0].addArticle(articles[4]);
  await events[0].addArticle(articles[5]);
  await events[0].addArticle(articles[6]);

  //associate articles with second sample event
  await events[1].addArticle(articles[7]);
  await events[1].addArticle(articles[8]);
  await events[1].addArticle(articles[9]);
  await events[1].addArticle(articles[10]);
  await events[1].addArticle(articles[11]);
  await events[1].addArticle(articles[12]);
  await events[1].addArticle(articles[13]); 
});

///////////////////////////////

// const ratingsCountByCourseId = (courseId) => UserCourse.count({ where: { courseId } });

// const updateCourseRating = async(courseId) => {
//   const ratingsSum = await UserCourse.sum('rating', { where: { courseId } });
//   ratingsCount = await ratingsCountByCourseId(courseId);
//   const rating = Math.ceil(ratingsSum / ratingsCount);
//   await Course.update({ rating }, { where: { id: courseId } });
// };

// module.exports = {
//   User,
//   Course,
//   UserCourse,
//   Step,
//   UserStep,
//   Comment,
//   Tag,
//   updateCourseRating,
//   ratingsCountByCourseId,
// }
