import { Router, Response, Request, NextFunction } from 'express';
import Course from '../../../handlers/Course';
import User from '../../../handlers/User';
import Slave from '../../../handlers/Slave';
import Requester from '../../../handlers/Requester';
import * as cookieParser from 'cookie-parser';
import * as iconv from 'iconv-lite';
import * as request from 'request';
import * as cookieSetHeaderParser from 'set-cookie-parser';
//import ApiUser from '../../../models/ApiUser';
export default abstract class UserRouter{
	public router: Router;
	private cookies;
	constructor(){
		this.router = Router();
		this.routes();
		this.cookies = '';
	}
	public abstract apiUserCreate(req : Request, res : Response):void;
	public async auth(req : Request, res : Response){
        let cookies_obj = await Requester.auth("https://www.memrise.com/login/");
        //console.log(cookies_obj);
        this.cookies = '';
        this.cookies += cookies_obj['1'].name+'='+cookies_obj['1'].value+'; ';
        this.cookies += cookies_obj['0'].name+'='+cookies_obj['0'].value+'; ';
        res.send(this.cookies);
        return this.cookies;
	}
	public async getSelfCourseStat(req : Request, res : Response){
		console.log(this.cookies);
		let resp = await Requester.getMemriseRequest('https://www.memrise.com/ajax/courses/dashboard/?courses_filter=most_recent&offset=0&limit=50&get_review_count=false', this.cookies, 'https://www.memrise.com/home');
		//************************************************************
		//розпарсь Джи Сона
		//*************************************************************
		res.send(resp);
	}

	public async getSelfCourseInfo(req : Request, res : Response){
		let id = req.query.id;
		let name = req.query.name;
		let course = new Course(name,id)
		let info = await course.getCourse_auth(this.cookies,"Антон_Підгайний");
		res.send(JSON.stringify({'info' : info }));
	}

	public async getCourseInfo(req : Request, res : Response){
		let id = req.query.id;
		let name = req.query.name;
		let course = new Course(name,id)
		let info = await course.getCourse();
		res.send(JSON.stringify({'info' : info }));
	
	}
	public async getUserInfo(req : Request, res : Response){
		if (req.query.username){
			User.setUserName(req.query.username);
			let result = await User.getInfo();
			res.send(JSON.stringify({result : result}));
		}else{res.send("username argument can't be empty");}
	}
	public abstract routes():void;
}
