var express = require('express'),
  router = express.Router(),
  update_router = express.Router(),
  create_router = express.Router(),
  mongoose = require('mongoose'),
  note_api = require('../utils/note.js'),
  category_api = require('../utils/category.js');

module.exports = function (app) {
  app.use('/note', router);
  app.use('/update_note', update_router);
  app.use('/create_note', create_router);
};


router.get('/:id', function(req, res, next) {
  if (!req.session.user) return res.redirect('/')
  var data = {
    title: 'ASKA Notes',
    user : req.session.user,
    categories: [],
    notes: [],
    current_category_id: null
  };
  category_api.getCategories(req.session.user.id)
      .then(function(categories){
        if(categories){
          data.categories = categories
          console.log(req.params.id)
          note_api.getNote(req.params.id)
            .then(function(note){
              if (note)
                data.notes = note
              res.render('note', data);
            })
            .catch(function(error){
              return next(error)
            })
        };
      })
});


router.get('/', function(req, res, next) {
  if (!req.session.user) return res.redirect('/')
  if (!req.query.category_id) return res.status(400)
  note_api.getNotes(req.session.user.id, req.query.category_id)
    .then(function(notes){
      if(notes){
        console.log(notes)
        return res.status(200).send(notes)
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
  note_api.createNote(req.body, req.session.user.id)
    .then(function(result){
      console.log("Note created")
      console.log(req.body)
      res.redirect('/category/' + req.body.category_id);
      //res.end();
    })
    .catch(function(err){
      res.status(500).send("Error")
    })
});


/*
router.delete('/', function(req, res, next) {
});
*/
