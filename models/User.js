import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6
	},
	login: {
		type: String,
		required: true,
		min: 5
	},
	email: {
		type: String,
		required: true,
		min: 6,
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		min: 6,
	},
	date: {
		type: Date,
		default: Date.now
	}
})

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel
