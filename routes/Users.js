const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
users.use(cors());

process.env.SECRET_KEY = 'secret';

//Register
users.post('/register', (req, res) => {
	const today = new Date();
	const userData = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		created: today
	};
	User.findOne({
		where: {
			email: req.body.email
		}
	})
		.then(user => {
			if (!user) {
				const hash = bcrypt.hashSync(userData.password, 10);
				userData.password = hash;
				User.create(userData)
					.then(user => {
						let token = jwt.sign(user.dataValues, process.env.SECRET_KEY);
						res.status(200).json({ token });
					})
					.catch(err => {
						res.send(`Error: ${err}`);
					});
			} else {
				res.json({ error: 'User already exists' });
			}
		})
		.catch(err => res.send(`Error: ${err}`));
});

//Login
users.post('/signin', (req, res) => {
	User.findOne({
		where: {
			email: req.body.email
		}
	})
		.then(user => {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				let token = jwt.sign(user.dataValues, process.env.SECRET_KEY);
				res.status(200).json({ token });
			} else {
				res.send('User or password does not match');
			}
		})
		.catch(err => res.send(`Error: ${err}`));
});

//Profile
users.get('/profile', verifyToken, (req, res) => {
	User.findOne({
		where: {
			id: req.userId
		}
	})
		.then(user => {
			if (user) res.status(200).json(user);
			else res.send('User does not exist');
		})
		.catch(err => res.send(`Error: ${err}`));
});

function verifyToken(req, res, next) {
	//Si tiene habilitado el token
	if (
		!req.headers.authorization ||
		req.body.token ||
		req.query.token ||
		req.headers['x-access-token']
	) {
		return res.status(401).send('Token Authorization doesnt exist');
	}
	//Si el token no es null
	const token =
		req.headers.authorization.split(' ')[1] ||
		req.body.token ||
		req.query.token ||
		req.headers['x-access-token'];
	if (!token) {
		return res.status(401).send('Null token');
	}

	const decoded = jwt.verify(token, process.env.SECRET_KEY);
	req.userId = decoded.id;
	next();
}

module.exports = users;
