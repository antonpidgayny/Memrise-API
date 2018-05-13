import { Schema, model } from 'mongoose';

let ApiBannedUsersListSchema = new Schema({
	banDate: Date,
	email_fk : String,
	banReason : String,
	unbanReason : String,
	admin : String,
	active : Boolean,
	unbanDate : Date
});

export default model('ApiBannedUsersList', ApiBannedUsersListSchema);