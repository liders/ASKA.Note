var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  category_api = require('../utils/category.js'),
  note_api = require('../utils/note.js');

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

router.get('/:id', function(req, res, next){
  if (!req.session.user) return res.redirect('/')
  var data = {
    title: 'ASKA Notes',
    user : req.session.user,
    categories: [],
    notes: []
  };
  category_api.getCategories(req.session.user.id)
      .then(function(categories){
        if(categories){
          data.categories = categories
          note_api.getNotesByCategory(req.session.user.id, req.params.id)
            .then(function(notes){
              if(notes)
                data.notes = notes
              
              res.render('index', data);
            })
            .catch(function(error){
              return next(error)
            })
        };  
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