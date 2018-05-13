"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Slave_1 = require("./Slave");
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
        var url = "https://www.memrise.com/course/" + this.id + '/' + this.name + '/' + ID + '/';
        Slave_1.default.webPageToStr(url, function (err, html) {
            var parser = new DomParser();
            var dom = parser.parseFromString(html);
            var things = dom.getElementsByClassName("thing text-text");
            var words = [];
            things.forEach(function (item, i, arr) {
                words.push({
                    word: item.getElementsByClassName("col_a col text")[0].textContent,
                    translation: item.getElementsByClassName("col_b col text")[0].textContent
                });
            });
            return callback(null, words);
        });
    };
    Course.prototype.getCourse = function (callback) {
        var _this = this;
        var parser = new DomParser();
        Slave_1.default.webPageToStr("https://www.memrise.com/course/" + this.id + '/' + this.name + '/', function (err, html) {
            var dom = parser.parseFromString(html);
            var lessons = dom.getElementsByClassName('level-index');
            var num_lessons = lessons.length;
            var course = [];
            var _loop_1 = function (i) {
                _this.getLessonByID(i, function (err, words) {
                    course.push({ lesson_id: i, words: words });
                    if (course.length === num_lessons) {
                        course.sort(function (a, b) {
                            if (a.lesson_id > b.lesson_id) {
                                return 1;
                            }
                            if (a.lesson_id < b.lesson_id) {
                                return -1;
                            }
                            return 0;
                        });
                        return callback(null, course);
                    }
                });
            };
            for (var i = 1; i <= num_lessons; i++) {
                _loop_1(i);
            }
        });
    };
    ;
    return Course;
}());
exports.default = new Course("", "");
//# sourceMappingURL=Course.js.map