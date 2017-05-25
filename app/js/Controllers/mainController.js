angular.module('portfolioApp')
    .controller('mainController', function ($scope, $window) {
// line below was for when it was inside app.js
//portfolioApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.welcomMessage = 'Welcome';

        // Populates the items that are in the portfolio tiles
        $scope.portfolioItem = [
            {
                name: 'FASS',
                source: 'img/thumb-fass.jpg'
            },
            {
                name: 'Meeting Template',
                source: 'img/thumb-meeting.jpg'
            },
            {
                name: 'Front & Center Gallery',
                source: 'img/thumb-fcg.png'
            },
            {
                name: "Shirley's Custom Lights and Signs",
                source: 'img/thumb-scls.png'
            }

        ];

    });