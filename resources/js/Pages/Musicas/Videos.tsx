import React, { useEffect, useRef, useState } from 'react';
import PlayPause from '../../Components/PlayPause';
import { Link } from '@inertiajs/react';
import { songs, top5Songs } from '../../../data/dummy';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetArtistsQuery,
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
import { FreeMode } from 'swiper/modules';
import VideoCard from '@/Components/VideoCard';

function Videos({}) {
  const { data: videos, isFetching, error } = useGetVideosQuery('/get-videos');
  const { activeSong, isPlaying } = useSelector(state => state.player);
  if (isFetching) return <Loader title="Carregando músicas..." />;
  if (error) return <Error />;
  /**REF for playing and pausing videos */
  const [refVideo, setRefVideo] = useState(useRef(null));
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
            loop={true}
            spaceBetween={15}
            navigation={true}
            modules={[FreeMode]}
            slidesPerView="auto"
            centeredSlides
            centeredSlidesBounds
            className="mt-4 "
          >
            {videos?.map((song, i) => (
              <SwiperSlide
                key={song.id}
                style={{ width: '', height: '' }}
                className="shadow-lg w-full md:w-1/2 h-auto rounded-full animate-sliderrigth"
              >
                <VideoCard
                  refVideo={refVideo}
                  setRefVideo={setRefVideo}
                  song={song}
                  i={song.id}
                  key={song.id}
                  activeSong={activeSong}
                  isPlaying={isPlaying}
                  songs={videos}
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
          {videos?.map((song, id) => (
            <VideoCard
              songs={videos}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              i={id}
              key={song.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Videos;
