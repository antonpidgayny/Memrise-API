import { Schema, model } from 'mongoose';

let ApiAdminListSchema = new Schema({
	dateOfAppointment: Date,
	email_fk : String,
	position : String,
	master : String,
	active : Boolean,
	firedDate : Date,
	firedReason : String
});

export default model('ApiAdminList', ApiAdminListSchema);