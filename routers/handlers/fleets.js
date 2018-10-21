const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db');
const valid = require("./valid").valid;

router.use(bodyParser.json());

router.get('/readall', (req, res) => {
	db.Fleet.findAll().then((result) => {
		res.json(result);
	});
});

router.get('/read/:id', (req, res) => {
	let err = valid(req);
	if (err === "")
	{
		console.log("readFleet");
		db.Fleet.findById(req.params.id).then((result) => {
			if ((!result) || (result.deletedAt !== null))
			{
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
		res.json({ 'error': err });
	}
});

router.post('/create', (req, res) => {
	let err = valid(req);
	if (err === "")
	{
		console.log("createFleet");
		db.Fleet.create({'name': req.body.name}).then((result) => {
			res.json(result);
		});
	}
	else
	{
		res.json({ 'error': err });
	}
});

router.post('/update', (req, res) => {
	let err = valid(req);
	if (err === "")
	{
		db.Fleet.update(
			{
				'name': req.body.name
			},
			{
				where: {
					id: req.body.id,
					deletedAt: null
				}
			}).then((result) => {
				console.log(result);
				if (!result)
				{
					res.statusCode = 400;
				}
				else
				{
					res.json(result);
				}
		});
	}
	else
	{
		res.json({ 'error': err });
	}
});

router.post('/delete', (req, res) => {
	let err = valid(req);
	if (err === "")
	{
		db.Fleet.findById(req.body.id).then((result) => {
			if (!result)
			{
				res.statusCode = 400;
			}
			else
			{
				db.Fleet.destroy({
					where: {
						id: req.body.id,
						deletedAt: null
					}
				}).then(() => {
					res.json(result);
				});
			}
		});
	}
	else
	{
		res.json({ 'error': err });
	}
});

module.exports = router;