"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ApiUsersListSchema = new mongoose_1.Schema({
    signUpDate: Date,
    email: { type: String, unique: true },
    project: { type: String },
});
exports.default = mongoose_1.model('ApiUsersList', ApiUsersListSchema);
//# sourceMappingURL=ApiUser.js.map