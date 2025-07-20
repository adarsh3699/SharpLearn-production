const mongoose = require('mongoose');

// Hardcoded configuration (no env variables)
const MONGO_URI = 'mongodb+srv://adarsh3699:adarsh&3699@other-cluster.2ssscyq.mongodb.net/sharplearn';

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
