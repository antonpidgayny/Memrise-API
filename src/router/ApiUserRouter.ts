import { Router, Response, Request, NextFunction } from 'express';
import ApiUser from '../models/ApiUser';
import * as jwt from 'jsonwebtoken';

class ApiUserRouter{
	public router: Router;

	constructor(){
		this.router = Router();
		this.routes();
	}

	public apiUserCreate(req : Request, res : Response) : void{
		const signUpDate: Date = new Date(); 
		const email: string = req.body.email;
    	const project: string = req.body.project;
		const api_key: string = jwt.sign({email : email}, process.env.jwt_api_key_hash);
		if (!email || !project){
			res.status(422).json({ message: 'Give for us email and project' });
		};
		const apiUser = new ApiUser({
			signUpDate,
			email,
			project,
			api_key
		});
		apiUser.save()
		.then( (data) => {res.status(201).json({ data });})
		.catch((error) => {
      		res.status(500).json({ error });
    	});
	}

	public apiUserGetAll(req : Request, res : Response){
		ApiUser.find({}, function (err, users) {
		if (err){
			res.send('There no users =(');
		}
		res.send(users);
	});

	}

	public routes(){
		this.router.post('/create', this.apiUserCreate);
		this.router.get('/get_all', this.apiUserGetAll);
	}
}

//export
const apiUserRoutes = new ApiUserRouter();
apiUserRoutes.routes();
const apiUserRoutesexp = apiUserRoutes.router;
export default apiUserRoutesexp;