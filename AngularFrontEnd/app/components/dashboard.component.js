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
var fetchuserdata_service_1 = require('../services/fetchuserdata.service');
var DashboardComponent = (function () {
    function DashboardComponent(fetchmeetingsService) {
        this.fetchmeetingsService = fetchmeetingsService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.meetingsObject = this.fetchmeetingsService.getMeetings()
            .then(function (data) { return _this.meetingsObject = data; })
            .catch(function (error) { return console.log(error); });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: 'app/templates/dashboard.html',
            styleUrls: ['app/styles/navbar-static-top.css', 'app/styles/bootstrap.min.css']
        }), 
        __metadata('design:paramtypes', [fetchuserdata_service_1.FetchmeetingsService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map