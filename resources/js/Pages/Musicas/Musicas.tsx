import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import route from 'ziggy-js';

// import Swiper core and required modules

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

import { useStateContext } from '@/contexts/PaginaActualContext';
import { Descobrir, Ranking } from '.';
import RankingIcon from '@/Components/RankingIcon';
import { MdEmojiSymbols, MdExplore } from 'react-icons/md';
import { BsNewspaper } from 'react-icons/bs';
import { GrUserExpert } from 'react-icons/gr';
import { HiUserGroup } from 'react-icons/hi';
import { FaDirections } from 'react-icons/fa';
import { BiDownload } from 'react-icons/bi';
import Songs from './Songs';

export default function Musicas() {
  const page = route().current();
  const { currentPage, setCurrentPage } = useStateContext();

  return (
    <AppLayout title="Músicas">
      <div className="w-full ">
        <Songs />
      </div>
    </AppLayout>
  );
}
