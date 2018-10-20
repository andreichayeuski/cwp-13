const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db');
const valid = require("./valid").valid;
const type = "fleets";
router.use(bodyParser.json());

router.get('/readall', (req, res) => {
	db.Fleet.findAll().then((result) => {
		res.json(result);
	});
});

router.get('/read/:id', (req, res) => {
	if (valid(req, type))
	{
		console.log("readFleet");
		db.Fleet.findById(req.params.id).then((result) => {
			if ((!result) || (result.deletedAt !== null)) {
				res.statusCode = 404;
			}
			else
			{
				res.json(result);
			}
		});
	}
	else
	{
		res.json({'error': '\"id\" not found'});
	}
});

router.post('/create', (req, res) => {
	if (valid(req, type))
	{
		console.log("createFleet");
		db.Fleet.create({'name': req.body.name}).then((result) => {
			res.json(result);
		});
	}
	else
	{
		res.json({'error': 'not all args founded'});
	}
});

router.post('/update', (req, res) => {
	req = req.body;
	if (!req.id) {
		res.json({'error': '\"id\" arg not found'});
	}
	else if (!req.name)
	{
		res.json({'error': '\"name\" arg not found'});
	}
	else db.Fleet.update(
			{
				'name': req.name
			},
			{
				where: {
					id: req.id,
					deletedAt: null
				}
			}).then((result) => {
			if (result == 0) {
				res.statusCode = 400;
			}
			else res.json({ 'id': req.id, 'name': req.name });
		});
});

router.post('/delete', (req, res) => {
	req = req.body;
	if (!req.id) res.json({'error': '\"id\" arg not found'});
	else db.Fleet.findById(req.id).then((result) => {
		if (!result) {
			res.statusCode = 400;
		}
		else db.Fleet.destroy({
			where: {
				id: req.id,
				deletedAt: null
			}
		}).then(() => {
			res.json(result);
		});
	});
});

module.exports = router;