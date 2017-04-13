var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CategorySchema = new Schema({
  title: {
  	type: String,
  	require: true
  },
  user_id: {
  	type: Schema.Types.ObjectId,
  	require: true
  }
});

CategorySchema.index({title: 1, user_id: 1}, {unique: true});
mongoose.model('Category', CategorySchema);
