"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DomParser = require('dom-parser');
var Course = /** @class */ (function () {
    function Course(Name, Id) {
        this.name = Name;
        this.id = Id;
    }
    Course.prototype.setName = function (Name) { this.name = Name; };
    Course.prototype.getName = function () { return this.name; };
    Course.prototype.setID = function (Id) { this.id = Id; };
    Course.prototype.getID = function () { return this.id; };
    Course.prototype.getLessonByID = function (ID, callback) {
    };
    Course.prototype.getCourse = function (callback) {
    };
    ;
    return Course;
}());
exports.default = new Course("", "");
//# sourceMappingURL=Course.js.map