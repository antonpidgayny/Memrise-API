"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Course_1 = require("../../../handlers/Course");
var User_1 = require("../../../handlers/User");
var Slave_1 = require("../../../handlers/Slave");
var request = require("request");
var cookieSetHeaderParser = require("set-cookie-parser");
//import ApiUser from '../../../models/ApiUser';
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    UserRouter.prototype.goToMemriseHomePage = function (req, res) {
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
                //'Accept-Encoding' : 'gzip, deflate, br',
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
            //console.log(headers);
            var j = request.jar();
            var cookie_str = 'csrftoken=' + csrfmiddlewaretoken;
            //console.log(cookie_str);
            var cookie = request.cookie(cookie_str);
            var url = 'https://www.memrise.com';
            j.setCookie(cookie, url);
            request.post({ url: 'https://www.memrise.com/login/', jar: j, headers: headers, form: form }, function (err, httpResponse, body) {
                //res.send(JSON.stringify({'cookies' : httpResponse.headers['set-cookie']}));
                url = 'https://www.memrise.com/';
                j = request.jar();
                cookie_str = '';
                //j.setCookie(httpResponse.headers['set-cookie'], url);
                //console.log(typeof httpResponse.headers['set-cookie']);
                //console.log(httpResponse.headers['set-cookie'].toString());
                //res.send(httpResponse);
                /*Object.keys(httpResponse.headers['set-cookie']).forEach(function(elem) {
                    cookie_str+=httpResponse.headers['set-cookie'][elem];
                });*/
                //cookie_str += httpResponse.headers['set-cookie'][0] + "; " + httpResponse.headers['set-cookie'][1];
                //console.log(cookieParser.JSONCookie(httpResponse.headers['set-cookie'][0]));
                var cookies__ = cookieSetHeaderParser.parse(httpResponse, {
                    decodeValues: true // default: true
                });
                //console.log(cookies__);
                cookie_str += cookies__['1'].name + '=' + cookies__['1'].value + '; ';
                cookie = request.cookie(cookie_str);
                console.log(cookie);
                j.setCookie(cookie, url);
                headers['Content-Type'] = 'text/html; charset=utf-8';
                headers['Accept-Charset'] = 'utf-8';
                //console.log(headers);
                request({ url: 'https://www.memrise.com/home/', jar: j, headers: headers }, function (err, httpResponse, body) {
                    //res.send(JSON.stringify({'cookies' : httpResponse.headers['set-cookie']}));
                    //res.send(iconv.decode(body, 'utf-8'));
                    //console.log(body);
                    console.log('WHAT&');
                    //res.send(body);
                    //res.write(body, "utf8");
                    //res.send();
                    res.send(body);
                });
            });
        });
    };
    UserRouter.prototype.getCourseInfo = function (req, res) {
        //console.log(req.query.url);
        var id = req.query.id;
        var name = req.query.name;
        Course_1.default.setID(id);
        Course_1.default.setName(name);
        Course_1.default.getCourse(function (err, info) {
            res.send(JSON.stringify({ 'info': info }));
        });
    };
    UserRouter.prototype.getUserInfo = function (req, res) {
        //console.log(req.query.username);
        if (req.query.username) {
            User_1.default.setUserName(req.query.username);
            User_1.default.getInfo(function (err, result) {
                res.send(JSON.stringify({ result: result }));
            });
        }
        else {
            res.send("username argument can't be empty");
        }
    };
    return UserRouter;
}());
exports.default = UserRouter;
//# sourceMappingURL=UserRouter.js.map