var mongoose = require('mongoose');
var Computer = require('../../models/computer');

module.exports.addComputer = function(req, res) {
	Computer.findOne({serialNumber: req.body.serialNumber}, function(err, obj)
	{
		if (err) {
			res.send(err);
		}
		if (!obj)
		{
			var computer = new Computer(req.body);
			computer.onBoard = false;
			computer.lastImaged = new Date();
			computer.imagedCount = 1; 
			computer.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json(computer);
			});
		}
		else
		{
			obj.imagedCount += 1;
			obj.onBoard = false;
			obj.lastImaged = new Date();
			Computer.findByIdAndUpdate(obj._id, {$set: obj}, function(err, computer) {
				if (err) {
					res.send(err);
				}
				res.json(computer);
			});
		}
	});
	
};

module.exports.getAllComputers = function(req, res) {
	Computer.find(function(err, computers) {
		if (err) {
			res.send(err);
		}
		res.json(computers);
	});
};

module.exports.getSingleComputer = function(req, res, id) {
	Computer.findById(id, function(err, computer) {
		if (err) {
			res.send(err);
		}
		res.json(computer);
	});
};

module.exports.updateComputer = function(req, res, id) {
	Computer.findByIdAndUpdate(id, {$set: req.body}, function(err, computer) {
		if (err) {
			res.send(err);
		}
		res.json(computer);
	});
};

module.exports.deleteComputer = function(req, res, id) {
	Computer.findByIdAndRemove(id, function(err) {
		if (err) {
			res.send(err);
		}
		res.sendStatus(200);
	});
};