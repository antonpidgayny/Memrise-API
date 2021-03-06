import { Router, Response, Request, NextFunction } from 'express';
import ApiUserAuthControllerMiddleware from '../middlewears/ApiUserAuthControllerMiddleware';
import Slave from '../handlers/Slave';
import * as request from 'request';
class TestRouter{
	public router: Router;

	constructor(){
		this.router = Router();
		this.routes();
	}

	public goToMemriseHomePage(req : Request, res : Response) : void {
        // To use:
        Slave.webPageToStr("https://www.memrise.com/login/", function(err, html) {
          let pos = (html.search("csrfmiddlewaretoken"));
          let csrfmiddlewaretoken = html.slice(pos+28,pos+92);
          let form = {
          	'csrfmiddlewaretoken': csrfmiddlewaretoken,
          	'username' : process.env.email,
          	'password' : process.env.password,
          	'next' : ''
          };
          let headers = {
          	'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
			'Accept-Encoding' : 'gzip, deflate, br',
			'Accept-Language': 'uk-UA,uk;q=0.9,ru;q=0.8,en-US;q=0.7,en;q=0.6',
			'Cache-Control' : 'no-cache',
			'Connection' : 'keep-alive',
			//'Content-Length': 149
			'Content-Type' : 'application/x-www-form-urlencoded',
			//'Cookie' : 'i18next=en; ajs_user_id=null; ajs_group_id=null; ajs_anonymous_id=null; csrftoken=pIWEg2Sal40yAfeYcwddP2x0emZIvR84pqdNlcEP2wGzH56nWpoW5F4hDv9G3fOn; expires=Sun, 07-Apr-2019 12:14:35 GMT; Max-Age=31449600; Path=/',
			'Host' : 'www.memrise.com',
			'Origin' : 'https://www.memrise.com',
			'Pragma' : 'no-cache',
			'Referer' : 'https://www.memrise.com/login/',
			'Upgrade-Insecure-Requests' : 1,
			//'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
		    //'User-Agent': 'request'
		  }
		  console.log(headers);
		  var j = request.jar();
		  let cookie_str = 'csrftoken='+csrfmiddlewaretoken;
		  console.log(cookie_str);
		  var cookie = request.cookie(cookie_str);
		  var url = 'https://www.memrise.com' ;
	      j.setCookie(cookie, url);
          request.post({url:'https://www.memrise.com/login/', jar : j, headers : headers, form: form}, function(err,httpResponse,body){res.send(JSON.stringify({'cookies' : httpResponse.headers['set-cookie']}))});
          //res.send(html);
        });
        /*Slave.webPageToStr("https://www.memrise.com/course/1123139/turkish-1/", function(err, html) {
          res.send(html);
        });*/
	}

	public routes(){
		this.router.post('/', ApiUserAuthControllerMiddleware.jwtApiKeyPostSecurity, this.goToMemriseHomePage);
		this.router.get('/', ApiUserAuthControllerMiddleware.jwtApiKeyGetSecurity, this.goToMemriseHomePage);
	}
}

//export
const testRoutes = new TestRouter();
testRoutes.routes();
const testRoutesexp = testRoutes.router;
export default testRoutesexp;