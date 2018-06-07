declare var require: any;
import Requester from './Requester';
import * as iconv from 'iconv-lite';
var DomParser = require('dom-parser');

class Course {
	
	private name: string;

	private id: string;	

	constructor(Name: string, Id: string) {
		this.name=Name;
		this.id=Id;
	}

	public setName(Name: string): void {this.name=Name};

	public getName(): string {return this.name};

	public setID(Id: string): void {this.id=Id};

	public getID(): string {return this.id};
	
	public async getLessonByID(ID: number){
		let url = "https://www.memrise.com/course/" + this.id +'/'+ this.name +'/'+ ID +'/';
		let str = await Requester.getMemriseRequest(url,"","");
		str = str.body;
		let parser = new DomParser();	
		let dom = parser.parseFromString(str);
		let things = dom.getElementsByClassName("thing text-text");
		let words = [];
		things.forEach(function(item,i,arr){
			words.push(
			{	
				word: item.getElementsByClassName("col_a col text")[0].textContent,
				translation: item.getElementsByClassName("col_b col text")[0].textContent
			})
		});
		return words;
	};

	public async getCourse(){
		let parser = new DomParser();	
		let url="https://www.memrise.com/course/" + this.id +'/'+ this.name +'/';
		let html = await Requester.getMemriseRequest(url,"","");
		html = html.body;
		let dom = parser.parseFromString(html);	
		let lessons = dom.getElementsByClassName('level-index');
		let num_lessons = lessons.length;
		let course = [];
			for (let i = 1; i <= num_lessons; i++) {
				let words = await this.getLessonByID(i);
				course.push({lesson_id: i, words: words});
				if (course.length === num_lessons) {
					course.sort((a,b) => {
						if (a.lesson_id > b.lesson_id) {return 1}
						if (a.lesson_id < b.lesson_id) {return -1}
						return 0;	
					});
					
					return course;
				}
			}
	};

	public async getLessonByID_auth(ID: number,cookies_str: string){
		let url = "https://www.memrise.com/course/" + this.id +'/'+ this.name +'/'+ ID +'/';
		let str = await Requester.getMemriseRequest(url,cookies_str,undefined);
		str = str.body;
		let parser = new DomParser();	
		let dom = parser.parseFromString(str);
		let things = dom.getElementsByClassName("thing text-text");
		let words = [];
		things.forEach(function(item){
			
			let thinguser = item.getElementsByClassName("thinguser")[0];
			let child = thinguser.firstChild;
			let progress = null;
			if (child.nodeName=="div") { 
				progress = child.firstChild.getAttribute("style").split(":")[1];
				words.push(
				{	
					word: item.getElementsByClassName("col_a col text")[0].textContent,
					translation: item.getElementsByClassName("col_b col text")[0].textContent,
					progress: progress
				})
			} else if (child.getAttribute("class")=="ico ico-water ico-blue"){
				progress = "100%";
				let TimeToRepeat = thinguser.lastChild.textContent;
				words.push(
				{	
					word: item.getElementsByClassName("col_a col text")[0].textContent,
					translation: item.getElementsByClassName("col_b col text")[0].textContent,
					progress: progress,
					TimeToRepeat: TimeToRepeat
				})
			} else {
				progress = "0%";
				words.push(
				{	
					word: item.getElementsByClassName("col_a col text")[0].textContent,
					translation: item.getElementsByClassName("col_b col text")[0].textContent,
					progress: progress
				})
			};

			
		});
		return words;
	};
	

	public async getCourse_auth(cookies_str: string,username){
		let parser = new DomParser();	
		let url="https://www.memrise.com/course/" + this.id +'/'+ this.name +'/';
		let html = await Requester.getMemriseRequest(url,cookies_str,undefined);
		html = html.body;
		let dom = parser.parseFromString(html);	
		let points;
		let leaderboard = await Requester.getMemriseRequest("https://www.memrise.com/ajax/leaderboard/course/1096816/?period=month&how_many=11",cookies_str,undefined);
		console.log(leaderboard);
		leaderboard.body.rows.forEach(function(item){
			if (item.username==username) {
				let mounth = item.position;
				points = item.points;
			}
		});

		leaderboard = await Requester.getMemriseRequest("https://www.memrise.com/ajax/leaderboard/course/1096816/?period=week&how_many=11",cookies_str,undefined);
		leaderboard.body.rows.forEach(function(item){
			if (item.username==username) {
				let week = item.position;
			}
		});

		leaderboard = await Requester.getMemriseRequest("https://www.memrise.com/ajax/leaderboard/course/1096816/?period=all&how_many=11",cookies_str,undefined);
		leaderboard.body.rows.forEach(function(item){
			if (item.username==username) {
				let week = item.position;
			}
		});

		let LeaderboardPosition{
			week: week,
			mounth: mounth,
			all: all
		}


		let progress_box = dom.getElementsByClassName('progress-box progress-box-course')[0];
		let CurentWordsCount = progress_box.textContent.split(" / ")[0].split(" ");
		CurentWordsCount.reverse();
		CurentWordsCount = CurentWordsCount[0].slice(1);
		let MaxWordsCount = progress_box.textContent.split(" / ")[1].split(" ")[0];
		let LongMemoryWordsCount = progress_box.textContent.split(" (")[1].split(" ")[0];
		let MissedWordsCount = progress_box.getElementsByTagName("span")[0].textContent.split(" ")[1].slice(1);
		
		let progress = {
			CurentWordsCount: CurentWordsCount,
			MaxWordsCount: MaxWordsCount,
			LongMemoryWordsCount: LongMemoryWordsCount,
			MissedWordsCount: MissedWordsCount,
			points: points,
			LeaderboardPosition: LeaderboardPosition
		}

		

		let lessons = dom.getElementsByClassName('level-index');
		let num_lessons = lessons.length;
		let course = [];
			for (let i = 1; i <= num_lessons; i++) {
				let words = await this.getLessonByID_auth(i,cookies_str);
				course.push({lesson_id: i, words: words});
				if (course.length === num_lessons) {
					course.sort((a,b) => {
						if (a.lesson_id > b.lesson_id) {return 1}
						if (a.lesson_id < b.lesson_id) {return -1}
						return 0;	
					});
					
					break;
				}
			}
			return {progress: progress, course: course};
	};
}

export default Course;


 
