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
  let events = [];

  if (categoryId) {
    const category = await db.Category.findById(categoryId);
    events = await category.getEvents();
    console.log(events);
  } else {
    events = await db.Event.findAll();
  }

  res.json(events);
}));

app.listen(3000, () => console.log('Listening on port 3000!'));
