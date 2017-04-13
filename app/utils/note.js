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
    "category_id": categoryId}).sort({"created": -1});
}

exports.deleteNode = function(userId, nodeId) {
  return Note.remove({"_id": nodeId, "user_id": userId});
};

exports.getNote = function(noteId) {
  return Note.find({"_id": noteId});
};


exports.updateNote = function(userId, noteId, dataBody) {
  return Note.update({"_id": noteId, "user_id": userId},
    {"$set": {"description": dataBody.description, "title": dataBody.title}}, {"upsert": true});
};


exports.getSearchNote = function(userId, searchQuery){
  return Note.find({
    "user_id": userId,
    "description": { "$regex": searchQuery, "$options": "i" }
  });
};
