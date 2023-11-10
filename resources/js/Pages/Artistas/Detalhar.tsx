import React, { useEffect, useRef, useState } from 'react';
import './style_gallery.css';
import { useSelector } from 'react-redux';
import { Link } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, FreeMode, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './effectsCards.css';

import {
  useGetActiveVoiceSongsQuery,
  useGetActiveVoiceVideosQuery,
  useGetVideosQuery,
  useGetActiveVoiceImagesQuery,
} from '@/redux/services/coreApi';
import AppLayout from '@/Layouts/AppLayout';
import VideoCard from '@/Components/VideoCard';
import TopChartCard from '@/Components/TopChartCard';

function Detalhar({ artist }) {
  const {
    data: songs,
    isFetching,
    error,
  } = useGetActiveVoiceSongsQuery(artist.id);
  const { data: videos } = useGetActiveVoiceVideosQuery(artist.id);
  const { data: images } = useGetActiveVoiceImagesQuery(artist.id);
  const { activeSong, isPlaying } = useSelector(state => state.player);
  console.log(images);

  return (
    <div className="w-full h-full p-5">
      <h2 className="w-full text-4xl font-bold flex heading-text text-center space-x-2 text-white">
        <span> </span> <span> {artist.name} </span>
      </h2>
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex flex-col  px-2">
          <div className="w-full flex flex-col md:flex-row justify-center gap-5">
            <div className="w-[50%]">
              <div className="effectsCardSwiper h-full w-full">
                {images?.length > 0 && (
                  <Swiper
                    effect={'cards'}
                    grabCursor={false}
                    modules={[EffectCards, Navigation]}
                    className="mySwiper swiper-card"
                    loop={true}
                    navigation={true}
                    autoplay={true}
                  >
                    {images?.map((image, i) => (
                      <>
                        <SwiperSlide key={image} className="swiper-slide">
                          <img
                            src={image.replace('public', 'storage')}
                            alt=""
                          />
                        </SwiperSlide>
                      </>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
            <div className="w-[50%] p-5 shadow-lg">
              <p className="w-full text-xl">
                Género: <span className="font-bold">{artist.genres} </span>
              </p>
              <p className="w-full text-justify"> {artist.about} </p>
            </div>
          </div>
        </div>
        <div className="w-full ">
          <div
            className="w-full flex flex-row justify-between
             items-center"
          >
            <h2 className=" font-bold text-base md:text-4xl text-[#]">
              Videos
            </h2>
            <Link href="top-charts">
              <p className="text-sm md:text-base cursor-pointer">Ver mais</p>
            </Link>
          </div>
          <div className="w-full relative flex flex-row">
            <Swiper
              loop={true}
              navigation={true}
              modules={[Navigation]}
              slidesPerView={1}
              grabCursor={false}
            >
              {videos?.map((video, i) => (
                <SwiperSlide key={video.id + i + i}>
                  <VideoCard
                    w="w-full"
                    video={video}
                    i={i}
                    key={video.id}
                    activeVideo={activeSong}
                    isPlayingVideo={isPlaying}
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
              Músicas{' '}
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
                key={song.id + i + song.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detalhar;
