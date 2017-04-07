var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
  category_api = require('../utils/category.js') 

module.exports = function (app) {
  app.use('/category', router);
};

router.get('/', function(req, res, next) {
  if (!req.session.user) return res.redirect('/')
  category_api.getCategories(req.session.user.id)
    .then(function(categories){
      if(categories){
        console.log(categories)
        return res.status(200).send(categories)
      } else {
        return next(error)
      }
    })
    .catch(function(error){
      return next(error)
    })
});

router.post('/', function(req, res, next) {
  if (!req.session.user) return res.redirect('/')
  category_api.createCategory(req.body, req.session.user.id)
    .then(function(result){
      console.log("Category created")
      return res.status(200).send("OK")
    })
    .catch(function(err){
      res.status(500).send("Error")
    })
});

/*
router.delete('/', function(req, res, next) {
});
*/