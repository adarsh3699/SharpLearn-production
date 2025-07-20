const express = require('express');
const Course = require('../models/course');

const router = express.Router();

// Get All Courses (with optional search)
router.get('/', async (req, res) => {
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
router.get('/:courseId', async (req, res) => {
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

// Get Limited Courses (for homepage) - mapped from /courses-limited
router.get('/limited', async (req, res) => {
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

// Get Other Courses (excluding specific course) - mapped from /courses-other/:id
router.get('/other/:excludeId', async (req, res) => {
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

module.exports = router;
