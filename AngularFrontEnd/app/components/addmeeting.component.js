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
var AddMeetingComponent = (function () {
    function AddMeetingComponent(router, meetingservice) {
        this.router = router;
        this.meetingservice = meetingservice;
        this.addmeetingdata = {};
    }
    AddMeetingComponent.prototype.ngOnInit = function () {
        var checklogincookie = ng2_cookies_1.Cookie.get('SignedIn');
        if (checklogincookie) {
            console.log("null");
        }
        else {
            console.log("not null");
            this.router.navigate(['/signin']);
        }
    };
    AddMeetingComponent.prototype.onAddclicked = function () {
        var _this = this;
        this.addmeetingdata.username = ng2_cookies_1.Cookie.get("username");
        this.addmeetingdata.token = ng2_cookies_1.Cookie.get("token");
        this.meetingservice.addMeeting(this.addmeetingdata.username, this.addmeetingdata.token, this.addmeetingdata.meetdate, this.addmeetingdata.meettime, this.addmeetingdata.meetilocation, this.addmeetingdata.agenda)
            .then(function (data) { return _this.postAddmeeting(data); })
            .catch(function (error) { return console.log(error); });
    };
    AddMeetingComponent.prototype.postAddmeeting = function (requestresponse) {
        //show response and update last_seq cookies
        console.log(requestresponse);
        if (requestresponse == 'Meeting successfully created') {
            alert(requestresponse);
            this.addmeetingdata = {};
            this.router.navigate(['/addmeeting']);
        }
        else {
            alert(requestresponse);
        }
    };
    AddMeetingComponent = __decorate([
        core_1.Component({
            selector: 'addmeeting',
            templateUrl: 'app/templates/addmeeting.html',
            styleUrls: ['app/styles/signin.css', 'app/styles/bootstrap.min.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, fetchuserdata_service_1.FetchmeetingsService])
    ], AddMeetingComponent);
    return AddMeetingComponent;
}());
exports.AddMeetingComponent = AddMeetingComponent;
//# sourceMappingURL=addmeeting.component.js.map