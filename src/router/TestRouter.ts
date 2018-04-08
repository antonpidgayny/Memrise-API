import { Router, Response, Request, NextFunction } from 'express';
import ApiUserAuthControllerMiddleware from '../middlewears/ApiUserAuthControllerMiddleware';

class TestRouter{
	public router: Router;

	constructor(){
		this.router = Router();
		this.routes();
	}

	public routes(){
		this.router.post('/', ApiUserAuthControllerMiddleware.jwtApiKeyPostSecurity);
		this.router.get('/', ApiUserAuthControllerMiddleware.jwtApiKeyGetSecurity);
	}
}

//export
const testRoutes = new TestRouter();
testRoutes.routes();
const testRoutesexp = testRoutes.router;
export default testRoutesexp;