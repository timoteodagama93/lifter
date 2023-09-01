import React, { useContext, useState } from 'react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import TopPlay from '@/Components/TopPlay';
import NavLink from '@/Components/NavLink';
import route from 'ziggy-js';
import TopArtistCard from '@/Components/TopArtistCard';
import { artists, generos, songs } from '../../../data/dummy';
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
import Galeria from '@/Components/Galeria';
import Ranking from '@/Components/Ranking';
import AscensaoListItem from '@/Components/AscensaoListItem';
import Avaliar from './Avaliar';

export default function Musicas({ start_page }) {
  const page = route().current();
  const { currentPage } = useStateContext();
  console.log(currentPage);
  return (
    <AppLayout title="Músicas">
      <div className="w-[100%] h-full">
        {currentPage === '' && <Avaliar />}
        {currentPage === 'avaliar' && <Avaliar />}
        {currentPage === 'ranking' && <Ranking />}
        {currentPage === 'musicas' && (
          <div className="w-full h-[100vh] pb-36 md:h-[82vh] p-5 overflow-y-auto">
            {songs?.map((song, id) => (
              <AscensaoListItem song={song} i={id} key={song.id} />
            ))}
          </div>
        )}
        {currentPage === 'videos' && (
          <div className="w-full h-[100vh] pb-36 md:h-[82vh] p-5 overflow-y-auto">
            {songs?.map((song, id) => ( 
              <AscensaoListItem song={song} i={id} key={id} />
            ))}
          </div>
        )}

        {/*<Ranking />{*/}
        {currentPage === 'descobrir' && (
          <div className="w-full">
            <Descobrir />
          </div>
        )}
        {currentPage === 'artistas' && <TopArtists />}

      </div>
    </AppLayout>
  );
}