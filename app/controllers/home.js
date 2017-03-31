var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
  
module.exports = function (app) {
  app.use('/', router);
};


router.get('/', function(req, res, next) {
  var data = {
    title: 'ASKA Notes',
    user : req.session.user
  }
  res.render('index', data);
});

