const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.listen(3000, () => console.log('Listening on port 3000!'));
