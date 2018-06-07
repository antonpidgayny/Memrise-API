"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ApiUserAuthControllerMiddleware_1 = require("../middlewears/ApiUserAuthControllerMiddleware");
var ApiAdminUserRouter_1 = require("./UserRoutes/ApiAdminUserRouter");
var TestRouter = /** @class */ (function () {
    function TestRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    TestRouter.prototype.routes = function () {
        this.router.post('/apiUserCreate', ApiAdminUserRouter_1.default.apiUserCreate);
        this.router.post('*', ApiUserAuthControllerMiddleware_1.default.jwtApiKeyPostSecurity);
        this.router.get('*', ApiUserAuthControllerMiddleware_1.default.jwtApiKeyGetSecurity);
        //this.router.get('/getcourseinfo', ApiUserAuthControllerMiddleware.jwtApiKeyGetSecurity);
        //this.router.post('/', ApiUserAuthControllerMiddleware.jwtApiKeyPostSecurity, this.goToMemriseHomePage);
        //this.router.get('/', ApiUserAuthControllerMiddleware.jwtApiKeyGetSecurity, this.goToMemriseHomePage);
    };
    TestRouter.prototype.getRouter = function () {
        return this.router;
    };
    return TestRouter;
}());
//export
var testRoutes = new TestRouter();
testRoutes.routes();
var testRoutesexp = testRoutes.getRouter();
exports.default = testRoutesexp;
//# sourceMappingURL=TestRouter.js.map