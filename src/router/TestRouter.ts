import { Router, Response, Request, NextFunction } from 'express';
import ApiUserAuthControllerMiddleware from '../middlewears/ApiUserAuthControllerMiddleware';
import Slave from '../handlers/Slave';
import Course from '../handlers/Course';
import User  from '../handlers/User';
import ApiU from './UserRoutes/ApiAdminUserRouter';
import * as request from 'request';

class TestRouter{
	private router: Router;

	constructor(){
		this.router = Router();
		this.routes();
	}
	public routes(){
		this.router.post('/apiUserCreate', ApiU.apiUserCreate);
		this.router.post('*', ApiUserAuthControllerMiddleware.jwtApiKeyPostSecurity);
		this.router.get('*', ApiUserAuthControllerMiddleware.jwtApiKeyGetSecurity);
		//this.router.get('/getcourseinfo', ApiUserAuthControllerMiddleware.jwtApiKeyGetSecurity);
		//this.router.post('/', ApiUserAuthControllerMiddleware.jwtApiKeyPostSecurity, this.goToMemriseHomePage);
		//this.router.get('/', ApiUserAuthControllerMiddleware.jwtApiKeyGetSecurity, this.goToMemriseHomePage);
	}

	public getRouter(){
		return this.router
	}
}

//export
const testRoutes = new TestRouter();
testRoutes.routes();
const testRoutesexp = testRoutes.getRouter();
export default testRoutesexp;