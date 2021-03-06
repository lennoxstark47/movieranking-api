const router = require('express').Router();
const User = require('../models/User');
const Movie = require('../models/Movies');

//creating a movie

router.post(
	'/:id/createmovie',
	async (req, res) => {
		const { title, rating } = req.body;
		const userId = req.params.id;
		try {
			let currentMovie = await Movie.findOne({
				title,
			});
			if (currentMovie == null) {
				const newMovie = new Movie({
					title,
					rating,
					userId,
				});
				newMovie
					.save()
					.then((data) => res.json({ data }))
					.catch((err) => {
						res.status(400).json({ error: err });
					});
			} else {
				if (currentMovie.title.includes(title)) {
					if (
						currentMovie.userId.includes(userId)
					) {
						return res
							.status(400)
							.send(
								'Movie already exists in your fav list'
							);
					}
					currentMovie.userId.push(userId);
					currentMovie.rating.push(rating);
					await currentMovie.save();
					return res.json({
						'Movie already exists, so we are adding it to your list':
							currentMovie,
					});
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
);

router.get('/getmovie', (req, res) => {
	const { title } = req.body;
	Movie.find({ title })
		.then((data) => res.json(data[0].title))
		.catch((err) => {
			res.status(400).json({ error: err });
		});
});

//fetching avg rating
router.post('/avgrating', (req, res) => {
	const { title } = req.body;
	Movie.find({ title })
		.then((data) => {
			let ratings = data[0].rating;
			let sum = 0;
			for (let i = 0; i < ratings.length; i++) {
				sum += ratings[i];
			}
			let avg = sum / ratings.length;
			res.send(
				`The average rating for ${title} is ${avg.toPrecision(
					2
				)}`
			);
		})
		.catch((err) => {
			res.status(400).json({ error: err });
		});
});

//updating a movie rating
router.post(
	'/:id/updatemovie',
	async (req, res) => {
		const { title, rating } = req.body;
		const userId = req.params.id;
		try {
			const searchedMovie = await Movie.findOne({
				title,
			});
			if (searchedMovie == null) {
				return res
					.status(400)
					.json({ error: 'Movie not found' });
			} else {
				if (
					searchedMovie.userId.includes(userId)
				) {
					tempMovie = searchedMovie;
					tempMovie.rating.pop();
					tempMovie.rating.push(rating);
					tempMovie
						.save()
						.then((data) => res.json({ data }))
						.catch((err) => {
							res
								.status(400)
								.json({ error: err });
						});
				}
				return res.status(400).json({
					error:
						'You do not have permission to update this movie',
				});
			}
			// res.json(searchedMovie);
		} catch (err) {
			res.status(400).json({ error: err });
		}
	}
);

module.exports = router;
