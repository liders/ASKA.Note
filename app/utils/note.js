var mongoose = require('mongoose'),
  crypto = require('crypto')
  Note = mongoose.model('Note');


exports.createNote = function(noteData, userId){
  console.log(noteData)
 	var note = {
  		title: noteData.title,
  		user_id: userId,
  		category_id: noteData.category_id
  };
  return new Note(note).save();
}

exports.getNotesByCategory = function(userId, categoryId) {
  return Note.find({
    "user_id": userId,
    "category_id": categoryId});
}

exports.deleteNode = function(userId, nodeId) {
  return Note.remove({"_id": nodeId, "user_id": userId});
};

exports.getNote = function(noteId) {
  return Note.find({"_id": noteId});
};
