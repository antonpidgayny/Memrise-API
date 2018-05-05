"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ApiUser_1 = require("../../models/ApiUser");
var MasterUserRouter_1 = require("./AbstractUserRouteClasses/MasterUserRouter");
var jwt = require("jsonwebtoken");
var ApiMasterUserRouter = /** @class */ (function (_super) {
    __extends(ApiMasterUserRouter, _super);
    function ApiMasterUserRouter() {
        return _super.call(this) || this;
    }
    ApiMasterUserRouter.prototype.makeAdmin = function (req, res) {
    };
    ApiMasterUserRouter.prototype.revokeAdmin = function (req, res) {
    };
    ApiMasterUserRouter.prototype.getApiAdminsAll = function (req, res) {
    };
    ApiMasterUserRouter.prototype.unbanApiUser = function (req, res) {
    };
    ApiMasterUserRouter.prototype.getApiUsersBanList = function (req, res) {
    };
    ApiMasterUserRouter.prototype.banApiUser = function (req, res) {
        req.body.list.forEach(function (elem) {
        });
    };
    ApiMasterUserRouter.prototype.apiUserCreate = function (req, res) {
        var signUpDate = new Date();
        var email = req.body.email;
        var project = req.body.project;
        if (!email || !project) {
            res.status(422).json({ message: 'Give for us email and project' });
        }
        ;
        var apiUser = new ApiUser_1.default({
            signUpDate: signUpDate,
            email: email,
            project: project,
        });
        var api_key = jwt.sign({ email: email }, process.env.jwt_api_key_hash);
        apiUser.save()
            .then(function (data) {
            //data['token'] = api_key;
            res.status(201).json({ api_key: api_key });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    ApiMasterUserRouter.prototype.getApiUsersAll = function (req, res) {
        ApiUser_1.default.find({}, function (err, users) {
            if (err) {
                res.send('There no users =(');
            }
            res.send(users);
        });
    };
    ApiMasterUserRouter.prototype.deleteApiUsers = function (req, res) {
        req.body.list.forEach(function (elem) {
            ApiUser_1.default.deleteOne({ email: elem }, function (err) { });
        });
        res.send('okay=)');
    };
    ApiMasterUserRouter.prototype.masterYell = function (req, res) {
        console.log('YEeeeeeeeeeeeeell!!!');
    };
    ApiMasterUserRouter.prototype.makeMaster = function (req, res) {
    };
    ApiMasterUserRouter.prototype.routes = function () {
        this.router.post('/create', this.apiUserCreate);
        this.router.get('/yell', this.masterYell);
        this.router.get('/get_all', this.getApiUsersAll);
        this.router.post('/delete_users', this.deleteApiUsers);
        this.router.get('', this.getApiAdminsAll);
    };
    return ApiMasterUserRouter;
}(MasterUserRouter_1.default));
//export
var apiMasterUserRouter = new ApiMasterUserRouter();
apiMasterUserRouter.routes();
var apiMasterUserRouterexp = apiMasterUserRouter.router;
exports.default = apiMasterUserRouterexp;
//# sourceMappingURL=ApiMasterUserRouter.js.map