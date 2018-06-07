"use strict";
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
var jwt = require("jsonwebtoken");
var ApiAdminList_1 = require("../models/ApiAdminList");
var ApiMasterList_1 = require("../models/ApiMasterList");
var Slave_1 = require("../handlers/Slave");
var ApiUserRouter_1 = require("../router/UserRoutes/ApiUserRouter");
var ApiAdminUserRouter_1 = require("../router/UserRoutes/ApiAdminUserRouter");
var ApiMasterUserRouter_1 = require("../router/UserRoutes/ApiMasterUserRouter");
var ApiUserAuthControllerMiddleware = /** @class */ (function () {
    function ApiUserAuthControllerMiddleware() {
    }
    ApiUserAuthControllerMiddleware.prototype.jwtApiKeyGetSecurity = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            function jwtVerifyPromisify(key, jwt_api_key_hash) {
                return __awaiter(this, void 0, void 0, function () {
                    var e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, jwt.verify(key, jwt_api_key_hash)];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                e_1 = _a.sent();
                                return [2 /*return*/, 'exception=)'];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            }
            var jwtVerifyResult, inMasters, func, inAdmins, func, func, e_2, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('ive received the message');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, jwtVerifyPromisify(req.query.key, process.env.jwt_api_key_hash)];
                    case 2:
                        jwtVerifyResult = _a.sent();
                        if (jwtVerifyResult === 'exception=)') {
                            throw {};
                        }
                        ;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 8, , 9]);
                        return [4 /*yield*/, Slave_1.default.mongoosePromisify(ApiMasterList_1.default, 'find', { email_fk: jwtVerifyResult })];
                    case 4:
                        inMasters = _a.sent();
                        if (!inMasters.length) return [3 /*break*/, 5];
                        func = req.url.split('?')[0].slice(1);
                        ApiMasterUserRouter_1.default[func](req, res);
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, Slave_1.default.mongoosePromisify(ApiAdminList_1.default, 'find', { email_fk: jwtVerifyResult })];
                    case 6:
                        inAdmins = _a.sent();
                        if (inAdmins.length) {
                            func = req.url.split('?')[0].slice(1);
                            ApiAdminUserRouter_1.default[func](req, res);
                        }
                        else {
                            func = req.url.split('?')[0].slice(1);
                            console.log("HOLOP");
                            ApiUserRouter_1.default[func](req, res);
                        }
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_2 = _a.sent();
                        res.send(e_2);
                        return [3 /*break*/, 9];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_3 = _a.sent();
                        res.status(200).json({
                            success: false,
                            Message: "You can't fool us!"
                        });
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ;
    ApiUserAuthControllerMiddleware.prototype.jwtApiKeyPostSecurity = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            function jwtVerifyPromisify(key, jwt_api_key_hash) {
                return __awaiter(this, void 0, void 0, function () {
                    var e_4;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, jwt.verify(key, jwt_api_key_hash)];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                e_4 = _a.sent();
                                return [2 /*return*/, 'exception=)'];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            }
            var jwtVerifyResult, inMasters, func, inAdmins, func, func, e_5, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        console.log(req.body);
                        return [4 /*yield*/, jwtVerifyPromisify(req.body.key, process.env.jwt_api_key_hash)];
                    case 1:
                        jwtVerifyResult = _a.sent();
                        if (jwtVerifyResult === 'exception=)') {
                            throw {};
                        }
                        ;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        return [4 /*yield*/, Slave_1.default.mongoosePromisify(ApiMasterList_1.default, 'find', { email_fk: jwtVerifyResult })];
                    case 3:
                        inMasters = _a.sent();
                        if (!inMasters.length) return [3 /*break*/, 4];
                        func = req.url.split('?')[0].slice(1);
                        ApiMasterUserRouter_1.default[func](req, res);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, Slave_1.default.mongoosePromisify(ApiAdminList_1.default, 'find', { email_fk: jwtVerifyResult })];
                    case 5:
                        inAdmins = _a.sent();
                        if (inAdmins.length) {
                            func = req.url.split('?')[0].slice(1);
                            ApiAdminUserRouter_1.default[func](req, res);
                        }
                        else {
                            func = req.url.split('?')[0].slice(1);
                            console.log(func);
                            ApiUserRouter_1.default[func](req, res);
                        }
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_5 = _a.sent();
                        res.send(e_5);
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_6 = _a.sent();
                        res.status(200).json({
                            success: false,
                            Message: "You can't fool us!"
                        });
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ;
    return ApiUserAuthControllerMiddleware;
}());
//export
exports.default = new ApiUserAuthControllerMiddleware();
//# sourceMappingURL=ApiUserAuthControllerMiddleware.js.map