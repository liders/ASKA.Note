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
    current_category_id: null
  }
  if (req.session.user) {
    console.log('KEK1111111')
    data.user = req.session.user
    category_api.getCategories(req.session.user.id)
      .then(function(categories){
        if(categories){
          console.log(categories[0]._id)
          console.log(categories[0])
          data.categories = categories[0]._id;
          data.current_category_id = categories[0]._id
          console.log(data.categories)
          res.redirect('/category/' + data.categories);
          res.end();
        }
      })
  }
  else {
    console.log('KEK1112111')
    res.render('index', data);
  }
  //else if (!data.categories) {
  //  res.render('index', data);
  //}
});
