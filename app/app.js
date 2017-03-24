'use strict';
var portfolioApp = angular.module("portfolioApp", ['ngRoute']);
var appMenu;
var homeFunction;
var portfoliioFunction;
var photographyFunction;

portfolioApp.config(function($routeProvider, $locationProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController',
        })

        // route for the about page
        .when('/portfolio', {
            templateUrl : 'pages/portfolio.html',
            controller  : 'portfolioController'
        })

        // route for the contact page
        .when('/photography', {
            templateUrl : 'pages/photography.html',
            controller  : 'photographyController'
        });
    $locationProvider.html5Mode(true);
});

portfolioApp.directive('portfolioHeader', function () {
   return {
       templateUrl : 'Partials/header.html',
       controller  : 'headerController',
       link        : function (scope, element) {

           appMenu = document.getElementsByClassName("nav-wrapper");
       }
   };
});

portfolioApp.controller('headerController', function($scope) {


    $scope.animateMenu = function() {
        if (angular.element(appMenu).hasClass('closed')) {
            angular.element(appMenu).addClass('slideVertical');

            setTimeout(function () {
                angular.element(appMenu).addClass('slideHorizontal open').removeClass('closed');
            }, 500);
        }
        else if (angular.element(appMenu).hasClass('open')) {
            angular.element(appMenu).removeClass('slideHorizontal');

            setTimeout(function () {
                angular.element(appMenu).removeClass('slideVertical open').addClass('closed');
            }, 500);

        }
    };

    $scope.menuClose = function() {
        angular.element(appMenu).removeClass('slideHorizontal');

        setTimeout(function () {
            angular.element(appMenu).removeClass('slideVertical open').addClass('closed');
        }, 500);
    };
});

portfolioApp.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Welcome';
    homeFunction = function() {
        $(document).ready(function () {
            $('.welcome-container').addClass("slideIn");
        });
    };
    homeFunction();

});

portfolioApp.controller('portfolioController', function($scope) {

    // create a message to display in our view
    $scope.message = 'This is the portfolio page';
});

portfolioApp.controller('photographyController', function($scope) {

    // create a message to display in our view
    $scope.message = 'This is the photography page';
});

