const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import configuration and database
const { PORT, CORS_ORIGINS } = require('./config/config');
const { connectDB } = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');
const userRoutes = require('./routes/user');
const referralRoutes = require('./routes/referral');

const app = express();

// CORS Configuration
app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true);
			if (CORS_ORIGINS.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
	})
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/cart', cartRoutes);
app.use('/user', userRoutes);
app.use('/', referralRoutes); // Legacy routes at root level

// Special route mappings for backward compatibility
const Course = require('./models/course');

app.get('/courses-limited', async (req, res) => {
	try {
		const limit = parseInt(req.query.limit) || 7;
		const courses = await Course.find({ isActive: true }).sort({ updatedOn: -1 }).limit(limit);

		res.status(200).json({
			statusCode: 200,
			msg: 'Limited courses retrieved successfully',
			courses,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

app.get('/courses-other/:excludeId', async (req, res) => {
	try {
		const limit = parseInt(req.query.limit) || 5;
		const courses = await Course.find({
			isActive: true,
			_id: { $ne: req.params.excludeId },
		})
			.sort({ updatedOn: -1 })
			.limit(limit);

		res.status(200).json({
			statusCode: 200,
			msg: 'Other courses retrieved successfully',
			courses,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Health check route
app.get('/', (req, res) => {
	res.status(200).json({
		statusCode: 200,
		msg: 'SharpLearn Backend - MongoDB Only',
		timestamp: new Date().toISOString(),
		endpoints: {
			auth: '/auth/*',
			courses: '/courses/*',
			cart: '/cart/*',
			user: '/user/*',
			referral: '/set_share, /referral, /get_all',
		},
	});
});

// Error handling middleware
app.use((error, req, res, next) => {
	console.error('Server Error:', error);
	res.status(500).json({
		statusCode: 500,
		msg: 'Internal server error',
		error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message,
	});
});

// 404 handler
app.use('*', (req, res) => {
	res.status(404).json({
		statusCode: 404,
		msg: 'Route not found',
		requestedPath: req.originalUrl,
	});
});

// Start server
const startServer = async () => {
	try {
		// Connect to database
		await connectDB();

		// Start listening
		app.listen(PORT, () => {
			console.log(`🚀 Server is running at port ${PORT}`);
			console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
			console.log(`📊 Database: Connected to MongoDB`);
			console.log(`🔗 Health Check: http://localhost:${PORT}/`);
		});
	} catch (error) {
		console.error('Failed to start server:', error);
		process.exit(1);
	}
};

startServer();
