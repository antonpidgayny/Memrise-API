import { Router, Response, Request, NextFunction } from 'express';
import ApiUser from '../../models/ApiUser';
import UserRouter from './AbstractUserRouteClasses/UserRouter';
import * as jwt from 'jsonwebtoken';

class ApiUserRouter extends UserRouter{
	public router: Router;
	constructor(){
		super();
	}
	apiUserCreate(req : Request, res : Response) : void {
		const signUpDate: Date = new Date(); 
		const email: string = req.body.email;
    	const project: string = req.body.project;
		if (!email || !project){
			res.status(422).json({ message: 'Give for us email and project' });
		};
		const apiUser = new ApiUser({
			signUpDate,
			email,
			project,
		});
		const api_key: string = jwt.sign({email : email}, process.env.jwt_api_key_hash);
		apiUser.save()
		.then((data) => {
			//data['token'] = api_key;
			res.status(201).json({api_key : api_key});
		})
		.catch((error) => {
      		res.status(500).json({ error });
    	});
	}
	routes(){
		this.router.post('/create', this.apiUserCreate);
	}
}

//export
const apiUserRoutes = new ApiUserRouter();
apiUserRoutes.routes();
const apiUserRoutesexp = apiUserRoutes.router;
export default apiUserRoutesexp;