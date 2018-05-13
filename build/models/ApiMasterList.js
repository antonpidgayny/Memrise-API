"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ApiMasterListSchema = new mongoose_1.Schema({
    dateOfAppointment: Date,
    email_fk: String,
    position: String,
    master: String,
    active: Boolean,
    firedDate: Date,
    firedReason: String,
    absoluteHokageMaster: Boolean
});
exports.default = mongoose_1.model('ApiMasterList', ApiMasterListSchema);
//# sourceMappingURL=ApiMasterList.js.map