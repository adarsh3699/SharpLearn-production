const express = require('express');
const Share = require('../models/share');

const router = express.Router();

// Set Share Record (Legacy route)
router.get('/set_share', async (req, res) => {
	try {
		const userId = req.query.id;
		if (!userId) {
			return res.status(400).json({ statusCode: 400, msg: 'userId is required' });
		}

		await Share.create({
			userId: userId,
			referralCount: 0,
			createdOn: new Date(),
			updatedOn: new Date(),
		});

		res.status(200).json({ statusCode: 200, msg: 'Inserted successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Add Referral
router.post('/referral', async (req, res) => {
	try {
		const referralDetails = req.body.referralDetails;
		const userId = req.query.id;

		if (!referralDetails) {
			return res.status(400).json({ statusCode: 400, msg: 'referralDetails is required' });
		}
		if (!userId) {
			return res.status(400).json({ statusCode: 400, msg: 'userId is required' });
		}

		await Share.updateOne(
			{ userId: userId },
			{
				$inc: { referralCount: 1 },
				$push: { referralDetails },
				updatedOn: new Date(),
			}
		);

		res.status(200).json({ statusCode: 200, msg: 'Updated successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

// Get All Referral Data
router.get('/get_all', async (req, res) => {
	try {
		const userId = req.query.id;
		if (!userId) {
			return res.status(400).json({ statusCode: 400, msg: 'userId is required' });
		}

		const queryResp = await Share.findOne({ userId: userId });
		res.status(200).json({
			statusCode: 200,
			msg: 'Retrieved successfully',
			data: queryResp,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ statusCode: 500, msg: error.message });
	}
});

module.exports = router;
