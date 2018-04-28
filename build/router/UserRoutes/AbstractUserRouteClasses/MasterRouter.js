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
var MasterUserRouter = /** @class */ (function (_super) {
    __extends(MasterUserRouter, _super);
    function MasterUserRouter() {
        return _super.call(this) || this;
    }
    MasterUserRouter.prototype.apiUserGetAll = function (req, res) { };
    ;
    MasterUserRouter.prototype.apiUsersDelete = function (req, res) { };
    ;
    return MasterUserRouter;
}(PrivilegeUserRouter));
exports.default = MasterUserRouter;
//# sourceMappingURL=MasterRouter.js.map