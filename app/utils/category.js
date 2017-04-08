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

