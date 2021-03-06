module.exports = (Sequelize, config) => {
	const sequelize = new Sequelize(config.db, config.login, config.password,
		{
			dialect: config.dialect,
			host: config.host,
			port: config.port,
			options: {
				instanceName: config.dialectOptions.instanceName
			},
			define: {
				timestamps: true,
				paranoid: true
			},
		});

	const Fleet = require('../models/fleets')(Sequelize, sequelize);
	const Motion = require('../models/motions')(Sequelize, sequelize);
	const Vehicle = require('../models/vehicles')(Sequelize, sequelize);

	Motion.hasMany(Vehicle, {foreignKey: 'vehicleId'});
	console.log("1111111111111111111111");

	Vehicle.hasMany(Fleet, {foreignKey: 'fleetId'});

	return {
		Fleet, Motion, Vehicle,
		sequelize: sequelize,
		Sequelize: Sequelize,
	};
};