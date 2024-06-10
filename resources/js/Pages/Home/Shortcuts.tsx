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
import AppLayout from '@/Layouts/AppLayout';
import { useStateContext } from '@/contexts/PaginaActualContext';
import Avaliar from './Avaliar';
import { Lifter } from '.';
import {
  BiHistory,
  BiMicrophone,
  BiSearch,
  BiShare,
  BiVideo,
} from 'react-icons/bi';
import { BsNewspaper, BsUpload } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import {
  useGetDestaqueSongsQuery,
  useGetDestaqueVideosQuery,
} from '@/redux/services/coreApi';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { SongCard } from '@/Components';
import VideoCardGrelha from '@/Components/VideoCardGrelha';
import Container from '@/Layouts/Container';

import { GiTribunalJury } from 'react-icons/gi';
import {
  MdEvent,
  MdEventAvailable,
  MdExplore,
  MdMusicNote,
  MdWork,
} from 'react-icons/md';
import Dance from '../Arts/Dance';
import { RiOrganizationChart } from 'react-icons/ri';
import { HiUserGroup } from 'react-icons/hi';

interface Props {
  pagina: string;
  songs: Array<Object>;
  posts: Array<Object>;
  APP_URL: String;
}

export default function Shortcuts({ posts }: Props) {
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
    setCurrentPage(<Avaliar />);
  }

  const [sidebarList, setSidebarList] = useState(<></>);

  useEffect(setDefaultPage, []);
  const { data: songs, isFetching, error } = useGetDestaqueSongsQuery('');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: videos,
    isFetching: fetchV,
    error: errorV,
  } = useGetDestaqueVideosQuery('');
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);

  return (
    <AppLayout title="Home" renderSidebarList={() => sidebarList} bg={bgPage}>
      <Head title="Home" />
      <Container>
        <div className="w-full relative sm:flex flex-col sm:justify-center sm:items-center  bg-dots-darker bg-center dark:bg-dots-lighter  selection:bg-red-500 ">
          <div className="w-full h-full overflow-y-hidden flex flex-col gap-1 justify-cebter items-center rounded-lg">
            <div className="w-full flex justify-between items-center p-1 md:px-5 border-b">
              <div className="w-4/5 mx-auto md:mx-6">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-5000 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Pesquisar"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-2.5 ml-2 text-sm font-medium text-white bg-[#0094f8] rounded-lg border border-[#0094f8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                </form>
              </div>

              <div className="w-1/5 flex flex-row justify-center items-center hidden ">
                <Link
                  href="noticias"
                  className="transform-effect p-1 justify-center items-center w-full flex flex-col"
                >
                  {' '}
                  <BsNewspaper className="w-10 h-auto font-bold" />{' '}
                  <span className="flex">Ver as notícias</span>
                </Link>
              </div>
            </div>

            <div className="flex w-full h-full flex-col relative my-1">
              <div
                className="w-full flex flex-row justify-between
             items-center px-5 shadow-inner_ _shadow-black"
              >
                <h2 className=" font-bold text-base md:text-4xl">Destaques </h2>
                <a
                  className="hidden md:flex"
                  target="_blank"
                  href={route('policy.show')}
                >
                  <p className="text-base cursor-pointer p-2 transform-effect">
                    Políticas de privacidades
                  </p>
                </a>
              </div>
              <div className="w-full flex flex-wrap relative h-full justifiy-center items-center px-5 md:px-12 ">
                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5 ">
                  <div
                    onClick={() => setCurrentPage(<Dance />)}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[#f6cc33] ">
                      <MdMusicNote className="w-full h-full relative right-0 text-[#0094f8]  " />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-[#0094f8] font-bold truncate">
                        Músicas
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <div
                    onClick={() => setCurrentPage(<Dance />)}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime] ">
                      <BiVideo className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-5000 font-bold truncate">
                        Vídeos
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <div
                    onClick={() => setCurrentPage(<Dance />)}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime] ">
                      <BiMicrophone className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-5000 font-bold truncate">
                        Artistas
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <div
                    onClick={() => setCurrentPage(<Dance />)}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime] ">
                      <BiShare className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-5000 font-bold truncate">
                        Rede Lifter
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full h-full flex-col relative my-1">
              <div
                className="w-full flex flex-row justify-between
             items-center px-5 shadow-inner_ _shadow-black"
              >
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Actualizações{' '}
                </h2>
                <a
                  className="hidden md:flex"
                  target="_blank"
                  href={route('policy.show')}
                >
                  <p className="text-base cursor-pointer p-2 transform-effect">
                    Políticas de privacidades
                  </p>
                </a>
              </div>

              <div className="w-full flex flex-wrap relative h-full justifiy-center items-center px-5 md:px-12 ">
                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('discover')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <MdExplore className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Descobrir
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5 hover:bg-[#006bb78a] rounded ">
                  <Link
                    href={route('noticias')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <BsNewspaper className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 flex-col px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Notícias
                      </span>
                      <span className="w-full relative  left-0 bottom-0 text-xs md:text-base text-gray-5000 font-bold truncate">
                        23 actualizações
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5 hover:bg-[#006bb78a] rounded ">
                  <Link
                    href={route('articles')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <BiSearch className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 flex-col px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Artigos
                      </span>
                      <span className="w-full relative  left-0 bottom-0 text-xs md:text-base text-gray-5000 font-bold truncate">
                        50 actualizações
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('perfil')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <BiHistory className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Meu Feed
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('comunidade')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <HiUserGroup className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Comunidade
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('eventos')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <MdEvent className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Eventos
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex w-full h-full flex-col relative my-1">
              <div
                className="w-full flex flex-row justify-between
             items-center p-5 shadow-inner_ _shadow-black"
              >
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Centro de contas
                </h2>
                <a
                  className="hidden md:flex"
                  target="_blank"
                  href={route('policy.show')}
                >
                  <p className="text-base cursor-pointer p-2 transform-effect">
                    Políticas de privacidades
                  </p>
                </a>
              </div>
              <div className="w-full flex flex-wrap relative h-full justifiy-center items-center px-5 md:px-12 ">
                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <div
                    onClick={() => setCurrentPage(<Dance />)}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <BiMicrophone className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Artística
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <div
                    onClick={() => setCurrentPage(<Dance />)}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <MdWork className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Profissional
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <div
                    onClick={() => setCurrentPage(<Dance />)}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <FaUserFriends className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Grupos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('uploads')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <BsUpload className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Carregamentos
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex w-full h-full flex-col relative my-1">
              <div
                className="w-full flex flex-row justify-between
             items-center p-5 shadow-inner_ _shadow-black"
              >
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Rede Lifter
                </h2>
                <a className="hidden md:flex" href={route('network')}>
                  <p className="text-base cursor-pointer p-2 transform-effect">
                    Ver tudo
                  </p>
                </a>
              </div>
              <div className="w-full flex flex-wrap relative h-full justifiy-center items-center px-5 md:px-12 ">
                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <BiMicrophone className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Produtores
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <MdWork className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        DJs
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <FaUserFriends className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Influencers
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <FaUserFriends className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Artistas
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <MdEventAvailable className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Casas de eventos
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    onClick={() => setCurrentPage(<Dance />)}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <GiTribunalJury className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Jurados
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <RiOrganizationChart className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Org. de eventos
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex w-full h-full flex-col relative my-1">
              <div
                className="w-full flex flex-row justify-between
             items-center p-5 shadow-inner_ _shadow-black"
              >
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Artes
                </h2>
                <a className="hidden md:flex" href={route('arts')}>
                  <p className="text-base cursor-pointer p-2 transform-effect">
                    Ver tudo
                  </p>
                </a>
              </div>
              <div className="w-full flex flex-wrap relative h-full justifiy-center items-center px-5 md:px-12 ">
                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <BiMicrophone className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Literatura
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <MdWork className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Música
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <FaUserFriends className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Teatro
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <FaUserFriends className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Artesanato
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <MdEventAvailable className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Pintura
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    onClick={() => setCurrentPage(<Dance />)}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <GiTribunalJury className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Fotografia
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <RiOrganizationChart className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Cinema
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex w-full h-full flex-col relative my-1">
              <div
                className="w-full flex flex-row justify-between
             items-center p-5 shadow-inner_ _shadow-black"
              >
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Cultura
                </h2>
                <a className="hidden md:flex" href={route('cultura')}>
                  <p className="text-base cursor-pointer p-2 transform-effect">
                    Ver tudo
                  </p>
                </a>
              </div>
              <div className="w-full flex flex-wrap relative h-full justifiy-center items-center px-5 md:px-12 ">
                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <BiMicrophone className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Dança
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <MdWork className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Música
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <FaUserFriends className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        História
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <FaUserFriends className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Jogos
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <MdEventAvailable className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Sítios e Monumentos
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    onClick={() => setCurrentPage(<Dance />)}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <GiTribunalJury className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="w-full relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Culinária
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1/4  md:h-1/2 lg:h-1/5 p-1 md:p-5">
                  <Link
                    href={route('network')}
                    className="w-full h-full  flex flex-col relative justify-center item-center p-1  _transform-effect hover:cursor-pointer"
                  >
                    <div className="flex justify-center items-center w-full  h-5/6 p-2 md:p-5 rigth-0 border shadow shadow-black rounded-xl bg-[lime]">
                      <RiOrganizationChart className="w-full h-full relative right-0" />
                    </div>
                    <div className="w-full h-1/6 px-2 flex truncate">
                      <span className="relative  left-0 bottom-0 text-base md:text-xl text-gray-500 font-bold truncate">
                        Costumes
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </AppLayout>
  );
}
