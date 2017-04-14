var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  user_api = require('../utils/user.js');

module.exports = function (app) {
  app.use('/users', router);
};

router.post('/login', function(req, res, next) {
  console.log('USE LOGIN')
  if (req.session.user) return res.redirect('/')
  user_api.checkUser(req.body)
    .then(function(user){
      if(user){
        req.session.user = {id: user._id, login: user.login}
        res.redirect('/');
      } else {
          return next(error)
      }
    })
    .catch(function(error){
      return next(error)
    })

});

router.post('/', function(req, res, next) {
  user_api.createUser(req.body)
    .then(function(result){
      console.log("User created")
      res.redirect('/')
    })
    .catch(function(err){
      if (err.toJSON().code == 11000){
        next(new Error("This login already exist"))
      }
    })
});

router.post('/logout', function(req, res, next) {
  try {
    console.log(req.session.user);
    if (req.session.user) {
      delete req.session.user;
      res.redirect('/')
    }
  }
  catch(err) {
    return next(err)
  }
});
