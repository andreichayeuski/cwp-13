module.exports = (Sequelize, sequelize) => {
	return sequelize.define('motions', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		latitude: {
			type: Sequelize.DOUBLE,
			allowNull: false
		},
		longitude: {
			type: Sequelize.DOUBLE,
			allowNull: false
		},
		time: {
			type: Sequelize.DATE,
			allowNull: false
		},
		vehicles: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	},
		{
			getterMethods: {
				latitudeLangitude() {
					return {
						latitude: this.latitude,
						longitude: this.longitude
					}
				},
				latitudeLangitudeTime() {
					return {
						lat: this.latitude,
						lng: this.longitude,
						time: this.time
					}
				}
			}
		});
};