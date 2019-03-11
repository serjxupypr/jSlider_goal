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
    };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options);
        this.$track = $(`<div class="jslider-track"/>`);
        this.$slides = $('> *', this.element).detach();
        this.currentSlideIndex = 0;
        this.$buttonNext = `<button class="next-slide"/>`;
        this.$buttonPrev = `<button class="prev-slide"/>`;
        this.slideWidth = Math.ceil(($(this.element).innerWidth() / this.options.slidesOnScreen) - this.options.spaceBetween/(this.options.slidesOnScreen)) ;
        this.sliderTransitionValue = this.slideWidth + this.options.spaceBetween;
        this.ACTIVE_SLIDE_CLASS = 'active-slide';
        this.init();
    }

    Plugin.prototype.init = function () {
        this.$track.append(this.$slides);
        this.element.append(this.$track);
        this._setTrackStyles();
        if (this.options.navigation) this._appendButtons();
        if (this.options.bullets) this._appendBullets();
        this._setTrackPosition(0);
        this._setSlidesStyles();
        this._setActiveSlide(0);
    };

    Plugin.prototype._appendButtons = function() {
        this.element.append(this.$buttonPrev).append(this.$buttonNext);
        this.$buttonPrev = this.element.find('.prev-slide');
        this.$buttonNext = this.element.find('.next-slide');
        
        // add event listeners to controlls buttons
        this._addListeners(this.$buttonPrev, 'click', this.prevSlide, this);
        this._addListeners(this.$buttonNext, 'click', this.nextSlide, this);
    }

    Plugin.prototype._appendBullets = function() {
        this.bullets = `<ul class="jslider-bullets"/>`;
        this.element.append(this.bullets);
        this.bullets = this.element.find('.jslider-bullets');
        for(let counter = 0; counter < this.$slides.length; counter++) {
            this.bullets.append(`<li class="j-bullet"><button class="bullet-nav-item"/></li>`);
        }
    }

    Plugin.prototype._setTrackStyles = function() {
        let width = this.sliderTransitionValue * this.$slides.length;
        this.element.css({'overflow':'hidden'});
        this.$track.outerWidth(width).css({
            'display' : 'flex',
            'transition' : 'transform .5s ease-out'
        });
    }

    Plugin.prototype._addListeners = function(elemet, eventType, calback, callbackArgs) {
        elemet.on(eventType, function(e){
            calback(callbackArgs);
        });
    }

    Plugin.prototype.nextSlide = function(_this) {
        if (_this.currentSlideIndex + 1 > _this.$slides.length - 1) return;
        _this.currentSlideIndex += 1;
        let currentPos = _this.sliderTransitionValue * _this.currentSlideIndex;
        _this._setTrackPosition(-currentPos);
        _this._setActiveSlide(_this.currentSlideIndex);
        return _this.element;
    }
    
    Plugin.prototype.prevSlide = function(_this) {
        if (_this.currentSlideIndex === 0) return;
        _this.currentSlideIndex -= 1;
        let currentPos = _this.sliderTransitionValue * _this.currentSlideIndex;
        _this._setTrackPosition(-currentPos);
        _this._setActiveSlide(_this.currentSlideIndex);
        return _this.element;
    }

    Plugin.prototype._setActiveSlide = function(slideindex) {
        this.$slides.removeClass(this.ACTIVE_SLIDE_CLASS);
        this.currentSlide = this.$slides.eq(slideindex);
        this.currentSlide.addClass(this.ACTIVE_SLIDE_CLASS);
    }

    Plugin.prototype._setTrackPosition = function(trackPosition) {
        this.$track.css({
            'transform' : `translate3d( ${trackPosition}px , 0, 0)`,
        });
    }
    
    Plugin.prototype._setSlidesStyles = function() {
        this.$slides.css({
            'width': this.slideWidth,
            'margin-right': this.options.spaceBetween,
        })
    }

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn.jSlider = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin")) {
                $.data(this, "plugin", new Plugin(this, options));
            }
        });
    }

})(jQuery);