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
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var router_1 = require('@angular/router');
var SignOutComponent = (function () {
    function SignOutComponent(signinservice, router) {
        this.signinservice = signinservice;
        this.router = router;
        this.user = {};
    }
    SignOutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSignedin = ng2_cookies_1.Cookie.get('SignedIn');
        if (this.isSignedin) {
            this.username = ng2_cookies_1.Cookie.get('username');
            this.token = ng2_cookies_1.Cookie.get('token');
            this.signinservice.Signout(this.username, this.token)
                .then(function (data) { return _this.destroysession(data); })
                .catch(function (error) { return console.log(error); });
        }
        else {
            this.router.navigate(['/home']);
        }
    };
    SignOutComponent.prototype.destroysession = function (requestresponse) {
        if (requestresponse == 'Signed out') {
            ng2_cookies_1.Cookie.deleteAll();
            location.reload();
        }
        else {
            alert(requestresponse);
        }
    };
    SignOutComponent = __decorate([
        core_1.Component({
            selector: 'sign-out',
            templateUrl: 'app/templates/signout.html',
            styleUrls: ['app/styles/signin.css', 'app/styles/bootstrap.min.css', 'app/styles/jumbotron.css']
        }), 
        __metadata('design:paramtypes', [checksignin_service_1.SignInService, router_1.Router])
    ], SignOutComponent);
    return SignOutComponent;
}());
exports.SignOutComponent = SignOutComponent;
//# sourceMappingURL=logout.component.js.map