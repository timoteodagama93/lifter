import React, { useEffect, useState } from 'react';
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
import { useStateContext } from '@/contexts/PaginaActualContext';
import Avaliar from './Avaliar';
import Noticias from './Noticias';
import { LiveTV, Posts } from './';
import { BiHome, BiLike } from 'react-icons/bi';
import { BsNewspaper, BsTrophy } from 'react-icons/bs';
import { FaMusic } from 'react-icons/fa';
import Sobre from '../Concursos/Sobre';
import Container from '@/Layouts/Container';
import { MdLiveTv } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import { GrUserExpert } from 'react-icons/gr';
import CommunityDiscussion from '@/Components/CommunityDiscussion';

interface Props {
  pagina: string;
  songs: Array<Object>;
  posts: Array<Object>;
  APP_URL: String;
}

export default function Home({ songs, posts }: Props) {
  const route = useRoute();
  const page = useTypedPage();

  /*
  const { data, isFetching, error } = useGetValuateSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  */

  const { currentPage, setCurrentPage } = useStateContext();
  const [bgPage, setBgPage] = useState(undefined);

  function setDefaultPage() {
    setCurrentPage(
      <Avaliar
        songs={songs}
        setSongsList={setSidebarList}
        setBgPage={setBgPage}
      />,
    );
  }

  const [sidebarList, setSidebarList] = useState(<></>);

  useEffect(setDefaultPage, []);
  /**Para marcar o botão  de baixo actualmente activo */
  const [activeBottomButton, setActiveBottomButton] = useState('Ao Vivo');
  return (
    <AppLayout
      title="Home"
      renderHeader={() => (
        <div className="hidden w-10/12 gap-1 h-16 justify-end  items-center   flex-row  rounded-lg">
          <div className="mx-auto mb-1 sm:px-1 lg:px-2 object-contain hidden flex-row b-[#997f2362]">
            <div className="w-full h-16 hidden md:flex flex-row justify-center items-center p-0 ">
              <div
                className={`${
                  route().current() == '/'
                    ? 'border-b-2  border-[#4c88c4] dark:bg-[#2e2c2e] text-[#4c88c4]'
                    : ''
                }  p-2 mx-1 cursor-pointer shadow-sm b-[#4c88c4] hover:bg-[#2e2c2e]  text-gray-400`}
              >
                <Link
                  onClick={() => setCurrentPage(<Destaques />)}
                  href={route('/')}
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
      renderBottom={() => (
        <>
          <button
            onClick={() => {
              setCurrentPage(
                <LiveTV songs={songs} setSongsList={setSidebarList} />,
              );
              setActiveBottomButton('Ao Vivo');
            }}
            className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'Ao Vivo' ? 'bg-gray-300' : ''}
            `}
          >
            <MdLiveTv className="w-10 h-10" />
            Ao Vivo
          </button>
          <button
            onClick={() => {
              setCurrentPage(
                <Avaliar songs={songs} setSongsList={setSidebarList} />,
              );
              setActiveBottomButton('Avaliar');
            }}
            className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'Avaliar' ? 'bg-gray-300' : ''}
            `}
          >
            <BiLike className="w-10 h-10" />
            Destaques
          </button>
          <button
            onClick={() => {
              setCurrentPage(
                <Avaliar songs={songs} setSongsList={setSidebarList} />,
              );
              setActiveBottomButton('Juris');
            }}
            className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'Juris' ? 'bg-gray-300' : ''}
            `}
          >
            <GrUserExpert className="w-10 h-10" />
            Jurís
          </button>
          <button
            onClick={() => {
              setCurrentPage(<CommunityDiscussion setPostsList={setSidebarList} />);
              setActiveBottomButton('Comunidade');
            }}
            className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'Comunidade' ? 'bg-gray-300' : ''}
            `}
          >
            <HiUserGroup className="w-10 h-10" />
            Comunidade
          </button>
          <button
            onClick={() => {
              setCurrentPage(<Posts setPostsList={setSidebarList} />);
              setActiveBottomButton('Noticias');
            }}
            className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'Noticias' ? 'bg-gray-300' : ''}
            `}
          >
            <BsNewspaper className="w-10 h-10" />
            Notícias
          </button>
        </>
      )}
      renderSidebarList={() => sidebarList}
      bg={bgPage}
    >
      <Head title="Home" />

      <div className="w-full relative sm:flex flex-col sm:justify-center sm:items-center  bg-dots-darker bg-center dark:bg-dots-lighter  selection:bg-red-500 selection:text-white">
        {currentPage}
      </div>
    </AppLayout>
  );
}
