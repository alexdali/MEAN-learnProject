var mongoose = require("mongoose");
var commentSchema = new mongoose.Schema({
	text: String,
	user: { type: mongoose.Schema.ObjectId, ref: 'User'},
	date: { type: Date, default: Date.now },
	blog: { type: mongoose.Schema.ObjectId, ref: 'Blog'}

});

module.exports = mongoose.model("Comment", commentSchema);