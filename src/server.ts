import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as path from 'path';
import * as dotenv from 'dotenv';
//import ApiUserRouter from './router/ApiUserRouter';
import ApiUserRouter from './router/UserRoutes/ApiUserRouter';
import ApiAdminUserRouter from './router/UserRoutes/ApiAdminUserRouter';
import ApiMasterUserRouter from './router/UserRoutes/ApiMasterUserRouter';
import TestRouter from './router/TestRouter';
import ApiUserAuthControllerMiddleware from './middlewears/ApiUserAuthControllerMiddleware';
dotenv.config();
class Server {

  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  
  public config(): void {

    mongoose.connect(process.env.DB);

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(helmet());
    this.app.use(cors());

    // cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
    
  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();
    //this.app.use('/', router);
    //this.app.use('/api/v1/admin', ApiAdminUserRouter);
    //this.app.use('/api/v1/master', ApiMasterUserRouter);
    //this.app.use('/api/v1/apiuser', ApiUserRouter);
    this.app.use('/api/v1/', TestRouter);
    //this.app.use('/api/v1/users', UserRouter);
  }

  public getApp(): any{
  	return this.app
  }
}

// export
export default new Server().getApp();