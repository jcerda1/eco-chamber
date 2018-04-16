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
  await Event.bulkCreate(seed.sampleEvents);
  await Source.bulkCreate(seed.sampleSources);
  //const articles = await Article.bulkCreate(seed.sampleArticles);
  // const categories = await Category.bulkCreate(seed.sampleCategories);
  // await articles[0].addCategories([categories[0]])
  // await courses[0].addTags([tags[3]]);
  // await courses[1].addTags([tags[0]]);
  // await courses[2].addTags([tags[1]]);
  // await Step.bulkCreate(seed.sampleSteps);
  // await Comment.bulkCreate(seed.sampleComments);
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
