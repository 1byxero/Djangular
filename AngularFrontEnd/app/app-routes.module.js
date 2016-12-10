"use strict";
var router_1 = require('@angular/router');
var dashboard_component_1 = require('./components/dashboard.component');
var home_component_1 = require('./components/home.component');
var signup_component_1 = require('./components/signup.component');
var signin_component_1 = require('./components/signin.component');
var addmeeting_component_1 = require('./components/addmeeting.component');
var logout_component_1 = require('./components/logout.component');
exports.routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'signup', component: signup_component_1.SignupComponent },
    { path: 'signin', component: signin_component_1.SigninComponent },
    { path: 'addmeeting', component: addmeeting_component_1.AddMeetingComponent },
    { path: 'logout', component: logout_component_1.SignOutComponent },
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app-routes.module.js.map