const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
	title: { type: String, requied: true, max:[50, 'Too long, Max character']},
	city: { type: String, requied: true, max:[50, 'Too long, Max character']},
	street: { type: String, requied: true, min:[4, 'Too short, min is 4 character']},
	category: { type: String, requied: true, lowercase: true},
	image: { type: String, requied: true},
	bedrooms: Number,
	shared: Boolean,
	description: { type: String, requied: true},
	deilyRate: Number,
	createdAt: { type: Date, default: Date.now },
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}]
});

module.exports = mongoose.model('Rental', rentalSchema );