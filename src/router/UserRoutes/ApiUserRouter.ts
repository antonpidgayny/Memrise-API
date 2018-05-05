import { Router, Response, Request, NextFunction } from 'express';
import ApiUser from '../../models/ApiUser';
import UserRouter from './AbstractUserRouteClasses/UserRouter';
import * as jwt from 'jsonwebtoken';
import Course from '../../handlers/Course';
import User from '../../handlers/User';

class ApiUserRouter extends UserRouter{
	public router: Router;
	constructor(){
		super();
	}
	/*public getCourseInfo(req : Request, res : Response) : void{
		console.log(req.query.url);
		let id;
		let name;
		Course.setID(id);
		Course.setName(name);
		Course.getCourse(function(err, info){
			res.send(JSON.stringify({'info' : info }));
		});
	}
	public getUserInfo(req : Request, res : Response) : void{
		console.log(req.query.username);
		if (req.query.username){
			User.setUserName(req.query.username);
			User.getInfo(function(err, result){
				res.send(JSON.stringify({result : result}));
			});
		}else{
			res.send("username argument can't be empty");
		}
	}*/
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
/*const apiUserRoutes = new ApiUserRouter();
apiUserRoutes.routes();
const apiUserRoutesexp = apiUserRoutes.router;
export default apiUserRoutesexp;*/
export default new ApiUserRouter();