'use strict'

var express = require('express');
var DocumentController = require('../controllers/document');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.get('/document/:id',md_auth.ensureAuth, DocumentController.getDocument);
api.post('/document',md_auth.ensureAuth, DocumentController.saveDocument);
api.get('/documents',md_auth.ensureAuth, DocumentController.getDocuments);
api.delete('/document/:id',md_auth.ensureAuth, DocumentController.deleteDocument);

module.exports = api;