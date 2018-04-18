"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ApiUser_1 = require("../models/ApiUser");
var jwt = require("jsonwebtoken");
var ApiUserRouter = /** @class */ (function () {
    function ApiUserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    ApiUserRouter.prototype.apiUserCreate = function (req, res) {
        var signUpDate = new Date();
        var email = req.body.email;
        var project = req.body.project;
        var api_key = jwt.sign({ email: email }, process.env.jwt_api_key_hash);
        if (!email || !project) {
            res.status(422).json({ message: 'Give for us email and project' });
        }
        ;
        var apiUser = new ApiUser_1.default({
            signUpDate: signUpDate,
            email: email,
            project: project,
            api_key: api_key
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
    ApiUserRouter.prototype.routes = function () {
        this.router.post('/create', this.apiUserCreate);
        this.router.get('/get_all', this.apiUserGetAll);
    };
    return ApiUserRouter;
}());
//export
var apiUserRoutes = new ApiUserRouter();
apiUserRoutes.routes();
var apiUserRoutesexp = apiUserRoutes.router;
exports.default = apiUserRoutesexp;
//# sourceMappingURL=ApiUserRouter.js.map