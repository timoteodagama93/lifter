import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as Swiper22 } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

//import './stylesGalery.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import PrimaryButton from '@/Components/PrimaryButton';
import { BiDislike, BiLibrary, BiLike, BiShare, BiSmile } from 'react-icons/bi';
import { MdOutlineMessage } from 'react-icons/md';
import InteracoesMusical from '@/Components/InteracoesMusical';
import { songs } from '../../../data/dummy';
import PlayPause from '@/Components/PlayPause';
import { Link } from '@inertiajs/react';

export default function Avaliar() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="w-full h-full md:h-[82vh] md:w-[85vw] overflow-y-auto">
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
            marginBottom: 0,
            width: '100%',
          }}
          autoplay={true}
          loop={true}
          spaceBetween={10}
          slidesPerView={1}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 "
          onActiveIndexChange={e => setActiveIndex(e.activeIndex)}
        >
          {songs.map((song, i) => (
            <SwiperSlide>
              <div className="flex flex-col w-full h-full p-4 bg-white/5 ng-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg border">
                <div className="relative w-full md:px-36 lg:px-52 xl:px-96 h-4/5">
                  <img
                  key={i}
                    className="w-full h-full"
                    alt="song_img"
                    src={song.images?.coverart}
                  />
                </div>

                <div className="flex flex-col h-1/5 w-full items-center justify-center">
                  <div className="flex flex-row justify-center items-center gap-2">
                    <PlayPause key={i} classNames={''} song={song} />
                    <p className="font-semibold text-lg  truncate">
                      <Link href={`/song-details/${song?.id}`}>
                        {song.title}
                      </Link>
                    </p>
                  </div>
                  <p className="text-sm truncate  mt-1">
                    <Link
                      href={
                        song.artist
                          ? `/artists/${song?.subtitle}`
                          : 'top-artists'
                      }
                    >
                      {song.subtitle}
                    </Link>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="w-full h- md:h-[10%] flex justify-center items-center">
          <InteracoesMusical
            song={songs[activeIndex]}
            orientation="flex-row space-x-5"
          />
        </div>
        {/*}
        <Swiper
          style={{ height: '', minHeight: '' }}
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper w-full h-[50px] hidden md:flex"
        >
          <SwiperSlide className="w-1/5">
            <img src="img/artists/artista1.jpeg" />
          </SwiperSlide>
          <SwiperSlide className="w-1/5">
            <img src="img/artists/artista1.jpeg" />
          </SwiperSlide>
          <SwiperSlide className="w-1/5">
            <img src="img/artists/artist1.jpg" />
          </SwiperSlide>
          <SwiperSlide className="w-1/5">
            <img src="img/artists/artist2.png" />
          </SwiperSlide>
          <SwiperSlide className="w-1/5">
            <img src="img/artists/artista1.jpeg" />
          </SwiperSlide>
          <SwiperSlide className="w-1/5">
            <img src="img/artists/artista1.jpeg" />
          </SwiperSlide>
          <SwiperSlide className="w-1/5">
            <img src="img/artists/artist1.jpg" />
          </SwiperSlide>
          <SwiperSlide className="w-1/5">
            <img src="img/artists/artist2.png" />
          </SwiperSlide>
          <SwiperSlide className="w-1/5">
            <img src="img/artists/artista1.jpeg" />
          </SwiperSlide>
        </Swiper>
        {*/}
      </div>
    </>
  );
}
