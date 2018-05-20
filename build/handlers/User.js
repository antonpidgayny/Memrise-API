"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Slave_1 = require("./Slave");
var DomParser = require('dom-parser');
var User = /** @class */ (function () {
    function User(user) {
        this.user_name = user;
    }
    User.prototype.getContent = function (k, callback) {
        var url = "https://www.memrise.com/user/" + this.user_name + "/";
        if (k === 0) {
            url += "mempals/following/";
        }
        else if (k === 1) {
            url += "mempals/followers/";
        }
        Slave_1.default.webPageToStr(url, function (err, html) {
            var parser = new DomParser();
            var dom = parser.parseFromString(html);
            var things = dom.getElementsByTagName("strong");
            var count = parseInt(things[k].textContent.split(",").join(''));
            var content = [];
            if (k === 0 || k === 1) {
                var nodes = dom.getElementsByClassName("username");
                nodes.forEach(function (item, i, arr) {
                    content.push(item.textContent.slice(2, -2));
                });
            }
            return callback(null, count, content);
        });
    };
    User.prototype.getFollowings = function (callback) {
        this.getContent(0, callback);
    };
    User.prototype.getFollowers = function (callback) {
        this.getContent(1, callback);
    };
    User.prototype.getWordsCount = function (callback) {
        this.getContent(2, callback);
    };
    User.prototype.getPoints = function (callback) {
        this.getContent(3, callback);
    };
    User.prototype.getCourses = function (learning_or_teaching, callback) {
        var url = "https://www.memrise.com/user/" + this.user_name + "/courses/" + learning_or_teaching + "/";
        Slave_1.default.webPageToStr(url, function (err, html) {
            var parser = new DomParser();
            var dom = parser.parseFromString(html);
            var courses = [];
            dom.getElementsByClassName("picture-wrapper").forEach(function (item, i, arr) {
                courses.push({
                    name: item.attributes[0].value.split('/')[3],
                    id: item.attributes[0].value.split('/')[2]
                });
            });
            var count = courses.length;
            return callback(null, count, courses);
        });
    };
    User.prototype.setUserName = function (user) {
        this.user_name = user;
    };
    User.prototype.getInfo = function (callback) {
        var _this = this;
        this.getFollowings(function (err, followingsCount, followings) {
            _this.getFollowers(function (err, followersCount, followers) {
                _this.getWordsCount(function (err, wordsCount) {
                    _this.getPoints(function (err, points) {
                        _this.getCourses("learning", function (err, CourseCountL, CoursesL) {
                            _this.getCourses("teaching", function (err, CourseCountT, CoursesT) {
                                var info = {
                                    Followings: followings,
                                    FollowingsCount: followingsCount,
                                    Followers: followers,
                                    FollowersCount: followersCount,
                                    WordsCount: wordsCount,
                                    Points: points,
                                    LearningCourses: CoursesL,
                                    LearningCoursesCount: CourseCountL,
                                    TeachingCourses: CoursesT,
                                    TeachingCoursesCount: CourseCountT
                                };
                                return callback(null, info);
                            });
                        });
                    });
                });
            });
        });
    };
    return User;
}());
exports.default = new User("");
//# sourceMappingURL=User.js.map