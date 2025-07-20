const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Share = require('../models/share');
const { JWT_SECRET } = require('../config/config');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
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
			createdOn: new Date(),
			updatedOn: new Date(),
		});

		// Generate JWT token
		const token = jwt.sign({ userId: savedUser._id, email: savedUser.email }, JWT_SECRET, { expiresIn: '7d' });

		res.status(200).json({
			statusCode: 200,
			msg: 'User registered successfully',
			token,
			user: {
				userId: savedUser._id,
				userName: savedUser.userName,
				email: savedUser.email,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Login User
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ statusCode: 400, msg: 'Email and password are required' });
		}

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ statusCode: 400, msg: 'Invalid credentials' });
		}

		// Verify password
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
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

// Forgot Password
router.post('/forgot-password', async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ statusCode: 400, msg: 'Email is required' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ statusCode: 404, msg: 'User not found' });
		}

		// In a real app, you would send an email with reset link
		// For now, just return success message
		res.status(200).json({
			statusCode: 200,
			msg: 'Password reset instructions sent to your email',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Verify Token
router.get('/verify-token', authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select('-password');
		if (!user) {
			return res.status(404).json({ statusCode: 404, msg: 'User not found' });
		}

		res.status(200).json({
			statusCode: 200,
			msg: 'Token is valid',
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

module.exports = router;
