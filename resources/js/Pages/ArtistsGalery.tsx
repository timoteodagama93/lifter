import React, { useRef, useState } from 'react';
import './style_gallery.css';
import { artists } from '../../data/dummy';
import PlayPause from '@/Components/PlayPause';
import { HiEye } from 'react-icons/hi';
import SectionBorder from '@/Components/SectionBorder';
import { useGetActiveVoiceQuery, useGetSongsQuery, useGetVideosQuery } from '@/redux/services/coreApi';
import { useSelector } from 'react-redux';
import { Link } from '@inertiajs/react';
import TopChartCard from '@/Components/TopChartCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import VideoCard from '@/Components/VideoCard';
import { FreeMode } from 'swiper/modules';
function ArtistsGalery({ nome_colecao }) {
  const a = [1, 2, 3, 2, 3, 1, 2, 3, 1, 3];
  const { data: songs, isFetching, error } = useGetSongsQuery('/get-songs');
  const { data: videos } = useGetVideosQuery('/get-videos');
  const { data: activeVoiceArtists } = useGetActiveVoiceQuery('/get-videos');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const activeVoiceArtist = {name:"Timóteo da  Gama"}

  /**REF for playing and pausing videos */
  const [refVideo, setRefVideo] = useState(useRef(null));

  return (
    <div className="w-full h-full">
      <h2 className=" font-bold md:flex heading-text text-center space-x-2 text-white">
        <span> </span> <span> {activeVoiceArtist.name} </span>
      </h2>
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="container ">
            <div className="image-gallery">
              <div className="column">
                {a.map((i, index) => (
                  <>
                    <div key={index} className="image-item ">
                      <img src={artists[i].images.artistImage} alt="" />
                      <div className="overlay " onClick={() => {}}>
                        <span className=" p-2 shadow shadow-black justify-center items-center flex flex-col text-xs">
                          <HiEye className="w-10 h-10 hover:text-[#62c]" />{' '}
                          Detalhes
                        </span>
                        <div className="w-full absolute bottom-0 left-0 flex flex-col p-5">
                          <span className="text-xl">Timóteo da gama</span>
                          <div className="flex flex-row space-x-2 text-xs">
                            <span className="text-base">Angola</span>
                            <span className="text-base">|</span>
                            <span className="text-base">RnB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
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
              Músicas{' '}
            </h2>
            <Link href="top-charts">
              <p className="text-sm md:text-base cursor-pointer">Ver mais</p>
            </Link>
          </div>
          <div className="w-full relative flex flex-col ">
            {songs?.map((song, id) => (
              <TopChartCard
                songs={songs}
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
    </div>
  );
}

export default ArtistsGalery;
