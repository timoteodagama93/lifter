import React from 'react';
import './style_gallery.css';
import {
  useGetActiveVoiceSongsQuery,
  useGetActiveVoiceVideosQuery,
  useGetActiveVoiceImagesQuery,
} from '@/redux/services/coreApi';
import { useSelector } from 'react-redux';
import { Link } from '@inertiajs/react';
import TopChartCard from '@/Components/TopChartCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import VideoCard from '@/Components/VideoCard';
import { EffectCards, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import AppLayout from '../Layouts/AppLayout';
import Container from '@/Layouts/Container';

function VozActiva({ activeVoiceArtist }) {
  const {
    data: songs,
    isFetching,
    error,
  } = useGetActiveVoiceSongsQuery(activeVoiceArtist.id);
  const { data: videos } = useGetActiveVoiceVideosQuery(activeVoiceArtist.id);
  const { data: images } = useGetActiveVoiceImagesQuery(activeVoiceArtist.id);
  const { activeSong, isPlaying } = useSelector(state => state.player);

  return (
    <AppLayout title="Voz Activa">
      <Container>
        <div className="w-full h-full">
          <h2 className="w-full font-bold flex heading-text text-center space-x-2 text-white">
            <span> </span> <span> {activeVoiceArtist.name} </span>
          </h2>
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex flex-col md:flex-row justify-center items-center md:gap-2  px-2 md:px-5">
              <div className="w-full">
                <div className="w-[320px]">
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
              </div>
              <div className="w-full">
                <p className="text-xl">
                  Género:{' '}
                  <span className="font-bold">{activeVoiceArtist.genres} </span>
                </p>
                <p className="text-justify"> {activeVoiceArtist.about} </p>
              </div>
            </div>
            <div className="w-full">
              <div
                className="w-full flex flex-row justify-between
             items-center"
              >
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Videos
                </h2>
                <Link href="top-charts">
                  <p className="text-sm md:text-base cursor-pointer">
                    Ver mais
                  </p>
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
                  <p className="text-sm md:text-base cursor-pointer">
                    Ver mais
                  </p>
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
      </Container>
    </AppLayout>
  );
}

export default VozActiva;
