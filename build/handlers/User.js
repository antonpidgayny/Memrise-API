"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DomParser = require('dom-parser');
var User = /** @class */ (function () {
    function User(user) {
        this.user_name = user;
    }
    User.prototype.setUserName = function (user) {
        this.user_name = user;
    };
    User.prototype.getInfo = function (callback) {
    };
    return User;
}());
exports.default = new User("");
//# sourceMappingURL=User.js.map