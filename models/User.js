const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		max: 10,
	},
	// list: {
	// 	type: Array,
	// 	default: [],
	// },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
