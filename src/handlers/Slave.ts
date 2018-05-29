import * as http from 'https';
import * as iconv from 'iconv-lite';
import * as jwt from 'jsonwebtoken';
import * as prom from 'es6-promisify';
import * as Prm from 'es6-promise';
import * as request from 'request';
import * as cookieSetHeaderParser from 'set-cookie-parser';

class Slave{
  public async mongoosePromisify(table, method, parameters){
      try{
        return await table[method](parameters);
      }catch(e){
        return e;
      }
   };

  public async mongooseActionsPromisify(table, method, condition, action, additional){
    try{
      return await table[method](condition,action,additional);
    }catch(e){
      return e;
    }

  };

  public async jwtVerifyPromisify(key, jwt_api_key_hash) {
      try{
        return await jwt.verify(key, jwt_api_key_hash);
      } catch(e){
            return 'exception=)';
      }    
  };
}

//export
export default new Slave();