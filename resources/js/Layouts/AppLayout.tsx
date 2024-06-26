import { Link, Head, useForm } from '@inertiajs/react';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import Banner from '@/Components/Banner';
import { Sidebar, SongCard } from '../Components';
import MusicPlayer from '@/Components/MusicPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineMenu } from 'react-icons/hi';
import {
  MdArrowForward,
  MdClose,
  MdCloseFullscreen,
  MdNotifications,
} from 'react-icons/md';
import { useStateContext } from '@/contexts/PaginaActualContext';

//Style for swiper
import './style.css';
import { Logo } from '../../img';
import { smalLogo } from '../../img';
import Container from './Container';
import {
  BiDotsHorizontalRounded,
  BiMessage,
  BiMusic,
  BiSearch,
  BiVideo,
} from 'react-icons/bi';
import Player from '@/Components/VideoPlayer/Player';
import VideoPlayer from '@/Components/VideoPlayer';
import Modal from '@/Components/Modal';
import {
  playPauseVideo,
  setFullScreenPlayer,
} from '@/redux/features/playerSlice';
import axios from 'axios';
import VideoCard from '@/Components/VideoCard';
import { Swiper } from 'swiper/react';
import { EffectCube, Navigation } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import SectionBorder from '@/Components/SectionBorder';
import TopChartCard from '@/Components/TopChartCard';
import { BsStars, BsTrophy, BsNewspaper } from 'react-icons/bs';
import { GiSoundWaves } from 'react-icons/gi';
import { FaArtstation, FaCross } from 'react-icons/fa';
import VideoSinglePlayer from '@/Pages/Videos/VideoSinglePlayer';
import { random } from 'lodash';
import { motion } from 'framer-motion';
import LifterPlayer from '@/Components/LifterPlayer';
import SmalSidebar from '@/Components/SmalSidebar';
import UserAvatar from '@/Components/UserAvatar';
import { useGetSongsAudiosQuery } from '@/redux/services/coreApi';
import DropdownLink from '@/Components/DropdownLink';
import Dropup from '@/Components/Dropup';
interface Props {
  title: string;
  bg?: string;
  //songs: Array<Object>;
  renderHeader?(): JSX.Element;
  renderSidebarList?(): JSX.Element;
  renderBottom?(): JSX.Element;
}

export default function AppLayout({
  title,
  bg,
  //songs,
  renderHeader,
  renderSidebarList,
  renderBottom,
  children,
}: PropsWithChildren<Props>) {
  const page = useTypedPage();
  const route = useRoute();

  const { data: songs, isFetching, error } = useGetSongsAudiosQuery('destaque');

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  //#d936d6
  //377377

  //f0f0f0
  //f8f8f8

  const {
    activeSong,
    isPlaying,
    isPlayingVideo,
    activeVideo,
    isFullScreenPlayer,
  } = useSelector(state => state.player);

  const { openMobileMenu, setOpenMobileMenu } = useStateContext();
  const [openSearch, setOpenSearch] = useState(false);
  const [openSongRandom, setOpenSongRandom] = useState(false);

  const { setCurrentPage } = useStateContext();
  const dispatch = useDispatch();

  return (
    <>
      <motion.div
        animate={{ x: 0 }}
        transition={{ delay: 1 }}
        className="w-screen h-screen flex bg-gradient-to-br from-[#e6e6e6] to-[#fff] dark:from-black dark:to-[#191919] fixed top-0 left-0 right-0 p-1 __bg-white "
      >
        {activeVideo && (
          <VideoSinglePlayer key={activeVideo.id + Math.floor(random() / 60)} />
        )}

        <Head title={title} />
        <Banner />

        <div className="relative w-full h-full min-h-full min-w-full flex  flex-col">
          <header className="bg-gradient-to-br _from-[#f6cc33] _to-[#f6cc33]  relative w-full h-12 md:h-[10%] flex hidden_ flex-col justify-center items-center  shadow-lg  rounded shadow-black mb-2 md:pb-1 px-0 md:px-5 ">
            <div className="w-full h-12 border-[#5e84a0] border-b md:border-b-0 md:h-full flex justify-between items-center px-1">
              {/** OPEN AND CLOSE SIDEBAR MENU */}
              <div className="  flex text-bold text-xl  justify-center items-center bg-[#0094f8] p-1 rounded-lg cursor-pointer transform-effect ">
                {openMobileMenu ? (
                  <MdClose
                    className="text-3xl w-7 h-7 transition-all "
                    onClick={() => setOpenMobileMenu(false)}
                  />
                ) : (
                  <HiOutlineMenu
                    className="w-7 h-7 text-3xl  transition-all "
                    onClick={() => setOpenMobileMenu(true)}
                  />
                )}
              </div>
              {/**LOGO */}
              <Link href="/">
                <img
                  className="w-auto h-12 md:h-14 object-contain flex"
                  src={Logo}
                  alt="logo"
                />
              </Link>
              <button
                onClick={() => setOpenSearch(true)}
                className=" md:flex_ text-bold text-xl  justify-center items-center bg-[#0094f8] p-2 rounded-lg hidden"
              >
                <BiSearch className="mx-1 text-3xl text-center" />
              </button>

              <div className=" flex flex-row gap-1 justify-between items-center text-[#0094f8]">
                <div className="w-full h full justify-center items-center flex ">
                  {/** USER AVATAR */}
                  <UserAvatar />
                </div>
                <Link
                  href="/comunicar"
                  className="h-full flex flex-col justify-center items-center hover:"
                >
                  <MdNotifications className="w-7 h-7" />
                </Link>
                <Link
                  href="/comunicar"
                  className="h-full flex flex-col justify-center items-center hover:"
                >
                  <BiMessage className="w-7 h-7" />
                </Link>
              </div>
            </div>
            <div className="w-full h-14  hidden justify-between py-1 bg-gradient-to-br from-[#00395f] to-[#005792] ">
              <div className="w-full h-full flex  flex-row justify-center items-center mb-1 text-xl ">
                <>
                  <Link
                    href="/avaliacoes"
                    className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect
                    
            ${
              route().current('avaliacoes')
                ? 'transform-effect text-cyan-400 font-bold icon-link bg-[#00395f] '
                : ''
            }
            `}
                  >
                    <BsStars className="icon w-10 h-10" />
                    <span
                      className={` ${
                        route().current('avaliacoes')
                          ? 'flex text-white font-bold uppercase'
                          : 'hidden'
                      }`}
                    >
                      Avaliações
                    </span>
                  </Link>
                  <Link
                    href="/musicas"
                    className={`flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
            ${
              route().current('musicas')
                ? 'transform-effect text-cyan-400 font-bold icon-link bg-[#00395f]'
                : ''
            }
            `}
                  >
                    <BiMusic className={`icon w-10 h-10`} />
                    <span
                      className={` ${
                        route().current('musicas')
                          ? 'flex text-white font-bold uppercase'
                          : 'hidden'
                      }`}
                    >
                      Músicas
                    </span>
                  </Link>
                  <Link
                    href="/video"
                    className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter: ${
                      route().current('video')
                        ? 'transform-effect text-cyan-400 font-bold icon-link bg-[#00395f]'
                        : ''
                    } `}
                  >
                    <BiVideo className="icon w-10 h-10" />
                    <span
                      className={` ${
                        route().current('video')
                          ? 'flex text-white font-bold uppercase'
                          : 'hidden'
                      }`}
                    >
                      Vídeos
                    </span>
                  </Link>
                  <Link
                    href="/vozactiva"
                    className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
            ${
              route().current('vozactiva')
                ? 'transform-effect text-cyan-400 font-bold icon-link bg-[#00395f]'
                : ''
            }
            `}
                  >
                    <GiSoundWaves className="icon w-10 h-10" />
                    <span
                      className={` ${
                        route().current('vozactiva')
                          ? 'flex text-white font-bold uppercase'
                          : 'hidden'
                      }`}
                    >
                      VozActiva
                    </span>
                  </Link>
                  <Link
                    href="/concursos"
                    className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
            ${
              route().current()?.includes('concursos')
                ? 'transform-effect text-cyan-400 font-bold icon-link bg-[#00395f]'
                : ''
            }
            `}
                  >
                    <BsTrophy className="icon w-10 h-10" />
                    <span
                      className={` ${
                        route().current('concursos')
                          ? 'flex text-white font-bold uppercase'
                          : 'hidden'
                      }`}
                    >
                      Concursos
                    </span>
                  </Link>

                  <Link
                    href="/arts"
                    className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
            ${
              route().current('arts')
                ? 'transform-effect text-cyan-400 font-bold icon-link bg-[#00395f]'
                : ''
            }
            `}
                  >
                    <FaArtstation className="icon w-10 h-10" />
                    <span
                      className={` ${
                        route().current('arts')
                          ? 'flex text-white font-bold uppercase'
                          : 'hidden'
                      }`}
                    >
                      +Artes
                    </span>
                  </Link>
                  <Link
                    href="/gospel"
                    className={` hidden flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
            ${
              route().current('gospel')
                ? 'transform-effect text-cyan-400 font-bold icon-link bg-[#00395f]'
                : ''
            }
            `}
                  >
                    <FaCross className={`icon w-10 h-10`} />
                    <span
                      className={` ${
                        route().current('gospel')
                          ? 'flex text-white font-bold uppercase'
                          : 'hidden'
                      }`}
                    >
                      Gospel
                    </span>
                  </Link>
                </>
              </div>

              {renderHeader ? renderHeader() : null}
            </div>
          </header>

          <div className="w-full h-[73%] md:h-[72%] min-w-full flex  flex-row ">
            <SmalSidebar />

            {/* <!-- Page Content --> */}
            <main className="relative h-full w-full  flex mx-auto justify-start text-black items-start rounded overflow-y-hidden mb-0 pb-0">
              {children}
            </main>
          </div>

          <div className="w-full h-[17%] md:h-[15%] flex flex-row justify-center items-center mb-1  from-[#f5f5f5] to-[#e6e6e6] dark:from-black dark:to-[#191919] _bg-[rgb(0,86,124)] text-xl absolute bottom-0 left-0">
            <LifterPlayer songs={songs} />
          </div>
        </div>
      </motion.div>

      {}
      <Modal
        isOpen={isPlayingVideo && false}
        onClose={() => dispatch(playPauseVideo(false))}
      >
        <div className="flex flex-col animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded gap-1 ">
          <div className="w-full flex float-right justify-end">
            <button
              onClick={() => dispatch(playPauseVideo(false))}
              className="p-4 transform-effect w-fit right-1 text-black"
            >
              <MdCloseFullscreen className="w-5 h-5 font-bold text-4xl" />
            </button>
          </div>
          <VideoPlayer />
        </div>
      </Modal>
    </>
  );
}

function Search({ close }) {
  const { activeSong, isPlaying } = useSelector(state => state.player);
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);

  const [songs, setSongs] = useState();
  const [videos, setVideos] = useState();
  const [error, setError] = useState(false);

  const performSearch = e => {
    const searchTerm = e.target.value;
    if (searchTerm.length < 0) return;
    searchSongs(searchTerm);
    searchVideos(searchTerm);
  };
  const searchSongs = searchTerm => {
    axios
      .post('search-songs', { searchTerm: searchTerm })
      .then(response => {
        setSongs(response.data);
      })
      .catch(error => {
        setError(true);
      });
  };
  const searchVideos = searchTerm => {
    axios
      .post('search-videos', { searchTerm: searchTerm })
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        setError(true);
      });
  };

  return (
    <div className="z-30 absolute top-0 left-0 fixed-top flex justify-center items-center w-screen h-screen bg-gradient-to-br from-[#222d84] to-[#543889]">
      <div className="w-full md:w-10/12 h-screen px-5 bg-[#4c88c4] rounded">
        <button
          onClick={() => close(false)}
          className="absolute top-2 right-2 justify-center items-center float-right bg-red-500 p-2 flex flex-col transform-effect"
        >
          <MdClose className="w-10 h-10" />
        </button>
        <div className="w-full h-full ">
          <div className="w-full  h-[10%] overflow-y-auto ">
            <form className="w-full justify-center items-center px-14 md:px-40">
              <input
                onChange={performSearch}
                type="search"
                className="text-black border-b-4 w-full focus:border-[#543889] mt-1 border-[#222d84] rounded-lg"
                placeholder="Pesquisar"
              />
            </form>
          </div>
          <div className="w-full h-[80%] overflow-y-auto px-14">
            {videos && (
              <div className="w-full relative flex flex-row">
                <Swiper
                  loop={true}
                  spaceBetween={15}
                  navigation={true}
                  modules={[Navigation, EffectCube]}
                  effect=""
                  slidesPerView="auto"
                  centeredSlides
                  centeredSlidesBounds
                  className="w-full relative flex flex-wrap "
                >
                  {videos?.map((video, i) => (
                    <SwiperSlide key={video.id + video.id}>
                      <VideoCard
                        w="w-full "
                        video={video}
                        i={i}
                        key={video.id + i + video.id}
                        activeVideo={activeVideo}
                        isPlayingVideo={isPlayingVideo}
                        videos={videos}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
            {songs && (
              <div className="w-full relative flex flex-col ">
                {songs?.map((song, i) => (
                  <TopChartCard
                    songs={songs}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    i={i}
                    key={song.id}
                  />
                ))}
              </div>
            )}
          </div>
          {isPlaying && (
            <div
              className="relative w-full p-2 transition-5s "
              style={{ transition: '5s' }}
            >
              <MusicPlayer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PlayerFullScreen({ close }) {
  const { activeSong, isPlaying } = useSelector(state => state.player);
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);

  const [songs, setSongs] = useState();
  const [videos, setVideos] = useState();
  const [error, setError] = useState(false);

  const performSearch = e => {
    const searchTerm = e.target.value;
    if (searchTerm.length < 0) return;
    searchSongs(searchTerm);
    searchVideos(searchTerm);
  };
  const dispatch = useDispatch();
  const searchSongs = searchTerm => {
    axios
      .post('search-songs', { searchTerm: searchTerm })
      .then(response => {
        setSongs(response.data);
      })
      .catch(error => {
        setError(true);
      });
  };
  const searchVideos = searchTerm => {
    axios
      .post('search-videos', { searchTerm: searchTerm })
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        setError(true);
      });
  };

  return (
    <div className="absolute h-screen w-screen top-0 left-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10 justify-center ">
      <div className="w-[90%] md:w-10/12 h-[90%]  px-1 md:px-5 bg-[#4c88c4] rounded">
        <div className="w-full  h-[10%] flex flex-row justify-between items-center">
          <form className="flex justify-center items-center ">
            <input
              onChange={performSearch}
              type="search"
              className="text-black border-b-4 w-full focus:border-[#543889] mt-1 border-[#222d84] rounded-lg"
              placeholder="Pesquisar"
            />
          </form>
          <button
            onClick={() => dispatch(setFullScreenPlayer(false))}
            className=" justify-center items-center bg-red-500 p-2 flex flex-col transform-effect"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full h-full flex flex-col justify-center ">
          <div className="w-full h-[50%] border overflow-y-auto px-14"></div>

          <div
            className="relative border bg-black w-full h-[30%] p-2 transition-5s "
            style={{ transition: '5s' }}
          >
            <MusicPlayer />
          </div>
        </div>
      </div>
    </div>
  );
}
function Searcher({ close }) {
  return (
    <div className="z-50 absolute flex flex-col justify-center items-center w-screen h-full bg-[#000000a2]">
      <div className="w-11/12 p-2 flex flex-col bg-white rounded justify-center items-center">
        <div className="w-full mb-1 flex flex-row justify-center items-center bg-white rounded">
          <div className="w-full h-full ">
            <form className="w-full justify-center items-center px-8 md:px-40">
              <input
                type="search"
                className="text-center border-b-4 w-full focus:border-[#6ba976] border-[#2e2c2e] rounded-lg"
                placeholder="Buscar músicas..."
              />
            </form>
          </div>
          <button
            onClick={() => close(false)}
            className="justify-center items-center float-right bg-red-500 p-3 flex rounded flex-col"
          >
            <MdClose />
          </button>
        </div>
        <div className="w-full xl:w-10/12 h-56 md:h-96 lg:h-[85vh] xl:h-[85vh] bg-black">
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}
