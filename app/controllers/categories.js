var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  category_api = require('../utils/category.js'),
  note_api = require('../utils/note.js');

module.exports = function (app) {
  app.use('/category', router);
};

router.get('/', function(req, res, next) {
  console.log("kik")
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
  console.log("kik")
  if (!req.session.user) return res.redirect('/')
  var data = {
    title: 'ASKA Notes',
    user : req.session.user,
    categories: [],
    notes: [],
    current_category_id: req.params.id
  };
  category_api.getCategories(req.session.user.id)
      .then(function(categories){
        console.log("KIKKKER");
        console.log(categories.map(category => category.id));
        if(categories){
          if (!categories.map(category => category.id).some(category => category == req.params.id)){
            throw Error("Category: " + req.params.id + " not found");
          }
          data.categories = categories
          note_api.getNotesByCategory(req.session.user.id, req.params.id)
            .then(function(notes){
              if(notes)
                data.notes = notes
              console.log("nodes:" + data.notes)
              res.render('index', data);
              res.end();
            })
            .catch(function(error){
              return next(error)
            })
        };
      }).catch(function(error){
          console.log(error.message)
          console.log("========================ERROR============================");
          return next(error)
      });
});

router.post('/', function(req, res, next) {
  if (!req.session.user) return res.redirect('/')
  category_api.createCategory(req.body, req.session.user.id)
    .then(function(result){
      console.log(result)
      return res.redirect("/category/" + result._id)
    })
    .catch(function(err){
      return next(err)
    })
});


router.delete('/:id', function(req, res, next) {
  if (!req.session.user) return res.redirect('/')
  console.log('kek111')
  var node_lst = note_api.getNotesByCategory(req.session.user.id,req.params.id);
  console.log(node_lst);
  node_lst.then(function(node) {
      console.log(node)
      note_api.deleteNode(node.user_id, node._id)
    }).catch(function(err){
      console.log(err)
      return next(err)
  });

  category_api.deleteCategory(req.params.id, req.session.user.id)
    .then(function(result){
      console.log(result)
      return res.status(200).send("OK")
    })
    .catch(function(err){
      console.log(err)
      return next(err)
    })
});

