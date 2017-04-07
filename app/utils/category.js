var mongoose = require('mongoose'),
  crypto = require('crypto')
  Category = mongoose.model('Category');


exports.createCategory = function(categoryData, userId){
 	var category = {
  		title: categoryData.title,
  		user_id: userId,
  };
  return new Category(category).save();
}

exports.getCategories = function(userId) {
  return Category.find({"user_id": userId});
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
