import React, { useEffect } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head, Link } from '@inertiajs/react';

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
import Posts from './Posts';
import Avaliar from '../Avaliar';
import { BiHome } from 'react-icons/bi';
import { BsTrophy } from 'react-icons/bs';
import { FaMusic } from 'react-icons/fa';
import Sobre from '../Concursos/Sobre';

interface Props {
  pagina: string;
  songs: Array<Object>;
  APP_URL: String;
}

export default function Home({ pagina, songs, APP_URL }: Props) {
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
    setCurrentPage(<Avaliar songs={songs} />);
  }

  useEffect(setDefaultPage, []);

  return (
    <AppLayout
      title="Home"
      renderHeader={() => (
        <div className="hidden w-10/12 gap-1 h-16 justify-end  items-center   flex-row  rounded-lg">
          <div className="mx-auto mb-1 sm:px-1 lg:px-2 object-contain hidden flex-row b-[#997f2362]">
            <div className="w-full h-16 hidden md:flex flex-row justify-center items-center p-0 ">
              <div
                className={`${
                  route().current() == '/home'
                    ? 'border-b-2  border-[#4c88c4] dark:bg-[#2e2c2e] text-[#4c88c4]'
                    : ''
                }  p-2 mx-1 cursor-pointer shadow-sm b-[#4c88c4] hover:bg-[#2e2c2e]  text-gray-400`}
              >
                <Link
                  onClick={() => setCurrentPage(<Destaques />)}
                  href={route('/home')}
                  className="flex flex-col lg:flex-row justify-center items-center gap-1"
                >
                  <BiHome className="text-3xl" />

                  <div className="flex flex-col text-start">
                    <span className="text-base">Início</span>
                    <span className="text-xs dark:text-gray-400 hidden xl:flex">
                      Comece a explorar
                    </span>
                  </div>
                </Link>
              </div>
              <div
                className={`${
                  route().current()?.includes('musicas')
                    ? 'border-b-2 border-[#4c88c4]  shadow-lg rounded shadow-black'
                    : ''
                } shadow-sm rounded 
          p-2 mx-1 cursor-pointer hover:bg-[#f6cc33   b-[#4c88c4] text-gray-400 `}
              >
                <Link
                  onClick={() => setCurrentPage(<Avaliar />)}
                  href={'musicas'}
                  className="flex flex-col lg:flex-row justify-center items-center gap-1"
                >
                  <FaMusic className="text-3xl" />
                  <div className="flex flex-col text-start">
                    <span className="text-base">Músicas</span>
                    <span className="text-xs text-gray-400 hidden xl:flex">
                      Biblioteca musical
                    </span>
                  </div>
                </Link>
              </div>
              <div
                className={`${
                  route().current()?.includes('concursos')
                    ? 'border-b-2 border-[#4c88c4]  shadow-lg rounded shadow-black'
                    : ' '
                } bg-[#] shadow-sm rounded p-2 mx-1 cursor-pointer hover:bg-[#f6cc33  b-[#4c88c4] dark:text-white dark:hover:bg-[#2e2c2e] hover:bg-[#eaeaea]`}
              >
                <Link
                  onClick={() => setCurrentPage(<Sobre />)}
                  href={route('concursos')}
                  className="flex flex-col lg:flex-row justify-center items-center gap-1"
                >
                  <BsTrophy className="text-3xl" />
                  <div className="flex flex-col text-start">
                    <span className="text-base">Concursos</span>
                    <span className="text-xs text-gray-400 hidden xl:flex">
                      Concurso musical
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    >
      <Head title="Home" />

      <div className="relative sm:flex flex-col sm:justify-center sm:items-center  bg-dots-darker bg-center dark:bg-dots-lighter  selection:bg-red-500 selection:text-white">
        {currentPage}
      </div>
    </AppLayout>
  );
}
