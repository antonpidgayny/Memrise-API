"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ApiUser_1 = require("../../models/ApiUser");
var UserRouter_1 = require("./AbstractUserRouteClasses/UserRouter");
var jwt = require("jsonwebtoken");
var ApiUserRouter = /** @class */ (function (_super) {
    __extends(ApiUserRouter, _super);
    function ApiUserRouter() {
        return _super.call(this) || this;
    }
    /*public getCourseInfo(req : Request, res : Response) : void{
        console.log(req.query.url);
        let id;
        let name;
        Course.setID(id);
        Course.setName(name);
        Course.getCourse(function(err, info){
            res.send(JSON.stringify({'info' : info }));
        });
    }
    public getUserInfo(req : Request, res : Response) : void{
        console.log(req.query.username);
        if (req.query.username){
            User.setUserName(req.query.username);
            User.getInfo(function(err, result){
                res.send(JSON.stringify({result : result}));
            });
        }else{
            res.send("username argument can't be empty");
        }
    }*/
    ApiUserRouter.prototype.apiUserCreate = function (req, res) {
        var signUpDate = new Date();
        var email = req.body.email;
        var project = req.body.project;
        if (!email || !project) {
            res.status(422).json({ message: 'Give for us email and project' });
        }
        ;
        var apiUser = new ApiUser_1.default({
            signUpDate: signUpDate,
            email: email,
            project: project,
        });
        var api_key = jwt.sign({ email: email }, process.env.jwt_api_key_hash);
        apiUser.save()
            .then(function (data) {
            //data['token'] = api_key;
            res.status(201).json({ api_key: api_key });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
    ApiUserRouter.prototype.routes = function () {
        this.router.post('/create', this.apiUserCreate);
    };
    return ApiUserRouter;
}(UserRouter_1.default));
//export
/*const apiUserRoutes = new ApiUserRouter();
apiUserRoutes.routes();
const apiUserRoutesexp = apiUserRoutes.router;
export default apiUserRoutesexp;*/
exports.default = new ApiUserRouter();
//# sourceMappingURL=ApiUserRouter.js.map