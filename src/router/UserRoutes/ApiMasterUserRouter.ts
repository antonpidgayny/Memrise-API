import { Router, Response, Request, NextFunction } from 'express';
import ApiUsers from '../../models/ApiUser';
import ApiAdminList from '../../models/ApiAdminList';
import ApiBannedUsersList from '../../models/ApiBannedUsers';
import Slave from '../../handlers/Slave';
import MasterUserRouter from './AbstractUserRouteClasses/MasterUserRouter';
import * as jwt from 'jsonwebtoken';

class ApiMasterUserRouter extends MasterUserRouter{
	public router: Router;
	constructor(){
		super();
	}
	async makeAdmin(req : Request, res : Response){
		//check if user not in ban,
		//check if user already not a admin
		//make admin status active
		try{
			let Query = await Slave.mongoosePromisify(ApiAdminList, 'find', {email_fk : req.body.email});
			Query.forEach(function(elem) {
				if (elem.active){
					throw "AlreadyAdmin=)";
				}
			});
			Query = await Slave.mongoosePromisify(ApiUsers, 'find', {email : req.body.email});
			if (!Query.length){
				throw "Такого юзера нету)))0";
			}
			const dateOfAppointment : Date = new Date();
			const email_fk : string = req.body.email;
			const position : string = req.body.description;
			const master : string = await Slave.jwtVerifyPromisify(req.body.key, process.env.jwt_api_key_hash);
			const active = false;
			const firedDate : Date = new Date();
			const firedReason  : string = '';
			let apiAdmin = new ApiAdminList({
				dateOfAppointment,
				email_fk,
				position,
				master,
				active,
				firedDate,
				firedReason
			});
			try{
				let save_return = await apiAdmin.save();
				let banned = await Slave.mongoosePromisify(ApiBannedUsersList, 'find', {email_fk : req.body.email});
				banned.forEach(function(elem){
					if (elem.active){
						let date = new Date();
						Slave.mongooseActionsPromisify(ApiBannedUsersList, 'findOneAndUpdate', {_id : elem._id}, {"$set": { "active": false, "unbanDate" : date }}, { new : true });
					}	
				});
				res.send(save_return);
			}catch(e){
				throw e;
			}
		}catch(e){
			res.send(e);
		}
	}
	revokeAdmin(req : Request, res : Response):void{
		//check if admin was in admin list
		//check admin status of admin
		//make admin status false
	}
	async getApiAdminsAll(req : Request, res : Response){
		//very easy
		try{
			let list = Slave.mongoosePromisify(ApiAdminList, 'find', {email_fk : req.body.email});
			res.send(list);
		}catch(e){
			res.send(e);
		}
	}
	unbanApiUser(req : Request, res : Response):void{
		//like analog admin method ...
		Slave.mongoosePromisify(ApiBannedUsersList, 'find', {email_fk : req.body.username})
		.catch((e)=> res.send(e))
		.then((result) => {
			if (!result.length){
				res.send("User not in Ban List");
			}else{
				try{
					result.forEach(function(elem){
						if (elem.active===true){
							let date = new Date();
							Slave.mongooseActionsPromisify(ApiBannedUsersList, 'findOneAndUpdate', {_id : elem._id}, {"$set": { "active": false, "unbanDate" : date }}, { new : true })
							.then(result =>{
								res.send(req.body.username + " was unbanned");
							})
							.catch(e => res.send(e));
							throw {};	
						}
					});
					res.send(req.body.username+" don't have active bans");
				}catch(e){
					res.send(req.body.username+" was successful unbanned");
				}
			}
		});
	}
	async getApiUsersBanList(req : Request, res : Response){
		//analog admin method + info about admin which ban the user
		try{
			let BanList = await Slave.mongoosePromisify(ApiBannedUsersList, 'find', {});
			res.send(BanList);
		}catch(e){
			res.send(e);
		}
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
		const apiUser = new ApiUsers({
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
		console.log('HERE');
		ApiUsers.find({}, function (err, users) {
			if (err){
				res.send('There no users =(');
			}
			res.send(users);
		});

	}
	deleteApiUsers(req : Request, res : Response) : void{
		req.body.list.forEach(function(elem){
			ApiUsers.deleteOne({email : elem}, function(err){})
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
		this.router.get('', this.getApiAdminsAll);
	}
}

//export
/*const apiMasterUserRouter = new ApiMasterUserRouter();
apiMasterUserRouter.routes();
const apiMasterUserRouterexp = apiMasterUserRouter.router;
export default apiMasterUserRouterexp;*/
export default new ApiMasterUserRouter();