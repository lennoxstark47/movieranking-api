const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	rating: [
		{ type: Number, required: true, max: 5 },
	],

	userId: [
		{
			type: String,
		},
	],
});

const Movie = mongoose.model(
	'Movie',
	movieSchema
);
module.exports = Movie;
