import React, { useState, useEffect, useRef } from 'react';
// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

//import './stylesGalery.css';

// import required modules
import Interagir from '@/Components/Interagir';
import AppLayout from '@/Layouts/AppLayout';
import AudioPlayer from '@/Components/AudioPlayer';
import VideoPlayer from '@/Components/VideoPlayer';
import {
  GiNextButton,
  GiPauseButton,
  GiPlayButton,
  GiPreviousButton,
} from 'react-icons/gi';
import Seekbar from '@/Components/MusicPlayer/Seekbar';
import MediaDeEstrelas from '@/Components/MediaDeEstrelas';
import Container from '@/Layouts/Container';
import { BiCalendar } from 'react-icons/bi';
import { useStateContext } from '@/contexts/PaginaActualContext';

import microImage from '../../assets/micro.jpg';
import { useSelector } from 'react-redux';
import { useGetSongsQuery, useGetVideosQuery } from '@/redux/services/coreApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import VideoCard from '@/Components/VideoCard';
import { EffectCoverflow, EffectCube, Navigation } from 'swiper/modules';
import { Link } from '@inertiajs/react';
import { SongCard } from '@/Components';

const Avaliar = ({}) => {
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(true);
  const [shuffle, setShuffle] = useState(false);

  const { background, setBackground } = useStateContext();

  const { data: songs, isFetching, error } = useGetSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: videos,
    isFetching: fetchV,
    error: errorV,
  } = useGetVideosQuery('/get-videos');
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);

  return (
    <div className="w-full h-full overflow-y-hidden flex flex-col gap-1 justify-cebter items-center rounded-lg">
      {videos ? (
        <div className="flex w-full h-full flex-col relative  ">
          <div
            className="w-full flex flex-row justify-between
             items-center"
          >
            <h2 className=" font-bold text-base md:text-4xl text-[#]">
              Vídeos em Destaques{' '}
            </h2>
            <Link href="/videos">
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
              {videos?.map((video, i) => (
                <SwiperSlide key={video.id + video.id + i}>
                  <VideoCard
                    w="w-full"
                    video={video}
                    i={i}
                    key={video.id + i + video.id}
                    activeVideo={activeVideo}
                    isPlayingVideo={isPlayingVideo}
                    videos={videos}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col">
          <h1 className="text-xl text-center w-full">
            Nenhum destaque disponível momento..
          </h1>
        </div>
      )}
      {songs ? (
        <div className="flex w-full h-full flex-col relative  ">
          <div
            className="w-full flex flex-row justify-between
             items-center"
          >
            <h2 className=" font-bold text-base md:text-4xl text-[#]">
              Músicas em Destaques{' '}
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
              {songs?.map((song, i) => (
                <SwiperSlide>
                  <SongCard
                    w={'w-full'}
                    song={song}
                    i={i}
                    key={song.key}
                    activeSong={activeSong}
                    isPlaying={isPlaying}
                    songs={songs}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col">
          <h1 className="text-xl text-center w-full">
            Nenhum destaque disponível momento..
          </h1>
        </div>
      )}
      <div className="flex w-full h-full flex-col relative  ">
        <div
          className="w-full flex flex-row justify-between
             items-center"
        >
          <h2 className=" font-bold text-base md:text-4xl text-[#]">
            Sobre a Lifter{' '}
          </h2>
          <Link href="top-charts">
            <p className="text-sm md:text-base cursor-pointer">Saiba mais...</p>
          </Link>
        </div>
        <div className="w-full relative flex flex-col gap-1">
          <h1 className="text-xl">
            Lifter é uma plataforma de avaliação, sugestão e classificação
            musical.
          </h1>
          <p>
            Com isso queremos dizer que a Lifter existe para criar conexões
            através da partilha da paixão individual, do talento querendo
            emergir e do bom gosto musical.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Avaliar;

function PostSingleSidebar({ song, setDisplaySong }) {
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  function play() {
    if (ref.current) {
      ref.current?.play();
    }
  }
  function pause() {
    if (ref.current) {
      ref.current?.pause();
    }
  }
  return (
    <>
      <div
        onClick={() => setDisplaySong(song)}
        className="relative w-full h-auto  overflow-hidden   rounded p-1 my-1 hover:cursor-pointer "
      >
        {' '}
        <div className="w-full h-1/2 backdrop-blur-lg justify-center items-center flex rounded shadow ">
          {song?.mime_type?.includes('image/') && (
            <img
              src={song.cover}
              alt=""
              className="object-cover h-full w-full rounded-t shadow"
            />
          )}

          {song?.mime_type?.includes('video/') && (
            <video
              onMouseEnter={play}
              onMouseLeave={pause}
              ref={ref}
              loop={false}
              //        onEnded={onEnded}
              onTimeUpdate={() => {}}
              onLoadedData={() => {}}
              muted
              controls
            >
              <source type={song.mime_type} src={song?.url} />
            </video>
          )}
        </div>
        <p className="w-full bg-white  flex flex-row text-gray-300  gap-1 items-center">
          {' '}
          <BiCalendar />{' '}
          {new Date(song?.created_at).getDate() +
            '/' +
            (new Date(song?.created_at).getUTCMonth() + 1) +
            '/' +
            new Date(song?.created_at).getFullYear() +
            ' ' +
            new Date(song?.created_at).getUTCHours() +
            ':' +
            new Date(song?.created_at).getUTCMinutes()}
        </p>
        <button
          className="w-full p-1 text-gray-300  justify-center bg-[#1422b1] rounded-t "
          onClick={() => setDisplaySong(song)}
        >
          Reproduzir
        </button>
      </div>
    </>
  );
}
