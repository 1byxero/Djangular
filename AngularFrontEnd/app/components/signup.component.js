"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var checksignin_service_1 = require('../services/checksignin.service');
var SignupComponent = (function () {
    function SignupComponent(signinservice, router) {
        this.signinservice = signinservice;
        this.router = router;
        this.user = {};
    }
    SignupComponent.prototype.OnSignUpClick = function () {
        var _this = this;
        this.signinservice.Signup(this.user.name, this.user.username, this.user.email, this.user.password)
            .then(function (data) { return _this.redirectornot(data); })
            .catch(function (error) { return console.log(error); });
    };
    SignupComponent.prototype.redirectornot = function (data) {
        if (data == "User created successfully") {
            alert(data);
            this.router.navigate(['/signin']);
        }
        else {
            alert(data);
        }
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'sign-up',
            templateUrl: 'app/templates/signup.html',
            styleUrls: ['app/styles/signin.css', "app/styles/bootstrap.min.css"]
        }), 
        __metadata('design:paramtypes', [checksignin_service_1.SignInService, router_1.Router])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map