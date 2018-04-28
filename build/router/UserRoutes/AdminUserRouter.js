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
var jwt = require("jsonwebtoken");
var ApiAdminUserRouter = /** @class */ (function (_super) {
    __extends(ApiAdminUserRouter, _super);
    function ApiAdminUserRouter() {
        return _super.call(this) || this;
    }
    ApiAdminUserRouter.prototype.apiUserCreate = function (req, res) {
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
            res.status(201).json({ email: data.email, api_key: api_key });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    ApiAdminUserRouter.prototype.apiUserGetAll = function (req, res) {
        ApiUser_1.default.find({}, function (err, users) {
            if (err) {
                res.send('There no users =(');
            }
            res.send(users);
        });
    };
    ApiAdminUserRouter.prototype.apiUsersDelete = function (req, res) {
        req.body.list.forEach(function (elem) {
            ApiUser_1.default.deleteOne({ email: elem }, function (err) { });
        });
        res.send('okay=)');
    };
    ApiAdminUserRouter.prototype.routes = function () {
        this.router.post('/create', this.apiUserCreate);
        this.router.get('/get_all', this.apiUserGetAll);
        this.router.post('/delete_users', this.apiUsersDelete);
    };
    return ApiAdminUserRouter;
}(UserRouter));
//export
var apiAdminUserRouter = new ApiAdminUserRouter();
apiAdminUserRouter.routes();
var apiAdminUserRoutersexp = apiAdminUserRouter.router;
exports.default = apiAdminUserRouterexp;
//# sourceMappingURL=AdminUserRouter.js.map