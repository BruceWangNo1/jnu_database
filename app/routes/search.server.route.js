var search=require('../controllers/search.server.controller.js');
var user=require('../controllers/user.server.controller.js');

module.exports=function(app){
	app.post('/query', user.requiresLogin, search.query);
}