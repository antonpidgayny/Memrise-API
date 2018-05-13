declare var require: any;
import Slave from './Slave';
import * as iconv from 'iconv-lite';
var DomParser = require('dom-parser');

class User{
	
	private user_name: string;

	constructor(user: string) {
		this.user_name = user;
	}

	private getContent(k,callback): void{
		let url: string = "https://www.memrise.com/user/"+this.user_name+"/";
		if (k===0){url+="mempals/following/"}
		else if (k===1) {url+="mempals/followers/"}
		Slave.webPageToStr(url, (err, html) => {
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
			return callback(null, count, content);
		})
	}

	private getFollowings(callback): void{
		this.getContent(0,callback);
	}

	private getFollowers(callback): void{
		this.getContent(1,callback);
	}

	private getWordsCount(callback): void{
		this.getContent(2,callback);
	}

	private getPoints(callback): void{
		this.getContent(3,callback);
	}

	private getCourses(learning_or_teaching: string , callback){
		let url: string = "https://www.memrise.com/user/"+this.user_name+"/courses/"+learning_or_teaching+"/";
		Slave.webPageToStr(url,(err,html)=>{
			let parser = new DomParser();	
			let dom = parser.parseFromString(html);
			let courses = [];
			dom.getElementsByClassName("picture-wrapper").forEach((item,i,arr)=>{
				courses.push({
					name: item.attributes[0].value.split('/')[3],
					id: item.attributes[0].value.split('/')[2]
				});
			});
			let count = courses.length;
			return callback(null , count , courses)
		})
	}

	public setUserName(user: string) {
		this.user_name = user;
	}

	public getInfo(callback): void{
		this.getFollowings((err , followingsCount , followings)=>{
			this.getFollowers((err , followersCount , followers)=>{
				this.getWordsCount((err , wordsCount)=>{
					this.getPoints((err, points)=>{
						this.getCourses("learning",(err,CourseCountL,CoursesL)=>{
							this.getCourses("teaching",(err,CourseCountT,CoursesT)=>{
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
								return callback(null,info)
							})
						})
					})
				})
			})
		});
	}
}

export default new User("");