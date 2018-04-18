"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Slave_1 = require("./Slave");
var DomParser = require('dom-parser');
var Course = /** @class */ (function () {
    function Course() {
    }
    Course.prototype.setURL = function (url) { this.Url = url; };
    Course.prototype.getURL = function () { return this.Url; };
    Course.prototype.getLessonByID = function (id, callback) {
        var url = this.Url + id + '/';
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
        Slave_1.default.webPageToStr(this.Url, function (err, html) {
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
exports.default = new Course();
//# sourceMappingURL=Course.js.map