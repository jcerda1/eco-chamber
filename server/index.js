const db = require('../db/index');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

// categories
app.get('/categories', wrap(async (req, res) => {
  const categories = await db.Category.findAll();
  res.json(categories);
}));

// events
app.get('/events', wrap(async (req, res) => {
  const { categoryId } = req.query;
  // TODO: limit events to last X days
  const { Subcategories } = await db.Category.findById(categoryId, {
    include: [{
      model: db.Subcategory,
      include: db.Event,
    }],
  });

  let events = [];
  for (let i = 0; i < Subcategories.length; i++) {
    events = events.concat(Subcategories[i].Events);
  }
  res.json(events);
}));

// articles
app.get('/articles', wrap(async (req, res) => {
  const { eventId } = req.query;

  const sourceUris = ['foxnews.com', 'breitbart.com', 'huffingtonpost.com', 'msnbc.com', 'thehill.com', 'hosted.ap.org', 'nytimes.com'];
  const sources = await db.Source.findAll({ where: { uri: sourceUris } });
  const sourceIds = sources.map(source => source.dataValues.id);

  const articles = await db.Article.findAll({
    where: {
      eventId,
      sourceId: sourceIds,
    }
  });
  res.json(articles);
}));

app.listen(3000, () => console.log('Listening on port 3000!'));
