(function($){
    $.fn.jSlider = function(options) {
        let params = $.extend({
            autoplay: false,
            playDelay: 3000,
            navigation: false,
            bullets: false
        }, options);

        // nessesary variables

        this.$track = $(`<div class="jslider-track"/>`);
        this.$slides = $('> *', this).detach();
        this.$buttonNext = `<button class="next-slide"/>`;
        this.$buttonPrev = `<button class="prev-slide"/>`;

        // functions

        this.init = () => {
            this.$track.append(this.$slides);
            this.append(this.$track);
            _setTrackWidth(this);
            if (params.navigation) _appendButtons(this);
            if (params.bullets) _appendBullets(this);
            
        }

        function _appendButtons ($this) {
            $this.append($this.$buttonNext).append($this.$buttonPrev);
            $this.$buttonNext = $this.find('.next-slide');
            $this.$buttonPrev = $this.find('.prev-slide');
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

        function _setTrackWidth($this) {
            let width = $this.innerWidth() * $this.$slides.length;
            $this.css({'overflow':'hidden'});
            $this.$track.outerWidth(width).css({
                'display' : 'flex',
                'transform' : `translate3d(0, 0, 0)`,
                'transition' : 'transform .5s ease-out'
            });
        }

        function _addListeners (elemet, eventType, calback, calbackArgs) {
            elemet.on(eventType, function(e){
                calback(calbackArgs);
            });
        }

        this.nextSlide = () => {
            let counter = 1;
            this.$track.css({
                'transform' : `translate3d( -${this.width() * counter}px , 0, 0)`
            });
            counter++
        }

        this.init();

        return this;
    }
}(jQuery));