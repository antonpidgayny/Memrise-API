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
var prom = require("es6-promisify");
var request = require("request");
var cookieSetHeaderParser = require("set-cookie-parser");
var Slave = /** @class */ (function () {
    function Slave() {
        this.headers = {
            'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            'Accept-Language': 'uk-UA,uk;q=0.9,ru;q=0.8,en-US;q=0.7,en;q=0.6',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'www.memrise.com',
            'Origin': 'https://www.memrise.com',
            'Pragma': 'no-cache',
            'Referer': 'https://www.memrise.com/login/',
            'Upgrade-Insecure-Requests': 1,
            'Accept-Charset': 'utf-8'
        },
            this.requestGetPromisified = prom.promisify(request.get),
            this.requestPostPromisified = prom.promisify(request.post);
    }
    Slave.prototype.mongoosePromisify = function (table, method, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, table[method](parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, e_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    Slave.prototype.mongooseActionsPromisify = function (table, method, condition, action, additional) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, table[method](condition, action, additional)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, e_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    Slave.prototype.jwtVerifyPromisify = function (key, jwt_api_key_hash) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, jwt.verify(key, jwt_api_key_hash)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_3 = _a.sent();
                        return [2 /*return*/, 'exception=)'];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    Slave.prototype.getMemriseRequest = function (url, cookies_str, cookies_url) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, cookies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (cookies_url == undefined) {
                            cookies_url = url;
                        }
                        return [4 /*yield*/, this.requestGetPromisified({ url: url, jar: this.formCoookies(cookies_str, cookies_url), headers: this.headers })];
                    case 1:
                        resp = _a.sent();
                        cookies = cookieSetHeaderParser.parse(resp, {
                            decodeValues: true // default: true
                        });
                        //console.log(resp);
                        return [2 /*return*/, ({ cookie: cookies, body: resp.body })];
                }
            });
        });
    };
    Slave.prototype.postMemriseRequest = function (url, cookies_str, form) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, cookies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requestPostPromisified({ url: url, jar: this.formCoookies(cookies_str, url), headers: this.headers, form: form })];
                    case 1:
                        resp = _a.sent();
                        cookies = cookieSetHeaderParser.parse(resp, {
                            decodeValues: true // default: true
                        });
                        return [2 /*return*/, ({ cookie: cookies, body: resp.body })];
                }
            });
        });
    };
    Slave.prototype.formCoookies = function (cookies_str, url) {
        var j = request.jar();
        var cookie = request.cookie(cookies_str);
        console.log(cookie);
        j.setCookie(cookie, url);
        return j;
    };
    Slave.prototype.auth = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, pos, csrfmiddlewaretoken, form, cookie_str, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getMemriseRequest(url, "")];
                    case 1:
                        resp = _a.sent();
                        pos = (resp.body.search("csrfmiddlewaretoken"));
                        console.log(pos);
                        csrfmiddlewaretoken = resp.body.slice(pos + 28, pos + 92);
                        form = {
                            'csrfmiddlewaretoken': csrfmiddlewaretoken,
                            'username': process.env.email,
                            'password': process.env.password,
                            'next': ''
                        };
                        cookie_str = 'csrftoken=' + csrfmiddlewaretoken;
                        url = 'https://www.memrise.com';
                        return [4 /*yield*/, this.postMemriseRequest('https://www.memrise.com/login/', cookie_str, form)];
                    case 2:
                        resp = _a.sent();
                        console.log(resp.cookie['1'].name);
                        cookie_str = resp.cookie['1'].name + '=' + resp.cookie['1'].value + '; ';
                        return [4 /*yield*/, this.getMemriseRequest("https://www.memrise.com/home/", cookie_str)];
                    case 3:
                        resp = _a.sent();
                        return [2 /*return*/, resp.cookie];
                    case 4:
                        e_4 = _a.sent();
                        console.log(e_4);
                        throw "lol";
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Slave;
}());
//export
exports.default = new Slave();
//# sourceMappingURL=Slave.js.map