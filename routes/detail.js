'use strict'

var express = require('express');
var DetailController = require('../controllers/detail');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


api.post('/detail/:id',md_auth.ensureAuth, DetailController.saveDetail);
api.get('/detail/:id',md_auth.ensureAuth, DetailController.getDetail);
api.get('/details/:id',md_auth.ensureAuth, DetailController.getDetails);
api.put('/detail/update/:id',md_auth.ensureAuth, DetailController.updateDetail);
api.delete('/detail/delete/:id',md_auth.ensureAuth, DetailController.deleteDetail);

module.exports = api;