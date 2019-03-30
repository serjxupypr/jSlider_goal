// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

import jSlider from './modules/jSlider';

(($) => {
  // When DOM is ready
  $(() => {
    $('.turbo-slider-1').jSlider({
      navigation: true,
      bullets: true,
      slidesOnScreen: 2,
      spaceBetween: 20,
      slideSpeed: 800,
      autoplay: true,
      onSliderResize() {
        console.log('is resized');
      },
      onSlideChange() {
        console.log('slide is changed');
      },
    });

    $('.turbo-slider-2').jSlider({
      navigation: true,
      bullets: false,
    });
  });
})(jQuery);
