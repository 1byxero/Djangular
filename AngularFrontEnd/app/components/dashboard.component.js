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
var router_1 = require('@angular/router');
var fetchuserdata_service_1 = require('../services/fetchuserdata.service');
var DashboardComponent = (function () {
    function DashboardComponent(router, fetchdataservice) {
        this.router = router;
        this.fetchdataservice = fetchdataservice;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var checklogincookie = ng2_cookies_1.Cookie.get('SignedIn');
        if (checklogincookie) {
            this.username = ng2_cookies_1.Cookie.get('username');
            this.token = ng2_cookies_1.Cookie.get('token');
            this.fetchMeetings();
        }
        else {
            this.router.navigate(['/signin']);
        }
    };
    DashboardComponent.prototype.fetchMeetings = function () {
        var _this = this;
        this.fetchdataservice.getMeetings(this.username, this.token)
            .then(function (data) { return _this.showmeetingsandsavelastSeq(data); })
            .catch(function (error) { return console.log(error); });
    };
    DashboardComponent.prototype.showmeetingsandsavelastSeq = function (requestresponse) {
        this.meetingsObject = requestresponse.documents;
        ng2_cookies_1.Cookie.set('last_seq', requestresponse.last_seq);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: 'app/templates/dashboard.html',
            styleUrls: ['app/styles/navbar-static-top.css', 'app/styles/bootstrap.min.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, fetchuserdata_service_1.FetchmeetingsService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map