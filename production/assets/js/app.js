(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _jSlider = require('./modules/jSlider');

var _jSlider2 = _interopRequireDefault(_jSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($) {
  // When DOM is ready
  $(function () {
    $('.turbo-slider-1').jSlider({
      navigation: true,
      bullets: true,
      slidesOnScreen: 2,
      spaceBetween: 20,
      autoplay: true,
      onSliderRisize: function onSliderRisize() {
        console.log('is resized');
      },
      onSlideChange: function onSlideChange() {
        console.log('slide is changed');
      }

    });

    $('.turbo-slider-2').jSlider({
      navigation: true,
      bullets: true
    });
  });
})(jQuery); // You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

},{"./modules/jSlider":2}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// jSlider

// version 0.0.1

// (function($){
//     $.fn.jSlider = function(options) {
//         let params = $.extend({
//             autoplay: false,
//             playDelay: 3000,
//             navigation: false,
//             bullets: false,
//             slidesOnScreen: 1,
//             spaceBetween: 0,
//         }, options);

//         // nessesary variables

//         this.$track = $(`<div class="jslider-track"/>`);
//         this.$slides = $('> *', this).detach();
//         this.currentSlideIndex = 0;
//         this.$buttonNext = `<button class="next-slide"/>`;
//         this.$buttonPrev = `<button class="prev-slide"/>`;
//         let slideWidth = Math.ceil((this.innerWidth() / params.slidesOnScreen) - params.spaceBetween/(params.slidesOnScreen)) ;
//         let sliderTransitionValue = slideWidth + params.spaceBetween;
//         const ACTIVE_SLIDE_CLASS = 'active-slide';

//         // functions

//         this.init = () => {
//             this.$track.append(this.$slides);
//             this.append(this.$track);
//             _setTrackStyles(this);
//             if (params.navigation) _appendButtons(this);
//             if (params.bullets) _appendBullets(this);
//             _setTrackPosition(this, 0);
//             _setSlidesStyles(this);
//             _setActiveSlide(this, 0);
//         };

//         function _appendButtons ($this) {
//             $this.append($this.$buttonPrev).append($this.$buttonNext);
//             $this.$buttonPrev = $this.find('.prev-slide');
//             $this.$buttonNext = $this.find('.next-slide');

//             // add event listeners to controlls buttons
//             _addListeners($this.$buttonPrev, 'click', $this.prevSlide);
//             _addListeners($this.$buttonNext, 'click', $this.nextSlide);
//         }

//         function _appendBullets($this) {
//             $this.bullets = `<ul class="jslider-bullets"/>`;
//             $this.append($this.bullets);
//             $this.bullets = $this.find('.jslider-bullets');
//             for(let counter = 0; counter < $this.$slides.length; counter++) {
//                 $this.bullets.append(`<li class="j-bullet"><button class="bullet-nav-item"/></li>`);
//             }
//         }

//         function _setTrackStyles($this) {
//             let width = sliderTransitionValue * $this.$slides.length;
//             $this.css({'overflow':'hidden'});
//             $this.$track.outerWidth(width).css({
//                 'display' : 'flex',
//                 'transition' : 'transform .5s ease-out'
//             });
//         }

//         function _addListeners (elemet, eventType, calback, callbackArgs) {
//             elemet.on(eventType, function(e){
//                 calback(callbackArgs);
//             });
//         }

//         this.nextSlide = () => {
//             if (this.currentSlideIndex + 1 > this.$slides.length - 1) return;
//             this.currentSlideIndex += 1;
//             let currentPos = sliderTransitionValue * this.currentSlideIndex;
//             _setTrackPosition(this, -currentPos);
//             _setActiveSlide(this, this.currentSlideIndex);
//             return this;
//         };

//         this.prevSlide = () => {
//             if (this.currentSlideIndex === 0) return;
//             this.currentSlideIndex -= 1;
//             let currentPos = sliderTransitionValue * this.currentSlideIndex;
//             _setTrackPosition(this, -currentPos);
//             _setActiveSlide(this, this.currentSlideIndex);
//             return this;
//         };

//         function _setActiveSlide($this, slideindex) {
//             $this.$slides.removeClass(ACTIVE_SLIDE_CLASS);
//             $this.currentSlide = $this.$slides.eq(slideindex);
//             $this.currentSlide.addClass(ACTIVE_SLIDE_CLASS);
//         }

//         function _setTrackPosition($this, trackPosition) {
//             $this.$track.css({
//                 'transform' : `translate3d( ${trackPosition}px , 0, 0)`,
//             });
//         }

//         function _setSlidesStyles($this) {
//             $this.$slides.css({
//                 'width': slideWidth,
//                 'margin-right': params.spaceBetween,
//             })
//         }

//         // function _reSetSliderWidth

//         this.init();

//         return this;
//     }
// }(jQuery));


;(function ($, undefined) {

    // Create the defaults, only once!
    var defaults = {
        autoplay: false,
        playDelay: 3000,
        navigation: false,
        bullets: false,
        slidesOnScreen: 1,
        spaceBetween: 0,
        prevButton: '<button class="prev-slide">' + '<' + '</button>',
        nextButton: '<button class="next-slide">' + '>' + '</button>',
        onSlideChange: '',
        onsliderInit: '',
        onSliderRisize: ''
    };

    // The actual plugin constructor

    var GoalSlider = function () {
        function GoalSlider(element, options) {
            _classCallCheck(this, GoalSlider);

            this.sliderContainer = $(element);
            this.options = $.extend({}, defaults, options);
            this.$track = $('<div class="jslider-track"/>');
            this.$slides = $('> *', this.sliderContainer).detach();
            this.currentSlideIndex = 0;
            this.$buttonNext = $(this.options.nextButton);
            this.$buttonPrev = $(this.options.prevButton);
            this.slideWidth = Math.ceil($(this.sliderContainer).innerWidth() / this.options.slidesOnScreen - this.options.spaceBetween / this.options.slidesOnScreen);
            this.sliderTransitionValue = this.slideWidth + this.options.spaceBetween;
            this.ACTIVE_SLIDE_CLASS = 'active-slide';
            this.init();
        }

        _createClass(GoalSlider, [{
            key: 'init',
            value: function init() {
                this.$track.append(this.$slides);
                this.sliderContainer.append(this.$track);
                this._setTrackStyles();
                if (this.options.navigation) this._appendButtons();
                if (this.options.bullets) this._appendBullets();
                this._setTrackPosition(0);
                this._setSlidesStyles();
                this._setActiveSlide(0);
                this._autoPlay();

                this._addListeners($(window), 'resize', this._responsiveReset, this);

                if (typeof this.options.onsliderInit === 'function') this.options.onsliderInit();
            }
        }, {
            key: '_appendButtons',
            value: function _appendButtons() {
                this.sliderContainer.append(this.$buttonPrev).append(this.$buttonNext);

                // add event listeners to controlls buttons
                this._addListeners(this.$buttonPrev, 'click', this.prevSlide, this);
                this._addListeners(this.$buttonNext, 'click', this.nextSlide, this);
            }
        }, {
            key: '_appendBullets',
            value: function _appendBullets() {
                var _this2 = this;

                this.bulletsHolder = $('<div class="j-bullets"></div>');
                this.bulletsList = $('<ul class="jslider-bullets"/>');
                this.sliderContainer.append(this.bulletsHolder);

                for (var counter = 0; counter < this.$slides.length; counter++) {
                    this.bulletsList.append('<li class="j-bullet"><button class="bullet-nav-item"/></li>');
                }

                this.bullets = this.bulletsList.find('.j-bullet');
                this.bulletsHolder.append(this.bulletsList);

                this.bullets.on('click', function (e) {
                    _this2._setActiveSlide($(e.currentTarget).index());
                    _this2.setBulletSlide($(e.currentTarget).index());
                });
            }
        }, {
            key: '_setTrackStyles',
            value: function _setTrackStyles() {
                var width = this.sliderTransitionValue * this.$slides.length;
                this.sliderContainer.css({ 'overflow': 'hidden' });
                this.$track.outerWidth(width).css({
                    'display': 'flex',
                    'transition': 'transform .5s ease-out'
                });
            }
        }, {
            key: '_addListeners',
            value: function _addListeners(element, eventType, callback, callbackArgs) {
                element.on(eventType, function (e) {
                    callback(callbackArgs);
                });
            }
        }, {
            key: 'nextSlide',
            value: function nextSlide(_this) {
                if (_this.currentSlideIndex + 1 > _this.$slides.length - 1) return;
                _this.currentSlideIndex += 1;
                var currentPos = _this.sliderTransitionValue * _this.currentSlideIndex;
                _this._setTrackPosition(-currentPos);
                _this._setActiveSlide(_this.currentSlideIndex);

                if (typeof _this.options.onSlideChange === 'function') _this.options.onSlideChange();
            }
        }, {
            key: 'prevSlide',
            value: function prevSlide(_this) {
                if (_this.currentSlideIndex === 0) return;
                _this.currentSlideIndex -= 1;
                var currentPos = _this.sliderTransitionValue * _this.currentSlideIndex;
                _this._setTrackPosition(-currentPos);
                _this._setActiveSlide(_this.currentSlideIndex);

                if (typeof _this.options.onSlideChange === 'function') _this.options.onSlideChange();
            }
        }, {
            key: 'setBulletSlide',
            value: function setBulletSlide(index) {
                var currentPos = this.sliderTransitionValue * index;
                this.currentSlideIndex = index;
                this._setTrackPosition(-currentPos);
                this._setActiveSlide(index);
            }
        }, {
            key: '_setActiveSlide',
            value: function _setActiveSlide(slideindex) {
                this.currentSlideIndex = slideindex;
                this.$slides.removeClass(this.ACTIVE_SLIDE_CLASS);
                this.currentSlide = this.$slides.eq(slideindex);
                this.currentSlide.addClass(this.ACTIVE_SLIDE_CLASS);
                if (!!this.bullets.length) {
                    this.bullets.removeClass('active');
                    this.bullets.eq(slideindex).addClass('active');
                }
            }
        }, {
            key: '_setTrackPosition',
            value: function _setTrackPosition(trackPosition) {
                this.$track.css({
                    'transform': 'translate3d( ' + trackPosition + 'px , 0, 0)'
                });
            }
        }, {
            key: '_setSlidesStyles',
            value: function _setSlidesStyles() {
                this.$slides.css({
                    'width': this.slideWidth,
                    'margin-right': this.options.spaceBetween
                });
            }
        }, {
            key: '_responsiveReset',
            value: function _responsiveReset(_this) {
                _this.slideWidth = Math.ceil($(_this.sliderContainer).innerWidth() / _this.options.slidesOnScreen - _this.options.spaceBetween / _this.options.slidesOnScreen);
                _this.sliderTransitionValue = _this.slideWidth + _this.options.spaceBetween;

                _this.$slides.css({
                    'width': _this.slideWidth
                });

                var timer = void 0;
                var width = _this.sliderTransitionValue * _this.$slides.length;
                _this.$track.css({
                    'transition': 'transform 0s'
                });
                _this.$track.outerWidth(width);

                _this._setTrackPosition(-(_this.sliderTransitionValue * _this.currentSlideIndex));

                clearTimeout(timer);

                timer = setTimeout(function () {
                    _this.$track.css({
                        'transition': 'transform .5s ease-out'
                    }, 200);
                });

                if (typeof _this.options.onSliderRisize === 'function') _this.options.onSliderRisize();
            }
        }, {
            key: '_autoPlay',
            value: function _autoPlay() {
                var _this3 = this;

                var autoPlayInterval = void 0;
                if (this.options.autoplay === true) {
                    clearInterval(autoPlayInterval);
                    autoPlayInterval = setInterval(function () {
                        if (!(_this3.currentSlideIndex + 1 > _this3.$slides.length - 1)) {
                            _this3.nextSlide(_this3);
                        } else {
                            _this3._setTrackPosition(0);
                            _this3._setActiveSlide(0);
                        }

                        console.log('autoplay');
                    }, this.options.playDelay);
                }
            }
        }]);

        return GoalSlider;
    }();

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations


    $.fn.jSlider = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin")) {
                $.data(this, "plugin", new GoalSlider($(this), options));
            }
        });
    };
})(jQuery);

},{}]},{},[1]);
