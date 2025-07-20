const express = require('express');
const User = require('../models/user');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get User Profile
router.get('/profile', authenticateToken, async (req, res) => {
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

// Update User Profile
router.put('/profile', authenticateToken, async (req, res) => {
	try {
		const { userName, profileImg } = req.body;
		const updateData = { updatedOn: new Date() };

		if (userName) updateData.userName = userName;
		if (profileImg) updateData.profileImg = profileImg;

		const user = await User.findByIdAndUpdate(req.user.userId, updateData, { new: true }).select('-password');

		if (!user) {
			return res.status(404).json({ statusCode: 404, msg: 'User not found' });
		}

		res.status(200).json({
			statusCode: 200,
			msg: 'Profile updated successfully',
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

// Get Enrolled Courses
router.get('/enrolled', authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).populate('enrolledCourses');
		if (!user) {
			return res.status(404).json({ statusCode: 404, msg: 'User not found' });
		}

		res.status(200).json({
			statusCode: 200,
			msg: 'Enrolled courses retrieved successfully',
			courses: user.enrolledCourses,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

module.exports = router;
