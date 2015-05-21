var express = require('express');
var router = express.Router();

var computers = require('./api/computer');
var tags = require('./api/tag');
/* Computers routes */
router.route('/computers')
	.post(function(req,res) { computers.addComputer(req,res) })
	.get(function(req,res) { computers.getAllComputers(req, res); });

/* Single computer routes */
router.route('/computers/:computer_id')
	.get(function(req, res) { computers.getSingleComputer(req, res, req.params.computer_id) })
	.put(function(req, res) { computers.updateComputer(req, res, req.params.computer_id) })
	.delete(function(req, res) { computers.deleteComputer(req, res, req.params.computer_id) });

/* Tags routes */
router.route('/tags')
	.post(function(req,res) { tags.addTag(req,res) })
	.get(function(req,res) { tags.getAllTags(req, res); });

/* Single tag routes */
router.route('/tags/:tag_id')
	.get(function(req, res) { tags.getSingleTag(req, res, req.params.tag_id) })
	.put(function(req, res) { tags.updateTag(req, res, req.params.tag_id) })
	.delete(function(req, res) { tags.deleteTag(req, res, req.params.tag_id) });

module.exports = router;