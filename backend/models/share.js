const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	id: { type: String },
	referralCount: { type: Number, required: true },
	userId: { type: String, required: true },
	referralDetails: { type: Array, required: false },
	createdOn: { type: Date, required: true },
});

module.exports = mongoose.model('Share', userSchema);
