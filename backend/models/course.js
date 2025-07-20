const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
	courseName: { type: String, required: true },
	aboutCourse: { type: String, required: true },
	courseThumbnail: { type: String, required: true },
	courseDiscountedPrice: { type: Number, required: true },
	courseORGPrice: { type: Number, required: true },
	courseType: { type: String, required: true },
	demoVideo: { type: String, default: '' },
	courseLink: { type: String, required: true },
	isActive: { type: Boolean, default: true },
	createdOn: { type: Date, default: Date.now },
	updatedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', courseSchema);
