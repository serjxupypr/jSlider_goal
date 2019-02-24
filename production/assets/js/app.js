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
      bullets: true
    });

    $('.turbo-slider-2').jSlider();
  });
})(jQuery); // You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

},{"./modules/jSlider":2}],2:[function(require,module,exports){
'use strict';

(function ($) {
    $.fn.jSlider = function (options) {
        var _this = this;

        var params = $.extend({
            autoplay: false,
            playDelay: 3000,
            navigation: false,
            bullets: false
        }, options);

        // nessesary variables

        this.$track = $('<div class="jslider-track"/>');
        this.$slides = $('> *', this).detach();
        this.$buttonNext = '<button class="next-slide"/>';
        this.$buttonPrev = '<button class="prev-slide"/>';

        // functions

        this.init = function () {
            _this.$track.append(_this.$slides);
            _this.append(_this.$track);
            _setTrackWidth(_this);
            if (params.navigation) _appendButtons(_this);
            if (params.bullets) _appendBullets(_this);
        };

        function _appendButtons($this) {
            $this.append($this.$buttonNext).append($this.$buttonPrev);
            $this.$buttonNext = $this.find('.next-slide');
            $this.$buttonPrev = $this.find('.prev-slide');
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

        function _setTrackWidth($this) {
            var width = $this.innerWidth() * $this.$slides.length;
            $this.css({ 'overflow': 'hidden' });
            $this.$track.outerWidth(width).css({
                'display': 'flex',
                'transform': 'translate3d(0, 0, 0)',
                'transition': 'transform .5s ease-out'
            });
        }

        function _addListeners(elemet, eventType, calback, calbackArgs) {
            elemet.on(eventType, function (e) {
                calback(calbackArgs);
            });
        }

        this.nextSlide = function () {
            var counter = 1;
            _this.$track.css({
                'transform': 'translate3d( -' + _this.width() * counter + 'px , 0, 0)'
            });
            counter++;
        };

        this.init();

        return this;
    };
})(jQuery);

},{}]},{},[1]);
