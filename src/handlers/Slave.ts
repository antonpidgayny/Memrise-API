import * as http from 'https';
import * as iconv from 'iconv-lite';
import * as jwt from 'jsonwebtoken';
import * as prom from 'es6-promisify';
import * as Prm from 'es6-promise';
import * as request from 'request';
import * as cookieSetHeaderParser from 'set-cookie-parser';

class Slave{
  private headers;
  private requestGetPromisified;
  private requestPostPromisified;
	constructor(){
      this.headers = {
        'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        'Accept-Language': 'uk-UA,uk;q=0.9,ru;q=0.8,en-US;q=0.7,en;q=0.6',
        'Cache-Control' : 'no-cache',
        'Connection' : 'keep-alive',
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Host' : 'www.memrise.com',
        'Origin' : 'https://www.memrise.com',
        'Pragma' : 'no-cache',
        'Referer' : 'https://www.memrise.com/login/',
        'Upgrade-Insecure-Requests' : 1,
        'Accept-Charset' : 'utf-8'
      },
      this.requestGetPromisified = prom.promisify(request.get),
      this.requestPostPromisified = prom.promisify(request.post)
	}

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
  public async getMemriseRequest(url, cookies_str, cookies_url){
    if (cookies_url == undefined){
      cookies_url = url;
    } 
    let resp = await this.requestGetPromisified({url : url, jar : this.formCoookies(cookies_str, cookies_url) , headers : this.headers});
    let cookies = cookieSetHeaderParser.parse(resp, {
      decodeValues: true  // default: true
    });
    //console.log(resp);
    return ({cookie : cookies, body : resp.body});
  }
  public async postMemriseRequest(url, cookies_str, form){
    let resp = await this.requestPostPromisified({url:url, jar : this.formCoookies(cookies_str, url), headers : this.headers, form: form});
    let cookies = cookieSetHeaderParser.parse(resp, {
      decodeValues: true  // default: true
    });
    return ({cookie : cookies, body : resp.body});
  }
  private formCoookies(cookies_str, url){
      let j = request.jar();
      let cookie = request.cookie(cookies_str);
      console.log(cookie);
      j.setCookie(cookie, url);
      return j;
  }
	public async auth(url){
    try {
      let resp = await this.getMemriseRequest(url, "");
      let pos = (resp.body.search("csrfmiddlewaretoken"));
      console.log(pos);
      let csrfmiddlewaretoken = resp.body.slice(pos+28,pos+92);
      let form = {
        'csrfmiddlewaretoken': csrfmiddlewaretoken,
        'username' : process.env.email,
        'password' : process.env.password,
        'next' : ''
      };
      let cookie_str = 'csrftoken='+csrfmiddlewaretoken;
      url = 'https://www.memrise.com' ;
      resp = await this.postMemriseRequest('https://www.memrise.com/login/', cookie_str, form);
      console.log(resp.cookie['1'].name);
      cookie_str = resp.cookie['1'].name+'='+resp.cookie['1'].value+'; ';
      resp = await this.getMemriseRequest("https://www.memrise.com/home/", cookie_str);
      return resp.cookie;
    }catch(e){
      console.log(e);
      throw "lol"
    }

    /*console.log(res);
    var chunks = [];
    var setcookie = res.headers["set-cookie"];
    var cookies = '';*/
  }
}

//export
export default new Slave();