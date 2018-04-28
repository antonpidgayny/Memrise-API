"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ApiAdminListSchema = new mongoose_1.Schema({
    dateOfAppointment: Date,
    email: { type: String, unique: true },
    position: String,
    master: String,
    active: Boolean,
    firedDate: Date,
    firedReason: String
});
exports.default = mongoose_1.model('ApiAdminList', ApiAdminListSchema);
//# sourceMappingURL=ApiAdminList.js.map