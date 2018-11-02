var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");


var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');


mongoose.connect("mongodb://127.0.0.1:27017/projectdb");





var app = express();
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public"), {maxAge: 1}));

app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true}));
app.use(cookieParser());

app.use(session({
	secret: 'secretasd',
	resave: true,
	saveUninitialized: true,
	key: 'jsessionid',
	store: new MongoStore({mongooseConnection: mongoose.connection})
}));


app.use(require('./server/routes')); //default will search index.js 





app.listen(process.env.PORT || 3000, function(){
	console.log("Server is listening on port", process.env.PORT || 3000);
});


// new Blog({
// 	title: "Second Blog",
// 	description: "2"
// }).save(function(err, blog){
// 	console.log(blog);
// })

// new Blog({
// 	title: "Delete Blog",
// 	description: "3"
// }).save(function(err, blog){
// 	console.log(blog);
// })

// Blog.find().exec(function(err, blogs){ //returns array
// 	console.log(blogs);
// });

// Blog.findById("5b1beb7ed177e9275a15a4fd").exec(function(err, blog){
// 	console.log(blog);
// });

// Blog.findOne({title: "Second blog"})
// .exec(function(err, blog){
// 	console.log(blog);
// });

// //update
// Blog.findById("5b1beb7ed177e9275a15a4fd").exec(function(err, blog){
// 	blog.description = "Updated desc";

// 	blog.save(function(err, blog){
// 		console.log("done");
// 	})
	
// });

// //delete
// Blog.remove({_id: "5b1bf0e7a639852925434441"}).exec(function(err){
// 	console.log("deleted");
// });


// app.get("/", function(req, res, next){

// 	console.log("Here");
// 	var message = {
// 		msg: "Hello",
// 		age: 21
// 	};
// 	res.status(200).send(message);
// });

// app.get("/hello", function(req, res, next){

// 	console.log("Here2");
// 	var message = {
// 		msg: "Hello Decode",
// 		age: 24
// 	};
// 	res.status(200).send(message);
// });