import React, { useEffect, useRef, useState } from 'react';
import PlayPause from '../Components/PlayPause';
import { Link } from '@inertiajs/react';
import { songs, top5Songs } from '../../data/dummy';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetArtistsQuery,
  useGetSongsQuery,
  useGetVideosQuery,
} from '@/redux/services/coreApi';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import TopChartCard from '../Components/TopChartCard';
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



function Videos({}) {
  const { data: videos, isFetching, error } = useGetVideosQuery('/get-videos');
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);
  if (isFetching) return <Loader title="Carregando músicas..." />;
  if (error) return <Error />;

  return (
    <AppLayout title="Vídeos">
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
              {videos?.map((video, i) => (
                <SwiperSlide key={video.id + video.id}>
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
    </AppLayout>
  );
}

export default Videos;
