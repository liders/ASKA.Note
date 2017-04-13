var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  category_api = require('../utils/category.js');

module.exports = function (app) {
  app.use('/', router);
};


router.get('/', function(req, res, next) {
  var data = {
    title: 'ASKA Notes',
    user : null,
    categories: [],
    current_category_id: null,
    notes: []
  }
  if (req.session.user) {
    data.user = req.session.user
    category_api.getCategories(req.session.user.id)
      .then(function(categories){
        if(categories && categories.length > 0){
          res.redirect('/category/' + categories[0]._id);
          res.end();
        }
        else{
          res.render('index', data);
        }
      })
  }
  else {
    res.render('index', data);
  }
  //else if (!data.categories) {
  //  res.render('index', data);
  //}
});
