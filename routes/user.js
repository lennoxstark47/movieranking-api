const router = require('express').Router();
const User = require('../models/User');
const Movie = require('../models/Movies');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');

router.post('/register', (req, res) => {
	const { name, email, password, age } = req.body;
	const newUser = new User({
		name,
		email,
		password: bcrypt.hashSync(password, 10),
		age,
	});

	newUser
		.save()
		.then((user) => {
			res.json({ user });
		})
		.catch((err) =>
			res.status(400).json({ error: err })
		);
});

//loging in
router.post('/login', (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email })
		.then((user) => {
			if (!user) {
				return res
					.status(400)
					.json({ error: 'User does not exist' });
			}
			if (
				user &&
				bcrypt.compareSync(
					password,
					user.password
				)
			) {
				const token = jwt.sign(
					{ userId: user._id, email: user.email },
					'secretkey',
					{ expiresIn: '1h' }
				);
				user.token = token;
				return res.json({ user });
			}
			return res
				.status(400)
				.json({ error: 'Wrong password' });
		})
		.catch((err) =>
			res.status(400).json({ error: err })
		);
});

//getting his fav movies
router.get('/:id/getmovies', (req, res) => {
	const { id } = req.params;
	Movie.find({ userId: id })
		.then((data) => {
			let list = [];
			for (let i = 0; i < data.length; i++) {
				list.push(data[i].title);
			}
			res.send(`your fav movies are: ${list}`);
		})
		.catch((err) => {
			res.status(400).json({ error: err });
		});
});

router.get(
	'/welcome',
	verifyToken,
	(req, res) => {
		res.send('welcome');
	}
);

module.exports = router;
