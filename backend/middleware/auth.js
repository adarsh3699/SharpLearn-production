const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ statusCode: 401, msg: 'Access token required' });
	}

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ statusCode: 403, msg: 'Invalid token' });
		}
		req.user = user;
		next();
	});
};

module.exports = { authenticateToken };
