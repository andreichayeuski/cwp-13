const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db');
const valid = require("./valid").valid;

router.use(bodyParser.json());

router.post('/create', (req, resp) => {
	let err = valid(req);
	if (err === "")
	{
		db.Fleet.findById(req.body.fleetId).then((res) => {
			if ((!res) || (res.deletedAt !== null))
			{
				resp.statusCode = 404;
			}
			else db.Motion.create({
				latitude: req.body.latitude,
				longitude: req.body.longitude,
				time: req.body.time,
				vehicleId: req.body.vehicleId
			}).then((result) => {
				console.log(result);
				resp.json(result);
			});
		});
	}
	else
	{
		resp.json({ 'error': err });
	}
});

module.exports = router;