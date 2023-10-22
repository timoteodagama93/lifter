import React, { useContext, useState } from 'react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import TopPlay from '@/Components/TopPlay';
import NavLink from '@/Components/NavLink';
import route from 'ziggy-js';
import TopArtistCard from '@/Components/TopArtistCard';
import { artists, generos } from '../../../data/dummy';
import TopArtists from '@/Components/TopArtists';
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

import {
  HiEmojiHappy,
  HiEmojiSad,
  HiOutlineDownload,
  HiOutlineEmojiHappy,
  HiOutlineEmojiSad,
  HiOutlineShare,
} from 'react-icons/hi';
import { FaSpeakerDeck, FaVoteYea } from 'react-icons/fa';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { Sidebar } from '@/Components';
import Sugestoes from './Sugestoes';
import GallerySwiperSlide from './GallerySwiperSlide';
import EffectsCards from './EffectsCards';
import {
  BsEmojiDizzy,
  BsEmojiExpressionless,
  BsEmojiHeartEyes,
  BsEmojiLaughing,
  BsEmojiSmile,
  BsFacebook,
  BsInstagram,
  BsTiktok,
} from 'react-icons/bs';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { GiAlgeria, GiPreviousButton, GiVote } from 'react-icons/gi';
import {
  MdHowToVote,
  MdOutlineMessage,
  MdPreview,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/md';
import { PlayMusica } from '../../../img';
import PlayPause from '@/Components/PlayPause';
import { BiDislike, BiLibrary, BiLike, BiShare } from 'react-icons/bi';
import SwiperMenu from './SwiperMenu';
import classNames from 'classnames';
import { GrPrevious } from 'react-icons/gr';
import Galeria from '../../Components/Galeria';
import Destaques from '../Home/Destaques';
import Opinar from './Opinar';

export default function Jurados() {
  const page = route().current();
  const { currentPage, setCurrentPage } = useStateContext();
  return (
    <div className="w-full max-w-screen p-2">
        {/**
         * Página Index é o padrão de todas as páginas.
         */}
        <h1>destaques</h1>
        <Destaques songs={{}} />
       
        <h1>Galery</h1>
        <GallerySwiperSlide />
        <h1>Opinar</h1>
         <Opinar />
        <h1>Effects</h1>
        <EffectsCards />
        {/*currentPage === 'ranking' && <EffectsCards />*/}
        <Sugestoes />
        {/*currentPage === 'tendencias' && <TopArtists />*/}
      </div>
  );
}

function Classificar({}) {
  return (
    <div className="img-contain">
      <div className="image-gallery">
        <div className="column-img">
          <div className="image-item">
            <img src={artists[0].images.artistImage} alt="" />
            <div className="overlay">
              <span>Artist Name</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
