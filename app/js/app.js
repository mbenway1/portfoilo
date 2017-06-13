'use strict';
//var portfolioApp = angular.module("portfolioApp", ['ngRoute']),
var appMenu,
    hireBtn,
    homeFunction;
//var portfoliioFunction;
//var photographyFunction;

var portfolioApp = angular.module("portfolioApp", ['ngRoute']).config(function ($routeProvider, $locationProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl: '../pages/home.html',
            controller: 'mainController'
        })

        // route for the about page
        .when('/portfolio', {
            templateUrl: '../pages/portfolio.html',
            controller  : 'portfolioController'
        })

        // route for the contact page
        .when('/photography', {
            templateUrl: '../pages/photography.html',
            controller  : 'photographyController'
        })
        // route for anything besides whats listed, this also fixes the back button so it goes to the home page
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode({enabled: true, requireBase: false});
});



window.onbeforeunload = function () {
    var pathname = window.location.pathname;
    //console.log(pathname);
    if (pathname == "/photography" || pathname == "/portfolio") {
        return false;
    }
};

