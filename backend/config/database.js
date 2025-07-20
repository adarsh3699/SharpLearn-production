const mongoose = require('mongoose');

// Hardcoded configuration (no env variables)
// Note: Special characters in password are URL-encoded (&3699 -> %263699)
const MONGO_URI = 'mongodb+srv://adarsh3699:adarsh%263699@other-cluster.2ssscyq.mongodb.net/sharplearn';

const connectDB = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(MONGO_URI);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1);
	}
};

module.exports = { connectDB };
