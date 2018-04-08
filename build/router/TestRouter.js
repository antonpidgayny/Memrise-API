"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ApiUserAuthControllerMiddleware_1 = require("../middlewears/ApiUserAuthControllerMiddleware");
var TestRouter = /** @class */ (function () {
    function TestRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    TestRouter.prototype.routes = function () {
        this.router.post('/', ApiUserAuthControllerMiddleware_1.default.jwtApiKeyPostSecurity);
        this.router.get('/', ApiUserAuthControllerMiddleware_1.default.jwtApiKeyGetSecurity);
    };
    return TestRouter;
}());
//export
var testRoutes = new TestRouter();
testRoutes.routes();
var testRoutesexp = testRoutes.router;
exports.default = testRoutesexp;
//# sourceMappingURL=TestRouter.js.map