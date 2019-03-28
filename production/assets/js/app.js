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
      slideSpeed: 800,
      autoplay: true,
      onSliderResize: function onSliderResize() {
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

/**
 *  @author Serhii Sidorenko
 *  @requires jQuery
 */

;(function ($, undefined) {
  // Creates the defaults, only once!
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
    onSliderResize: '',
    slideSpeed: 500,
    easing: 'ease-out'
  };

  // The actual plugin constructor

  var GoalSlider = function () {
    /**
     * Creates an instance of Plugin
     *
     * @param {node} element - DOM-element
     * @param {object} options - user options
     * @constructor
     */
    function GoalSlider(element, options) {
      _classCallCheck(this, GoalSlider);

      this.sliderContainer = $(element);
      this.options = $.extend({}, defaults, options);

      this.$track = $('<div class="jslider-track"/>');
      this.$slides = $('> *', this.sliderContainer).detach();

      this.$buttonNext = $(this.options.nextButton);
      this.$buttonPrev = $(this.options.prevButton);

      this.currentSlideIndex = 0;
      this.START_SLIDE_INDEX = 0;
      this.RESTORE_AUTOPLAY_DELAY = 200;

      this.slideWidth = Math.ceil($(this.sliderContainer).innerWidth() / this.options.slidesOnScreen - this.options.spaceBetween / this.options.slidesOnScreen);
      this.sliderTransitionValue = this.slideWidth + this.options.spaceBetween;

      this.ACTIVE_SLIDE_CLASS = 'active-slide';
      this.ACTIVE_BULLET_CLASS = 'active';

      this.autoPlayTimer = null;

      this.init();
    }

    /**
     * setup plugin start state, depends on options
     * @private
     */


    _createClass(GoalSlider, [{
      key: 'init',
      value: function init() {
        this.$track.append(this.$slides);
        this.sliderContainer.append(this.$track);
        this._setTrackStyles();

        if (this.options.navigation) this._setupButtons();
        if (this.options.bullets) this._setupBullets();

        this._setTrackPosition(this.START_SLIDE_INDEX);
        this._setSlidesStyles();
        this._setActiveSlide(this.START_SLIDE_INDEX);

        if (this.options.autoplay) this._autoPlay();

        this._addListeners($(window), 'resize', this._responsiveRecalcSliderStyles, this);

        if (this.options.onsliderInit && typeof this.options.onsliderInit === 'function') this.options.onsliderInit();
      }

      /**
       * renders and adds event listeners to controlls buttons
       * 
       * @private
       */

    }, {
      key: '_setupButtons',
      value: function _setupButtons() {
        var _this2 = this;

        // renders 'next' and 'prev' control buttons
        this.sliderContainer.append(this.$buttonPrev).append(this.$buttonNext);

        // adds event listeners to control buttons
        this.$buttonPrev.click(function () {
          _this2._showPrevSlide(_this2);
          if (_this2.options.autoplay) _this2._autoPlay();
        });

        this.$buttonNext.click(function () {
          _this2._showNextSlide(_this2);
          if (_this2.options.autoplay) _this2._autoPlay();
        });
      }

      /**
       * renders and adds event listeners to control bullets
       * 
       * @private
       */

    }, {
      key: '_setupBullets',
      value: function _setupBullets() {
        var _this3 = this;

        // renders control bullets
        this.bulletsHolder = $('<div class="j-bullets"></div>');
        this.bulletsList = $('<ul class="jslider-bullets"/>');
        this.sliderContainer.append(this.bulletsHolder);

        for (var counter = 0; counter < this.$slides.length; counter++) {
          this.bulletsList.append('<li class="j-bullet"><button class="bullet-nav-item"/></li>');
        }

        this.bullets = this.bulletsList.find('.j-bullet');
        this.bulletsHolder.append(this.bulletsList);

        // adds listeners for control bullets
        this.bullets.on('click', function (e) {
          _this3._setActiveSlide($(e.currentTarget).index());
          _this3._setActiveBulletSlide($(e.currentTarget).index());
          if (_this3.options.autoplay) _this3._autoPlay();
        });
      }

      /**
       * setup slider track necessary styles
       * 
       * @private
       */

    }, {
      key: '_setTrackStyles',
      value: function _setTrackStyles() {
        var width = this.sliderTransitionValue * this.$slides.length;
        this.sliderContainer.css({ overflow: 'hidden' });
        this.$track.outerWidth(width).css({
          display: 'flex',
          transition: 'transform ' + this.options.slideSpeed / 1000 + 's ' + this.options.easing
        });
      }

      /**
       * adding callbacks for events
       * 
       * @param {object} - jQuery object to add event listener
       * @param {string} - event type
       * @param {function} - callback function
       * @param {object/string/number} - arguments for callback
       * 
       * @private
       */

    }, {
      key: '_addListeners',
      value: function _addListeners(element, eventType, callback, callbackArgs) {
        element.on(eventType, function () {
          callback(callbackArgs);
        });
      }

      /**
       * show next slide of slider
       * 
       * @param {object} - this
       * 
       * @private
       */

    }, {
      key: '_showNextSlide',
      value: function _showNextSlide(_this) {
        /*
         * checking current slider position (is it first slide)
         * and setting up active slide 
         */
        if (!(_this.currentSlideIndex + 1 > _this.$slides.length - 1)) {
          _this.currentSlideIndex += 1;
          var currentPos = _this.sliderTransitionValue * _this.currentSlideIndex;
          _this._setTrackPosition(-currentPos);
          _this._setActiveSlide(_this.currentSlideIndex);
        } else {
          _this._setTrackPosition(this.START_SLIDE_INDEX);
          _this._setActiveSlide(this.START_SLIDE_INDEX);
        }

        // checking existence of slide-change callback
        if (_this.options.onSlideChange && typeof _this.options.onSlideChange === 'function') _this.options.onSlideChange();
      }

      /**
       * show prev slide of slider
       * 
       * @param {object} - this
       * 
       * @private
       */

    }, {
      key: '_showPrevSlide',
      value: function _showPrevSlide(_this) {
        var currentPos = void 0;

        /*
         * checking current slider position (is it last slide)
         * and setting up active slide
         */
        if (_this.currentSlideIndex - 1 < 0) {
          _this.currentSlideIndex = _this.$slides.length - 1;
          currentPos = _this.sliderTransitionValue * _this.currentSlideIndex;
        } else {
          _this.currentSlideIndex -= 1;
          currentPos = _this.sliderTransitionValue * _this.currentSlideIndex;
        }
        _this._setTrackPosition(-currentPos);
        _this._setActiveSlide(_this.currentSlideIndex);

        // checking existence of slide-change callback
        if (typeof _this.options.onSlideChange === 'function') _this.options.onSlideChange();
      }

      /**
       * show 'n-th' slide of slider
       * 
       * @param {number} - index of slide, that should be shown
       * 
       * @private
       */

    }, {
      key: '_setActiveBulletSlide',
      value: function _setActiveBulletSlide(index) {
        var currentPos = this.sliderTransitionValue * index;
        this.currentSlideIndex = index;
        this._setTrackPosition(-currentPos);
        this._setActiveSlide(index);
      }

      /**
       * set active slide and class name for current slide
       * 
       * @param {number} - index of slide, that should be shown
       * 
       * @private
       */

    }, {
      key: '_setActiveSlide',
      value: function _setActiveSlide(slideindex) {
        this.currentSlideIndex = slideindex;

        // remove 'active' class name for all slides
        this.$slides.removeClass(this.ACTIVE_SLIDE_CLASS);

        // setting class name for current slide
        this.currentSlide = this.$slides.eq(slideindex);
        this.currentSlide.addClass(this.ACTIVE_SLIDE_CLASS);

        // setting class name for bullet of current slide
        if (this.bullets.length) {
          this.bullets.removeClass(this.ACTIVE_BULLET_CLASS);
          this.bullets.eq(slideindex).addClass(this.ACTIVE_BULLET_CLASS);
        }
      }

      /**
       * setting up slider track position to make visible active slide
       * 
       * @param {number} - position of slider track (css pixels)
       * 
       * @private
       */

    }, {
      key: '_setTrackPosition',
      value: function _setTrackPosition(trackPosition) {
        this.$track.css({
          transform: 'translate3d(' + trackPosition + 'px , 0, 0)'
        });
      }

      /**
       * setting up start slides styles (width and indent between each slide)
       * 
       * @private
       */

    }, {
      key: '_setSlidesStyles',
      value: function _setSlidesStyles() {
        this.$slides.css({
          width: this.slideWidth,
          'margin-right': this.options.spaceBetween
        });
      }

      /**
       * recalculating slider styles on window size changing
       * 
       * @param {object} - this, object with all necessary data
       * 
       * @private
       */

    }, {
      key: '_responsiveRecalcSliderStyles',
      value: function _responsiveRecalcSliderStyles(_this) {
        // recalculate each slide width
        _this.slideWidth = Math.ceil($(_this.sliderContainer).innerWidth() / _this.options.slidesOnScreen - _this.options.spaceBetween / _this.options.slidesOnScreen);
        _this.sliderTransitionValue = _this.slideWidth + _this.options.spaceBetween;

        _this.$slides.css({
          width: _this.slideWidth
        });

        var timer = void 0;
        // recalculating slider track width (depends on slides quantity and slides width)
        var width = _this.sliderTransitionValue * _this.$slides.length;

        // turn off transition for 'resize time'
        _this.$track.css({
          transition: 'transform 0s'
        });

        _this.$track.outerWidth(width);
        _this._setTrackPosition(-(_this.sliderTransitionValue * _this.currentSlideIndex));

        clearTimeout(timer);

        // turn on transition after 'resize time'
        timer = setTimeout(function () {
          _this.$track.css({
            transition: 'transform ' + _this.options.slideSpeed / 1000 + 's ' + _this.options.easing
          }, _this.RESTORE_AUTOPLAY_DELAY);
        });

        // checking existence of window resize callback
        if (_this.options.onSliderResize && typeof _this.options.onSliderResize === 'function') _this.options.onSliderResize();
      }

      /**
       * setting up slider autoplay
       * 
       * @private
       */

    }, {
      key: '_autoPlay',
      value: function _autoPlay() {
        var _this4 = this;

        // clear interval function for prevent stack next-slide call
        clearInterval(this.autoPlayTimer);

        // setting up interval function for next slide
        this.autoPlayTimer = setInterval(function () {
          if (!(_this4.currentSlideIndex + 1 > _this4.$slides.length - 1)) {
            _this4._showNextSlide(_this4);
          } else {
            _this4._setTrackPosition(_this4.START_SLIDE_INDEX);
            _this4._setActiveSlide(_this4.START_SLIDE_INDEX);
          }
        }, this.options.playDelay + this.options.slideSpeed);
      }
    }]);

    return GoalSlider;
  }();

  /**
   * Plugin wrapper around the constructor,
   * preventing against multiple instantiations.
   * Saves instance of Plugin in jQuery data
   *
   * @param {Object} options - user defined options
   * @returns {*}
   */


  $.fn.jSlider = function (options) {
    return this.each(function () {
      if (!$.data(this, 'GoalSlider')) {
        $.data(this, 'GoalSlider', new GoalSlider($(this), options));
      }
    });
  };
})(jQuery);

},{}]},{},[1]);
