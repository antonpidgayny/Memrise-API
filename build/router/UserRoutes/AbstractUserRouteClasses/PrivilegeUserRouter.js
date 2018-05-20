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
var UserRouter_1 = require("./UserRouter");
var PrivilegeUserRouter = /** @class */ (function (_super) {
    __extends(PrivilegeUserRouter, _super);
    function PrivilegeUserRouter() {
        return _super.call(this) || this;
    }
    return PrivilegeUserRouter;
}(UserRouter_1.default));
exports.default = PrivilegeUserRouter;
//# sourceMappingURL=PrivilegeUserRouter.js.map