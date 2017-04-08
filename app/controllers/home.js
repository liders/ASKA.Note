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
    user : null,
    categories: []
  }
  if (req.session.user) {
    data.user = req.session.user
    category_api.getCategories(req.session.user.id)
      .then(function(categories){
        if(categories){
          data.categories = categories[0]
          res.redirect('/category/' + categories[0]._id)
        }
      })
  }
  res.render('index', data);
});
