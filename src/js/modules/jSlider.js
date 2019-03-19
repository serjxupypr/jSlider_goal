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
        prevButton: `<button class="prev-slide">${'<'}</button>`,
        nextButton: `<button class="next-slide">${'>'}</button>`,
        onSlideChange: '',
        onsliderInit: '',
        onSliderRisize: ''
    };

    // The actual plugin constructor
    class GoalSlider {
        constructor (element, options) {
            this.sliderContainer = $(element);
            this.options = $.extend({}, defaults, options);
            this.$track = $(`<div class="jslider-track"/>`);
            this.$slides = $('> *', this.sliderContainer).detach();
            this.currentSlideIndex = 0;
            this.$buttonNext = $(this.options.nextButton);
            this.$buttonPrev = $(this.options.prevButton);
            this.slideWidth = Math.ceil(($(this.sliderContainer).innerWidth() / this.options.slidesOnScreen) - this.options.spaceBetween/(this.options.slidesOnScreen));
            this.sliderTransitionValue = this.slideWidth + this.options.spaceBetween;
            this.ACTIVE_SLIDE_CLASS = 'active-slide';
            this.init();
        }

        init() {
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
            
            if(typeof(this.options.onsliderInit) === 'function') this.options.onsliderInit();
        }
    
        _appendButtons() {
            this.sliderContainer.append(this.$buttonPrev).append(this.$buttonNext);
            
            // add event listeners to controlls buttons
            this._addListeners(this.$buttonPrev, 'click', this.prevSlide, this);
            this._addListeners(this.$buttonNext, 'click', this.nextSlide, this);
        }
    
        _appendBullets() {
            this.bulletsHolder = $(`<div class="j-bullets"></div>`);
            this.bulletsList = $(`<ul class="jslider-bullets"/>`);
            this.sliderContainer.append(this.bulletsHolder);

            for(let counter = 0; counter < this.$slides.length; counter++) {
                this.bulletsList.append(`<li class="j-bullet"><button class="bullet-nav-item"/></li>`);
            }

            this.bullets = this.bulletsList.find('.j-bullet');
            this.bulletsHolder.append(this.bulletsList);

            this.bullets.on('click', (e) => {
                this._setActiveSlide($(e.currentTarget).index());
                this.setBulletSlide($(e.currentTarget).index());
            })
        }
    
        _setTrackStyles() {
            let width = this.sliderTransitionValue * this.$slides.length;
            this.sliderContainer.css({'overflow':'hidden'});
            this.$track.outerWidth(width).css({
                'display' : 'flex',
                'transition' : 'transform .5s ease-out'
            });
        }
    
        _addListeners(element, eventType, callback, callbackArgs) {
            element.on(eventType, function(e){
                callback(callbackArgs);
            });
        }
    
        nextSlide(_this) {
            if (_this.currentSlideIndex + 1 > _this.$slides.length - 1) return;
            _this.currentSlideIndex += 1;
            let currentPos = _this.sliderTransitionValue * _this.currentSlideIndex;
            _this._setTrackPosition(-currentPos);
            _this._setActiveSlide(_this.currentSlideIndex);
            
            if(typeof(_this.options.onSlideChange) === 'function') _this.options.onSlideChange();
        }
        
        prevSlide(_this) {
            if (_this.currentSlideIndex === 0) return;
            _this.currentSlideIndex -= 1;
            let currentPos = _this.sliderTransitionValue * _this.currentSlideIndex;
            _this._setTrackPosition(-currentPos);
            _this._setActiveSlide(_this.currentSlideIndex);

            if(typeof(_this.options.onSlideChange) === 'function') _this.options.onSlideChange();
        }

        setBulletSlide(index) {
            let currentPos = this.sliderTransitionValue * index;
            this.currentSlideIndex = index;
            this._setTrackPosition(-currentPos);
            this._setActiveSlide(index);
        }
    
        _setActiveSlide(slideindex) {
            this.currentSlideIndex = slideindex;
            this.$slides.removeClass(this.ACTIVE_SLIDE_CLASS);
            this.currentSlide = this.$slides.eq(slideindex);
            this.currentSlide.addClass(this.ACTIVE_SLIDE_CLASS);
            if(!!this.bullets.length) {
                this.bullets.removeClass('active');
                this.bullets.eq(slideindex).addClass('active');
            }
        }
    
        _setTrackPosition(trackPosition) {
            this.$track.css({
                'transform' : `translate3d( ${trackPosition}px , 0, 0)`,
            });
        }
        
        _setSlidesStyles() {
            this.$slides.css({
                'width': this.slideWidth,
                'margin-right': this.options.spaceBetween,
            })
        }

        _responsiveReset(_this) {
            _this.slideWidth = Math.ceil(($(_this.sliderContainer).innerWidth() / _this.options.slidesOnScreen) - _this.options.spaceBetween/(_this.options.slidesOnScreen));
            _this.sliderTransitionValue = _this.slideWidth + _this.options.spaceBetween;

            _this.$slides.css({
                'width': _this.slideWidth,
            })

            let timer;
            let width = _this.sliderTransitionValue * _this.$slides.length;
            _this.$track.css({
                'transition': 'transform 0s',
            });
            _this.$track.outerWidth(width);

            _this._setTrackPosition(-(_this.sliderTransitionValue * _this.currentSlideIndex));

            clearTimeout(timer);
            
            timer = setTimeout(function() {
                _this.$track.css({
                    'transition': 'transform .5s ease-out',
                }, 200);
            });

            if(typeof(_this.options.onSliderRisize) === 'function') _this.options.onSliderRisize();
        }

        _autoPlay() {
            let autoPlayInterval;
            if(this.options.autoplay === true) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = setInterval(() => {
                    if(!(this.currentSlideIndex + 1 > this.$slides.length - 1)) {
                        this.nextSlide(this);
                    } else {
                        this._setTrackPosition(0);
                        this._setActiveSlide(0);
                    }
                    
                    console.log('autoplay');
                }, this.options.playDelay);
            }
        }

    }

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn.jSlider = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin")) {
                $.data(this, "plugin", new GoalSlider($(this), options));
            }
        });
    }

})(jQuery);