

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session);

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

app.use(session({
	secret: 'i need more beers',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
      url: config.db
    })
}));

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
