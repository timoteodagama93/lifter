import React, { useEffect, useRef, useState } from 'react';
import PlayPause from './PlayPause';
import { Link } from '@inertiajs/react';
import { artists } from '../../data/dummy';
import TopArtistCard from './TopArtistCard';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useStateContext } from '@/contexts/PaginaActualContext';
import ArtistCard from './ArtistCard';

function TopArtists({  }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-full md:w-[83vw] flex flex-col justify-center items-center">
      <div
        className="w-full flex flex-row justify-between
             items-center "
      >
        <h2 className="font-bold text-2xl">Top artistas </h2>
        <div className="flex space-x-4">
          <Link href="top-charts">
            <p className="text-base cursor-pointer">Em ascensão</p>
          </Link>
          <Link href="top-charts">
            <p className="text-base cursor-pointer flex"><span className='hidden md:flex'>Ver</span> Todos</p>
          </Link>
        </div>
      </div>
      <div className="w-full h-full mt-4 flex flex-co">
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
            marginBottom: 0,
            paddingTop: 0
          }}
          autoplay={true}
          loop={true}
          spaceBetween={10}
          slidesPerView={'auto'}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 pt-0"
          onActiveIndexChange={e => {
            e.activeIndex;
          }}
        >
          {artists?.map((artist, id) => (
            <SwiperSlide className='h-screen'>
              <ArtistCard artist={artist} i={id} key={artist.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TopArtists;
