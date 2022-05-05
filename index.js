// create a simple express server
const express = require('express');
require('dotenv').config();
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');

// const db = process.env.MONGO_URI;
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

//use cors
app.use(cors());
//use express.json
app.use(express.json());
//use express.urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRouter);
app.use('/api', movieRouter);

//connect db
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log(err));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

//start server
app.listen(port, () =>
	console.log(`Server started on port ${port}`)
);
