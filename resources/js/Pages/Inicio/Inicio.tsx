import React, { useContext, useState } from 'react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import TopPlay from '@/Components/TopPlay';
import NavLink from '@/Components/NavLink';
import route from 'ziggy-js';
import TopArtistCard from '@/Components/TopArtistCard';
import { artists, generos } from '../../../data/dummy';
import TopArtist from '@/Components/TopArtists';
import CardVideo from '@/Components/CardVideo';
import CardMusica from '@/Components/CardMusica';

import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
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

import {
  HiEmojiHappy,
  HiEmojiSad,
  HiOutlineDownload,
  HiOutlineEmojiHappy,
  HiOutlineEmojiSad,
  HiOutlineShare,
} from 'react-icons/hi';
import { FaSpeakerDeck } from 'react-icons/fa';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { Sidebar } from '@/Components';
import Descobrir from './Descobrir';
import Sugestoes from './Sugestoes';
import GallerySwiperSlide from './GallerySwiperSlide';
import EffectsCards from './EffectsCards';
import {
  BsEmojiDizzy,
  BsEmojiExpressionless,
  BsEmojiHeartEyes,
  BsEmojiLaughing,
  BsEmojiSmile,
} from 'react-icons/bs';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { GiVote } from 'react-icons/gi';
import { MdHowToVote } from 'react-icons/md';
export default function Inicio({}) {
  const page = route().current();
  const { currentPage } = useStateContext();
  return (
    <AppLayout title="Início">
      <div className="pb-12 h-screen overflow-y-hidden">
        <div className="w-full">
          <div className="">
            {/**
             * Página Index é o padrão de todas as páginas.
             */}
            {currentPage === 'index' && <Index estilo={currentPage} />}
            {currentPage === 'destaques' && <Index estilo={currentPage} />}
            {currentPage === 'avaliar' && <Index estilo={currentPage} />}

            {currentPage === 'ranking' && (
              <div className="w-full">
                <EffectsCards />
                {/*}
                <GallerySwiperSlide />
                {*/}
              </div>
            )}
            {currentPage === 'descobrir' && (
              <div className="w-full">
                <Descobrir />{' '}
              </div>
            )}
            {currentPage === 'tendencias' && (
              <div className="w-full">
                <TopArtist />{' '}
              </div>
            )}
            {currentPage === 'sugestoes' && (
              <div className="max-w-full max-h-full">
                <EffectsCards />{' '}
              </div>
            )}

            {/*}
          <Welcome />
          <TopArtist />
          {*/}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Avaliar({ name }) {
  return (
    <div className="w-full flex flex-col md:flex-row mb-36 md:mb-auto p-0 m-0">
      {}
      <div className=" w-full md:w-3/4 flex flex-col  border p-1">
        <div className="w-full flex flex-col ">
          <video controls>
            <source type="video/mp4" src="videos/css.mp4" />
          </video>
          <div className="w-full flex flex-col md:flex-row justify-between bg-gray-200">
            <div className="w-full flex flex-row space-x-5 p-1">
              <h1 className="">Anselmo Ralph</h1>
              <span>|</span>
              <span>RnB</span>
            </div>

            <div className="w-full flex flex-row items-center justify-center text-4xl relative space-x-2">
              <span className="flex flex-row space-x-1 items-center text-blue-400 text-bold">
                <HiOutlineEmojiHappy />
              </span>
              <span className="flex flex-row space-x-0 items-center text-red-600 text-bold">
                <HiOutlineEmojiSad />
              </span>
              <span className="flex flex-row space-x-1 items-center text-blue-400 text-bold">
                <HiOutlineShare />
              </span>
              <span className="flex flex-row space-x-0 items-center text-red-600 text-bold">
                <HiOutlineDownload />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 flex flex-col items-center">
        <AvaluatingSong />
        <AvaluatingSong />
        <AvaluatingSong />
        <AvaluatingSong />
        <AvaluatingSong />
      </div>
    </div>
  );
}

const Index = ({ estilo }) => {
  const [activar, setActivar] = useState('tudo');

  const [sendFeedback, setSendFeedback] = useState(false);
  return (
    <div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={0}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <div className="w-full absolute z-10 top-0 left-0  flex justify-center items-center sm:flex-row flex-col text-">
          <div className="bg-[#997f2362] justify-center items-center space-x-1 md:space-x-5">
            <button
              className="text-xl text-bold p-1 hover:text-white hover:bg-[#4c88c4] rounded-lg"
              onClick={() => setActivar('tudo')}
            >
              Ver tudo
              {activar === 'tudo' ? (
                <div
                  className={`justify-center mx-auto w-10 rounded-lg border-b-4 border-[#d17734]`}
                />
              ) : (
                ''
              )}
            </button>
            <button
              className="w-auto justify-center items-center text-xl text-bold p-1 hover:text-white hover:bg-[#4c88c4] rounded-lg"
              onClick={() => setActivar('kuduro')}
            >
              Kuduro
              {activar === 'kuduro' ? (
                <div className="justify-center mx-auto w-10 rounded-lg border-b-4 border-[#d17734]" />
              ) : (
                ''
              )}
            </button>
            <button
              className="text-xl text-bold p-1 hover:text-white hover:bg-[#4c88c4] rounded-lg"
              onClick={() => setActivar('afrohouse')}
            >
              Afrohouse
              {activar === 'afrohouse' ? (
                <div className="justify-center mx-auto w-10 rounded-lg border-b-4 border-[#d17734]" />
              ) : (
                ''
              )}
            </button>
            <button
              className="text-xl text-bold p-1 hover:text-white hover:bg-[#4c88c4] rounded-lg"
              onClick={() => setActivar('RAP')}
            >
              RAP
              {activar === 'RAP' ? (
                <div
                  className={`justify-center mx-auto w-10 rounded-lg border-b-4 border-[#d17734]`}
                />
              ) : (
                ''
              )}
            </button>
            <button
              className="text-xl text-bold p-1 hover:text-white hover:bg-[#4c88c4] rounded-lg invisible md:visible"
              onClick={() => setActivar('GETTO-ZOUK')}
            >
              Getto-zouk
              {activar === 'GETTO-ZOUK' ? (
                <div
                  className={`justify-center mx-auto w-10 rounded-lg border-b-4 border-[#d17734]`}
                />
              ) : (
                ''
              )}
            </button>
            <button
              className="text-xl text-bold p-1 hover:text-white hover:bg-[#4c88c4] rounded-lg invisible md:visible"
              onClick={() => setActivar('KIZOMBA')}
            >
              kizomba
              {activar === 'KIZOMBA' ? (
                <div
                  className={`justify-center mx-auto w-10 rounded-lg border-b-4 border-[#d17734]`}
                />
              ) : (
                ''
              )}
            </button>
          </div>
        </div>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img className="w-full h-10/12" src="img/artists/artista1.jpeg" />
            <div className="w-full h-2/12 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img src="img/artists/artista2.jpeg" />
            <div className="w-full flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <video controls>
              <source type="video/mp4" src="videos/css.mp4" />
            </video>
            <div className="w-full flex flex-col justify-start">
              <h1 className="text-xl">Anselmo Ralph</h1>
              <span className="text-base">RnB</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img className="w-full h-10/12" src="img/artists/artist2.png" />
            <div className="w-full h-2/12 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img className="w-full h-10/12" src="img/artists/artista2.jpeg" />
            <div className="w-full h-2/12 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img className="w-full h-10/12" src="img/artists/artista1.jpeg" />
            <div className="w-full h-2/12 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img className="w-full h-10/12" src="img/artists/artist1.jpg" />
            <div className="w-full h-2/12 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img className="w-full h-10/12" src="img/artists/artist2.png" />
            <div className="w-full h-2/12 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <div className="w-full h-4/6">
              <img src="img/artists/artista1.jpeg" />
            </div>
            <div className="w-full h-2/6 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="flex flex-row justify-center items-center  space-x-5">
        <p className="append-buttons">
          <h1 className="text-xs ">Avaliação do conteúdo</h1>
          <button onClick={() => {}} className="prepend-2-slides">
            1 -3
          </button>
          <button onClick={() => {}} className="prepend-2-slides">
            4-7
          </button>
          <button onClick={() => {}} className="prepend-2-slides">
            8-10
          </button>
        </p>
        <p className="append-buttons">
          <div>
            <button className="w-full text-4xl">
              <MdHowToVote />
            </button>
          </div>
        </p>
        <p className="append-buttons">
          <h1 className="text-xs ">Emoções</h1>
          <button onClick={() => {}} className="prepend-2-slides">
            <BsEmojiHeartEyes />
          </button>
          <button onClick={() => {}} className="prepend-slide">
            <BsEmojiSmile />
          </button>
          <button onClick={() => {}} className="append-slide">
            <BsEmojiExpressionless />
          </button>
          <button onClick={() => {}} className="append-2-slides">
            <BsEmojiLaughing />
          </button>
        </p>
      </div>

      <div className="flex flex-row justify-center items-center  space-x-5">
        <p className="append-buttons">
          <h1 className="text-xs">Partilhas</h1>
          <button onClick={() => {}} className="prepend-2-slides">
            Facebook
          </button>
          <button onClick={() => {}} className="prepend-2-slides">
            Instagram
          </button>
          {/*}
          <button onClick={() => {}} className="prepend-slide">
            Youtube
          </button>
          <button onClick={() => {}} className="append-slide">
            Twitter
          </button>
          {*/}
          <button onClick={() => {}} className="append-2-slides">
            TikTok
          </button>
        </p>
        <p className="append-buttons">
          <h1 className="text-xs">Julgamento</h1>
          <button
            onClick={() => setSendFeedback(true)}
            className="prepend-2-slides"
          >
            Positivo
          </button>
          <button
            onClick={() => setSendFeedback(true)}
            className="prepend-2-slides"
          >
            Neutro
          </button>
          <button
            onClick={() => setSendFeedback(true)}
            className="prepend-slide"
          >
            Negativo
          </button>
        </p>
      </div>

      <Modal isOpen={sendFeedback} onClose={() => setSendFeedback(false)}>
        <div className="w-[400px] h-[200px] flex flex-col">
          <h1 className="text-2xl text-center">Julgar a música e o artista </h1>
        </div>
      </Modal>
    </div>
  );
};

function AvaluatingSong({}) {
  return (
    <div className="w-full h-10 flex flex-col border m-0 p-0">
      <div className="w-full flex flex-row p-0">
        <div className="w-1/6 h-2 rounded-full ">
          <img src="img/logo/lifter.png" />
        </div>
        <div className="w-5/6 flex flex-col">
          <h1 className="text-sm">Elionora Santaniela</h1>
          <div className="w-full flex flex-row space-x-2">
            <p className="text-xs">Kuduro</p>
            <span className="text-xs">|</span>
            <div className="flex flex-row space-x-2 text-xs">
              <span className="flex flex-row space-x-1 items-center text-blue-400 text-bold">
                <HiOutlineEmojiHappy />
                <span>5472</span>
              </span>
              <span className="flex flex-row space-x-0 items-center text-red-600 text-bold">
                <HiOutlineEmojiSad />
                <span>7</span>
              </span>
              <span className="flex flex-row space-x-1 items-center text-blue-400 text-bold">
                <HiOutlineShare /> 52
              </span>
              <span className="flex flex-row space-x-0 items-center text-red-600 text-bold">
                <HiOutlineDownload /> 57
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
