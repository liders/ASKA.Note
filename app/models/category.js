var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CategorySchema = new Schema({
  title: {
  	type: String,
  	unique: true,
  	require: true
  },
  user_id: {
  	type: Schema.Types.ObjectId,
  	require: true
  }
});

mongoose.model('Category', CategorySchema);