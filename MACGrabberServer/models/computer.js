var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComputerSchema = new Schema({
	name: String,
	wirelessMAC: String,
	wiredMAC: String,
	OS: String,
	memory: String,
	make: String,
	model: String,
	serialNumber: String,
	diskSize: String,
	freeSpace: String,
	processor: String,
	onBoard: Boolean,
	lastImaged: Date,
	imagedCount: Number,
	tags: [{ type: mongoose.Schema.ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('Computer', ComputerSchema);