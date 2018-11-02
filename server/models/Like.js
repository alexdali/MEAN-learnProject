var mongoose = require("mongoose");
var likeSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.ObjectId, ref: 'User'},
	date: { type: Date, default: Date.now },
	blog: { type: mongoose.Schema.ObjectId, ref: 'Blog'}
});

module.exports = mongoose.model("Like", likeSchema);