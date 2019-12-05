const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize('ferreteriadb', 'root', 'Nutela123', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// URL sequelize start --> https://sequelize.org/v5/manual/getting-started.html
