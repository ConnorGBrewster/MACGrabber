var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
	name: String,
	computers: [{ type: mongoose.Schema.ObjectId, ref: 'Computer' }]
});

module.exports = mongoose.model('Tag', TagSchema);