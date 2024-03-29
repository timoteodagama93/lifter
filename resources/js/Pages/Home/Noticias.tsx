import React, { useEffect } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';

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

import Destaques from './Destaques';
import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/core';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { Error, Loader } from '@/Components';
import { useGetSongsQuery } from '@/redux/services/coreApi';
import { useSelector } from 'react-redux';

interface Props {
  posts: Array<Object>;
}

export default function Noticias({ posts }: Props) {
  const route = useRoute();
  const page = useTypedPage();

  /*
  const { data, isFetching, error } = useGetValuateSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  */

  const { currentPage, setCurrentPage } = useStateContext();

  function setDefaultPage() {
    setCurrentPage(<Noticias />);
  }

  useEffect(setDefaultPage, []);

  return (
    <AppLayout title="Notícias">
      <Head title="Notícias" />

      <div className="relative sm:flex flex-col sm:justify-center sm:items-center  bg-dots-darker bg-center dark:bg-dots-lighter  selection:bg-red-500 selection:text-white">
        {currentPage}
      </div>
    </AppLayout>
  );
}
