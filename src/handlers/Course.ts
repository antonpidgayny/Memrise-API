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
		let url = "https://www.memrise.com/course/" + this.id +'/'+ this.name +'/'+ ID +'/';
		Slave.webPageToStr(url, (err, html) => {	
			let parser = new DomParser();	
			let dom = parser.parseFromString(html);
			let things = dom.getElementsByClassName("thing text-text");
			let words = [];
			things.forEach(function(item,i,arr){
				words.push(
				{	
					word: item.getElementsByClassName("col_a col text")[0].textContent,
					translation: item.getElementsByClassName("col_b col text")[0].textContent
				})
			});
			return callback(null, words);
		})
	}

	public getCourse(callback): void{
		let parser = new DomParser();	
		Slave.webPageToStr("https://www.memrise.com/course/" + this.id +'/'+ this.name +'/', (err, html) => {
			let dom = parser.parseFromString(html);	
			let lessons = dom.getElementsByClassName('level-index');
			let num_lessons = lessons.length;
			let course = [];
			for (let i = 1; i <= num_lessons; i++) {
				this.getLessonByID(i , (err, words) => {
					course.push({lesson_id: i, words: words});
					if (course.length === num_lessons) {
						course.sort((a,b) => {
							if (a.lesson_id > b.lesson_id) {return 1}
							if (a.lesson_id < b.lesson_id) {return -1}
							return 0;	
						});
						return callback(null, course);
					}
				})
			}
		});
	};
}

export default new Course("","");


 
