var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  login: {
  	type: String,
  	unique: true,
  	require: true
  },
  password: {
  	type: String,
  	require: true
  }
  
});

mongoose.model('User', UserSchema);