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
var ApiBannedUsers_1 = require("../../models/ApiBannedUsers");
var PrivilegeUserRouter_1 = require("./AbstractUserRouteClasses/PrivilegeUserRouter");
var Slave_1 = require("../../handlers/Slave");
var jwt = require("jsonwebtoken");
var ApiAdminUserRouter = /** @class */ (function (_super) {
    __extends(ApiAdminUserRouter, _super);
    function ApiAdminUserRouter() {
        return _super.call(this) || this;
    }
    ApiAdminUserRouter.prototype.unbanApiUser = function (req, res) {
        Slave_1.default.mongoosePromisify(ApiBannedUsers_1.default, 'find', { email_fk: req.body.username })
            .catch(function (e) { return res.send(e); })
            .then(function (result) {
            if (!result.length) {
                res.send("User not in Ban List");
            }
            else {
                try {
                    result.forEach(function (elem) {
                        if (elem.active === true) {
                            Slave_1.default.mongooseActionsPromisify(ApiBannedUsers_1.default, 'findOneAndUpdate', { _id: elem._id }, { "$set": { "active": false } }, { new: true })
                                .then(function (result) {
                                res.send(req.body.username + " was unbanned");
                            })
                                .catch(function (e) { return res.send(e); });
                            throw {};
                        }
                    });
                    res.send(req.body.username + " don't have active bans");
                }
                catch (e) {
                    res.send(req.body.username + " was successful unbanned");
                }
            }
        });
    };
    ApiAdminUserRouter.prototype.getApiUsersBanList = function (req, res) {
        Slave_1.default.mongoosePromisify(ApiBannedUsers_1.default, 'find', {})
            .catch(function (e) { return res.send(e); })
            .then(function (result) { return res.send(result); });
    };
    ApiAdminUserRouter.prototype.banApiUser = function (req, res) {
        //somebody, add the condition on empty email)))0, it's not interesting for me(...
        function Ban(banDate, email_fk, banReason, unbanReason, admin, active, unbanDate) {
            var bannedUser = new ApiBannedUsers_1.default({
                banDate: banDate,
                email_fk: email_fk,
                banReason: banReason,
                unbanReason: unbanReason,
                admin: admin,
                active: active,
                unbanDate: unbanDate
            });
            return bannedUser.save();
        }
        Slave_1.default.mongoosePromisify(ApiUser_1.default, 'findOne', { email: req.body.username })
            .catch(function (e) { return res.send(e); })
            .then(function (result) {
            if (result === null) {
                res.send("User is undefined=)");
            }
            else {
                Slave_1.default.mongoosePromisify(ApiBannedUsers_1.default, 'find', { email_fk: req.body.username })
                    .catch(function (e) { return res.send(e); })
                    .then(function (result) {
                    var banDate = new Date();
                    var username = req.body.username;
                    var description = req.body.description;
                    var unbanDescr = '';
                    var admin = 'Test';
                    var active = true;
                    var unbanDate = new Date();
                    if (!result.length) {
                        Ban(banDate, username, description, unbanDescr, admin, active, unbanDate)
                            .then(function (data) { return res.send(data); })
                            .catch(function (e) { return res.send(e); });
                    }
                    else {
                        var BreakException = {};
                        try {
                            result.forEach(function (elem) {
                                if (elem.active === true) {
                                    throw BreakException;
                                }
                                if (result.indexOf(elem) === (result.length - 1)) {
                                    console.log('ya tut');
                                    Ban(banDate, username, description, unbanDescr, admin, active, unbanDate)
                                        .then(function (data) { return res.send(data); })
                                        .catch(function (e) { return res.send(e); });
                                }
                            });
                        }
                        catch (e) {
                            res.send('User is already banned');
                        }
                    }
                });
            }
        });
    };
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
            res.status(201).json({ api_key: api_key });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    ApiAdminUserRouter.prototype.getApiUsersAll = function (req, res) {
        ApiUser_1.default.find({}, function (err, users) {
            if (err) {
                res.send('There no users =(');
            }
            res.send(users);
        });
    };
    ApiAdminUserRouter.prototype.deleteApiUsers = function (req, res) {
        req.body.list.forEach(function (elem) {
            ApiUser_1.default.deleteOne({ email: elem }, function (err) { });
        });
        res.send('okay=)');
    };
    ApiAdminUserRouter.prototype.routes = function () {
        this.router.post('/create', this.apiUserCreate);
        this.router.get('/get_all', this.getApiUsersAll);
        this.router.post('/delete_users', this.deleteApiUsers);
        this.router.post('/ban_users', this.banApiUser);
        this.router.get('/see_banlist', this.getApiUsersBanList);
        this.router.post('/unban_user', this.unbanApiUser);
    };
    return ApiAdminUserRouter;
}(PrivilegeUserRouter_1.default));
//export
var apiAdminUserRouter = new ApiAdminUserRouter();
apiAdminUserRouter.routes();
var apiAdminUserRouterexp = apiAdminUserRouter.router;
exports.default = apiAdminUserRouterexp;
//# sourceMappingURL=ApiAdminUserRouter.js.map