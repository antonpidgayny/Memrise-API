import { Router, Response, Request, NextFunction } from 'express';
import UserRouter from './UserRouter';
export default abstract class PrivilegeUserRouter extends UserRouter{
	constructor(){
		super();
	}
	public abstract getApiUsersAll(req : Request, res : Response):void;
	public abstract deleteApiUsers(req : Request, res : Response):void;
	public abstract banApiUser(req: Request, res : Response):void;
	public abstract unbanApiUser(req: Request, res:Response):void;
	public abstract getApiUsersBanList(req: Request, res:Response):void;
	//public abstract getApiUsers(req: Request, res:Response):void;
}