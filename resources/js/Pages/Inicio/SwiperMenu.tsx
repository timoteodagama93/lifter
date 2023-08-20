import React from 'react';
import './SwiperMenu.css'
import { Swiper } from 'swiper';
var menuButton = document.querySelector('.menu-button');
var openMenu = function () {
  swiper.slidePrev();
};
var swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  initialSlide: 1,
  resistanceRatio: 0,
  slideToClickedSlide: true,
  on: {
    slideChangeTransitionStart: function () {
      var slider = this;
      if (slider.activeIndex === 0) {
        menuButton.classList.add('cross');
        // required because of slideToClickedSlide
        menuButton.removeEventListener('click', openMenu, true);
      } else {
        menuButton.classList.remove('cross');
      }
    },
    slideChangeTransitionEnd: function () {
      var slider = this;
      if (slider.activeIndex === 1) {
        menuButton.addEventListener('click', openMenu, true);
      }
    },
  },
});
function SwiperMenu() {
  return (
    <div>
      <div className="swiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide menu">Menu slide</div>
          <div className="swiper-slide content">
            <div className="menu-button">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            Content slide
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwiperMenu;
