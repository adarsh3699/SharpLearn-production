const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	userName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	emailVerified: { type: Boolean, default: false },
	profileImg: { type: String, default: '' },
	referralCount: { type: Number, default: 0 },
	referralDetails: { type: Array, default: [] },
	enrolledCourses: { type: Array, default: [] },
	cart: { type: Array, default: [] },
	currentBalance: { type: Number, default: 10000 },
	createdOn: { type: Date, default: Date.now },
	updatedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
