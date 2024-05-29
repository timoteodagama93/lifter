import React, {  } from 'react';

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
import Songs from './Songs';
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Layouts/Container';

export default function Musicas() {
  const page = route().current();
  const { currentPage, setCurrentPage } = useStateContext();

  return (
    <AppLayout title="Músicas">
      <Container>
        <div className="w-full ">
          <Songs />
        </div>
      </Container>
    </AppLayout>
  );
}
