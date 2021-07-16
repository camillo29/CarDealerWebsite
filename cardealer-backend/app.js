const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();

app.use(logger('dev'));
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
	message: 'Welcome to Second hand Car dealer website',
}));

module.exports = app;