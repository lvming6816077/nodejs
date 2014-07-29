var mongoose = require('mongoose')
  , UserModel = require('../models/user')
  , User = mongoose.model('User');
exports.login = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	//var query = User.where({ "username": username, "password":password});
	User.findOne({ "username": username, "password":password},function (err, obj) {
	  if (!err) {
	  	  if (obj) {
	  	  	req.session.user = obj;
	  	  	res.json(200, { message: 'OK',data:obj });
	  	  } else {
	  	  	res.json(200, { message: 'ERROR',data:{'message':'login fail'} });
	  	  }
	  	  
	  } else {
	  	  res.json(200, { message: 'ERROR',data:err });
	  }
	  
	});
};
exports.register = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var newUser = new User({ 
		 username: username,
		 password: password
		 });
	newUser.save(function(err,obj){
		if (!err) {
			req.session.user = newUser;
			res.json(200, { message: 'OK',data:newUser });
		} else {
			res.json(200, { message: 'ERROR',data:err });
		}
	});
};