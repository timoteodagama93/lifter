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
import { BiMicrophone, BiSearch, BiTrophy } from 'react-icons/bi';

import AscensaoListItem from '@/Components/AscensaoListItem';

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

import { useStateContext } from '@/contexts/PaginaActualContext';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import Galeria from '@/Components/Galeria';
import { MdClose, MdEvent } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa';
import { AiOutlinePicture } from 'react-icons/ai';
import TopArtists from '@/Components/TopArtists';
import SecondaryButton from '@/Components/SecondaryButton';

function Ascensao({ start_page }) {
  const [activeSong, setActiveSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentPage } = useStateContext();
  return (
    <AppLayout title="Ascensão">
      <div className="w-full h-full flex flex-col bg-gray-200 pb-16 m-2 rounded-sm">
        <div className="w-full flex mx-2 justify-between items-center flex-row shadow-lg">
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
        <div className="w-full mx-auto sm:px-1 lg:px-1 dark:bg-gray-800 shadow-xl rounded-lg p-1">
          {(start_page === 'sobre') && <>Sobre</>}
          {currentPage === 'artistas' && <Galeria nome_colecao="Artistas" />}
          {currentPage === 'inscricoes' && <Inscricoes />}
          {currentPage === 'beneficios' && <Beneficios />}
          {currentPage === 'termos_condicoes' && <TermosCondicoes />}
        </div>
      </div>
    </AppLayout>
  );
}

const Artistas = () => {
  return (
    <>
      <TopArtists />;
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
};

const Inscricoes = () => {
  return (
    <div className="justify-center">
      <h1 className="text-center text-3xl">Inscrever-se e participar</h1>

      <form className="m-0">
        <div className="border p-5 w-full flex flex-row mx-1 justify-start items-center">
          <label htmlFor="artistico" className=" mx-1 justify-end">
            Nome Completo
          </label>
          <input
            className="w-full border-1 rounded-sm border-orange-600 shadow-xl"
            id="artistico"
            type="text"
          />
        </div>
        <div className="border shadow-sm p-5 w-full flex flex-row mx-1 justify-start items-center">
          <label htmlFor="artistico" className=" mx-1 justify-end">
            Nome artístico
          </label>
          <input
            className="w-full border-1 rounded-sm border-orange-600 shadow-xl"
            id="artistico"
            type="text"
          />
        </div>
        <div className="border p-5 w-full flex flex-row mx-1 justify-start items-center">
          <label htmlFor="artistico" className=" mx-1 justify-end">
            Estilo Musical
          </label>
          <input
            className="w-full border-1 rounded-sm  shadow-sm"
            id="artistico"
            type="text"
          />
        </div>
        <div className="w-full m-5 flex justify-center items-center">
          <button
            type="button"
            className="w-auto border bg-orange-200 shadow-lg rounded m-1 p-5"
          >
            Pré isncrever-se
          </button>
        </div>
      </form>
    </div>
  );
};

function Beneficios({}) {
  return (
    <div className="w-full flex flex-row">
      <div className="w-1/3 flex flex-col border-r border-[#2e2c2e] mr-2 pr-1 ">
        <button className="w-full flex flex-row justify-star items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <BiTrophy /> <span>Premios</span>
        </button>
        <button className="w-full flex flex-row justify-start items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <MdEvent /> <span>Shows</span>
        </button>
        <button className="w-full flex flex-row justify-start items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <FaGraduationCap /> <span>Palestras</span>
        </button>
        <button className="w-full flex flex-row justify-start items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <AiOutlinePicture /> <span>Sessões</span>
        </button>

        <button className="w-full flex flex-row justify-start items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <BiMicrophone /> <span>Marketing</span>
        </button>
      </div>
      <div className="w-2/3">Descrição</div>
    </div>
  );
}

function TermosCondicoes({}) {
  return (
    <div className="h-screen overflow-y-scroll pb-96">
      <h1 className="text-xl text-bold text-center">
        Termos e condições do concurso "Ascensão"
      </h1>
      <div className="">
        <div className="w-full px-5 py-2">
          <h1 className="text-xl text-bold text-start">Enquadramento</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
            quasi neque? Magnam voluptas fuga dolore alias voluptatum, eligendi
            facilis ad pariatur eius nulla tempora laborum. Vero nulla officiis
            asperiores quod.
          </p>
        </div>
        <div className="w-full px-5 py-2">
          <h1 className="text-xl text-bold text-start">Termos</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
            quasi neque? Magnam voluptas fuga dolore alias voluptatum, eligendi
            facilis ad pariatur eius nulla tempora laborum. Vero nulla officiis
            asperiores quod.
          </p>
        </div>
        <div className="w-full px-5 py-2">
          <h1 className="text-xl text-bold text-start">Enquadramento</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
            quasi neque? Magnam voluptas fuga dolore alias voluptatum, eligendi
            facilis ad pariatur eius nulla tempora laborum. Vero nulla officiis
            asperiores quod.
          </p>
        </div>
        <div className="w-full px-5 py-2">
          <h1 className="text-xl text-bold text-start">Termos</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
            quasi neque? Magnam voluptas fuga dolore alias voluptatum, eligendi
            facilis ad pariatur eius nulla tempora laborum. Vero nulla officiis
            asperiores quod.
          </p>
        </div>
        <div className="w-full px-5 py-2">
          <h1 className="text-xl text-bold text-start">Enquadramento</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
            quasi neque? Magnam voluptas fuga dolore alias voluptatum, eligendi
            facilis ad pariatur eius nulla tempora laborum. Vero nulla officiis
            asperiores quod.
          </p>
        </div>
        <div className="w-full px-5 py-2">
          <h1 className="text-xl text-bold text-start">Termos</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
            quasi neque? Magnam voluptas fuga dolore alias voluptatum, eligendi
            facilis ad pariatur eius nulla tempora laborum. Vero nulla officiis
            asperiores quod.
          </p>
        </div>
        <div className="w-full px-5 py-2">
          <h1 className="text-xl text-bold text-start">Enquadramento</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
            quasi neque? Magnam voluptas fuga dolore alias voluptatum, eligendi
            facilis ad pariatur eius nulla tempora laborum. Vero nulla officiis
            asperiores quod.
          </p>
        </div>
        <div className="w-full px-5 py-2">
          <h1 className="text-xl text-bold text-start">Termos</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
            quasi neque? Magnam voluptas fuga dolore alias voluptatum, eligendi
            facilis ad pariatur eius nulla tempora laborum. Vero nulla officiis
            asperiores quod.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Ascensao;
