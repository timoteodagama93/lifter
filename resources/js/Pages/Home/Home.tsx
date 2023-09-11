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

import './style.css';
import Destaques from './Destaques';
import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/core';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { Error, Loader } from '@/Components';
import { useGetValuateSongsQuery } from '@/redux/services/coreApi';
import { useSelector } from 'react-redux';

interface Props {
  pagina: string;
}

export default function Home({ pagina, posts, APP_URL }: Props) {
  const route = useRoute();
  const page = useTypedPage();

/*
  const { data, isFetching, error } = useGetValuateSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  */

  const { currentPage, setCurrentPage } = useStateContext();


  localStorage.getItem('APP_URL_STORAGE') == null
    ? localStorage.setItem('APP_URL_STORAGE', APP_URL + 'storage/')
    : '';

    function setDefaultPage(){
      setCurrentPage(<Destaques songs={[]} />)
    }

    useEffect(setDefaultPage,[]);

  return (
    <AppLayout title="Home">
      <Head title="Home" />

      <div className="relative sm:flex flex-col sm:justify-center sm:items-center  bg-dots-darker bg-center dark:bg-dots-lighter  selection:bg-red-500 selection:text-white">
        {currentPage}
        {/*}
        <div className="flex justify-center sm:items-center sm:justify-between space-x-2">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-left">
            <div className="flex items-center gap-4">
              <Link
                href={route('patrocinar')}
                className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  className="-mt-px mr-1 w-5 h-5 stroke-gray-400 dark:stroke-gray-600 group-hover:stroke-gray-600 dark:group-hover:stroke-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                Patrocinar
              </Link>
              <Link
                href={route('parceiros')}
                className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 space-x-2"
              >
                <FaHandshake />
                Parceiros
              </Link>
            </div>
          </div>
          <div className="flex space-x-2 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-left">
            <div className="flex items-center gap-4">
              <a
                href={route('terms.show')}
                className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 space-x-2"
              >
                <FaHandshake />
                <span>Termos</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={route('policy.show')}
                className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 space-x-2"
              >
                <FaHandshake />
                <span>Políticas</span>
              </a>
            </div>
          </div>

          <div className="ml-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-right sm:ml-0">
            Lifter &copy; {new Date().getFullYear()}
          </div>
        </div>
        {*/}
      </div>
    </AppLayout>
  );
}
