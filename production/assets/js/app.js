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
      spaceBetween: 20
    });

    $('.turbo-slider-2').jSlider();
  });
})(jQuery); // You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

},{"./modules/jSlider":2}],2:[function(require,module,exports){
'use strict';

// jSlider

// version 0.0.1

(function ($) {
    $.fn.jSlider = function (options) {
        var _this = this;

        var params = $.extend({
            autoplay: false,
            playDelay: 3000,
            navigation: false,
            bullets: false,
            slidesOnScreen: 1,
            spaceBetween: 0
        }, options);

        // nessesary variables

        this.$track = $('<div class="jslider-track"/>');
        this.$slides = $('> *', this).detach();
        this.currentSlideIndex = 0;
        this.$buttonNext = '<button class="next-slide"/>';
        this.$buttonPrev = '<button class="prev-slide"/>';
        var slideWidth = Math.ceil(this.innerWidth() / params.slidesOnScreen - params.spaceBetween / params.slidesOnScreen);
        var sliderTransitionValue = slideWidth + params.spaceBetween;
        var ACTIVE_SLIDE_CLASS = 'active-slide';

        // functions

        this.init = function () {
            _this.$track.append(_this.$slides);
            _this.append(_this.$track);
            _setTrackStyles(_this);
            if (params.navigation) _appendButtons(_this);
            if (params.bullets) _appendBullets(_this);
            _setTrackPosition(_this, 0);
            _setSlidesStyles(_this);
            _setActiveSlide(_this, 0);
        };

        function _appendButtons($this) {
            $this.append($this.$buttonPrev).append($this.$buttonNext);
            $this.$buttonPrev = $this.find('.prev-slide');
            $this.$buttonNext = $this.find('.next-slide');

            // add event listeners to controlls buttons
            _addListeners($this.$buttonPrev, 'click', $this.prevSlide);
            _addListeners($this.$buttonNext, 'click', $this.nextSlide);
        }

        function _appendBullets($this) {
            $this.bullets = '<ul class="jslider-bullets"/>';
            $this.append($this.bullets);
            $this.bullets = $this.find('.jslider-bullets');
            for (var counter = 0; counter < $this.$slides.length; counter++) {
                $this.bullets.append('<li class="j-bullet"><button class="bullet-nav-item"/></li>');
            }
        }

        function _setTrackStyles($this) {
            var width = sliderTransitionValue * $this.$slides.length;
            $this.css({ 'overflow': 'hidden' });
            $this.$track.outerWidth(width).css({
                'display': 'flex',
                'transition': 'transform .5s ease-out'
            });
        }

        function _addListeners(elemet, eventType, calback, callbackArgs) {
            elemet.on(eventType, function (e) {
                calback(callbackArgs);
            });
        }

        this.nextSlide = function () {
            if (_this.currentSlideIndex + 1 > _this.$slides.length - 1) return;
            _this.currentSlideIndex += 1;
            var currentPos = sliderTransitionValue * _this.currentSlideIndex;
            _setTrackPosition(_this, -currentPos);
            _setActiveSlide(_this, _this.currentSlideIndex);
            return _this;
        };

        this.prevSlide = function () {
            if (_this.currentSlideIndex === 0) return;
            _this.currentSlideIndex -= 1;
            var currentPos = sliderTransitionValue * _this.currentSlideIndex;
            _setTrackPosition(_this, -currentPos);
            _setActiveSlide(_this, _this.currentSlideIndex);
            return _this;
        };

        function _setActiveSlide($this, slideindex) {
            $this.$slides.removeClass(ACTIVE_SLIDE_CLASS);
            $this.currentSlide = $this.$slides.eq(slideindex);
            $this.currentSlide.addClass(ACTIVE_SLIDE_CLASS);
        }

        function _setTrackPosition($this, trackPosition) {
            $this.$track.css({
                'transform': 'translate3d( ' + trackPosition + 'px , 0, 0)'
            });
        }

        function _setSlidesStyles($this) {
            $this.$slides.css({
                'width': slideWidth,
                'margin-right': params.spaceBetween
            });
        }

        // function _reSetSliderWidth

        this.init();

        return this;
    };
})(jQuery);

},{}]},{},[1]);
