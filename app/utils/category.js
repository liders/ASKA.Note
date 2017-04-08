var mongoose = require('mongoose'),
  crypto = require('crypto')
  Category = mongoose.model('Category');
  note_api = require('../utils/note.js');

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

exports.deleteCategory = function(caltegoryId, userId) {
  return Category.remove({"_id": caltegoryId, "user_id": userId})
};

