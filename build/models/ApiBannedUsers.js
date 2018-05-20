"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ApiBannedUsersListSchema = new mongoose_1.Schema({
    banDate: Date,
    email_fk: String,
    banReason: String,
    unbanReason: String,
    admin: String,
    active: Boolean,
    unbanDate: Date
});
exports.default = mongoose_1.model('ApiBannedUsersList', ApiBannedUsersListSchema);
//# sourceMappingURL=ApiBannedUsers.js.map