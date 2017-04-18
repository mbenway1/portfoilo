'use strict';
var portfolioApp = angular.module("portfolioApp", ['ngRoute']);
var appMenu;
var homeFunction;
//var portfoliioFunction;
//var photographyFunction;

portfolioApp.config(function($routeProvider, $locationProvider) {
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
    $locationProvider.html5Mode(true);
});

portfolioApp.directive('portfolioHeader', function () {
   return {
       templateUrl: '../Partials/header.html',
       controller  : 'headerController',
       link        : function (scope, element) {

           appMenu = document.getElementsByClassName("nav-wrapper");
       }
   };
});


