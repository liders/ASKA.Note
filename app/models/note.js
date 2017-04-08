var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: {
  	type: String,
  	require: true
  },
  user_id: {
  	type: Schema.Types.ObjectId,
  	require: true
  },
  category_id: {
    type: Schema.Types.ObjectId,
    require: true
  },
  description: {
    type: String
  },
  created: {
    type: Date, 
    default: Date.now
  }
});

mongoose.model('Note', NoteSchema);