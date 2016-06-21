var user=require('../controllers/user.server.controller.js'),
passport=require('passport');

module.exports=function(app){
	app.route('/api/signup')
	.post(user.signup);

	app.route('/api')
	.post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash: true
	}));
	
	app.get('/signout', user.signout);
}