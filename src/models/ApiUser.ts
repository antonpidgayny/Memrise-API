import { Schema, model } from 'mongoose';

let ApiUserSchema = new Schema({
	signUpDate: Date,
	email : {type: String, unique : true},
	project : {type: String},
	isAdmin : Boolean,
	isMaster : Boolean,
	isBanned : Boolean
});

export default model('ApiUser', ApiUserSchema);