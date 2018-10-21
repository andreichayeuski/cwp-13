const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db');

const geolib = require('geolib');
const valid = require("./valid").valid;

router.use(bodyParser.json());

router.get('/readall', (req, resp) => {
	let err = valid(req);
	if (err === "")
	{
		db.Vehicle.findAll({
			where: {
				fleetId: req.params.fleetId,
				deletedAt: null
			}
		}).then((res) => {
			if (!res)
			{
				resp.statusCode = 404;
			}
			else
			{
				resp.json(res);
			}
		});
	}
	else
	{
		resp.json({ 'error': err });
	}
});

router.get('/read', (req, resp) => {
	let err = valid(req);
	if (err === "")
	{
		db.Vehicle.findById(req.params.id).then((res) => {
			console.log(res);
			if ((!res) || (res.deletedAt !== null))
			{
				resp.statusCode = 404;
			}
			else
			{
				resp.json(res);
			}
		});
	}
	else
	{
		resp.json({ 'error': err });
	}
});

router.post('/create', (req, resp) => {
	let err = valid(req);
	if (err === "")
	{
		db.Fleet.findById(req.body.fleetId).then((res) => {
			if ((!res) || (res.deletedAt !== null)) {
				resp.statusCode = 404;
			}
			else db.Vehicle.create({
				'name': req.body.name,
				'fleetId': req.body.fleetId
			}).then((res) => {
				resp.json(res);
			});
		});
	}
	else
	{
		resp.json({ 'error': err });
	}
});

router.post('/update', (req, resp) => {
	let err = valid(req);
	if (err === "")
	{
		db.Vehicle.update(
			{
				name: req.body.name,
				fleetId: req.body.fleetId
			},
			{
				where: {
					id: req.body.id,
					deletedAt: null
				}
			}
		).then((res) => {
			console.log(res);
			if (res == 0)
			{
				resp.statusCode = 400;
			}
			else
			{
				resp.json(res);
			}
		});
	}
	else
	{
		resp.json({ 'error': err });
	}
});

router.post('/delete', (req, resp) => {
	let err = valid(req);
	if (err === "")
	{
		db.Vehicle.findById(req.body.id).then((res) => {
			console.log(res);
			if (!res)
			{
				resp.statusCode = 400;
			}
			else db.Fleet.destroy({
				where: {
					id: req.body.id,
					deletedAt: null
				}
			}).then(() => {
				resp.json(res);
			});
		});
	}
	else
	{
		resp.json({ 'error': err });
	}
});

router.get('/milage', (req, resp) => {
	let err = valid(req);
	if (err === "")
	{
		db.Vehicle.findById(req.params.id).then((res) => {
			if ((!res) || (res.deletedAt !== null))
			{
				resp.statusCode = 404;
			}
			else {
				let coords = [];
				let coordstime = [];
				db.Motion.findAll({
					where: {
						vehicleId: req.params.id
					}
				}).then((result) => {
					result.forEach((motion) => {
						coords.push(motion.latLng);
						coordstime.push(motion.latLngTime);
					});

					let len = 0;
					let spd = 0;
					if (coords.length < 2) resp.json(len);
					for (var i = 0; i < coords.length - 1; i++) {
						len += geolib.getDistance(coords[i], coords[i+1]);
						spd += geolib.getSpeed(coordstime[i], coordstime[i+1], {unit: 'mph'});
					}

					resp.json({
						'getDistance': len,
						'getPathLength': (coords.length < 2) ? 0 : geolib.getPathLength(coords),
						'getAvgSpeed': Math.round(spd / (coordstime.length - 1))
					});
				});
			}
		});
	}
	else
	{
		resp.json({ 'error': err });
	}
});


module.exports = router;