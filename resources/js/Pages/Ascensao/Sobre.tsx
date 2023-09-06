import SecondaryButton from '@/Components/SecondaryButton';
import React from 'react'


/**
 * SWIPER
 */
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import {
  FreeMode,
  Navigation,
  Thumbs,
  EffectCoverflow,
  Pagination,
} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './style.css';
import './effectsCards.css';

function Sobre() {
    return (
        <>
          <div>
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              spaceBetween={0}
              loop={false}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 50,
                modifier: 1,
                slideShadows:true,
              }}
              navigation={true}
              pagination={true}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="mySwiper w-[20vw] "
            >
              <SwiperSlide>
                <img className="w-full h-10/12" src="img/ascensao/Slide1.PNG" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-10/12" src="img/ascensao/Slide2.png" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-10/12" src="img/ascensao/Slide3.png" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-10/12" src="img/ascensao/Slide4.png" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-10/12" src="img/ascensao/Slide5.png" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-10/12" src="img/ascensao/Slide6.png" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-10/12" src="img/ascensao/Slide7.png" />
              </SwiperSlide>
            </Swiper>
    
            <div className="flex flex-row justify-center items-center  space-x-5">
              <p className="append-buttons">
                <h1 className="text-xs ">Reallizar pré-inscrição</h1>
                <SecondaryButton onClick={() => {}} className="prepend-2-slides">
                  Pré Inscrever-se
                </SecondaryButton>
              </p>
              <p className="append-buttons">
                <h1 className="text-xs ">Patrocinar Concurso</h1>
                <SecondaryButton onClick={() => {}} className="prepend-2-slides">
                  Patrocinar
                </SecondaryButton>
                <SecondaryButton onClick={() => {}} className="prepend-2-slides">
                  Benefícios
                </SecondaryButton>
              </p>
              <p className="append-buttons">
                <h1 className="text-xs ">Sugerir e partilhar</h1>
                <SecondaryButton onClick={() => {}} className="prepend-2-slides">
                  Partilhar
                </SecondaryButton>
              </p>
            </div>
          </div>
        </>
      );
}

export default Sobre