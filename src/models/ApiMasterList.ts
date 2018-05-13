import { Schema, model } from 'mongoose';

let ApiMasterListSchema = new Schema({
	dateOfAppointment: Date,
	email_fk : String,
	position : String,
	master : String,
	active : Boolean,
	firedDate : Date,
	firedReason : String,
	absoluteHokageMaster : Boolean
});

export default model('ApiMasterList', ApiMasterListSchema);