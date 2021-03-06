"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ApiUserAuthControllerMiddleware_1 = require("../middlewears/ApiUserAuthControllerMiddleware");
var Slave_1 = require("../handlers/Slave");
var request = require("request");
var TestRouter = /** @class */ (function () {
    function TestRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    TestRouter.prototype.goToMemriseHomePage = function (req, res) {
        // To use:
        Slave_1.default.webPageToStr("https://www.memrise.com/login/", function (err, html) {
            var pos = (html.search("csrfmiddlewaretoken"));
            var csrfmiddlewaretoken = html.slice(pos + 28, pos + 92);
            var form = {
                'csrfmiddlewaretoken': csrfmiddlewaretoken,
                'username': process.env.email,
                'password': process.env.password,
                'next': ''
            };
            var headers = {
                'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'uk-UA,uk;q=0.9,ru;q=0.8,en-US;q=0.7,en;q=0.6',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                //'Content-Length': 149
                'Content-Type': 'application/x-www-form-urlencoded',
                //'Cookie' : 'i18next=en; ajs_user_id=null; ajs_group_id=null; ajs_anonymous_id=null; csrftoken=pIWEg2Sal40yAfeYcwddP2x0emZIvR84pqdNlcEP2wGzH56nWpoW5F4hDv9G3fOn; expires=Sun, 07-Apr-2019 12:14:35 GMT; Max-Age=31449600; Path=/',
                'Host': 'www.memrise.com',
                'Origin': 'https://www.memrise.com',
                'Pragma': 'no-cache',
                'Referer': 'https://www.memrise.com/login/',
                'Upgrade-Insecure-Requests': 1,
            };
            console.log(headers);
            var j = request.jar();
            var cookie_str = 'csrftoken=' + csrfmiddlewaretoken;
            console.log(cookie_str);
            var cookie = request.cookie(cookie_str);
            var url = 'https://www.memrise.com';
            j.setCookie(cookie, url);
            request.post({ url: 'https://www.memrise.com/login/', jar: j, headers: headers, form: form }, function (err, httpResponse, body) { res.send(JSON.stringify({ 'cookies': httpResponse.headers['set-cookie'] })); });
            //res.send(html);
        });
        /*Slave.webPageToStr("https://www.memrise.com/course/1123139/turkish-1/", function(err, html) {
          res.send(html);
        });*/
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