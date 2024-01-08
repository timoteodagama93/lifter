import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import {
  useGetDestaqueVideosQuery,
  useGetVideosQuery,
} from '@/redux/services/coreApi';
import Loader from '../../Components/Loader';
import Error from '../../Components/Error';

import { EffectCube, Navigation } from 'swiper/modules';
import VideoCard from '@/Components/VideoCard';

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

import { BiArrowBack, BiUpload } from 'react-icons/bi';
import Modal from '@/Components/Modal';
import useTypedPage from '@/Hooks/useTypedPage';
import { useStateContext } from '@/contexts/PaginaActualContext';

import Arts from './Arts';
import { MdOutlineCloseFullscreen } from 'react-icons/md';
import AddVideo from '@/Components/AddVideo';
import VideoCardGrelha from '@/Components/VideoCardGrelha';

function Dance({}) {
  const { currentPage, setCurrentPage } = useStateContext();

  const { data: videos, isFetching, error } = useGetVideosQuery('dance');
  const {
    data: videosDestaques,
    isFetching: isGetingDes,
    error: errorDest,
  } = useGetDestaqueVideosQuery('dance');
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);
  const [addDance, setAddDance] = useState(false);
  const [artist, setArtist] = useState(null);
  const page = useTypedPage();

  if (isFetching) return <Loader title="Carregando músicas..." />;

  return (
    <>
      <Modal isOpen={addDance} onClose={() => setAddDance(false)}>
        <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
          <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4] flex justify-between  ">
            <button
              onClick={() => setAddDance(false)}
              className="transform-effect p-1 justify-center items-center flex flex-col"
            >
              {' '}
              <MdOutlineCloseFullscreen className="w-10 h-auto font-bold" />{' '}
            </button>
            <span>Adicionar coreografia</span>
          </h1>
          <AddVideo default_category="dance" />
        </div>
      </Modal>
      <div className="w-full relative flex flex-row rounded">
        <div className="w-full flex flex-col px-4 rounded-lg">
          <div className="w-full flex justify-between items-center p-1 md:px-5 border-b">
            <button
              onClick={() => setCurrentPage(<Arts />)}
              className="transform-effect p-1 justify-center items-center flex flex-col"
            >
              {' '}
              <BiArrowBack className="w-10 h-auto font-bold" />{' '}
            </button>
            <h1 className="text-center font-bold text-4xl">Dança</h1>

            <div className="flex flex-row justify-center items-center gap-5">
              <button
                onClick={() => setAddDance(true)}
                className="transform-effect p-1 justify-center items-center w-full flex flex-col"
              >
                {' '}
                <BiUpload className="w-10 h-auto font-bold" />{' '}
                <span className="flex">Adicionar vídeo</span>
              </button>
              <div
                className="fb-like"
                data-share="true"
                data-width="450"
                data-show-faces="true"
              ></div>
            </div>
          </div>
          {!error ? (
            <>
              <div className="w-full flex flex-row justify-between items-center">
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Destaques{' '}
                </h2>
                <Link href="top-charts">
                  <p className="text-sm md:text-base cursor-pointer">
                    Ver mais
                  </p>
                </Link>
              </div>
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
                  className=" "
                >
                  {videosDestaques?.map((video, i) => (
                    <SwiperSlide key={video.id + video.id}>
                      <VideoCardGrelha
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
              <div className="w-full flex flex-row justify-between items-center">
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Populares{' '}
                </h2>
                <Link href="top-charts">
                  <p className="text-sm md:text-base cursor-pointer">
                    Ver mais
                  </p>
                </Link>
              </div>
              <div className="w-full relative flex flex-wrap ">
                {videos?.map((video, i) => (
                  <VideoCard
                    videos={videos}
                    video={video}
                    isPlayingVideo={isPlayingVideo}
                    activeVideo={activeVideo}
                    i={i}
                    key={video.id}
                  />
                ))}
              </div>
            </>
          ) : (
            <Error />
          )}
        </div>
      </div>
    </>
  );
}

export default Dance;
