"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ApiUser_1 = require("../models/ApiUser");
var ApiUserRouter = /** @class */ (function () {
    function ApiUserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    ApiUserRouter.prototype.apiUserCreate = function (req, res) {
        var signUpDate = new Date();
        var email = req.body.email;
        var project = req.body.project;
        if (!email || !project) {
            res.status(422).json({ message: 'Give for us email and project' });
        }
        ;
        var isAdmin = 0;
        var isMaster = 0;
        if (email == 'johnpochta1@gmail.com') {
            isAdmin = 1;
            isMaster = 1;
        }
        var isBanned = 0;
        var apiUser = new ApiUser_1.default({
            signUpDate: signUpDate,
            email: email,
            project: project,
            isAdmin: isAdmin,
            isMaster: isMaster,
            isBanned: isBanned
        });
        apiUser.save()
            .then(function (data) { res.status(201).json({ data: data }); })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    ApiUserRouter.prototype.apiUserGetAll = function (req, res) {
        ApiUser_1.default.find({}, function (err, users) {
            if (err) {
                res.send('There no users =(');
            }
            res.send(users);
        });
    };
    ApiUserRouter.prototype.apiUsersDelete = function (req, res) {
        console.log(req.body.list);
        req.body.list.forEach(function (elem) {
            ApiUser_1.default.deleteOne({ email: elem }, function (err) { });
        });
        res.send('okay=)');
    };
    ApiUserRouter.prototype.routes = function () {
        this.router.post('/create', this.apiUserCreate);
        this.router.get('/get_all', this.apiUserGetAll);
        this.router.post('/delete_users', this.apiUsersDelete);
    };
    return ApiUserRouter;
}());
//export
var apiUserRoutes = new ApiUserRouter();
apiUserRoutes.routes();
var apiUserRoutesexp = apiUserRoutes.router;
exports.default = apiUserRoutesexp;
//# sourceMappingURL=ApiUserRouter.js.map