angular.module('portfolioApp')
    .controller('photographyController', function ($scope, $window) {
// line below was for when it was inside app.js
//portfolioApp.controller('photographyController', function($scope) {
        $window.scrollTo(0, 0);
        // create a message to display in our view
        $scope.message = 'This is the photography page';
        $scope.photo = [
            {
                name: 'CASE IH CX 90',
                classes: 'photo-1 left',
                source: 'img/1.jpg',
                instagram: 'http://dev.michaelbenway.com'
            },
            {
                name: 'Cocktails',
                classes: 'photo-2 right',
                source: 'img/2.jpg',
                instagram: ''
            },
            {
                name: 'Title Photo 3',
                classes: 'photo-3 left',
                source: 'img/3.jpg',
                instagram: ''
            },
            {
                name: "Outlooking Mt. Yale",
                classes: 'photo-4 right',
                source: 'img/4.jpg',
                instagram: ''
            },
            {
                name: 'Mt. Antero',
                classes: 'photo-5 left',
                source: 'img/5.jpg',
                instagram: ''
            },
            {
                name: "Grizzly Lake",
                classes: 'photo-6 right',
                source: 'img/6.jpg',
                instagram: ''
            },
            {
                name: 'Harvest Time',
                classes: 'photo-7 left',
                source: 'img/7.jpg',
                instagram: ''
            },
            {
                name: "Mantis",
                classes: 'photo-8 right',
                source: 'img/8.jpg',
                instagram: ''
            },
            {
                name: 'Morning Fog',
                classes: 'photo-9 left',
                source: 'img/9.jpg',
                instagram: ''
            },
            {
                name: "Blossoming Flower",
                classes: 'photo-10 right',
                source: 'img/10.jpg',
                instagram: ''
            },
            {
                name: "Tracks",
                classes: 'photo-11 left',
                source: 'img/11.jpg',
                instagram: ''
            },
            {
                name: "Aging Tree",
                classes: 'photo-12 right',
                source: 'img/12.jpg',
                instagram: ''
            },
            {
                name: "Trickling Stream",
                classes: 'photo-13 left',
                source: 'img/13.jpg',
                instagram: ''
            },
            {
                name: "Harvard Lakes",
                classes: 'photo-14 right',
                source: 'img/14.jpg',
                instagram: ''
            },
            {
                name: "Mosquito Pass",
                classes: 'photo-15 left',
                source: 'img/15.jpg',
                instagram: ''
            },
            {
                name: "Chalk Creek",
                classes: 'photo-16 right',
                source: 'img/16.jpg',
                instagram: ''
            },
            {
                name: "Evening Reflection",
                classes: 'photo-17 left',
                source: 'img/17.jpg',
                instagram: ''
            },
            {
                name: "Pomeroy Lakes",
                classes: 'photo-18 right',
                source: 'img/18.jpg',
                instagram: ''
            }
        ];

        var body = $('body'),
            pagePosition,
            $scrollTop,
            selectedImg,
            selectedName;

        $scope.setPhotoView = function (image, name) {
            //console.log(image);
            selectedImg = image;
            selectedName = name;
        };

        var hoverPhoto = function (thumbPhoto) {
            thumbPhoto.toggleClass('hover');
        };

        // Function has the actions to open the full screen photo viewer
        var openPhoto = function (container, thumbPhoto, fullPhoto, descriptionPhoto, closeBtnPhoto) {
            var $window = $(window);
            $scrollTop = $window.scrollTop();
            /* All unused variables right now
            var $windowWidth = $window.width(),
                $windowHeight = $window.height(),
                $photoWidth = container.width(),
                $photoHeight = container.height(),
                $photoOffsetTop = ((container.offset().top) - $scrollTop),
                $photoOffsetBottom = ($windowHeight - $photoHeight - $photoOffsetTop),
                $photoOffsetLeft = container.offset().left,
                $photoOffsetRight = ($windowWidth - $photoOffsetLeft - $photoWidth);
             */
            pagePosition = container.offset().top;

            closeBtnPhoto.removeClass('roll-out');

            if (container.hasClass('left')) {
                fullPhoto.addClass('ontop open').css({
                    'top': '0', // -$photoOffsetTop,
                    'bottom': '0', // -$photoOffsetBottom,
                    'left': '0' // -$photoOffsetLeft
                });
                $('html, body').animate({
                    scrollTop: pagePosition
                }, 1000);
            }
            else if (container.hasClass('right')) {
                fullPhoto.addClass('ontop open').css({
                    'top': '0', // -$photoOffsetTop,
                    'right': '0', // -$photoOffsetRight,
                    'bottom': '0' // -$photoOffsetBottom
                });
                $('html, body').animate({
                    scrollTop: pagePosition
                }, 1000);
            }
            setTimeout(function () {
                body.addClass('modall').css('top', -($scrollTop) + 'px');
            }, 1000);
            setTimeout(function () {
                $(".photo-view").addClass("show").css({
                    'top': $scrollTop,
                    'background': "url('/" + selectedImg + "') center top/cover"
                })
                    .children('.photo-description').children('h2').text(selectedName);
            }, 1001);
            setTimeout(function () {
                // This might be better done in a controller, also might help on supplying data to a single template rather then a bunch of pages
                fullPhoto.removeClass('open').removeAttr('style');
                fullPhoto.removeClass('ontop');
            }, 1050);
            setTimeout(function () {
                descriptionPhoto.addClass('show');
            }, 1400);
            setTimeout(function () {
                closeBtnPhoto.addClass('show');
            }, 1750);

        };

        // Function has the actions to close full screen photo
        var closePhoto = function (container, descriptionPhoto, closeBtnPhoto) {
            closeBtnPhoto.removeClass('show').addClass('roll-out');
            descriptionPhoto.removeClass('show');
            setTimeout(function () {
                $(".photo-view").addClass("easeout");
            }, 1000);
            setTimeout(function () {
                $(".photo-view").removeClass("show easeout");
                body.removeClass("modall");
                $('html, body').animate({
                    scrollTop: $scrollTop
                }, 0);
            }, 2000);
        };


        body.on("mouseenter", ".photo-small", function () {
            //console.log($(this));

            var photoThumb = $(this);

            //console.log();

            hoverPhoto(photoThumb);
        });

        body.on("mouseleave", ".photo-small", function () {
            //console.log($(this));

            var photoThumb = $(this);

            //console.log();

            hoverPhoto(photoThumb);
        });


        body.on("click", ".photo-small", function () {
            //console.log($(this));

            var photo = $(this).parents('.photo'),
                photoThumb = $(this).parent(),
                photoFull = photo.children('.photofull-container'),
                photoView = $(".photo-view"),
                photoDescription = photoView.children('.photo-description'),
                photoCloseBtn = photoView.children('.close-btn');

            //console.log();

            openPhoto(photo, photoThumb, photoFull, photoDescription, photoCloseBtn);
        });

        // Function to trigger the close of the full screen photo viewer and set up the action function
        body.on("click", ".close-btn", function () {
            //console.log($(this));

            var photo = $(this).parents('.photo-view'),
                photoDescription = photo.children('.photo-description'),
                photoCloseBtn = $(this);

            //console.log();

            closePhoto(photo, photoDescription, photoCloseBtn);
        });

    });

