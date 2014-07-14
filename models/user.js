var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
var UserSchema = new Schema({
	  createdAt : { type: Date, default: Date.now },
	  username : { type: String, required: true, index: { unique: true } },
	  //firstName : { type: String, required: true, index: { unique: false } },
	  //lastName : { type: String, required: true, index: { unique: false } },
	  //email : { type: String, required: true, index: { unique: true } },
	  password : { type: String, required: true },
	  //resetPasswordToken : { type: String, required: false },
	  //resetPasswordTokenCreatedAt : { type: Date }
	});
module.exports = mongoose.model('User', UserSchema);