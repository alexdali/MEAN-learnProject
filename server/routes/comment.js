var express = require('express');
var router = express.Router();
var isAuthenticated = require('../utils/is-auth.js');
var isEmpty = require('../utils/is-empty.js');
var Comment = require('../models/Comment.js');





router.post('/', isAuthenticated, function(req, res, next){
	var errors = {};
	if(isEmpty(req.body.text)) {
		errors.text = 'Поле обязательно';
	}

	if(isEmpty(req.body.blog_id)) {
		errors.blog_id = 'Поле обязательно';
	}

	if(isEmpty(errors)) {
		new Comment({
			text: req.body.text,
			blog: req.body.blog_id,
			user: req.user  //можно req.user._id
		}).save(function(err, comment){
			if(err) return next(err);

			Comment.findById(comment._id)
				.populate('user', '_id first_name last_name ava')
				.sort({date: -1})
				.exec(function(err, comm){
					if(err) return next(err);
					res.status(200).send(comm);
				});
			
		});
	} else {
		res.status(400).send(errors);
	}


});


router.get('/:blog_id', function(req, res, next){
	Comment.find({ blog: req.params.blog_id })
		.populate('user', '_id first_name last_name ava')
		.exec(function(err, comments){
					if(err) return next(err);
					res.status(200).send(comments);
				});

	});

router.delete('/:comm_id', isAuthenticated, function(req, res, next){

	Comment.findById(req.params.comm_id)
		.populate('blog', 'auhor')
		.exec(function(err, comment){
			if(err) return next(err);


			if(comment&&(
				JSON.stringify(comment.user) == 
				JSON.stringify(req.user._id) || 
				JSON.stringify(comment.blog.author)==
				JSON.stringify(req.user._id))) {
				
					Comment.remove({_id: req.params.comm_id})
						.exec(function(err){
							if(err) return next(err);
							res.status(200).end();
						});

			} else {
				res.status(400).send({msg: 'Permission denied!'});
			}

		})



});



module.exports = router;