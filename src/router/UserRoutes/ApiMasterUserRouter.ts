import { Router, Response, Request, NextFunction } from 'express';
import ApiUser from '../../models/ApiUser';
import MasterUserRouter from './AbstractUserRouteClasses/MasterUserRouter';
import * as jwt from 'jsonwebtoken';

class ApiMasterUserRouter extends MasterUserRouter{
	public router: Router;
	constructor(){
		super();
	}
	makeAdmin(req : Request, res : Response):void{
		
	}
	revokeAdmin(req : Request, res : Response):void{
		
	}
	getApiAdminsAll(req : Request, res : Response):void{
		
	}
	unbanApiUser(req : Request, res : Response):void{
		
	}
	getApiUsersBanList(req : Request, res : Response): void{

	}
	banApiUser(req : Request, res : Response): void{
		req.body.list.forEach(function(elem){

		});
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
	getApiUsersAll(req : Request, res : Response) : void{
		ApiUser.find({}, function (err, users) {
			if (err){
				res.send('There no users =(');
			}
			res.send(users);
		});

	}
	deleteApiUsers(req : Request, res : Response) : void{
		req.body.list.forEach(function(elem){
			ApiUser.deleteOne({email : elem}, function(err){})
		});
		res.send('okay=)');
	}
	masterYell(req : Request, res : Response) : void {
		console.log('YEeeeeeeeeeeeeell!!!');
	}
	makeMaster(req : Request, res : Response){

	}
	routes(){
		this.router.post('/create', this.apiUserCreate);
		this.router.get('/yell', this.masterYell);
		this.router.get('/get_all', this.getApiUsersAll);
		this.router.post('/delete_users', this.deleteApiUsers);
	}
}

//export
const apiMasterUserRouter = new ApiMasterUserRouter();
apiMasterUserRouter.routes();
const apiMasterUserRouterexp = apiMasterUserRouter.router;
export default apiMasterUserRouterexp;