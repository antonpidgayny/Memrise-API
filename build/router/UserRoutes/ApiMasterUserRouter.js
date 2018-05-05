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
var Slave_1 = require("../../handlers/Slave");
var MasterUserRouter_1 = require("./AbstractUserRouteClasses/MasterUserRouter");
var jwt = require("jsonwebtoken");
var ApiMasterUserRouter = /** @class */ (function (_super) {
    __extends(ApiMasterUserRouter, _super);
    function ApiMasterUserRouter() {
        return _super.call(this) || this;
    }
    ApiMasterUserRouter.prototype.makeAdmin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var Query, dateOfAppointment, email_fk, position, master, active, firedDate, firedReason, apiAdmin, save_return, banned, e_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, Slave_1.default.mongoosePromisify(ApiAdminList_1.default, 'find', { email_fk: req.body.email })];
                    case 1:
                        Query = _a.sent();
                        Query.forEach(function (elem) {
                            if (elem.active) {
                                throw "AlreadyAdmin=)";
                            }
                        });
                        dateOfAppointment = new Date();
                        email_fk = req.body.email;
                        position = req.body.description;
                        return [4 /*yield*/, Slave_1.default.jwtVerifyPromisify(req.body.key, process.env.jwt_api_key_hash)];
                    case 2:
                        master = _a.sent();
                        active = false;
                        firedDate = new Date();
                        firedReason = '';
                        apiAdmin = new ApiAdminList_1.default({
                            dateOfAppointment: dateOfAppointment,
                            email_fk: email_fk,
                            position: position,
                            master: master,
                            active: active,
                            firedDate: firedDate,
                            firedReason: firedReason
                        });
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        save_return = apiAdmin.save();
                        return [4 /*yield*/, Slave_1.default.mongoosePromisify(ApiBannedUsers_1.default, 'find', { email_fk: req.body.email })];
                    case 4:
                        banned = _a.sent();
                        banned.forEach(function (elem) {
                            if (elem.active) {
                                var date = new Date();
                                Slave_1.default.mongooseActionsPromisify(ApiBannedUsers_1.default, 'findOneAndUpdate', { _id: elem._id }, { "$set": { "active": false, "unbanDate": date } }, { new: true });
                            }
                        });
                        res.send(save_return);
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        throw e_1;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        res.send(e_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ApiMasterUserRouter.prototype.revokeAdmin = function (req, res) {
        //check if admin was in admin list
        //check admin status of admin
        //make admin status false
    };
    ApiMasterUserRouter.prototype.getApiAdminsAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                //very easy
                try {
                    list = Slave_1.default.mongoosePromisify(ApiAdminList_1.default, 'find', { email_fk: req.body.email });
                    res.send(list);
                }
                catch (e) {
                    res.send(e);
                }
                return [2 /*return*/];
            });
        });
    };
    ApiMasterUserRouter.prototype.unbanApiUser = function (req, res) {
        //like analog admin method ...
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
    ApiMasterUserRouter.prototype.getApiUsersBanList = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var BanList, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Slave_1.default.mongoosePromisify(ApiBannedUsers_1.default, 'find', {})];
                    case 1:
                        BanList = _a.sent();
                        res.send(BanList);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        res.send(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
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