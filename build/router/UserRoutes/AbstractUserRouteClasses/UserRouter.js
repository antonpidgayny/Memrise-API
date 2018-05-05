"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Course_1 = require("../../../handlers/Course");
var User_1 = require("../../../handlers/User");
//import ApiUser from '../../../models/ApiUser';
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
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