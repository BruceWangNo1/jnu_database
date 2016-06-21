var passport=require('passport'),
LocalStrategy=require('passport-local').Strategy,
User=require('mongoose').model('Users');

module.exports=function(){
	passport.use(new LocalStrategy(function(username, password, done){
		User.findOne({
			username: username
		}, function(err, user){
			console.log('local strategy user '+user);
			if(err){
				return done(err);
			}
			if(!user){
				return done(null, false, {
					message: 'Unknown user'
				});
			}
			if(!user.authenticate(password)){
				console.log('invalid password');
				return done(null, false, {
					message: 'Invalid password'
				});
			}
			
			return done(null, user);
		});
	}));
};