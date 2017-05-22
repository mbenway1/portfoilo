angular.module('portfolioApp')
    .controller('formController', function ($scope) { // removed $http variable
// line below was for when it was inside app.js
//portfolioApp.controller('formController', function($scope) {

        $scope.form = {};

        $scope.hireInput = [
            {
                id: 'NameCompany',
                type: 'text',
                label: 'Name/Company'
            },
            {
                id: 'Phone',
                type: 'tel',
                label: 'Phone'
            },
            {
                id: 'Email',
                type: 'email',
                label: 'Email'
            },
            {
                id: 'Message',
                type: 'text',
                label: 'Short Message or Just Say Hi'
            }

        ];
        $scope.hireSelect = [
            {
                id: 'Budget'
            }
        ];
        $scope.budgetoption = [
            {
                value: 'Does Not Apply',
                amount: 'Does Not Apply'
            },
            {
                value: '?',
                amount: 'Unknown'
            },
            {
                value: '$500',
                amount: '$500'
            },
            {
                value: '$1000',
                amount: '$1000'
            },
            {
                value: '$2000',
                amount: '$2000'
            },
            {
                value: '$5000',
                amount: '$5000'
            },
            {
                value: '$10000',
                amount: '$10000'
            },
            {
                value: '$10000+',
                amount: '$10000+'
            }
        ];


        $scope.validate = function () {
            var e = this.hireInput.id,
                select = this.hireSelect.id,
                regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                nameCompany = $("#" + $scope.hireInput[0].id),
                email = $("#" + $scope.hireInput[2].id),
                Message = $("#" + $scope.hireInput[3].id);
            //unused  var getNameCompany = document.getElementById(nameCompany);
            //unused  var getEmail = document.getElementById(email);
            //console.log(e);
            //console.log("working!");
            //console.log(getNameCompany.dataset.input);
            if (nameCompany.val().length < 2 && e === "NameCompany") {
                //console.log("invalid Name");
                nameCompany.parent().removeClass('error animated shake valid');
                setTimeout(function () {
                    nameCompany.parent().addClass('error animated shake');
                }, 5);
                return false;
            }
            else if (!regEmail.test(email.val()) && e === "Email") {
                //console.log("invalid email");
                email.parent().removeClass('error animated shake valid');
                setTimeout(function () {
                    email.parent().addClass('error animated shake');
                }, 5);

            }
            else if (Message.val().length < 2 && e === "Message") {
                //console.log("invalid Name");
                Message.parent().removeClass('error animated shake valid');
                setTimeout(function () {
                    Message.parent().addClass('error animated shake');
                }, 5);
                return false;
            }
            else {
                $("#" + e).parent().removeClass('error animated shake').addClass('valid');
                $("#" + select).removeClass('error animated shake').addClass('valid');
                if (nameCompany.parent().hasClass('valid') && email.parent().hasClass('valid') && Message.parent().hasClass('valid')) {
                    $(".submit-container").html("<button type='submit' class='hire-btn hire-submit'>Connect With Me</button>");
                    $(".hire-submit").fadeIn();
                }
            }
        };

        $scope.submitValidate = function () {
            console.log("sumbit validate triggered");
            var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                nameInput = $("#" + $scope.hireInput[0].id),
                emailInput = $("#" + $scope.hireInput[2].id),
                budgetInput = $("#" + $scope.hireSelect[0].id);
            if (nameInput.val().length < 2) {
                console.log("invalid Name");
                nameInput.parent().removeClass('error animated shake');
                setTimeout(function () {
                    nameInput.parent().addClass('error animated shake');
                }, 5);
                return false;
            }
            else if (!regEmail.test(emailInput.val())) {
                console.log("invalid email");
                emailInput.parent().removeClass('error animated shake');
                setTimeout(function () {
                    emailInput.parent().addClass('error animated shake');
                }, 5);
                return false;
            }
            else if (budgetInput.val() === null) {
                console.log("invalid budget");
                budgetInput.removeClass('error animated shake');
                setTimeout(function () {
                    budgetInput.addClass('error animated shake');
                }, 5);
                return false;
            }
            else {
                $('#hire-form').submit(console.log('sent'));
                return true;
            }
        };


        setTimeout(function () {  // There needs to be a better fix then just slowing down when it runs but for now this seems to be an option to keep going

            //////////  I DON'T WANT THIS IN HERE LIKE THIS BUT IT MAKES IT WORK
            /*!
             * classie - class helper functions
             * from bonzo https://github.com/ded/bonzo
             *
             * classie.has( elem, 'my-class' ) -> true/false
             * classie.add( elem, 'my-new-class' )
             * classie.remove( elem, 'my-unwanted-class' )
             * classie.toggle( elem, 'my-class' )
             */

            /*jshint browser: true, strict: true, undef: true */
            /*global define: false */

            (function (window) {

                'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

                function classReg(className) {
                    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
                }

// classList support for class management
// all tho to be fair, the api sucks because it won't accept multiple classes at once
                var hasClass, addClass, removeClass;

                if ('classList' in document.documentElement) {
                    hasClass = function (elem, c) {
                        return elem.classList.contains(c);
                    };
                    addClass = function (elem, c) {
                        elem.classList.add(c);
                    };
                    removeClass = function (elem, c) {
                        elem.classList.remove(c);
                    };
                }
                else {
                    hasClass = function (elem, c) {
                        return classReg(c).test(elem.className);
                    };
                    addClass = function (elem, c) {
                        if (!hasClass(elem, c)) {
                            elem.className = elem.className + ' ' + c;
                        }
                    };
                    removeClass = function (elem, c) {
                        elem.className = elem.className.replace(classReg(c), ' ');
                    };
                }

                function toggleClass(elem, c) {
                    var fn = hasClass(elem, c) ? removeClass : addClass;
                    fn(elem, c);
                }

                var classie = {
                    // full names
                    hasClass: hasClass,
                    addClass: addClass,
                    removeClass: removeClass,
                    toggleClass: toggleClass,
                    // short names
                    has: hasClass,
                    add: addClass,
                    remove: removeClass,
                    toggle: toggleClass
                };

// transport
                if (typeof define === 'function' && define.amd) {
                    // AMD
                    define(classie);
                } else {
                    // browser global
                    window.classie = classie;
                }

            })(window);


            (function () {
                // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
                if (!String.prototype.trim) {
                    (function () {
                        // Make sure we trim BOM and NBSP
                        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                        String.prototype.trim = function () {
                            return this.replace(rtrim, '');
                        };
                    })();
                }

                [].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
                    // in case the input is already filled..
                    if (inputEl.value.trim() !== '') {
                        classie.add(inputEl.parentNode, 'input--filled');
                    }

                    // events:
                    inputEl.addEventListener('focus', onInputFocus);
                    inputEl.addEventListener('blur', onInputBlur);
                });

                function onInputFocus(ev) {
                    classie.add(ev.target.parentNode, 'input--filled');
                }

                function onInputBlur(ev) {
                    if (ev.target.value.trim() === '') {
                        classie.remove(ev.target.parentNode, 'input--filled');
                    }
                }
            })();
/////////////////   END OF WHAT I NEED TO FIND A WAY TO HAVE IN A SEPERATE FILE
        }, 200); // This value has just been chosen out of thin air to see if it fixes the problem


    });
