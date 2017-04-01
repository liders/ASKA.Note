var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
  category_api = require('../utils/category.js') 

module.exports = function (app) {
  app.use('/', router);
};


router.get('/', function(req, res, next) {
  var data = {
    title: 'ASKA Notes',
    user : req.session.user,
    categories: []
  }
  if (req.session.user) {
    category_api.getCategories(req.session.user.id)
      .then(function(categories){
       if(categories)
          data.categories = categories
        res.render('index', data);
      })
  } else {
    res.render('index', data);
  }
});
