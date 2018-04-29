import { Router, Response, Request, NextFunction } from 'express';
import ApiUsers from '../../models/ApiUser';
import ApiBannedUsersList from '../../models/ApiBannedUsers';
import PrivilegeUserRouter from './AbstractUserRouteClasses/PrivilegeUserRouter';
import Slave from '../../handlers/Slave';
import * as jwt from 'jsonwebtoken';

class ApiAdminUserRouter extends PrivilegeUserRouter{
	public router: Router;
	constructor(){
		super();
	}
	unbanApiUser(req : Request, res : Response):void{
		Slave.mongoosePromisify(ApiBannedUsersList, 'find', {email_fk : req.body.username})
		.catch((e)=> res.send(e))
		.then((result) => {
			if (!result.length){
				res.send("User not in Ban List");
			}else{
				try{
					result.forEach(function(elem){
						if (elem.active===true){
							Slave.mongooseActionsPromisify(ApiBannedUsersList, 'findOneAndUpdate', {_id : elem._id}, {"$set": { "active": false }}, { new : true })
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
	getApiUsersBanList(req : Request, res : Response): void{
		Slave.mongoosePromisify(ApiBannedUsersList, 'find', {})
		.catch((e) => res.send(e))
		.then((result) => res.send(result))
	}
	banApiUser(req : Request, res : Response): void{
		//somebody, add the condition on empty email)))0, it's not interesting for me(...
		function Ban(banDate, email_fk, banReason, unbanReason, admin, active, unbanDate) {
			const bannedUser = new ApiBannedUsersList({
				banDate,
				email_fk,
				banReason,
				unbanReason,
				admin,
				active,
				unbanDate
			});
			return bannedUser.save();
		}
		Slave.mongoosePromisify(ApiUsers, 'findOne', {email : req.body.username})
		.catch((e) => res.send(e))
		.then((result) => {
			if (result===null){
				res.send("User is undefined=)");
			}else{
				Slave.mongoosePromisify(ApiBannedUsersList, 'find', {email_fk : req.body.username})
				.catch((e) => res.send(e))
				.then((result) => {
					const banDate : Date = new Date();
					const username : string = req.body.username;
					const description : string = req.body.description;
					const unbanDescr : string = '';
					const admin : string = 'Test';
					const active : boolean = true;
					const unbanDate : Date = new Date();
					if (!result.length){
						Ban(banDate, username, description, unbanDescr, admin, active, unbanDate)
						.then((data) => res.send(data))
						.catch((e) => res.send(e));
					}else{
						var BreakException = {};
						try{
							result.forEach(function(elem){
								if (elem.active===true){
									throw BreakException;
								}
								if (result.indexOf(elem)===(result.length-1)){
									console.log('ya tut');
									Ban(banDate, username, description, unbanDescr, admin, active, unbanDate)
									.then((data) => res.send(data))
									.catch((e) => res.send(e));						
								}
							});
						} catch(e){
							res.send('User is already banned');
						}
					}
				});
			}
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
	routes(){
		this.router.post('/create', this.apiUserCreate);
		this.router.get('/get_all', this.getApiUsersAll);
		this.router.post('/delete_users', this.deleteApiUsers);
		this.router.post('/ban_users', this.banApiUser);
		this.router.get('/see_banlist', this.getApiUsersBanList);
		this.router.post('/unban_user', this.unbanApiUser);
	}
}

//export
const apiAdminUserRouter = new ApiAdminUserRouter();
apiAdminUserRouter.routes();
const apiAdminUserRouterexp = apiAdminUserRouter.router;
export default apiAdminUserRouterexp;