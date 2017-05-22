angular.module('portfolioApp')
    .controller('mainController', function ($scope) {
// line below was for when it was inside app.js
//portfolioApp.controller('mainController', function($scope) {

        // create a message to display in our view
        $scope.welcomMessage = 'Welcome';
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

        homeFunction = function () {
            $(document).ready(function () {
                var header, headerHeight, video, videoHeight, about, aboutHeight,
                    portfolio, portfolioHeight, photography, videoFullHeight, portfolioTotalHeight,
                    photographyAlignment, hireHeight, photographySetHeight, photographyImageHeight, visiblePortfolio, portfolioTop,
                    lastScrollY = 0,
                    lastWidth = 0,
                    ticking = false,
                    resizeTicking = false;

                function alignPhotographyHire() {
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
                    portfolioTotalHeight = portfolioHeight + portfolioTop;
                    photographyAlignment = ((videoFullHeight + aboutHeight) - portfolioTotalHeight);
                    visiblePortfolio = 30; // The 30 here is a fixed number that I can make what I feel looks best (gap above hire box and the header)
                    photographySetHeight = windowHeight - (headerHeight + hireHeight + visiblePortfolio);
                    //console.log("PortfolioTop: " + portfolioTop);
                    //console.log("Window Height: " + windowHeight);
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
                        height: photographySetHeight + "px"
                    });
                    $('div.photography-container').css("height", photographyImageHeight);
                    $("div.hire-container").css("top", -photographyAlignment);
                    //console.log(photographyAlignment, photographyImageHeight, photographySetHeight, windowHeight);
                }

                setTimeout(function () {

                    alignPhotographyHire();
                    //console.log(portfolioTotalHeight - (videoFullHeight + about));

                }, 1000); // this may need to be longer for slower machines was 120, also tried 220 450 750 and still got it

                $('.welcome-container').addClass("slideIn");

                // This should be done via ng-click unless there is a reason it dont work.
                $('.hire-opener').click(function () {
                    $(".hire-content").toggleClass('opened');

                });


                // Start of the parallax animations
                function onRender() {
                    lastScrollY = window.pageYOffset;
                    requestTick();
                }

                function requestTick() {
                    if (!ticking)
                        requestAnimationFrame(update);
                    ticking = true;
                }

                function update() {
                    var windowWidth = window.innerWidth, // unused right now
                        windowHeight = window.innerHeight,
                        header = $('section.header'),    // bannerPosition = bannerTrueHeight.outerHeight() - 15,
                        welcome = $('div.welcome-wrapper'),
                        video = $('div.video-container'),
                        about = $('div.about-container'),
                        portfolio = $("div.portfolio-container"),
                        photography = $('div.photography-container'),
                        scrolltop = window.pageYOffset;
                    //console.log("window.pageYOffset: " + scrolltop + "px");
                    //console.log("window.pageYOffset: " + scrolltop + "px", " Video Position: " + (-scrolltop * .7) + "px", " About Position: " + (-scrolltop * .75) + "px");

                    if (550 >= scrolltop) {
                        welcome.css({'top': scrolltop * .35 + 'px', 'z-index': '2'}); // .35 move  at 35% of scroll rate
                        video.css('top', -scrolltop * .7 + 'px'); // .7 move  at 70% of scroll rate
                    }
                    else {
                        welcome.css('z-index', '-3');
                    }
                    if (1200 >= scrolltop) {
                        //console.log("Banner bottom location:  " + bannerPosition + "px, scroll position" + scrolltop + "px");
                        about.css('top', -scrolltop * .75 + 'px'); //  .75

                    }
                    //console.log("bottom of page position: " + (windowHeight + scrolltop));

                    // this determines the positon to trigger the photography link to arise. the .6 is 60% of the photography-wrapper in
                    if ((portfolioTotalHeight + (photographySetHeight * .6)) <= (windowHeight + scrolltop)) {
                        //console.log("triggered!");
                        var photographyWraperPosition = (portfolioTotalHeight + (photographySetHeight * .6)) - (windowHeight + scrolltop); // - in front makes it positive
                        //console.log(-photographyWraperPosition * .6);
                        $('div.photography-wraper').css("top", (-photographyWraperPosition * .9) - 100); // - 100 to account for the height of the element so you see no jump, the .9 is just to set the speed of how it goes down. cannot be over 1 or it will do the opposite
                    }

                    if (windowHeight + scrolltop >= portfolioTotalHeight) {

                        // (old comment I think 05/22)  Now just set high enough that no whitespace shows on any screen was 120 raising because of mobile, was -33 not sure why?? might be to overlap by 3 px of the set figure of 30 of visiblePortfolio
                        var photograhyFormula = -((windowHeight + scrolltop - portfolioHeight + 160) - windowHeight);

                        //console.log("Photography Position: " + photographyPosition + "px, ", "pageYOffset: " + scrolltop + "px, ", "Portfolio Height: " + portfolioTotalHeight + "px, ", "windowHeight: " + windowHeight + "px ", "portfolioTop: " + portfolioTop + "px ", "PortfolioHeight: " + portfolioHeight + "px ", "photogrraphyAlignment: " + photographyAlignment + "px");
                        //console.log((scrolltop * 1.75) - scrolltop);
                        //console.log("windowHeight:            " + windowHeight);
                        //console.log("photographyFormula:      " + photograhyFormula); // sure where the 33 comes from but stays the same at all browser widths
                        //console.log("photographyTopValue:     " + photograhyFormula * 1.75, "photographyImgHeight: " + photographyImageHeight);
                        //console.log("photographyWindowHeight: " + photographySetHeight + "  (photographySetHeight)");
                        //console.log("Photo img height Formula:  ((photographySetHeight + visiblePortfolio) * 2) * 1.75, visiblePortfolio is set at 30");
                        //console.log("photographyFormula: -((windowHeight + scrolltop - portfolioHeight - 33) - windowHeight)");
                        photography.css({top: photograhyFormula * .75 + 'px', height: photographyImageHeight + "px"}); // this was 1.75
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
                    if (resizeTicking)
                        requestAnimationFrame(resizeUpdate);
                    resizeTicking = true;
                }

                function resizeUpdate() {
                    alignPhotographyHire();
                    update();
                }

                // only listen for resize events
                window.addEventListener('resize', resizeOnRender, false);


            });
        };
        homeFunction();

    });