import { Router, Response, Request, NextFunction } from 'express';
import PrivilegeUserRouter from './PrivilegeUserRouter';
export default abstract class MasterUserRouter extends PrivilegeUserRouter{
	constructor(){
		super();
	}
	public abstract masterYell(req : Request, res : Response):void;
	public abstract getApiAdminsAll(req: Request, res:Response): void;
	//public abstract getApiAdmins(req: Request, res:Response): void;
	public abstract makeAdmin(req: Request, res:Response):void;
	public abstract revokeAdmin(req: Request, res:Response): void;
}