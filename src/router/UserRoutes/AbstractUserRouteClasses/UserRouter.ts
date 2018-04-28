import { Router, Response, Request, NextFunction } from 'express';
//import ApiUser from '../../../models/ApiUser';
export default abstract class UserRouter{
	public router: Router;
	constructor(){
		this.router = Router();
		this.routes();
	}
    
	public abstract apiUserCreate(req : Request, res : Response):void;
	public abstract routes():void;
}