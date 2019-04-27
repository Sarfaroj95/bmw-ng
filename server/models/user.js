const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username : {
		type: String,
		min: [4, 'Too short, short 4 character'],
		max: [32, 'To long, Max is 32 character ']
	},

	email : {
		type: String,
		min: [4, 'Too short, short 4 character'],
		max: [32, 'To long, Max is 32 character '],
		unique: true,
		lowercase: true,
		require: 'Email is require',
		match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/]
	},

	password: {
		type: String,
		min: [4, 'Too short, short 4 character'],
		max: [32, 'To long, Max is 32 character '],
		require: 'password is required'
	},

	rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}],
	bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}]
});

	userSchema.methods.hasSamePasswrod = function(requestedPassword) {
		return bcrypt.compareSync(requestedPassword, this.password);
	}



	userSchema.pre('save', function(next){
		const user = this;

		bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(user.password, salt, function(err, hash) {
        	user.password = hash;
        	next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);