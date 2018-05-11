const db = require('../db/index');

const bodyParser = require('body-parser');
const express = require('express');
const swaggerUi = require('swagger-ui-express');

const app = express();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

// swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(require('../swagger.json')));

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

// sources
app.get('/sources', wrap(async (req, res) => {
  const { eventId } = req.query;
  const sourceUris = ['huffingtonpost.com', 'msnbc.com', 'nytimes.com', 'hosted.ap.org', 'thehill.com', 'foxnews.com', 'breitbart.com'];
  const sources = await db.Source.findAll({
    where: {
      uri: sourceUris,
    },
    include: [{
      model: db.Article,
      where: { eventId },
      required: false
    }],
  });
  res.json(sources);
}));

app.listen(3000, () => console.log('Listening on port 3000!'));
