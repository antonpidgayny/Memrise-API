import { Router, Response, Request, NextFunction } from 'express';
import Course from '../../../handlers/Course';
import User from '../../../handlers/User';
//import ApiUser from '../../../models/ApiUser';
export default abstract class UserRouter{
	public router: Router;
	constructor(){
		this.router = Router();
		this.routes();
	}
    
	public abstract apiUserCreate(req : Request, res : Response):void;
	public getCourseInfo(req : Request, res : Response) : void{
		//console.log(req.query.url);
		let id = req.query.id;
		let name = req.query.name;
		Course.setID(id);
		Course.setName(name);
		Course.getCourse(function(err, info){
			res.send(JSON.stringify({'info' : info }));
		});
	}
	public getUserInfo(req : Request, res : Response) : void{
		//console.log(req.query.username);
		if (req.query.username){
			User.setUserName(req.query.username);
			User.getInfo(function(err, result){
				res.send(JSON.stringify({result : result}));
			});
		}else{
			res.send("username argument can't be empty");
		}
	}
	public abstract routes():void;
}