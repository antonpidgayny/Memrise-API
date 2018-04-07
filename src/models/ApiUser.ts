import { Schema, model } from 'mongoose';

let ApiUserSchema = new Schema({
	signUpDate: Date,
	email : {type: String, unique : true},
	project : {type: String},
	api_key : {type: String, unique : true},
});

export default model('ApiUser', ApiUserSchema);