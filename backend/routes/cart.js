const express = require('express');
const User = require('../models/user');
const Course = require('../models/course');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get Cart Items
router.get('/', authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).populate('cart');
		if (!user) {
			return res.status(404).json({ statusCode: 404, msg: 'User not found' });
		}

		// Get full course details for cart items
		const cartCourses = await Course.find({ _id: { $in: user.cart } });

		res.status(200).json({
			statusCode: 200,
			msg: 'Cart retrieved successfully',
			courses: cartCourses,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Add Course to Cart
router.post('/add', authenticateToken, async (req, res) => {
	try {
		const { courseId } = req.body;

		if (!courseId) {
			return res.status(400).json({ statusCode: 400, msg: 'Course ID is required' });
		}

		// Check if course exists
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({ statusCode: 404, msg: 'Course not found' });
		}

		// Check if user already has the course in cart or enrolled
		const user = await User.findById(req.user.userId);
		if (user.cart.includes(courseId)) {
			return res.status(400).json({ statusCode: 400, msg: 'Course already in cart' });
		}

		if (user.enrolledCourses.includes(courseId)) {
			return res.status(400).json({ statusCode: 400, msg: 'Course already enrolled' });
		}

		// Add course to cart
		await User.updateOne({ _id: req.user.userId }, { $addToSet: { cart: courseId }, updatedOn: new Date() });

		res.status(200).json({
			statusCode: 200,
			msg: 'Course added to cart successfully',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Remove Course from Cart
router.delete('/remove/:courseId', authenticateToken, async (req, res) => {
	try {
		const { courseId } = req.params;

		if (!courseId) {
			return res.status(400).json({ statusCode: 400, msg: 'Course ID is required' });
		}

		// Remove course from cart
		await User.updateOne({ _id: req.user.userId }, { $pull: { cart: courseId }, updatedOn: new Date() });

		res.status(200).json({
			statusCode: 200,
			msg: 'Course removed from cart successfully',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Purchase Cart Items
router.post('/purchase', authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId);
		if (!user) {
			return res.status(404).json({ statusCode: 404, msg: 'User not found' });
		}

		if (user.cart.length === 0) {
			return res.status(400).json({ statusCode: 400, msg: 'Cart is empty' });
		}

		// Calculate total cost
		const cartCourses = await Course.find({ _id: { $in: user.cart } });
		const totalCost = cartCourses.reduce((sum, course) => sum + course.courseDiscountedPrice, 0);

		// Check if user has enough balance
		if (user.currentBalance < totalCost) {
			return res.status(400).json({ statusCode: 400, msg: 'Insufficient balance' });
		}

		// Update user: deduct balance, move cart to enrolled courses, clear cart
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

module.exports = router;
