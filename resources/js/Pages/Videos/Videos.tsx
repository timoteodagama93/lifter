import React, { useEffect, useRef, useState } from 'react';
import PlayPause from '../../Components/PlayPause';
import { Link } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetArtistsQuery,
  useGetDestaqueVideosQuery,
  useGetSongsQuery,
  useGetVideosQuery,
} from '@/redux/services/coreApi';
import Loader from '../../Components/Loader';
import Error from '../../Components/Error';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import TopChartCard from '../../Components/TopChartCard';
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Layouts/Container';
import SongCard1 from '@/Components/SongCard1';
import { SongCard } from '@/Components';
import { EffectCube, FreeMode, Navigation } from 'swiper/modules';
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


function Videos({}) {
  const { data: videos, isFetching, error } = useGetVideosQuery('/get-videos');
  const {
    data: videosDestaques,
    isFetching: isGetingDes,
    error: errorDest,
  } = useGetDestaqueVideosQuery('');
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);


  return (
    <AppLayout title="Vídeos">
      {isFetching && !error && <Loader title="Carregando músicas..." />}
      {error && !isFetching ? (
        <Error />
      ) : (
        <div className="w-full relative flex flex-row rounded">
          <div className="w-full flex flex-col px-4 rounded-lg">
            <div
              className="w-full flex flex-row justify-between
 items-center"
            >
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
            <div
              className="w-full flex flex-row justify-between
 items-center"
            >
              <h2 className=" font-bold text-base md:text-4xl text-[#]">
                Ranking{' '}
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
      )}
    </AppLayout>
  );
}

export default Videos;
