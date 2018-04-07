"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ApiUserSchema = new mongoose_1.Schema({
    signUpDate: Date,
    email: { type: String, unique: true },
    project: { type: String },
    api_key: { type: String, unique: true },
});
exports.default = mongoose_1.model('ApiUser', ApiUserSchema);
//# sourceMappingURL=ApiUser.js.map