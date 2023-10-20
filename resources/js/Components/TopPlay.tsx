import React, { useEffect, useRef } from 'react';
import PlayPause from './PlayPause';
import { Link } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import { useGetSongsQuery } from '@/redux/services/coreApi';
import TopChartCard from '@/Components/TopChartCard';

const TopPlay = ({}) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(state => state.player);
  const { data } = useGetSongsQuery('/get-songs');
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="relative xl:ml-6 ml-1 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-white text-2xl">Top charts</h1>
          <Link href="/top-charts">
            <p className="text-gray-300 text-base">Vê mais</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              song={song}
              i={i}
              key={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              songs={topPlays}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-white font-bold text-2xl">Top Artists</h1>
          <Link href="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">Vê mais</p>
          </Link>
        </div>
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
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-sliderrigth"
            >
              <Link href={`/artists/${song?.artist_id}`}>
                <img
                  src={song.cover}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
