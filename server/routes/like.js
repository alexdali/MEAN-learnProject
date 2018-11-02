var express = require('express');
var router = express.Router();
var isAuthenticated = require('../utils/is-auth.js');
var isEmpty = require('../utils/is-empty.js');
var Like = require('../models/Like.js');



router.post('/', isAuthenticated, function(req, res, next){

		Like.findOne({
			blog: req.body.blog_id,
			user: req.user  //можно req.user._id
		}).exec(function(err, like){
			if(err) return next(err);

			if(like) {
				Like.remove({_id: like._id})
					.exec(function(err){
						res.status(200).send({isLike: false});
					});
			} else {
				new Like({
					blog: req.body.blog_id,
					user: req.user   //можно req.user._id
				}).save(function(err){
					res.status(200).send({isLike: true});
				});
			}
		});
});



router.get('/:blog_id', function(req, res, next){

	Like.count({blog: req.params.blog_id})
		.exec(function(err, numberOfLikes){
			if(err) return next(err);

			


			Like.findOne({
					blog: req.params.blog_id,
					user: req.user  //можно req.user._id
				}).exec(function(err, like){
					if(err) return next(err);
					var LikeExist=false;
					if(like) {
								LikeExist=true;
					} else {
						
								LikeExist=false;
					}

					res.status(200).send({numberOfLikes: numberOfLikes, isLikeExist: LikeExist});
				});

			

		});


});
		









module.exports = router;