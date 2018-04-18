declare var require: any;
import Slave from './Slave';
import * as iconv from 'iconv-lite';
var DomParser = require('dom-parser');

class Course {
	
	private Url: string	

	constructor() {
	
	}

	public setURL(url: string): void {this.Url=url}

	public getURL(): string {return this.Url}
	
	public getLessonByID(id: number , callback): void{
		let url = this.Url + id + '/';
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
		Slave.webPageToStr(this.Url, (err, html) => {
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

export default new Course();


 