const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false,
  operatorsAliases: false,
});

const Event = sequelize.define('event', {
  uri: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  title: Sequelize.STRING,
  summary: Sequelize.STRING,
  date: Sequelize.STRING
});

const Article = sequelize.define('article', {
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

const Concept = sequelize.define('concept', {
  name: Sequelize.STRING,
  uri: Sequelize.STRING,
  type: Sequelize.STRING,
});

const Source = sequelize.define('source', {
  uri: Sequelize.STRING,
  title: Sequelize.STRING,
  importance: Sequelize.INTEGER,
  image: Sequelize.STRING,
  thumbImage: Sequelize.STRING
});

const Category = sequelize.define('category', {
  uri: Sequelize.STRING,
  parentUri: Sequelize.STRING,
  baseUri: Sequelize.STRING
});

Article.belongsToMany(Event, { as: 'articles' });
Event.hasMany(Article);

Concept.belongsToMany(Event, { as: 'concepts' });
Event.hasMany(Concept);

Concept.belongsToMany(Article, { as: 'concepts' });
Article.hasMany(Concept);

Source.belongsTo(Article);

Category.belongsToMany(Article);
Category.belongsToMany(Event);


///// USE THIS TO SEED DB ///////

// sequelize.sync({ force: true }).then(async () => {
//   await Event.bulkCreate(seed.sampleEvents);
//   const articles = await Article.bulkCreate(seed.sampleArticles);
//   const categories = await Cagegory.bulkCreate(seed.sampleCategories);
//.  await articles[0].addCategories([categories[0]])
//   await courses[0].addTags([tags[3]]);
//   await courses[1].addTags([tags[0]]);
//   await courses[2].addTags([tags[1]]);
//   await Step.bulkCreate(seed.sampleSteps);
//   await Comment.bulkCreate(seed.sampleComments);
// });

///////////////////////////////

const ratingsCountByCourseId = (courseId) => UserCourse.count({ where: { courseId } });

const updateCourseRating = async(courseId) => {
  const ratingsSum = await UserCourse.sum('rating', { where: { courseId } });
  ratingsCount = await ratingsCountByCourseId(courseId);
  const rating = Math.ceil(ratingsSum / ratingsCount);
  await Course.update({ rating }, { where: { id: courseId } });
};

module.exports = {
  User,
  Course,
  UserCourse,
  Step,
  UserStep,
  Comment,
  Tag,
  updateCourseRating,
  ratingsCountByCourseId,
}
