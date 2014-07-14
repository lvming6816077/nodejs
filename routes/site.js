var mongoose = require('mongoose')
  , User = mongoose.model('User')

exports.login = function(req, res){
	res.send("login");
};
exports.register = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var newUser = new User({ 
		 username: username,
		 password2: password,
		 password: password
		 });
	console.log(newUser);
	newUser.save(function(err,obj){
		console.log(err);
		if (!err) {
			
			req.session.user = newUser;
			res.json(200, { message: 'OK',data:newUser });
		}
	});
};