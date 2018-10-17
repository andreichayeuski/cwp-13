module.exports = (Sequelize, sequelize) => {
	return sequelize.define('fleets', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		}
	});
};