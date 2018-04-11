import * as http from 'https';
import * as iconv from 'iconv-lite';
class Slave{

	constructor(){
	}


	public webPageToStr(url,callback) : void {
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
              var str = iconv.decode(buffer, 'utf-8');

              // Call the callback with the string.
              return callback(null, str);
            });
          });
	}

}

//export
export default new Slave();