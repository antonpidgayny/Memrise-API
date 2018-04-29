import { Schema, model } from 'mongoose';

let ApiUsersListSchema = new Schema({
	signUpDate: Date,
	email : {type: String, unique : true},
	project : {type: String},
});

export default model('ApiUsersList', ApiUsersListSchema);