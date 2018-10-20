const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db');

router.use(bodyParser.json());

router.post('/create', (req, resp) => {
	db.Fleet.findById(req.body.fleetId).then((res) => {
			if ((!res) || (res.deletedAt !== null)) {
				resp.statusCode = 404;
			}
			else db.Motion.create({latitude: req.latitude, longitude: req.longitude, time: req.time, vehicleId: req.vehicleId}).then((res) => {
				resp.json(motion);
			});
		});
});

module.exports = router;