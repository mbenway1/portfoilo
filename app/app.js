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
            var header, headerHeight, video, videoHeight, about, aboutHeight,
                portfolio, portfolioHeight, photography, videoFullHeight, portfolioTotalHeight,
                photographyAlignment, hireHeight, photographySetHeight, photographyImageHeight, visiblePortfolio, portfolioTop,
                lastScrollY = 0,
                lastWidth = 0,
                ticking = false,
                resizeTicking = false;

            function alignPhotographyHire () {
// This function is completely working and also in the update and resize being called
                var windowHeight = window.innerHeight;
                headerHeight = $("section.header").height();
                videoHeight = $("div.video-container").outerHeight();
                videoFullHeight = videoHeight + headerHeight;
                aboutHeight = $("div.about-container").outerHeight();
                portfolioHeight = $("div.portfolio-container").outerHeight();
                hireHeight = $("div.hire-container").outerHeight();
                var portfolioId = document.getElementById('portfolio-section'),
                    style = window.getComputedStyle(portfolioId);
                portfolioTop = Number(style.getPropertyValue('top').replace("px", ""));
                portfolioTotalHeight = portfolioHeight +  portfolioTop,
                photographyAlignment = ((videoFullHeight + aboutHeight) - portfolioTotalHeight),
                visiblePortfolio = 30, // The 70 here is a fixed number that I can make what I feel looks best
                photographySetHeight = windowHeight - (headerHeight + hireHeight + visiblePortfolio);
                console.log("PortfolioTop: " + portfolioTop);
                console.log("Window Height: " + windowHeight);
                if (windowHeight >= 300 && windowHeight <= 399)
                    photographyImageHeight = ((photographySetHeight + visiblePortfolio) * 6.5) * 1.75; // was 2 before I switched the link out of photography-container
                else if (windowHeight >= 400 && windowHeight <= 500)
                    photographyImageHeight = ((photographySetHeight + visiblePortfolio) * 4.5) * 1.75; // was 2 before I switched the link out of photography-container
                else if (windowHeight >= 501 && windowHeight <= 600)
                    photographyImageHeight = ((photographySetHeight + visiblePortfolio) * 3.5) * 1.75; // was 2 before I switched the link out of photography-container
                else
                    photographyImageHeight = ((photographySetHeight + visiblePortfolio) * 2.75) * 1.75; // was 2 before I switched the link out of photography-container
                //console.log(videoHeight, aboutHeight, portfolioHeight);

                $('div.photography-window').css({
                    top: -photographyAlignment + "px",
                    //marginBottom: photographyAlignment + "px",
                    height: photographySetHeight + "px"
                });
                $('div.photography-container').css("height", photographyImageHeight);
                $("div.hire-container").css("top", -photographyAlignment);
                //console.log(photographyAlignment, photographyImageHeight, photographySetHeight, windowHeight);
            }

            setTimeout(function () {

                alignPhotographyHire();
                //console.log(portfolioTotalHeight - (videoFullHeight + about));

            },90); // this may need to be longer for slower machines

            $('.welcome-container').addClass("slideIn");
            $('.hire-btn').click(function () {
                $(".hire-content").toggleClass('opened');

            });

            $("ul.nav>li>a").hover(function () {
                $(this).parent().toggleClass('over');
            });

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
                //console.log("window.pageYOffset: " + scrolltop + "px");
                //console.log("window.pageYOffset: " + scrolltop + "px", " Video Position: " + (-scrolltop * .7) + "px", " About Position: " + (-scrolltop * .75) + "px");


                if (350 >= scrolltop) {
                    welcome.css({'top': scrolltop * .35 + 'px', 'z-index': '2'}); // .3   move  at 30% of scroll rate
                    video.css('top', -scrolltop * .7 + 'px'); // move  at 50% of scroll rate
                }
                else {
                    welcome.css('z-index', '-3');
                }
                if (1200 >= scrolltop) {
                    //console.log("Banner bottom location:  " + bannerPosition + "px, scroll position" + scrolltop + "px");
                    about.css('top', -scrolltop * .75 + 'px'); //  1.2

                }
                //console.log("bottom of page position: " + (windowHeight + scrolltop));
                // this determines the positon to trigger the photography link to arise. the .6 is 60% of the photography-wrapper in
                if ((portfolioTotalHeight + (photographySetHeight * .6)) <= (windowHeight + scrolltop)) {
                    console.log("triggered!");
                    var photographyWraperPosition = (portfolioTotalHeight + (photographySetHeight * .6)) - (windowHeight + scrolltop); // - in front makes it positive
                    //console.log(-photographyWraperPosition * .6);
                    $('div.photography-wraper').css("top", (-photographyWraperPosition * .9) - 100 ); // - 100 to account for the height of the element so you see no jump, the .9 is just to set the speed of how it goes down. cannot be over 1 or it will do the opposite
                }

                if (windowHeight + scrolltop >= portfolioTotalHeight) {
////////////////////// This ling right below is the one that is causing the issues with the white space above and below the image depending on browsers size, looks like its going to nee parameters for heights and widths unless I can come up with a better formula
                    /*
                    var photographyVariable = 50;
                    if (windowWidth >= 1441 && windowWidth <= 1920) {
                        photographyVariable = 50;
                        if (windowHeight >= 801 && windowHeight <= 1080) {
                            photographyVariable = 75;
                        }
                        else if (windowHeight >=  && windowHeight <= 800) {
                            photographyVariable = 75;
                        }

                    }
                    else if (windowWidth >= 1141 && windowWidth <= 1440) {
                        photographyVariable = 30;

                    }
                    */
                    var photograhyFormula = -((windowHeight + scrolltop - portfolioHeight + 120) - windowHeight); //  was -33 not sure why?? might be to overlap by 3 px of the set figure of 30 of visiblePortfolio


////////////////////// End
                    //console.log("Photography Position: " + photographyPosition + "px, ", "pageYOffset: " + scrolltop + "px, ", "Portfolio Height: " + portfolioTotalHeight + "px, ", "windowHeight: " + windowHeight + "px ", "portfolioTop: " + portfolioTop + "px ", "PortfolioHeight: " + portfolioHeight + "px ", "photogrraphyAlignment: " + photographyAlignment + "px");
                    //console.log((scrolltop * 1.75) - scrolltop);
                    //console.log("windowHeight:            " + windowHeight);
                    //console.log("photographyFormula:      " + photograhyFormula); // sure where the 33 comes from but stays the same at all browser widths
                    //console.log("photographyTopValue:     " + photograhyFormula * 1.75, "photographyImgHeight: " + photographyImageHeight);
                    //console.log("photographyWindowHeight: " + photographySetHeight + "  (photographySetHeight)");
                    //console.log("Photo img height Formula:  ((photographySetHeight + visiblePortfolio) * 2) * 1.75, visiblePortfolio is set at 30");
                    //console.log("photographyFormula: -((windowHeight + scrolltop - portfolioHeight - 33) - windowHeight)");
                    // The amazing zeroing formula!!!
                    /*
                    if (windowWidth < 580) {
                        if (windowHeight < 650)
                            photography.css({top: photograhyFormula * 1.55  + 'px', height: photographyImageHeight + "px"});
                        else
                            photography.css({top: photograhyFormula * 1.65  + 'px', height: photographyImageHeight + "px"});
                    }
                    else if (windowWidth < 768) {
                        if (windowWidth >= 580)
                            photography.css({top: photograhyFormula * 1.5  + 'px', height: photographyImageHeight + "px"});
                    }
                    else if (windowWidth >= 768) {
                        if (windowHeight <= 660)
                            photography.css({top: photograhyFormula * 1.65  + 'px', height: photographyImageHeight + "px"});
                        else
                            photography.css({top: photograhyFormula * 1.75  + 'px', height: photographyImageHeight + "px"});
                    }
                    else
                    */
                    photography.css({top: photograhyFormula * 1.75  + 'px', height: photographyImageHeight + "px"});
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
                alignPhotographyHire();
                update();
                //console.log("working");
                //console.log(window.innerWidth + "px");
                /*
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
                */
            }
            // only listen for resize events
            window.addEventListener('resize', resizeOnRender, false);


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

