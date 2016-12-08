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
var checksignin_service_1 = require('../services/checksignin.service');
var SigninComponent = (function () {
    function SigninComponent(signinservice) {
        this.signinservice = signinservice;
        this.user = {};
    }
    SigninComponent.prototype.onSigninSubmit = function () {
        this.signinservice.Signin(this.user.username, this.user.password)
            .then(function (data) { return console.log(data); })
            .catch(function (error) { return console.log(error); });
        //unsafe password should be hashed
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'sign-in',
            templateUrl: 'app/templates/signin.html',
            styleUrls: ['app/styles/signin.css', "app/styles/bootstrap.min.css"]
        }), 
        __metadata('design:paramtypes', [checksignin_service_1.SignInService])
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;
//# sourceMappingURL=signin.component.js.map