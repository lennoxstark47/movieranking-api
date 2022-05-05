const router = require('express').Router();
const User = require('../models/User');

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

module.exports = router;
