const Fleet = require('./fleets');
const Vehicle = require('./vehicles');
const Motion = require('./motions');

module.exports = (Sequelize, config) => {
	let sequelize = new Sequelize(config.db, config.login, config.password,
		{
			dialect: config.dialect,
			host: config.host,
			port: config.port,
			options: {
				instanceName: config.dialectOptions.instanceName
			},
			logging: false,
			define: config.define
		});


	sequelize.authenticate().then(() => {
		console.log('Success initialization');
	}).catch((err) => {
		console.log(`Error connect ${err}`);
	});

	const fleets = Fleet(Sequelize, sequelize);
	const vehicles = Vehicle(Sequelize, sequelize);
	const motions = Motion(Sequelize, sequelize);


	vehicles.belongsTo(fleets, {
		foreignKey: 'fleetId',
		as: 'fleet'
	});

	motions.belongsTo(vehicles, {
		foreignKey: 'vehicleId',
		as: 'vehicle'
	});


	return {
		fleets,
		vehicles,
		motions,

		sequelize: sequelize,
		Sequelize: Sequelize,
	};
};