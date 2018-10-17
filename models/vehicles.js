module.exports = (Sequelize, sequelize) => {
	return sequelize.define('vehicles', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		fleetId: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	});
};