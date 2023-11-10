import React, { useEffect, useRef, useState } from 'react';
import PlayPause from '../../Components/PlayPause';
import { Link } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetDestaqueSongsQuery,
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
import {
  FreeMode,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules';
import VideoCard from '@/Components/VideoCard';

function Songs({}) {
  const { data: songs, isFetching, error } = useGetSongsQuery('/get-songs');
  const {
    data: destaques,
    isFetching: fetchingDestaques,
    error: errorDestaques,
  } = useGetDestaqueSongsQuery('');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  if (isFetching) return <Loader title="Carregando músicas..." />;
  if (error) return <Error />;
  return (
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
            {destaques?.map((song, i) => (
              <SwiperSlide key={song.id + i}>
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
      </div>
    </div>
  );
}

export default Songs;
