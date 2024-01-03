import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './effectsCards.css';

// import required modules
import { EffectCards } from 'swiper/modules';

export default function EffectsCards() {
  return (
    <div className="w-[320px] ">
      <div className="effectsCardSwiper">
        <Swiper
          effect={'cards'}
          grabCursor={false}
          modules={[EffectCards]}
          className="mySwiper"
          loop={true}
          navigation={true}
        >
          <SwiperSlide>
            <img src="img/artists/artista1.jpeg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="img/artists/artista2.jpeg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="img/artists/artista1.jpeg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="img/artists/artist2.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="img/artists/artista2.jpeg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="img/artists/artista1.jpeg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="img/artists/artista2.jpeg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="img/artists/artist2.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="img/artists/artista1.jpeg" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
