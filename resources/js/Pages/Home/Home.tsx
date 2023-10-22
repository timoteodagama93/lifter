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
import { LiveTV } from './';
import { BiHome, BiLike } from 'react-icons/bi';
import { BsNewspaper, BsTrophy } from 'react-icons/bs';
import { FaMusic } from 'react-icons/fa';
import Sobre from '../Concursos/Sobre';
import Container from '@/Layouts/Container';
import { MdLiveTv } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import { GrUserExpert } from 'react-icons/gr';
import CommunityDiscussion from '@/Pages/CommunityDiscussion';
import { useGetSongsQuery, useGetVideosQuery } from '@/redux/services/coreApi';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { SongCard } from '@/Components';
import VideoCard from '@/Components/VideoCard';

interface Props {
  pagina: string;
  songs: Array<Object>;
  posts: Array<Object>;
  APP_URL: String;
}

export default function Home({ posts }: Props) {
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
  const { data: songs, isFetching, error } = useGetSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: videos,
    isFetching: fetchV,
    error: errorV,
  } = useGetVideosQuery('/get-videos');
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);

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
      renderSidebarList={() => sidebarList}
      bg={bgPage}
    >
      <Head title="Home" />

      <div className="w-full relative sm:flex flex-col sm:justify-center sm:items-center  bg-dots-darker bg-center dark:bg-dots-lighter  selection:bg-red-500 selection:text-white">
        <div className="w-full h-full overflow-y-hidden flex flex-col gap-1 justify-cebter items-center rounded-lg">
          {videos ? (
            <div className="flex w-full h-full flex-col relative  ">
              <div
                className="w-full flex flex-row justify-between
             items-center"
              >
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Vídeos em Destaques{' '}
                </h2>
                <Link href="/videos">
                  <p className="text-sm md:text-base cursor-pointer">
                    Ver mais
                  </p>
                </Link>
              </div>
              <div className="w-full relative flex flex-row">
                <Swiper
                  spaceBetween={30}
                  navigation={true}
                  modules={[EffectCoverflow, Navigation]}
                  slidesPerView="auto"
                  effect={'coverflow'}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 10,
                    depth: 50,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  centeredSlides
                  centeredSlidesBounds
                  loop={true}
                  className="mySwiper"
                >
                  {videos?.map((video, i) => (
                    <SwiperSlide key={video.id + video.id + i}>
                      <VideoCard
                        w="w-full"
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
            </div>
          ) : (
            <div className="w-full h-full flex flex-col">
              <h1 className="text-xl text-center w-full">
                Nenhum destaque disponível momento..
              </h1>
            </div>
          )}
          {songs ? (
            <div className="flex w-full h-full flex-col relative  ">
              <div
                className="w-full flex flex-row justify-between
             items-center"
              >
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Músicas em Destaques{' '}
                </h2>
                <Link href="top-charts">
                  <p className="text-sm md:text-base cursor-pointer">
                    Ver mais
                  </p>
                </Link>
              </div>
              <div className="w-full relative flex flex-row">
                <Swiper
                  spaceBetween={30}
                  navigation={true}
                  modules={[EffectCoverflow, Navigation]}
                  slidesPerView="auto"
                  effect={'coverflow'}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 10,
                    depth: 50,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  centeredSlides
                  centeredSlidesBounds
                  loop={true}
                  className="mySwiper"
                >
                  {songs?.map((song, i) => (
                    <SwiperSlide>
                      <SongCard
                        w={'w-full'}
                        song={song}
                        i={i}
                        key={song.id}
                        activeSong={activeSong}
                        isPlaying={isPlaying}
                        songs={songs}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col">
              <h1 className="text-xl text-center w-full">
                Nenhum destaque disponível momento..
              </h1>
            </div>
          )}
          <div className="flex w-full h-full flex-col relative  ">
            <div
              className="w-full flex flex-row justify-between
             items-center"
            >
              <h2 className=" font-bold text-base md:text-4xl text-[#]">
                Sobre a Lifter{' '}
              </h2>
              <Link href="top-charts">
                <p className="text-sm md:text-base cursor-pointer">
                  Saiba mais...
                </p>
              </Link>
            </div>
            <div className="w-full relative flex flex-col gap-1">
              <h1 className="text-xl">
                Lifter é uma plataforma de avaliação, sugestão e classificação
                musical.
              </h1>
              <p>
                Com isso queremos dizer que a Lifter existe para criar conexões
                através da partilha da paixão individual, do talento querendo
                emergir e do bom gosto musical.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
