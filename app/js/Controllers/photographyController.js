angular.module('portfolioApp')
    .controller('photographyController', function ($scope) {
// line below was for when it was inside app.js
//portfolioApp.controller('photographyController', function($scope) {

        // create a message to display in our view
        $scope.message = 'This is the photography page';
    });
