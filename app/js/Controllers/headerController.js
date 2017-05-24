angular.module('portfolioApp')
    .controller('headerController', function ($scope) {
// line below was for when it was inside app.js
//portfolioApp.controller('headerController', function($scope) {


        $scope.animateMenu = function () {
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

        $scope.menuClose = function () {
            angular.element(appMenu).removeClass('slideHorizontal');

            setTimeout(function () {
                angular.element(appMenu).removeClass('slideVertical open').addClass('closed');
            }, 500);
        };

        /*
        $scope.animateContact = function () {
         var pathname = window.location.pathname;
         if (pathname == "/") {
         console.log("test");
         }
         else {
         window.location.href = '/';
         }
         console.log("test");
            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: $(document).height()
         }, 2000);
         }, 1000);
            setTimeout(function () {
                angular.element(hireBtn).click();
            }, 1800);
        };
         */

        // Makes hover function work in menu
        $("ul.nav>li>a").hover(function () {
            $(this).parent().toggleClass('over');
        });

    });