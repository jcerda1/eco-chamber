const db = require('../models/index');
const Op = db.Sequelize.Op;

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const boom = require('boom');
const exjwt = require('express-jwt');
const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const app = express();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(require('../swagger.json')));

// categories
app.get('/api/categories', wrap(async (req, res) => {
  const categories = await db.Category.findAll();
  res.json(categories);
}));

// events
app.get('/api/events', wrap(async (req, res) => {
  const { categoryId } = req.query;
  
  // limit initial events to ones created by our system in the last 5 days
  const daysAgo = new Date(new Date() - (24*5) * 60 * 60 * 1000);

  const events = await db.Event.findAll({
    include: [{
      model: db.Subcategory,
      where: { categoryId }
    },
    {
      model: db.Article,
      include: db.Source
    }],
    where: {
      createdAt: {
        [Op.gt]: daysAgo
      }
    }
  });

  const countValidSources = articles => {
    let sources = [];
    for (const article of articles) {
      if (!sources.includes(article.Source.uri)) {
        sources.push(article.Source.uri);
      }
    }
    return sources;
  }

  //only return events that have associated articles and have been reported by at least 4 sources
  let filteredByArticles = events.filter(event => event.Articles.length > 0);
  let filteredBySources = filteredByArticles.filter(event => countValidSources(event.Articles).length > 2);


  //sort results to come back newest first
  const sorted = filteredBySources.sort((a, b) => {
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 : 0;
  });

  //only send back the info client cares about
  let results = sorted.map(x => {
    return {
      id: x.id,
      uri: x.uri,
      title: x.title,
      summary: x.summary,
      date: x.date
    }
  });

  //TODO:  only send back events that have been appropriately reported on across the spectrum
  res.json(results);
}));

// sources, returned in order of bias from far left to far right
// TODO: add additional sourceUris
// Only send back sources that have articles for that event
app.get('/api/sources', wrap(async (req, res) => {
  const { eventId } = req.query;
  const sourceUris = [
    'motherjones.com', 'huffingtonpost.com', 'msnbc.com', 'nytimes.com', 'hosted.ap.org', 
    'thehill.com', 'foxnews.com', 'breitbart.com', 'npr.org', 'washingtontimesreporter.com', 
    'theguardian.com', 'latimes.com', 'ijr.com', 'theblaze.com', 'wnd.com'
  ];

  const sources = await db.Source.findAll({
    where: {  
      uri: sourceUris,
    },
    include: [{
      model: db.Article,
      where: { eventId },
      required: false
    }],
    order:  ['bias'],
  });
  res.json(sources);
}));

// users
app.post('/api/users', wrap(async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email } });
  if (user) throw boom.badRequest('Email already exists');

  const hash = await bcrypt.hash(password, 10);
  const newUser = await db.User.create({ email, password: hash });
  res.json(newUser);
}));

// auth
app.get('/api/auth/login', wrap(async (req, res) => {
  const { email, password } = req.query;
  const user = await db.User.findOne({ where: { email } });
  if (!user) throw boom.badRequest('User does not exist');

  const authorized = await bcrypt.compare(password, user.password);
  if (!authorized) throw boom.unauthorized('Email/password incorrect');

  const token = jwt.sign({ id: user.id }, 'secret');
  res.json(token);
}));

// serve index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
}); 

app.use((err, req, res, next) => {
  console.log(err);
  if (err.isBoom) {
    const { payload } = err.output;
    res.status(payload.statusCode).json(payload);
  } else if (err.name === 'UnauthorizedError') {
    if (!req.user) res.status(401).json('Invalid jwt');
  } else {
    res.status(500).json('Whoops! Something went wrong. Check the server logs.');
  }
});

app.listen(3000, () => console.log('Listening on port 3000!'));
