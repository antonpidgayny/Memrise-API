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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApiUser_1 = require("../../models/ApiUser");
var ApiAdminList_1 = require("../../models/ApiAdminList");
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
                            var date = new Date();
                            Slave_1.default.mongooseActionsPromisify(ApiBannedUsers_1.default, 'findOneAndUpdate', { _id: elem._id }, { "$set": { "active": false, "unbanDate": date } }, { new: true })
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
        return __awaiter(this, void 0, void 0, function () {
            var BanList_1, resp_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Slave_1.default.mongoosePromisify(ApiBannedUsers_1.default, 'find', {})];
                    case 1:
                        BanList_1 = _a.sent();
                        resp_1 = {};
                        Object.keys(BanList_1).forEach(function (key) {
                            if (key != 'admin') {
                                resp_1[key] = BanList_1.key;
                            }
                        });
                        res.send(resp_1);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res.send(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
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
                Slave_1.default.mongoosePromisify(ApiAdminList_1.default, 'find', { email_fk: req.body.username })
                    .then(function (result) {
                    if (result.length) {
                        res.send("You don't have enough of rules");
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
                                var BreakException_1 = {};
                                try {
                                    result.forEach(function (elem) {
                                        if (elem.active === true) {
                                            throw BreakException_1;
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
                })
                    .catch(function (e) {
                    res.send(e);
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
        console.log('here');
        ApiUser_1.default.find({}, function (err, users) {
            if (err) {
                res.send('There no users =(');
            }
            res.send(users);
        });
    };
    ApiAdminUserRouter.prototype.deleteApiUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //check if user not admin
                req.body.list.forEach(function (elem) {
                    console.log(elem);
                    ApiUser_1.default.deleteOne({ email: elem }, function (err) { });
                });
                req.body.list.forEach(function (elem) {
                    ApiBannedUsers_1.default.deleteOne({ email_fk: elem }, function (err) { });
                });
                res.send('okay=)');
                return [2 /*return*/];
            });
        });
    };
    ApiAdminUserRouter.prototype.routes = function () {
        /*this.router.post('/create', this.apiUserCreate);
        this.router.get('/get_all', this.getApiUsersAll);
        this.router.post('/delete_users', this.deleteApiUsers);
        this.router.post('/ban_users', this.banApiUser);
        this.router.get('/see_banlist', this.getApiUsersBanList);
        this.router.post('/unban_user', this.unbanApiUser);*/
        this.router.post('/apiUserCreate', this.apiUserCreate);
        this.router.get('/getApiUsersAll', this.getApiUsersAll);
        this.router.post('/deleteApiUsers', this.deleteApiUsers);
        this.router.post('/banApiUser', this.banApiUser);
        this.router.get('/getApiUsersBanList', this.getApiUsersBanList);
        this.router.post('/unbanApiUser', this.unbanApiUser);
    };
    return ApiAdminUserRouter;
}(PrivilegeUserRouter_1.default));
//export
/*const apiAdminUserRouter = new ApiAdminUserRouter();
apiAdminUserRouter.routes();
const apiAdminUserRouterexp = apiAdminUserRouter.router;
export default apiAdminUserRouterexp;*/
exports.default = new ApiAdminUserRouter();
//# sourceMappingURL=ApiAdminUserRouter.js.map