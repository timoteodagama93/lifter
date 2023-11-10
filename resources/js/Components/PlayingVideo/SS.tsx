import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './effectsCards.css';
// import Swiper core and required modules

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { SongCard } from '@/Components';
import { useGetSongsQuery, useGetVideosQuery } from '@/redux/services/coreApi';
import { useSelector } from 'react-redux';
import { Swiper } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

function SS() {
  const { data: songs, isFetching, error } = useGetSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: videos,
    isFetching: fetchV,
    error: errorV,
  } = useGetVideosQuery('/get-videos');
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);
  return (
    <>
      <Swiper
        spaceBetween={15}
        navigation={true}
        modules={[EffectCoverflow, Navigation]}
        slidesPerView='auto'
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 0,
          stretch: 10,
          depth: 0,
          modifier: 1,
          slideShadows: true,
        }}
        centeredSlides
        centeredSlidesBounds
        loop={true}
        style={{ height: '100%', width: '100%' }}
        className="mySwiper"
      >
        {songs?.map((song, i) => (
          <SwiperSlide
            style={{ height: 'auto', width: 'auto' }}
            key={song.id + i}
          >
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
    </>
  );
}

export default SS;
