module.exports.render=function(req, res){
	console.log('req.user '+req.user);
	res.render('index', {
		title: 'JNU Student Information Query',
		user: JSON.stringify(req.user)
	});
};