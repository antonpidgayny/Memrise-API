declare var require: any;
import Slave from './Slave';
import * as iconv from 'iconv-lite';
var DomParser = require('dom-parser');

class Course {
	
	private name: string;

	private id: string;	

	constructor(Name: string, Id: string) {
		this.name=Name;
		this.id=Id;
	}

	public setName(Name: string): void {this.name=Name}

	public getName(): string {return this.name}

	public setID(Id: string): void {this.id=Id}

	public getID(): string {return this.id}
	
	public getLessonByID(ID: number , callback): void{
	}

	public getCourse(callback): void{
	};
}

export default new Course("","");


 
