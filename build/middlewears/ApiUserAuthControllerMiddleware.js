"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var ApiUserAuthControllerMiddleware = /** @class */ (function () {
    function ApiUserAuthControllerMiddleware() {
    }
    ApiUserAuthControllerMiddleware.prototype.jwtApiKeyGetSecurity = function (req, res, next) {
        console.log(req.params.key);
        jwt.verify(req.query.key, process.env.jwt_api_key_hash, function (err, decoded) {
            if (err) {
                res.status(200).json({
                    success: false,
                    Message: 'You cant fool us'
                });
            }
            else {
                res.send(JSON.stringify({ status: "OK" }));
                //next();
            }
        });
    };
    ApiUserAuthControllerMiddleware.prototype.jwtApiKeyPostSecurity = function (req, res, next) {
        jwt.verify(req.body.key, process.env.jwt_api_key_hash, function (err, decoded) {
            if (err) {
                res.status(200).json({
                    success: false,
                    Message: 'You cant fool us'
                });
            }
            else {
                res.send(JSON.stringify({ status: "OK" }));
                //next();
            }
        });
    };
    ;
    return ApiUserAuthControllerMiddleware;
}());
//export
exports.default = new ApiUserAuthControllerMiddleware();
//# sourceMappingURL=ApiUserAuthControllerMiddleware.js.map