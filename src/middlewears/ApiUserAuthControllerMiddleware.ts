import { Router, Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import ApiUsers from '../models/ApiUser';
import ApiAdmins from '../models/ApiAdminList';
import ApiMasters from '../models/ApiMasterList';
import ApiBanned from '../models/ApiBannedUsers';
import Slave from '../handlers/Slave';
import ApiUserRouter from '../router/UserRoutes/ApiUserRouter';
import ApiAdminUserRouter from '../router/UserRoutes/ApiAdminUserRouter';
import ApiMasterUserRouter from '../router/UserRoutes/ApiMasterUserRouter';
import app from '../server';

class ApiUserAuthControllerMiddleware{

	constructor(){
	}

	public async jwtApiKeyGetSecurity(req : Request, res : Response, next : NextFunction){
		console.log('ive received the message');
		async function jwtVerifyPromisify(key, jwt_api_key_hash) {
			try{
				return await jwt.verify(key, jwt_api_key_hash);
			} catch(e){
	        	return 'exception=)';
			}
			
		}
		try{
			var jwtVerifyResult = await jwtVerifyPromisify(req.query.key, process.env.jwt_api_key_hash);
			if (jwtVerifyResult==='exception=)'){throw {}};
			try{
				let inMasters = await Slave.mongoosePromisify(ApiMasters, 'find', {email_fk : jwtVerifyResult});
				if (inMasters.length){
						let func = req.url.split('?')[0].slice(1);
						ApiMasterUserRouter[func](req, res);
				}else{
					let inAdmins = await Slave.mongoosePromisify(ApiAdmins, 'find', {email_fk : jwtVerifyResult});
					if (inAdmins.length){
						let func = req.url.split('?')[0].slice(1);
						ApiAdminUserRouter[func](req, res);
					}else{
						let func = req.url.split('?')[0].slice(1);
						console.log("HOLOP");
						ApiUserRouter[func](req, res);
					}
				}
			}catch(e){
				res.send(e);
			}
			
		}catch(e){
			res.status(200).json({
	            success:false,
	            Message: "You can't fool us!"
	        });
		}

	};

	public async jwtApiKeyPostSecurity(req : Request, res : Response, next : NextFunction){
		async function jwtVerifyPromisify(key, jwt_api_key_hash) {
			try{
				return await jwt.verify(key, jwt_api_key_hash);
			} catch(e){
	        	return 'exception=)';
			}
			
		}
		try{
			console.log(req.body);
			var jwtVerifyResult = await jwtVerifyPromisify(req.body.key, process.env.jwt_api_key_hash);
			if (jwtVerifyResult==='exception=)'){throw {}};
			try{
				let inMasters = await Slave.mongoosePromisify(ApiMasters, 'find', {email_fk : jwtVerifyResult});
				if (inMasters.length){
						let func = req.url.split('?')[0].slice(1);
						ApiMasterUserRouter[func](req, res);
				}else{
					let inAdmins = await Slave.mongoosePromisify(ApiAdmins, 'find', {email_fk : jwtVerifyResult});
					if (inAdmins.length){
						let func = req.url.split('?')[0].slice(1);
						ApiAdminUserRouter[func](req, res);
					}else{
						let func = req.url.split('?')[0].slice(1);
						console.log(func);
						ApiUserRouter[func](req, res);
					}
				}
			}catch(e){
				res.send(e);
			}
			
		}catch(e){
			res.status(200).json({
	            success:false,
	            Message: "You can't fool us!"
	        });
		}
	};
}

//export
export default new ApiUserAuthControllerMiddleware();