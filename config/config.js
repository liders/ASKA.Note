var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'aska-note'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/aska-note-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'aska-note'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/aska-note-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'aska-note'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/aska-note-production'
  }
};

module.exports = config[env];
