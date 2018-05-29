declare var require: any;
import * as iconv from 'iconv-lite';
var DomParser = require('dom-parser');

class User{
	
	private user_name: string;

	constructor(user: string) {
		this.user_name = user;
	}

	public setUserName(user: string) {
		this.user_name = user;
	}

	public getInfo(callback): void{
	}
}

export default new User("");