// jSlider

// version 0.0.1

(function($){
    $.fn.jSlider = function(options) {
        let params = $.extend({
            autoplay: false,
            playDelay: 3000,
            navigation: false,
            bullets: false,
            slidesOnScreen: 1,
            spaceBetween: 0,
        }, options);

        // nessesary variables

        this.$track = $(`<div class="jslider-track"/>`);
        this.$slides = $('> *', this).detach();
        this.currentSlideIndex = 0;
        this.$buttonNext = `<button class="next-slide"/>`;
        this.$buttonPrev = `<button class="prev-slide"/>`;
        let slideWidth = Math.ceil((this.innerWidth() / params.slidesOnScreen) - params.spaceBetween/(params.slidesOnScreen)) ;
        let sliderTransitionValue = slideWidth + params.spaceBetween;
        const ACTIVE_SLIDE_CLASS = 'active-slide';

        // functions

        this.init = () => {
            this.$track.append(this.$slides);
            this.append(this.$track);
            _setTrackStyles(this);
            if (params.navigation) _appendButtons(this);
            if (params.bullets) _appendBullets(this);
            _setTrackPosition(this, 0);
            _setSlidesStyles(this);
            _setActiveSlide(this, 0);
        };

        function _appendButtons ($this) {
            $this.append($this.$buttonPrev).append($this.$buttonNext);
            $this.$buttonPrev = $this.find('.prev-slide');
            $this.$buttonNext = $this.find('.next-slide');
            
            // add event listeners to controlls buttons
            _addListeners($this.$buttonPrev, 'click', $this.prevSlide);
            _addListeners($this.$buttonNext, 'click', $this.nextSlide);
        }

        function _appendBullets($this) {
            $this.bullets = `<ul class="jslider-bullets"/>`;
            $this.append($this.bullets);
            $this.bullets = $this.find('.jslider-bullets');
            for(let counter = 0; counter < $this.$slides.length; counter++) {
                $this.bullets.append(`<li class="j-bullet"><button class="bullet-nav-item"/></li>`);
            }
        }

        function _setTrackStyles($this) {
            let width = sliderTransitionValue * $this.$slides.length;
            $this.css({'overflow':'hidden'});
            $this.$track.outerWidth(width).css({
                'display' : 'flex',
                'transition' : 'transform .5s ease-out'
            });
        }

        function _addListeners (elemet, eventType, calback, callbackArgs) {
            elemet.on(eventType, function(e){
                calback(callbackArgs);
            });
        }

        this.nextSlide = () => {
            if (this.currentSlideIndex + 1 > this.$slides.length - 1) return;
            this.currentSlideIndex += 1;
            let currentPos = sliderTransitionValue * this.currentSlideIndex;
            _setTrackPosition(this, -currentPos);
            _setActiveSlide(this, this.currentSlideIndex);
            return this;
        };
        
        this.prevSlide = () => {
            if (this.currentSlideIndex === 0) return;
            this.currentSlideIndex -= 1;
            let currentPos = sliderTransitionValue * this.currentSlideIndex;
            _setTrackPosition(this, -currentPos);
            _setActiveSlide(this, this.currentSlideIndex);
            return this;
        };

        function _setActiveSlide($this, slideindex) {
            $this.$slides.removeClass(ACTIVE_SLIDE_CLASS);
            $this.currentSlide = $this.$slides.eq(slideindex);
            $this.currentSlide.addClass(ACTIVE_SLIDE_CLASS);
        }

        function _setTrackPosition($this, trackPosition) {
            $this.$track.css({
                'transform' : `translate3d( ${trackPosition}px , 0, 0)`,
            });
        }
        
        function _setSlidesStyles($this) {
            $this.$slides.css({
                'width': slideWidth,
                'margin-right': params.spaceBetween,
            })
        }

        // function _reSetSliderWidth

        this.init();

        return this;
    }
}(jQuery));