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
var express_1 = require("express");
var Course_1 = require("../../../handlers/Course");
var User_1 = require("../../../handlers/User");
var Requester_1 = require("../../../handlers/Requester");
//import ApiUser from '../../../models/ApiUser';
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router();
        this.routes();
        this.cookies = '';
    }
    UserRouter.prototype.auth = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cookies_obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Requester_1.default.auth("https://www.memrise.com/login/")];
                    case 1:
                        cookies_obj = _a.sent();
                        //console.log(cookies_obj);
                        this.cookies = '';
                        this.cookies += cookies_obj['1'].name + '=' + cookies_obj['1'].value + '; ';
                        this.cookies += cookies_obj['0'].name + '=' + cookies_obj['0'].value + '; ';
                        res.send(this.cookies);
                        return [2 /*return*/, this.cookies];
                }
            });
        });
    };
    UserRouter.prototype.getSelfCourseInfo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.cookies);
                        return [4 /*yield*/, Requester_1.default.getMemriseRequest('https://www.memrise.com/ajax/courses/dashboard/?courses_filter=most_recent&offset=0&limit=50&get_review_count=false', this.cookies, 'https://www.memrise.com/home')];
                    case 1:
                        resp = _a.sent();
                        //************************************************************
                        //розпарсь Джи Сона
                        //*************************************************************
                        res.send(resp);
                        return [2 /*return*/];
                }
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