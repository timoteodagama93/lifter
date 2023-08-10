import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';

import { Error, Loader, SongCard } from '../../Components';
import { generos, songs } from '../../../data/dummy';
import TopPlay from '@/Components/TopPlay';
import { Link } from '@inertiajs/react';
import PlayPause from '@/Components/PlayPause';
import route from 'ziggy-js';
import NavLink from '@/Components/NavLink';
import Votar from '@/Components/Votar';
import FeedbackOnSong from '@/Components/FeedbackOnSong';
import { BiSearch } from 'react-icons/bi';

import AscensaoListItem from '@/Components/AscensaoListItem';

/**
 * SWIPER
 */
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { FreeMode, Navigation, Thumbs, EffectCoverflow, Pagination } from 'swiper/modules';
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


import { useStateContext } from '@/contexts/PaginaActualContext';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';

function Ascensao() {
  const [activeSong, setActiveSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentPage } = useStateContext();
  return (
    <AppLayout title="Ascensão">
      <div className="w-full h-screen flex flex-col bg-gray-200 pb-16">
        <div className="w-full flex mx-2 justify-between items-center flex-row mt-0 mb-0">
          <h2 className="font-bold text-base md:text-xl uppercase">
            {' '}
            {currentPage}{' '}
          </h2>
          <select
            id="select_style"
            onChange={() => {}}
            value=""
            className="bg-[#000] text-gray-50 font-bold p-1 text-sm rounded-lg outline-none sm:mt-0 mt-0 mr-10"
          >
            {generos.map(genero => (
              <option key={genero.value} id={genero.value} value={genero.value}>
                {genero.title}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-y-auto w-full min-h-min max-h-screen mx-auto sm:px-1 lg:px-1 dark:bg-gray-800 shadow-xl rounded-lg mb-">
          {currentPage === 'index' && <Sobre />}
          {currentPage === 'sobre' && <Sobre />}
          {currentPage === 'artistas' && <Artistas />}

          {currentPage === 'ranking' &&
            songs?.map((song, id) => (
              <AscensaoListItem song={song} i={id} key={song.id} />
            ))}
        </div>
      </div>
    </AppLayout>
  );
}

const Artistas = () => {
  return (
    <>
      <Swiper
        onSwiper={() => {}}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="w-full flex flex-col justify-start">
            <img src="img/artists/artista1.jpeg" />
            <div className="w-full flex flex-col  justify-start">
              <h1 className="text-xl">3 Finer</h1>
              <span className="text-base">RnB</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col justify-start">
            <img src="img/artists/artista2.jpeg" />
            <div className="w-full flex flex-col  justify-start">
              <h1 className="text-xl">CEF</h1>
              <span className="text-base">Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-full flex flex-col justify-start">
            <img src="img/artists/artista2.jpeg" />
            <div className="w-full flex flex-col  justify-start">
              <h1 className="text-xl">CEF</h1>
              <span className="text-base">Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col justify-start">
            <img src="img/artists/artista1.jpeg" />
            <div className="w-full flex flex-col  justify-start">
              <h1 className="text-xl">3 Finer</h1>
              <span className="text-base">RnB</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col justify-start">
            <img src="img/artists/artista2.jpeg" />
            <div className="w-full flex flex-col  justify-start">
              <h1 className="text-xl">CEF</h1>
              <span className="text-base">Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="w-full flex flex-col justify-start">
            <img src="img/artists/artista2.jpeg" />
            <div className="w-full flex flex-col  justify-start">
              <h1 className="text-xl">CEF</h1>
              <span className="text-base">Zouk</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      ;
    </>
  );
};

const Sobre = () => {
  return (
    <>
      <div>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
          spaceBetween={0}
          loop={false}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 50,
            modifier: 1,
            slideShadows: true,
          }}
          navigation={true}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
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
            <PrimaryButton onClick={() => {}} className="prepend-2-slides">
              Pré Inscrever-se
            </PrimaryButton>
          </p>
          <p className="append-buttons">
            <h1 className="text-xs ">Patrocinar Concurso</h1>
            <PrimaryButton onClick={() => {}} className="prepend-2-slides">
              Patrocinar
            </PrimaryButton>
            <PrimaryButton onClick={() => {}} className="prepend-2-slides">
              Benefícios
            </PrimaryButton>
          </p>
          <p className="append-buttons">
            <h1 className="text-xs ">Sugerir e partilhar</h1>
            <PrimaryButton onClick={() => {}} className="prepend-2-slides">
              Partilhar
            </PrimaryButton>
          </p>
        </div>
      </div>
    </>
  );
};

export default Ascensao;
