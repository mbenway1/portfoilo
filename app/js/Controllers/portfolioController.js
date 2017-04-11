angular.module('portfolioApp')
    .controller('portfolioController', function ($scope) {
// line below was for when it was inside app.js
//portfolioApp.controller('portfolioController', function($scope) {

        // create a message to display in our view
        $scope.message = 'This is the portfolio page';
    });
