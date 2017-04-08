var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
  note_api = require('../utils/category.js') 

module.exports = function (app) {
  app.use('/note', router);
};


router.get('/:id', function(req, res, next) {
  if (!req.session.user) return res.redirect('/')
  note_api.getNote(req.params.id)
    .then(function(note){
      if(note){
        return res.status(200).send(note)
      } else {
        return next(error)
      }
    })
    .catch(function(error){
      return next(error)
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
  category_api.createNote(req.body, req.session.user.id)
    .then(function(result){
      console.log("Note created")
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