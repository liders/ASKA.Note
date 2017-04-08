var mongoose = require('mongoose'),
  crypto = require('crypto')
  Note = mongoose.model('Note');


exports.createNote = function(noteData, userId){
 	var note = {
  		title: noteData.title,
  		user_id: userId,
  		category_id: noteData.category_id,
  		description: noteData.description
  };
  return new Note(note).save();
}

exports.getNotesByCategory = function(userId, categoryId) {
  return Note.find({
    "user_id": userId, 
    "category_id": categoryId});
};

exports.getNote = function(userId, noteId) {
  return Note.findOne({"_id": noteId});
};
