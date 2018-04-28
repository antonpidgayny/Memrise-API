import { Schema, model } from 'mongoose';

let ApiBanListSchema = new Schema({
	BanDate: Date,
	email : {type: String, unique : true},
	banReason : String,
	unbanReason : String,
	admin : String,
	active : Boolean,
	unbanDate : Date
});

export default model('ApiBanList', ApiBanListSchema);