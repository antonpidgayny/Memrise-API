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
var prom = require("es6-promisify");
var request = require("request");
var cookieSetHeaderParser = require("set-cookie-parser");
var Requester = /** @class */ (function () {
    function Requester() {
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
    Requester.prototype.getMemriseRequest = function (url, cookies_str, cookies_url) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, cookies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (cookies_url == undefined) {
                            cookies_url = url;
                        }
                        else {
                            this.headers.Referer = 'https://www.memrise.com/home/';
                        }
                        this.headers['Content-Type'] = 'text/html; charset=utf-8';
                        return [4 /*yield*/, this.requestGetPromisified({ url: url, jar: this.formCoookies(cookies_str, cookies_url), headers: this.headers })];
                    case 1:
                        resp = _a.sent();
                        cookies = cookieSetHeaderParser.parse(resp, {
                            decodeValues: true
                        });
                        return [2 /*return*/, ({ cookie: cookies, body: resp.body })];
                }
            });
        });
    };
    Requester.prototype.postMemriseRequest = function (url, cookies_str, form) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, cookies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                        return [4 /*yield*/, this.requestPostPromisified({ url: url, jar: this.formCoookies(cookies_str, url), headers: this.headers, form: form })];
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
    Requester.prototype.formCoookies = function (cookies_str, url) {
        var j = request.jar();
        var cookie = '';
        //console.log(cookies_str);
        cookies_str.split(';').forEach(function (elem) {
            j.setCookie(request.cookie(elem), url);
        });
        console.log(j);
        //console.log(j);
        return j;
    };
    Requester.prototype.getCookies = function (str) {
        var pos = str.search("csrfmiddlewaretoken");
        return str.slice(pos + 28, pos + 92);
    };
    Requester.prototype.getUnusualCookies = function (str) {
        var pos = str.search("csrftoken");
        return str.slice(pos + 12, pos + 76);
    };
    Requester.prototype.getLevel = function (str) {
        var pos = str.search("data-level-id");
        return str.slice(pos + 15, pos + 22);
    };
    Requester.prototype.add = function (list, url, cookie_str) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, csrfmiddlewaretoken, level, form;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMemriseRequest(url, cookie_str, undefined)];
                    case 1:
                        resp = _a.sent();
                        csrfmiddlewaretoken = this.getUnusualCookies(resp.body);
                        level = this.getLevel(resp.body);
                        url = "https://www.memrise.com/ajax/level/thing/add/";
                        form = {
                            "columns": { "1": "llol", "2": "d" },
                            "level_id": level
                        };
                        cookie_str = (cookie_str.split(';')[0] + ';' + "csrftoken=" + csrfmiddlewaretoken);
                        console.log("chto?", cookie_str);
                        //return level;
                        this.headers['x-csrftoken'] = csrfmiddlewaretoken;
                        return [4 /*yield*/, this.postMemriseRequest(url, cookie_str, form)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Requester.prototype.create = function (obj, url, cookie_str) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, csrfmiddlewaretoken, form;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMemriseRequest(url, cookie_str, undefined)];
                    case 1:
                        resp = _a.sent();
                        csrfmiddlewaretoken = this.getCookies(resp.body);
                        form = {
                            'csrfmiddlewaretoken': csrfmiddlewaretoken,
                            'name': obj.name,
                            'target': 6,
                            'source': 10,
                            'tags': obj.tags,
                            'description': obj.desc,
                            'short_description': obj.short
                        };
                        //console.log(cookie_str);
                        cookie_str = (cookie_str.split(';')[0] + ';' + "csrftoken=" + csrfmiddlewaretoken);
                        return [4 /*yield*/, this.postMemriseRequest(url, cookie_str, form)];
                    case 2: 
                    //return 'success';
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Requester.prototype.auth = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, csrfmiddlewaretoken, form, cookie_str, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getMemriseRequest(url, "", undefined)];
                    case 1:
                        resp = _a.sent();
                        csrfmiddlewaretoken = this.getCookies(resp.body);
                        form = {
                            'csrfmiddlewaretoken': csrfmiddlewaretoken,
                            'username': process.env.email,
                            'password': process.env.password,
                            'next': ''
                        };
                        cookie_str = 'csrftoken=' + csrfmiddlewaretoken + ';';
                        url = 'https://www.memrise.com';
                        return [4 /*yield*/, this.postMemriseRequest('https://www.memrise.com/login/', cookie_str, form)];
                    case 2:
                        resp = _a.sent();
                        cookie_str = resp.cookie['1'].name + '=' + resp.cookie['1'].value + '; ';
                        return [4 /*yield*/, this.getMemriseRequest("https://www.memrise.com/home/", cookie_str, undefined)];
                    case 3:
                        resp = _a.sent();
                        return [2 /*return*/, resp.cookie];
                    case 4:
                        e_1 = _a.sent();
                        console.log(e_1);
                        throw "lol";
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Requester;
}());
//export
exports.default = new Requester();
//# sourceMappingURL=Requester.js.map