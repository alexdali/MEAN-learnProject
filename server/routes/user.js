var express = require('express');
var router = express.Router();
var validator = require('validator');
var isEmpty = require('../utils/is-empty.js');
var passport = require('passport'); //авторизация

var User = require('../models/User.js');





router.post('/signup', function(req, res, next){
	var errors = {};
	console.log(req.body);
	if(isEmpty(req.body.email)) {
		errors.email = "Поле емайл обязательно";
	} else if(!validator.isEmail(req.body.email)) {
		errors.email = "Not valid email";
	}

	if(isEmpty(req.body.first_name)) {
		errors.first_name = "Поле Имя обязательно";
	} 

	if(isEmpty(req.body.last_name)) {
		errors.last_name = "Поле Фамилия обязательно";
	}

	if(isEmpty(req.body.password)) {
		errors.password = "Поле пароль обязательно";
	} else if(!validator.isLength(req.body.password, {min: 6, max: 30})) {
		errors.password = "Длина пароля должна быть от 6 до 30 символов";
	}

	if(isEmpty(req.body.password2)) {
		errors.password2 = "Поле пароль обязательно";
	} else if(req.body.password!==req.body.password2) {
		errors.password2 = "Пароли не совпадают";
	}

	console.log('errors: ' + errors);

	if(isEmpty(errors)) {
		new User(req.body).save(function(err, user){
			if(err) return res.status(400).send({msg:'Произошла ошибка при сохранении данных'});
			res.status(200).send(user);
		})
	} else {

	console.log('errors save: ' + errors);
		res.status(400).send(errors);
	}


});


router.post('/login', function(req, res, next){
	var errors = {};
	console.log(req.body);
	if(isEmpty(req.body.email)) {
		errors.email = "Поле емайл обязательно";
	} else if(!validator.isEmail(req.body.email)) {
		errors.email = "Not valid email";
	}

	if(isEmpty(req.body.password)) {
		errors.password = "Поле пароль обязательно";
	} 

	if(!isEmpty(errors)) res.status(400).send(errors);
	else next();

}, passport.authenticate('local'), function(req, res, next){
	res.status(200).send({
		email: req.user.email,
		first_name: req.user.first_name,
		last_name: req.user.last_name,
		ava: req.user.ava,
		_id: req.user._id
	});

});

router.post('/logout', function(req, res, next){
	req.logout();
	res.send(200).end();
});

router.get('/current', function(req,res,next){

	if(req.user) {
		res.status(200).send({
		email: req.user.email,
		first_name: req.user.first_name,
		last_name: req.user.last_name,
		ava: req.user.ava,
		_id: req.user._id
	});
	} else {
		res.status(200).send(undefined);
	}
})









module.exports = router;