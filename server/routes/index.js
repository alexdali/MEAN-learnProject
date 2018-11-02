var express = require('express');
var router = express.Router();


router.use(require('./passport'));
router.use('/api/user', require('./user'));
router.use('/api/blog', require('./blog'));
router.use('/api/comment', require('./comment'));
router.use('/api/like', require('./like'));


router.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send({msg: err.message});
});


router.get('*', function(req, res, next){
	res.redirect('/#' + req.originalUrl);
});


module.exports = router;