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
import AppLayout from '@/Layouts/AppLayout';
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
import VideoCardGrelha from '@/Components/VideoCardGrelha';
import { BiVideo } from 'react-icons/bi';
import Modal from '@/Components/Modal';
import { AddSong } from '../PerfilProfissional/Artista/Song';
import useTypedPage from '@/Hooks/useTypedPage';
import { MdOutlineCloseFullscreen } from 'react-icons/md';
import AddVideo from '@/Components/AddVideo';

function Videos({}) {
  const { data: videos, isFetching, error } = useGetVideosQuery('all');
  const {
    data: videosDestaques,
    isFetching: isGetingDes,
    error: errorDest,
  } = useGetDestaqueVideosQuery('all');
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);

  const [addVideo, setAddVideo] = useState(false);
  const page = useTypedPage();

  return (
    <AppLayout title="Vídeos">
      {isFetching && !error && <Loader title="Carregando músicas..." />}

      <Modal isOpen={addVideo} onClose={() => setAddVideo(false)}>
        <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
          <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4] flex justify-between  ">
            <button
              onClick={() => setAddVideo(false)}
              className="transform-effect p-1 justify-center items-center flex flex-col"
            >
              {' '}
              <MdOutlineCloseFullscreen className="w-10 h-auto font-bold" />{' '}
            </button>
            <span>Adicionar Vídeo</span>
          </h1>
          <AddVideo />
        </div>
      </Modal>

      <div className="w-full relative flex flex-row rounded">
        <div className="w-full flex flex-col md:px-4 rounded-lg">
          <div className="w-full flex justify-between items-center p-1 md:px-5 border-b">
            <h1 className="text-center font-bold text-4xl">Vídeos</h1>

            <div className="flex flex-row justify-center items-center">
              <button
                onClick={() => setAddVideo(true)}
                className="transform-effect p-1 justify-center items-center w-full flex flex-col"
              >
                {' '}
                <BiVideo className="w-10 h-auto font-bold" />{' '}
                <span className="flex">Partilhar vídeo</span>
              </button>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <h2 className=" font-bold text-base md:text-4xl text-[#]">
              Destaques{' '}
            </h2>
            <Link href="top-charts">
              <p className="text-sm md:text-base cursor-pointer">Ver mais</p>
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
              <p className="text-sm md:text-base cursor-pointer">Ver mais</p>
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
        </div>
      </div>
    </AppLayout>
  );
}

export default Videos;
