import { Router, Response, Request, NextFunction } from 'express';
import UserRouter from './UserRouter';
export default abstract class PrivilegeUserRouter extends UserRouter{
	constructor(){
		super();
	}
	public abstract apiUserGetAll(req : Request, res : Response):void;
	public abstract apiUsersDelete(req : Request, res : Response):void;
}