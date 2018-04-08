import { Router, Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

class ApiUserAuthControllerMiddleware{

	constructor(){
	}

	public jwtApiKeyGetSecurity(req : Request, res : Response, next : NextFunction) : void {
		console.log(req.params.key);
	    jwt.verify(req.query.key, process.env.jwt_api_key_hash, function(err, decoded) {
		  if (err) {
		  	res.status(200).json({
	            success:false,
	            Message: 'You cant fool us'
	        });
		  }
		  else{
		  	res.send(JSON.stringify({status : "OK"}));
		  	//next();
		  }
		})
	}

	public jwtApiKeyPostSecurity(req : Request, res : Response, next : NextFunction) : void {
	    jwt.verify(req.body.key, process.env.jwt_api_key_hash, function(err, decoded) {
		  if (err) {
		  	res.status(200).json({
	            success:false,
	            Message: 'You cant fool us'
	        });
		  }
		  else{
		  	res.send(JSON.stringify({status : "OK"}));
		  	//next();
		  }
		})
	};
}

//export
export default new ApiUserAuthControllerMiddleware();