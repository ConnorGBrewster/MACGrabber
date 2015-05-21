var mongoose = require('mongoose');
var Tag = require('../../models/tag');

module.exports.addTag = function(req, res) {
	var tagName = req.body.name;
	Tag.findOne({name: tagName}, function(err, obj)
	{
		if (err) {
			res.send(err);
		}
		if (!obj)
		{
			var tag = new Tag(req.body);
			
				tag.save(function(err) {
					if (err) {
						res.send(err);
					}
					res.json(tag);
				});
		}
		else
		{
			res.sendStatus(409);
		}
	});
	
};

module.exports.getAllTags = function(req, res) {
	Tag.find(function(err, tags) {
		if (err) {
			res.send(err);
		}
		res.json(tags);
	});
};

module.exports.getSingleTag = function(req, res, id) {
	Tag.findById(id, function(err, tag) {
		if (err) {
			res.send(err);
		}
		res.json(tag);
	});
};

module.exports.updateTag = function(req, res, id) {
	Tag.findByIdAndUpdate(id, {$set: req.body}, function(err, tag) {
		if (err) {
			res.send(err);
		}
		res.json(tag);
	});
};

module.exports.deleteTag = function(req, res, id) {
	Tag.findByIdAndRemove(id, function(err) {
		if (err) {
			res.send(err);
		}
		res.sendStatus(200);
	});
};