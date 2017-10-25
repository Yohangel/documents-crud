'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');
var document_routes = require('./routes/document');
var detail_routes = require('./routes/detail');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// rutas base
app.use('/api', user_routes);
app.use('/api', document_routes);
app.use('/api', detail_routes);

module.exports = app;