declare var require: any;
import * as iconv from 'iconv-lite';
import Requester from './Requester';
var DomParser = require('dom-parser');

class User{
	
	private user_name: string;

	constructor(user: string) {
		this.user_name = user;
	}

	public setUserName(user: string) {
		this.user_name = user;
	}

	private async getContent(k){
		let url: string = "https://www.memrise.com/user/"+this.user_name+"/";
		if (k===0){url+="mempals/followers/"}
		else if (k===1) {url+="mempals/following/"}
		let html = await Requester.getMemriseRequest(url,"","");
		html = html.body;
		let parser = new DomParser();
		let dom = parser.parseFromString(html);
		let things = dom.getElementsByTagName("strong");
			let count: number = parseInt(things[k].textContent.split(",").join(''));
		let content=[];
		if (k===0 || k===1) {
			let nodes = dom.getElementsByClassName("username");
			nodes.forEach((item,i,arr)=>{
				content.push(item.textContent.slice(2,-2));
			})
		}
		return {count: count, content: content};
		
	}

	private async getFollowings(){
		return await this.getContent(0);
	}

	private async getFollowers(){
		return await this.getContent(1);
	}

	private async getWordsCount(){
		return await this.getContent(2);
	}

	private async getPoints(){
		return await this.getContent(3);
	}

	public async getCourses(learning_or_teaching: string){
		let url: string = "https://www.memrise.com/user/"+this.user_name+"/courses/"+learning_or_teaching+"/";
		let html = await Requester.getMemriseRequest(url,"","");
		html = html.body;
		let parser = new DomParser();	
		let dom = parser.parseFromString(html);
		let courses = [];
		let things = dom.getElementsByClassName("picture-wrapper").forEach((item,i,arr)=>{
			courses.push({
				name: item.attributes[0].value.split('/')[3],
				id: item.attributes[0].value.split('/')[2]
			});
		});
		let count = courses.length;
		return {count: count , content: courses}
	}
 
	public async getInfo(){		
		let temp = await this.getFollowings();
		let followingsCount = temp.count;
		let followings = temp.content;

		temp = await this.getFollowers();
		let followersCount = temp.count;
		let followers = temp.content;

		temp = await this.getWordsCount();
		let wordsCount = temp.count;

		temp = await this.getPoints();
		let points = temp.count;

		temp = await this.getCourses("learning");
		let CourseCountL = temp.count;
		let CoursesL = temp.content;

		temp = await this.getCourses("teaching")
		let CourseCountT = temp.count;
		let CoursesT = temp.content;
		let info = {
			Followings: followings,
			FollowingsCount: followingsCount,
			Followers: followers,
			FollowersCount: followersCount,
			WordsCount: wordsCount,
			Points: points,
			LearningCourses: CoursesL,
			LearningCoursesCount: CourseCountL,
			TeachingCourses: CoursesT,
			TeachingCoursesCount: CourseCountT
		};
		return info;
	}
}

export default new User("");
