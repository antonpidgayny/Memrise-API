import { Router, Response, Request, NextFunction } from 'express';
import ApiUserAuthControllerMiddleware from '../middlewears/ApiUserAuthControllerMiddleware';
import * as http from 'https';
import * as iconv from 'iconv-lite';
class TestRouter{
	public router: Router;

	constructor(){
		this.router = Router();
		this.routes();
	}

	public goToMemriseHomePage(req : Request, res : Response) : void {
		function retrieve(url, callback) {
          http.get(url, function(res) {
            var chunks = [];
            var setcookie = res.headers["set-cookie"];
            var cookies = '';
            if ( setcookie ) {
              setcookie.forEach(
                function ( cookiestr ) {
                   cookies+=' '+cookiestr;
                }
              );
            }
            //console.log(cookies);
            // Collect all the response chunks.
            res.on('data', function(chunk) {
              chunks.push(chunk);
            });

            // The response has been fully read here.
            res.on('end', function() {
              // Collect all the chunks into one buffer.
              var buffer = Buffer.concat(chunks);

              // Convert to a (UTF-8-encoded) string.
              var str = iconv.decode(buffer, 'windows-1252');

              // Call the callback with the string.
              return callback(null, str);
            });
          });
        }

        // To use:
        retrieve("https://www.memrise.com/login/", function(err, html) {
          let pos = (html.search("csrfmiddlewaretoken"));
          console.log(html.slice(pos+28,pos+92)); //Токен тут))0
          res.send(html);
        });
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