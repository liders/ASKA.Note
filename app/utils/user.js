var mongoose = require('mongoose'),
  crypto = require('crypto')
  User = mongoose.model('User');


exports.createUser = function(userData){
 	var user = {
  		login: userData.login,
  		password: hash(userData.password),
  };
  return new User(user).save();
}

exports.getUser = function(id) {
  return User.findOne(id);
};

exports.checkUser = function(userData){
  return User
		.findOne({login: userData.login})
    .then(function(doc){
  		if (doc.password == hash(userData.password)){
  			console.log("User password is OK");
  			return Promise.resolve(doc);
  		} else {
  			return Promise.reject("Incorrect password");
  		}

    });
};

function hash(text) {
	return crypto.createHash('sha1')
		.update(text).digest('base64')
};
