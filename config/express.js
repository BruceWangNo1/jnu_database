var express=require('express');
var bodyParser=require('body-parser');
var passport=require('passport');
var session=require('express-session');
var flash=require('connect-flash');
var credentials=require('./credentials/credentials.js');

module.exports=function(){
	var app=express();

	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(bodyParser.json());
	app.use(express.static(process.cwd()+'/public'));

	//this is for passport. with session, when you refresh the page, req remains
	app.use(session({
		secret: credentials.sessionSecret,
		resave: true,
		saveUninitialized: true
	}));

	app.set('views', process.cwd()+'/app/views');
	app.set('view engine', 'ejs');

	//app.use(flash());

	app.use(passport.initialize());
	app.use(passport.session());

	require('../app/routes/search.server.route.js')(app);
	require('../app/routes/user.server.route.js')(app);
	require('../app/routes/index.server.route.js')(app);

	return app;
}