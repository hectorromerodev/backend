const Sequelize = require('sequelize');

const db = require('../src/database');

//Define my model with sequelize structure
const Product = db.sequelize.define('product', {
	//Atributes or fields
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},

	title: Sequelize.STRING,
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	imageUrl: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Product;
