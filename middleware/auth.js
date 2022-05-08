const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
	const token =
		req.body.token ||
		req.query.token ||
		req.headers['x-access-token'];

	if (!token) {
		return res
			.status(401)
			.json({
				error: 'No token, authorization denied',
			});
	}

	try {
		const decoded = await jwt.verify(
			token,
			'secretkey'
		);
		req.user = decoded;
	} catch (err) {
		return res
			.status(401)
			.json({ error: 'Token is not valid' });
	}
	return next();
};

module.exports = verifyToken;
