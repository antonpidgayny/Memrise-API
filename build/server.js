"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var express = require("express");
var helmet = require("helmet");
var mongoose = require("mongoose");
var logger = require("morgan");
var dotenv = require("dotenv");
var ApiUserRouter_1 = require("./router/ApiUserRouter");
var TestRouter_1 = require("./router/TestRouter");
dotenv.config();
/*require("isomorphic-fetch");
require('dotenv').config();*/
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        mongoose.connect(process.env.DB);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(logger('dev'));
        this.app.use(helmet());
        this.app.use(cors());
        // cors
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    };
    // application routes
    Server.prototype.routes = function () {
        var router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/apiuser', ApiUserRouter_1.default);
        this.app.use('/api/v1/test', TestRouter_1.default);
        //this.app.use('/api/v1/users', UserRouter);
    };
    Server.prototype.getApp = function () {
        return this.app;
    };
    return Server;
}());
// export
exports.default = new Server().getApp();
//# sourceMappingURL=server.js.map