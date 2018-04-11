"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("https");
var iconv = require("iconv-lite");
var Slave = /** @class */ (function () {
    function Slave() {
    }
    Slave.prototype.webPageToStr = function (url, callback) {
        http.get(url, function (res) {
            var chunks = [];
            var setcookie = res.headers["set-cookie"];
            var cookies = '';
            if (setcookie) {
                setcookie.forEach(function (cookiestr) {
                    cookies += ' ' + cookiestr;
                });
            }
            //console.log(cookies);
            // Collect all the response chunks.
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            // The response has been fully read here.
            res.on('end', function () {
                // Collect all the chunks into one buffer.
                var buffer = Buffer.concat(chunks);
                // Convert to a (UTF-8-encoded) string.
                var str = iconv.decode(buffer, 'utf-8');
                // Call the callback with the string.
                return callback(null, str);
            });
        });
    };
    return Slave;
}());
//export
exports.default = new Slave();
//# sourceMappingURL=Slave.js.map