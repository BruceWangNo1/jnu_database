process.env.NODE_ENV='development';
var express=require('./config/express.js');
var mongoose=require('./config/mongoose');
var passport=require('./config/passport');
var mysql=require('./config/mysql');
// var path=require('path');a
var fs=require('fs');
var util=require('util');

var db=mongoose();//this must goes first before the next line because model need to be ahead of routes
var app=express();
var passport=passport();
var mysql=mysql();

app.listen(4000, '127.0.0.1');

console.log("this is working");


//module.exports=app;

var log_file=fs.createWriteStream(__dirname+'/debug.log', {flag: 'a'});
var log_stdout=process.stdout;

console.log=function(d){
	log_file.write(util.format(d)+'\n');
	log_stdout.write(util.format(d)+'\n');
};