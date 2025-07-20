const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const User = require('./models/user');
const Course = require('./models/course');
const Share = require('./models/share');

const app = express();

// Hardcoded configuration (no env variables)
const JWT_SECRET = 'sharplearn_jwt_secret_key_2024';
const MONGO_URI = 'mongodb+srv://adarsh3699:adarsh&3699@other-cluster.2ssscyq.mongodb.net/sharplearn';

const allowlist = ['http://localhost:3000', 'http://localhost:3001', 'https://www.sharplearn.tech'];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true);
			if (allowlist.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
	})
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// ========================
// AUTHENTICATION ROUTES
// ========================

// Register User
app.post('/auth/register', async (req, res) => {
	try {
		const { userName, email, password, referralCode } = req.body;

		if (!userName || !email || !password) {
			return res.status(400).json({ statusCode: 400, msg: 'All fields are required' });
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ statusCode: 400, msg: 'User already exists' });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user
		const newUser = new User({
			userName,
			email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();

		// Handle referral if provided
		if (referralCode) {
			await User.updateOne(
				{ _id: referralCode },
				{
					$inc: { referralCount: 1 },
					$push: { referralDetails: { userName, email, userId: savedUser._id } },
				}
			);
		}

		// Create share record for new user
		await Share.create({
			userId: savedUser._id.toString(),
			referralCount: 0,
			createdOn: new Date(Date.now()),
			updatedOn: new Date(Date.now()),
		});

		// Generate JWT token
		const token = jwt.sign({ userId: savedUser._id, email: savedUser.email }, JWT_SECRET, { expiresIn: '7d' });

		res.status(201).json({
			statusCode: 201,
			msg: 'User registered successfully',
			token,
			user: {
				userId: savedUser._id,
				userName: savedUser.userName,
				email: savedUser.email,
				profileImg: savedUser.profileImg,
				currentBalance: savedUser.currentBalance,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Login User
app.post('/auth/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ statusCode: 400, msg: 'Email and password are required' });
		}

		// Find user
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ statusCode: 400, msg: 'Invalid credentials' });
		}

		// Verify password
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return res.status(400).json({ statusCode: 400, msg: 'Invalid credentials' });
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

		res.status(200).json({
			statusCode: 200,
			msg: 'Login successful',
			token,
			user: {
				userId: user._id,
				userName: user.userName,
				email: user.email,
				profileImg: user.profileImg,
				currentBalance: user.currentBalance,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Reset Password (simplified - just update password)
app.post('/auth/reset-password', async (req, res) => {
	try {
		const { email, newPassword } = req.body;

		if (!email || !newPassword) {
			return res.status(400).json({ statusCode: 400, msg: 'Email and new password are required' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ statusCode: 400, msg: 'User not found' });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await User.updateOne({ email }, { password: hashedPassword, updatedOn: new Date() });

		res.status(200).json({ statusCode: 200, msg: 'Password reset successful' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Get User Profile
app.get('/auth/profile', authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select('-password');
		if (!user) {
			return res.status(404).json({ statusCode: 404, msg: 'User not found' });
		}

		res.status(200).json({
			statusCode: 200,
			msg: 'Profile retrieved successfully',
			user: {
				userId: user._id,
				userName: user.userName,
				email: user.email,
				profileImg: user.profileImg,
				currentBalance: user.currentBalance,
				enrolledCourses: user.enrolledCourses,
				cart: user.cart,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// ========================
// COURSE MANAGEMENT ROUTES
// ========================

// Get All Courses (with optional search)
app.get('/courses', async (req, res) => {
	try {
		const searchQuery = req.query.search;
		let query = { isActive: true };

		// If search query provided, add search conditions
		if (searchQuery) {
			const searchRegex = new RegExp(searchQuery, 'i'); // Case-insensitive search
			query.$or = [{ courseName: searchRegex }, { aboutCourse: searchRegex }, { courseType: searchRegex }];
		}

		const courses = await Course.find(query).sort({ updatedOn: -1 });
		res.status(200).json({
			statusCode: 200,
			msg: searchQuery
				? `Found ${courses.length} courses for "${searchQuery}"`
				: 'Courses retrieved successfully',
			courses,
			searchQuery: searchQuery || null,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Get Course by ID
app.get('/courses/:courseId', async (req, res) => {
	try {
		const course = await Course.findById(req.params.courseId);
		if (!course) {
			return res.status(404).json({ statusCode: 404, msg: 'Course not found' });
		}

		res.status(200).json({
			statusCode: 200,
			msg: 'Course retrieved successfully',
			course,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Get Limited Courses (for homepage)
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

// Get Other Courses (excluding specific course)
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

// ========================
// CART MANAGEMENT ROUTES
// ========================

// Add to Cart
app.post('/cart/add', authenticateToken, async (req, res) => {
	try {
		const { courseId } = req.body;

		if (!courseId) {
			return res.status(400).json({ statusCode: 400, msg: 'Course ID is required' });
		}

		const user = await User.findById(req.user.userId);
		if (!user) {
			return res.status(404).json({ statusCode: 404, msg: 'User not found' });
		}

		// Check if course already in cart
		if (user.cart.includes(courseId)) {
			return res.status(400).json({ statusCode: 400, msg: 'Course already in cart' });
		}

		// Check if course exists
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({ statusCode: 404, msg: 'Course not found' });
		}

		await User.updateOne({ _id: req.user.userId }, { $push: { cart: courseId }, updatedOn: new Date() });

		res.status(200).json({ statusCode: 200, msg: 'Course added to cart successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Remove from Cart
app.delete('/cart/remove/:courseId', authenticateToken, async (req, res) => {
	try {
		await User.updateOne({ _id: req.user.userId }, { $pull: { cart: req.params.courseId }, updatedOn: new Date() });

		res.status(200).json({ statusCode: 200, msg: 'Course removed from cart successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Get Cart Items
app.get('/cart', authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId);
		if (!user) {
			return res.status(404).json({ statusCode: 404, msg: 'User not found' });
		}

		const cartCourses = await Course.find({ _id: { $in: user.cart }, isActive: true }).sort({ updatedOn: -1 });

		res.status(200).json({
			statusCode: 200,
			msg: 'Cart items retrieved successfully',
			courses: cartCourses,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Purchase Courses
app.post('/cart/purchase', authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId);
		if (!user) {
			return res.status(404).json({ statusCode: 404, msg: 'User not found' });
		}

		if (user.cart.length === 0) {
			return res.status(400).json({ statusCode: 400, msg: 'Cart is empty' });
		}

		// Get cart courses and calculate total
		const cartCourses = await Course.find({ _id: { $in: user.cart }, isActive: true });
		const totalCost = cartCourses.reduce((sum, course) => sum + course.courseDiscountedPrice, 0);

		if (user.currentBalance < totalCost) {
			return res.status(400).json({ statusCode: 400, msg: 'Insufficient balance' });
		}

		// Update user: deduct balance, move cart to enrolled, clear cart
		await User.updateOne(
			{ _id: req.user.userId },
			{
				$inc: { currentBalance: -totalCost },
				$push: { enrolledCourses: { $each: user.cart } },
				$set: { cart: [] },
				updatedOn: new Date(),
			}
		);

		res.status(200).json({
			statusCode: 200,
			msg: 'Purchase successful',
			totalCost,
			newBalance: user.currentBalance - totalCost,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// ========================
// EXISTING SHARE ROUTES (keep as is)
// ========================

app.get('/set_share', async (req, res) => {
	try {
		const userId = req.query.id;
		if (!userId) return res.status(400).json({ statusCode: 400, msg: 'userId is required' });

		const queryResp = await Share.create({
			userId: userId,
			referralCount: 0,
			createdOn: new Date(Date.now()),
			updatedOn: new Date(Date.now()),
		});

		res.status(200).json({ statusCode: 200, msg: 'Inserted successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

app.post('/referral', async (req, res) => {
	try {
		const referralDetails = req.body.referralDetails;
		const userId = req.query.id;
		if (!referralDetails) return res.status(400).json({ statusCode: 400, msg: 'referralDetails is required' });
		if (!userId) return res.status(400).json({ statusCode: 400, msg: 'userId is required' });

		const queryResp = await Share.updateOne(
			{ userId: userId },
			{ $inc: { referralCount: 1 }, $push: { referralDetails } }
		);
		res.status(200).json({ statusCode: 200, msg: 'Updated successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

app.get('/get_all', async (req, res) => {
	try {
		const userId = req.query.id;
		if (!userId) return res.status(400).json({ statusCode: 400, msg: 'userId is required' });

		const queryResp = await Share.findOne({ userId: userId });
		res.status(200).json({ statusCode: 200, msg: 'Updated successfully', data: queryResp });
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// ========================
// SERVER INITIALIZATION
// ========================

const PORT = 4000;

app.get('/', function (req, res) {
	res.send('SharpLearn Backend - MongoDB Only');
});

mongoose.set('strictQuery', false);
mongoose
	.connect(MONGO_URI)
	.then(() =>
		app.listen(PORT, () => {
			console.log(`Server is running at port ${PORT}`);
		})
	)
	.catch((err) => {
		console.log(err);
	});
