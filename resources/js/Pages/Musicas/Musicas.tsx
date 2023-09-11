import React, { useEffect } from 'react';
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
import { Ranking } from '.';

export default function Musicas() {
  const page = route().current();
  const { currentPage, setCurrentPage } = useStateContext();

  function setDefaultPage() {
    setCurrentPage(<Ranking />);
  }

  useEffect(setDefaultPage, []);

  return (
    <AppLayout title="Músicas">
      <div className="relative">{currentPage}</div>
    </AppLayout>
  );
}
