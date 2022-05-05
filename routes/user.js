const router = require('express').Router();
const User = require('../models/User');
const Movie = require('../models/Movies');

//creating a user
router.post('/register', (req, res) => {
	const { name, age } = req.body;
	const newUser = new User({ name, age });
	newUser
		.save()
		.then((data) => res.json({ data }))
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

module.exports = router;
