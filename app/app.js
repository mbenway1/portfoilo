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
            var header, video, about, portfolio, photography, pageHeight,
                lastScrollY = 0,
                lastWidth = 0,
                ticking = false,
                resizeTicking = false;
            /*
            setTimeout(function () {
                header = $("section.header").height();
                video = $("section.video-container").height();
                about = $("section.about-container").height();
                portfolio = $("section.portfolio-container").outerHeight();
                photography = $("section.photography-container").height();
                pageHeight = header + video + about + portfolio + photography;
                console.log(header, video, about, portfolio, photography, pageHeight);
            },90); // this may need to be longer for slower machines
            */
            $('.welcome-container').addClass("slideIn");


            // THIS FUNCTION HAS BEEN JUST COPIED FROM FASS SITE I MADE TO APPLY HERE HOW ITS NEEDED. DOES NOT WORK YET
            // Start of the parallax animations
            function onRender() {
                lastScrollY = window.pageYOffset;
                requestTick();
            }
            function requestTick() {
                if(!ticking)
                    requestAnimationFrame(update);
                ticking = true;
            }
            function update() {
                var windowWidth = window.innerWidth,
                    windowHeight = window.innerHeight,
                    header = $('section.header'),    // bannerPosition = bannerTrueHeight.outerHeight() - 15,
                    welcome = $('div.welcome-wrapper'),
                    video = $('div.video-container'),
                    about = $('div.about-container'),
                    portfolio = $("div.portfolio-container"),
                    photography = $('div.photography-container'),
                    photographyPosition = video.outerHeight() + about.outerHeight(),
                    scrolltop = window.pageYOffset;
                console.log("window.pageYOffset: " + scrolltop + "px", " Video Position: " + (-scrolltop * .7) + "px", " About Position: " + (-scrolltop * .75) + "px");

                if (10000 >= scrolltop) {
                    //console.log("Banner bottom location:  " + bannerPosition + "px, scroll position" + scrolltop + "px");
                    welcome.css({'top': scrolltop * .35 + 'px', 'z-index': '2'}); // .3   move  at 30% of scroll rate
                    video.css('top', -scrolltop * .7 + 'px'); // move  at 50% of scroll rate
                    about.css('top', -scrolltop * .75 + 'px'); //  1.2

                }
                else {
                    welcome.css('z-index', '-3');
                }
                if (windowHeight + scrolltop >= photographyPosition) {
                    //console.log("pageYOffset: " + scrolltop + "px, ", "testimonialPosition: " + testimonialPosition + "px, ", "windowHeight: " + windowHeight + "px");
                    if (windowWidth < 580) {
                        if (windowHeight < 650)
                            photography.css('top', ((-scrolltop + -windowHeight) + photographyPosition) * 1.4 + windowHeight + 'px');
                        else
                            photography.css('top', ((-scrolltop + -windowHeight) + photographyPosition) * 1.25 + windowHeight + 'px');
                    }
                    else if (windowWidth < 768) {
                        if (windowWidth >= 580)
                            photography.css('top', ((-scrolltop + -windowHeight) + photographyPosition) * 1.2 + windowHeight - 500 + 'px');
                    }
                    else if (windowWidth < 1025) {
                        if (windowWidth >= 768)
                            photography.css('top', ((-scrolltop + -windowHeight) + photographyPosition) * 1.45 + windowHeight - 440 + 'px');
                    }
                    else
                        photography.css('top', ((-scrolltop + -windowHeight) + photographyPosition) * 1.75 + windowHeight + 'px');
                }
                ticking = false;
            }
            // only listen for scroll events
            window.addEventListener('scroll', onRender, false);

            // Start of animation for resize
            function resizeOnRender() {
                lastWidth = window.innerWidth;
                requestWidthTick();
            }
            function requestWidthTick() {
                if(resizeTicking)
                    requestAnimationFrame(resizeUpdate);
                resizeTicking = true;
            }
            function resizeUpdate() {
                //console.log(window.innerWidth + "px");
                if (window.innerWidth >= 768)
                    if (body.hasClass('menuOpen'))
                        body.removeClass('menuOpen').addClass('mobileMenuWasOpen');
                if (window.innerWidth <= 767)
                    if (body.hasClass('mobileMenuWasOpen'))
                        body.removeClass('mobileMenuWasOpen').addClass("menuOpen");
                if (workTogetherHeader.outerHeight() > 50)
                    workTogetherHeader.addClass('twoLines');
                else
                    workTogetherHeader.removeClass('twoLines');
            }
            // only listen for resize events
            //window.addEventListener('resize', resizeOnRender, false);


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

