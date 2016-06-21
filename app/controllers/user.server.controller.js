var User=require('mongoose').model('Users'),
passport=require('passport');

var getErrorMessage=function(err){
	var message='';
	if(err.code){
		switch(err.code){
			case 11000:
			case 11001:
				message='Username already exists';
				break;
			default:
				message='Something went wrong, please contact the admin';
		}
	}else{
		for(var errName in err.errors){
			if(err.errors[errName].message)
				message+=err.errors[errName].message;
		}
	}
	return message;
}
exports.renderSignin=function(req, res, next){
	return res.redirect('/');
};
exports.signout=function(req, res){
	req.logout();
	res.redirect('/');
};

exports.renderSignup=function(req, res, next){
	console.log('renderSignup');
	if(!req.user){
		res.send({
			title:'Sign-up Form'
		});
	}else{
		return res.redirect('/');
	}
};
exports.signup=function(req, res, next){
	if(req.body.code!=='passcode&*'){
		res.status(500).send('Your registration code is not correct, please contact the admin.')
	}else if(!req.user){
		console.log('gone through the code test');
		console.log('req.body '+req.body);

		var user=new User(req.body);
		var message=null;

		console.log('user '+user);
		User.find({username: user.username}, function(err, docs){
			if(!docs.length){
				User.find({email: user.email}, function(err, docs){
					if(!docs.length){
						user.save(function(err){
							if(err){
								console.log('err message '+err);
								return res.status(500).send(getErrorMessage(err));
							}
							req.login(user, function(err){
								if(err){
									console.log('err '+err);
									return next(err);
								}
								return res.redirect('/');
							});
						});
					}else{
						return res.status(500).send('Email '+user.email+" already registered.")
					}
				});
			}else{
				return res.status(500).send('Username '+user.username+' already registered.');
			}
		});
	}else{
		return res.status(500).send('Please input your registration information.');
	}
};

exports.requiresLogin=function(req, res, next){
	console.log('requires login');
	if(!req.isAuthenticated()){
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	next();
};