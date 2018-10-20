const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db');

router.use(bodyParser.json());

router.get('/readall', (req, resp) => {
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
});

router.get('/read', (req, resp) => {
	db.Vehicle.findById(req.query.id).then((res) => {
		if ((!res) || (res.deletedAt !== null))
		{
			resp.statusCode = 404;
		}
		else
		{
			resp.json(res);
		}
	});
});

router.post('/create', (req, resp, next) => {
	req = req.body;
	if (!req.name) resp.json({'error': '\"name\" arg not found'});
	else if (!req.fleetId) resp.json({'error': '\"fleetId\" arg not found'});
	else db.Fleet.findById(req.fleetId).then((res) => {
			if ((!res) || (res.deletedAt !== null)) {
				resp.statusCode = 404;
				next();
			}
			else db.Vehicle.create({'name': req.name, 'fleetId': req.fleetId}).then((res) => {
				resp.json(res);
			});
		});
});

router.post('/update', (req, resp, next) => {
	req = req.body;
	if (!req.id) resp.json({'error': '\"id\" arg not found'});
	else if (!req.name) resp.json({'error': '\"name\" arg not found'});
	else if (!req.fleetId) resp.json({'error': '\"fleetId\" arg not found'});
	else db.Vehicle.update(
			{ name: req.name, fleetId: req.fleetId },
			{
				where: {
					id: req.id,
					deletedAt: null
				}
			}
		).then((res) => {
			if (res == 0) {
				resp.statusCode = 400;
				next();
			}
			else resp.json({ 'id': req.id, 'name': req.name, 'fleetId': req.fleetId });
		});
});

router.post('/delete', (req, resp, next) => {
	req = req.body;
	if (!req.id) resp.json({'error': '\"id\" arg not found'});
	else db.Vehicle.findById(req.id).then((res) => {
		if (!res) {
			resp.statusCode = 400;
			next();
		}
		else db.Fleet.destroy({
			where: {
				id: req.id,
				deletedAt: null
			}
		}).then(() => {
			resp.json(res);
		});
	});
});

router.get('/milage', (req, resp, next) => {
	if (!req.query.id) resp.json({'error': '\"id\" arg not found'});
	else db.Vehicle.findById(req.query.id).then((res) => {
		if ((!res) || (res.deletedAt !== null)) {
			resp.statusCode = 404;
			next();
		}
		else {
			let coords = [];
			let coordstime = [];
			db.Motion.findAll({
				where: {
					vehicleId: req.query.id
				}
			}).then((res) => {
				res.forEach((motion) => {
					coords.push(motion.latLng);
					coordstime.push(motion.latLngTime);
				});
			});
		}
	});
});


module.exports = router;