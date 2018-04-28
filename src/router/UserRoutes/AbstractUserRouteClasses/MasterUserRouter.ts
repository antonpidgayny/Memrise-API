import { Router, Response, Request, NextFunction } from 'express';
import PrivilegeUserRouter from './PrivilegeUserRouter';
export default abstract class MasterUserRouter extends PrivilegeUserRouter{
	constructor(){
		super();
	}
	public abstract masterYell(req : Request, res : Response):void;
	public abstract makeMaster(req : Request, res : Response):void;
}