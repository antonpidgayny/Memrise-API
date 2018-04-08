"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ApiUserAuthControllerMiddleware_1 = require("../middlewears/ApiUserAuthControllerMiddleware");
var http = require("https");
var iconv = require("iconv-lite");
var TestRouter = /** @class */ (function () {
    function TestRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    TestRouter.prototype.goToMemriseHomePage = function (req, res) {
        function retrieve(url, callback) {
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
                    var str = iconv.decode(buffer, 'windows-1252');
                    // Call the callback with the string.
                    return callback(null, str);
                });
            });
        }
        // To use:
        retrieve("https://www.memrise.com/login/", function (err, html) {
            var pos = (html.search("csrfmiddlewaretoken"));
            console.log(html.slice(pos + 28, pos + 92)); //Токен тут))0
            res.send(html);
        });
    };
    TestRouter.prototype.routes = function () {
        this.router.post('/', ApiUserAuthControllerMiddleware_1.default.jwtApiKeyPostSecurity, this.goToMemriseHomePage);
        this.router.get('/', ApiUserAuthControllerMiddleware_1.default.jwtApiKeyGetSecurity, this.goToMemriseHomePage);
    };
    return TestRouter;
}());
//export
var testRoutes = new TestRouter();
testRoutes.routes();
var testRoutesexp = testRoutes.router;
exports.default = testRoutesexp;
//# sourceMappingURL=TestRouter.js.map