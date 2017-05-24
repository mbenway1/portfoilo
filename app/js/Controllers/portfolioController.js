angular.module('portfolioApp')
    .controller('portfolioController', function ($scope, $window) {
// line below was for when it was inside app.js
//portfolioApp.controller('portfolioController', function($scope) {
        $window.scrollTo(0, 0);
        // create a message to display in our view
        $scope.message = 'This is the portfolio page';
    });
