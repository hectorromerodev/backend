const Sequelize = require('sequelize');
const db = require('../src/database');

module.exports = db.sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.TEXT
	},
	password: {
		type: Sequelize.TEXT
	},
	created: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});
