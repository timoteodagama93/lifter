import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './stylesGalery.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import AppLayout from '@/Layouts/AppLayout';
import { smalLogo } from '../../../img';
import { useGetVideosQuery } from '@/redux/services/coreApi';
import VideoCard from '@/Components/VideoCard';
import { Error, Loader } from '@/Components';
import { useSelector } from 'react-redux';
import LiverPreview from './liverPreview';
import LiverScreen from './LiverScreen';

export default function LiverTV() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { data: videos, isFetching, error } = useGetVideosQuery('/get-videos');
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);
  if (isFetching) return <Loader title="Carregando músicas..." />;
  if (error) return <Error />;
  return (
    <AppLayout title="Liver TV">
      <h1 className="font-bold w-full flex flex-row justify-start items-center backdrop-blur-lg">
        <img src={smalLogo} className="w-10 h-10" />
        <span>Liver TV</span>
      </h1>
      <Swiper
        style={{
          '--swiper-navigation-color': '#4c88c4',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={0}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {videos?.map((video, i) => (
          <SwiperSlide>
            <LiverScreen
              videos={videos}
              video={video}
              isPlayingVideo={isPlayingVideo}
              activeVideo={activeVideo}
              i={i}
              key={video.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView="auto"
        freeMode={true}
        navigation={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {videos?.map((video, i) => (
          <SwiperSlide>
            <LiverPreview
              videos={videos}
              video={video}
              isPlayingVideo={isPlayingVideo}
              activeVideo={activeVideo}
              i={i}
              key={video.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </AppLayout>
  );
}
