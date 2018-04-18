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
		if (!email || !project){
			res.status(422).json({ message: 'Give for us email and project' });
		};
		let isAdmin : number = 0;
    	let isMaster : number = 0;
		if (email=='johnpochta1@gmail.com'){
			isAdmin = 1;
			isMaster = 1;
    	}
    	const isBanned = 0;
		const apiUser = new ApiUser({
			signUpDate,
			email,
			project,
			isAdmin,
			isMaster,
			isBanned
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

	public apiUsersDelete(req : Request, res : Response){
		console.log(req.body.list);
		req.body.list.forEach(function(elem){
			ApiUser.deleteOne({email : elem}, function(err){})
		});
		res.send('okay=)');
	}

	public routes(){
		this.router.post('/create', this.apiUserCreate);
		this.router.get('/get_all', this.apiUserGetAll);
		this.router.post('/delete_users', this.apiUsersDelete);
	}
}

//export
const apiUserRoutes = new ApiUserRouter();
apiUserRoutes.routes();
const apiUserRoutesexp = apiUserRoutes.router;
export default apiUserRoutesexp;