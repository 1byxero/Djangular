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
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var AppComponent = (function () {
    function AppComponent() {
        this.isLoggedIn = false;
    }
    //write method to check if loggedin onInit
    AppComponent.prototype.ngOnInit = function () {
        var checklogincookie = ng2_cookies_1.Cookie.get('SignedIn');
        if (checklogincookie === 'true') {
            this.isLoggedIn = (checklogincookie === 'true');
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <div class=\"container\">\n    <div class=\"header clearfix\">\n        <nav>\n          <ul class=\"nav nav-pills pull-right\">\n            <li role=\"presentation\"><a routerLink=\"/home\" routerLinkActive=\"active\">Home</a></li>\n            <li role=\"presentation\" *ngIf=\"isLoggedIn\"><a routerLink=\"/dashboard\" routerLinkActive=\"active\">Dashboard</a></li>\n            <li role=\"presentation\"  *ngIf=\"!isLoggedIn\"><a routerLink=\"/signup\" routerLinkActive=\"active\">Signup</a></li>\n            <li role=\"presentation\"  *ngIf=\"!isLoggedIn\"><a routerLink=\"/signin\" routerLinkActive=\"active\">Sign In</a></li>\n          </ul>\n        </nav>\n        <h3 class=\"text-muted\">Sync-Meetings</h3>\n      </div>\n    <div class=\"container\">\n\t<router-outlet></router-outlet>\n  ",
            styleUrls: ['app/styles/bootstrap.min.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map