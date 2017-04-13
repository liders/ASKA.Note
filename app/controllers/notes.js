var express = require('express'),
  router = express.Router(),
  update_router = express.Router(),
  mongoose = require('mongoose'),
  note_api = require('../utils/note.js'),
  category_api = require('../utils/category.js'),
  base64 = require('js-base64'),
  md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
  }).use(require('markdown-it-abbr'))
    .use(require('markdown-it-container'), 'warning')
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-emoji'))
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-ins'))
    .use(require('markdown-it-mark'))
    .use(require('markdown-it-sub'))
    .use(require('markdown-it-sup'));
  md.renderer.rules.table_open = function () {
    return '<table class="table table-striped">\n';
  };

module.exports = function (app) {
  app.use('/note', router);
  app.use('/modify_note', update_router);
};


router.get('/:id', function(req, res, next) {
  if (!req.session.user) return res.redirect('/')
  var data = {
    title: 'ASKA Notes',
    user : req.session.user,
    categories: [],
    notes: [],
    current_category_id: req.session.current_category_id
  };
  category_api.getCategories(req.session.user.id)
      .then(function(categories){
        if(categories){
          data.categories = categories
          console.log(req.params.id)
          console.log("Current: " + data.current_category_id)
          note_api.getNote(req.params.id)
            .then(function(note){
              if (note) {
                console.log(note[0].description)
                if(note[0].description)
                  note[0].description = md.render(note[0].description);
                data.notes = note;
                res.render('note', data);
              } else {
                throw Error("Note: " + req.params.id + " not found");
              }
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

update_router.get('/:id', function(req, res, next) {
  if (!req.session.user) return res.redirect('/')
  var data = {
    title: 'ASKA Notes',
    user : req.session.user,
    categories: [],
    notes: [],
    current_category_id: req.session.current_category_id
  };
  category_api.getCategories(req.session.user.id)
    .then(function(categories){
      if(categories){
        data.categories = categories
        console.log(req.current_category_id)
        note_api.getNote(req.params.id)
          .then(function(note){
            if (note) {
              note[0]['processed_description'] = (note[0].description) ? md.render(note[0].description): "";
              note[0]['encoded_description'] = (note[0].description) ? base64.Base64.encode(note[0].description): "";
              data.notes = note;
              res.render('modify_note', data);
            } else {
              throw Error("Note: " + req.params.id + " not found");
            }
          })
          .catch(function(error){
            return next(error)
          })
      };
    })
});

router.post('/:id', function(req, res, next) {
  console.log("TEST----1")
  if (!req.session.user) return res.status(401).send("Unauthorized");
  console.log(req.body)
  note_api.updateNote(req.session.user.id, req.params.id, req.body)
    .then(function(result){
      return res.redirect("/note/" + req.params.id);
    })
    .catch(function(error){
      console.log("TEST----1")
      return next(error);
    })
});

router.post('/search', function(req, res, next){
  if (!req.session.user) return res.redirect('/')
  var data = {
    title: 'ASKA Notes',
    user : req.session.user,
    categories: [],
    notes: [],
    current_category_id: null,
    subtext: null
  };
  category_api.getCategories(req.session.user.id)
      .then(function(categories){
        if(categories){
          data.categories = categories
          console.log(req.params.id)
          note_api.getSearchNote(req.session.user.id, req.body.search_query)
            .then(function(result){
              data.notes = result
              res.render('search_result', data);
            })
            .catch(function(err){
              return next(error)
            })
        };
      })
});

/*
router.delete('/', function(req, res, next) {
});
*/
