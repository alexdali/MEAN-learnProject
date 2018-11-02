var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: 'public/images/content'});
var path = require("path");
var isAuthenticated = require('../utils/is-auth.js');
var Blog = require("../models/Blog.js");
var User = require('../models/User.js');


router.post("/", isAuthenticated, upload.single('img'), function(req, res, next){
	console.log(req.body);

	new Blog({
		title: req.body.title,
		description: req.body.description,
		author: req.user
	}).save(function(err, blog){
		if(err) return res.status(400).send({msg: "Error"});

		var tempPath = req.file.path;

		var targetPath = path.resolve('public/images/content/' + blog._id + '.' + req.file.originalname.split('.').slice(-1).pop());

		fs.rename(tempPath, targetPath, function(err) {
			if(err) return next(err);

			blog.img = 'images/content/' + blog._id + '.' + req.file.originalname.split('.').slice(-1).pop();
			blog.save(function(err, blogsaved){
				if(err) return res.status(400).send({msg: "Error"});
				res.status(200).send(blogsaved);
			});	
		});

	});
});

// router.get("/", function(req, res, next){
// 	Blog.find().populate('author', '_id first_name last_name ava').sort({date: -1}).exec(function(err, blogs){ //returns array
// 		res.status(200).send(blogs);
// 	});
	
// });

router.get("/:page/pagination", function(req, res, next){
	var blogsInOnPage = 4;
	Blog.count().exec(function(err, totalNumberOfBlogs){

		Blog.find()
		.sort({date: -1})		// по полю: дата,  в порядке убывания
		.skip(blogsInOnPage*req.params.page)		//сколько пропустить элементов в запросе
		.limit(blogsInOnPage)	//сколько выбрать элементов в запросе
			.populate('author', '_id first_name last_name ava').sort({date: -1})
			.exec(function(err, blogs){ //returns array
			res.status(200).send({
				numberOfPages: Math.ceil(totalNumberOfBlogs/blogsInOnPage),		//округл в большую сторону
				blogs: blogs
			});
		})


	});
	
});

router.get("/user/:user_id", function(req, res, next){

	Blog.find({author: req.params.user_id}).sort({date: -1}).exec(function(err, blogs){ //returns array
		if(err) return next(err);
		User.findById(req.params.user_id).exec(function(err, user){
			if(err) return next(err);
			res.status(200).send({
				blogs: blogs,
				author: user
			});
		});
		
	});
	
});


router.delete("/:asd", function(req, res, next){
	Blog.remove({_id: req.params.asd})
		.exec(function(err){
 			if(err) return res.status(400).send({msg: "Удаление не удалось!"});
 			res.status(200).end();
		});
});

router.put('/', function(req, res, next){
	console.log(req.body);
	Blog.findById(req.body._id).exec(function(err, blog){
		if(err) return res.status(400).send({msg:'Blog not found'});
		blog.title = req.body.title;
		blog.description = req.body.description;

		blog.save(function(err){
			if(err) return res.status(400).send({msg: 'Blog not save'});
			res.status(200).end();
		});

	});

});

router.get("/:id", function(req, res, next){
	Blog.findById(req.params.id).populate('author', '_id first_name last_name ava').exec(function(err, blog){
		if(err) return res.status(400).send({msg:'Blog not found'});
		res.status(200).send(blog);
	});
});


router.get("/:key/search", function(req, res, next){
	Blog.find({
		
		$or: [
			{ title: new RegExp(req.params.key, 'i') },
			{ description: new RegExp(req.params.key, 'i') }
		]

	}).exec(function(err, blogs){
		if(err) return next(err);

		res.status(200).send(blogs);
	});
});


router.get("/:page/scroll", function(req, res, next){
		
	var inEachScroll = 2;


	Blog.find()
	.sort({date: -1})
	.skip(req.params.page*inEachScroll)		//сколько пропустить элементов в запросе
	.limit(inEachScroll)	//сколько выбрать элементов в запросе
		.exec(function(err, blogs){ //returns array
		res.status(200).send(blogs);
	});
	
});



module.exports = router;