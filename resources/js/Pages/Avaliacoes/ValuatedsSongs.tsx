import React, { useState } from 'react';
import { BiDotsHorizontal, BiMusic } from 'react-icons/bi';
import { BsPencilFill, BsPencilSquare } from 'react-icons/bs';
import SongItemValuationList from './SongItemValuationList';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetSongsQuery,
  useGetSongsVideosQuery,
} from '@/redux/services/coreApi';
import { GiPencilRuler } from 'react-icons/gi';
import { smalLogo } from '../../../img';
import { Link } from '@inertiajs/react';
import { MdFeedback } from 'react-icons/md';
import {
  playPause,
  setActiveSong,
  setFullScreenPlayer,
} from '@/redux/features/playerSlice';
import PlayPause from '@/Components/PlayPause';
import classNames from 'classnames';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import TopChartCard from '@/Components/TopChartCard';
import { SongCard } from '@/Components';
import { Swiper, SwiperSlide } from 'swiper/react';
import VideoCard from '@/Components/VideoCard';
import { Navigation } from 'swiper/modules';
import LifterPlayer from '@/Components/LifterPlayer';

function ValuatedsSongs({
  valuatedSongs,
  songs = [],
  setSelectedValuation,
  selectedValuation,
}) {
  const {
    data: videos,
    isFetching: isF,
    error: errorV,
  } = useGetSongsVideosQuery('destaque');

  const dispatch = useDispatch();
  const [view, setView] = useState('Avaliar');

  const { isPlaying, activeSong } = useSelector(state => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, songs, i) => {
    setSelectedValuation(song);
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(playPause(true));
  };

  if (isPlaying && view === 'Avaliar') {
    setSelectedValuation;
  }

  return (
    <>
      <div className="w-full h-full overflow-auto border-r mb-36">
        {/**Área de previsualização de conversas e notificações */}
        <div className="w-full h-[10%] flex flex-col md:flex-row justify-between items-center md:p-1">
          <h1 className=" md:flex md:text-3xl font-bold">{view}</h1>
          <div className="flex flex-row justify-center items-center w-full  gap-1">
            <button
              onClick={() => setView('Avaliar')}
              className="transform-effect flex flex-col justify-center"
            >
              <BiMusic className="w-7 h-7 font-bold" />
              <span style={{ fontSize: '0.5rem' }}> Avaliar </span>
            </button>
            <button
              onClick={() => setView('Avaliações')}
              className="transform-effect flex flex-col justify-center"
            >
              <MdFeedback className="w-7 h-7 font-bold" />
              <span style={{ fontSize: '0.5rem' }}>Avaliadas</span>
            </button>
          </div>
        </div>

        <div
          className="w-full flex flex-row justify-between
             items-center"
        >
          <h2 className=" font-bold text-base md:text-4xl text-[#]">Vídeos </h2>
          <Link href="top-charts">
            <p className="text-sm md:text-base cursor-pointer">Ver mais</p>
          </Link>
        </div>
        <div className="w-full relative flex">
          <Swiper
            spaceBetween={0}
            navigation={true}
            modules={[Navigation]} //EffectCoverflow,
            slidesPerView={1}
            effect={''} //coverflow
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 0, //1
              slideShadows: true,
            }}
            centeredSlides
            //centeredSlidesBounds
            loop={true}
            className="mySwiper flex justify-center items-center"
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
          <h2 className=" font-bold text-base md:text-4xl text-[#]">Aúdios </h2>
          <Link href="top-charts">
            <p className="text-sm md:text-base cursor-pointer">Ver mais</p>
          </Link>
        </div>
        <div className="w-full h-[80%] overflow-y-auto flex flex-col md:px-5">
          {view === 'Avaliações' ? (
            <>
              {valuatedSongs?.map(song => (
                <div className="w-full relative flex flex-col ">
                  {songs?.map((song, i) => (
                    <>
                      {window.screen.width >= 768 ? (
                        <TopChartCard
                          songs={valuatedSongs}
                          song={song}
                          isPlaying={isPlaying}
                          activeSong={activeSong}
                          i={i}
                          key={song.id}
                        />
                      ) : (
                        <SongCard
                          songs={valuatedSongs}
                          song={song}
                          isPlaying={isPlaying}
                          activeSong={activeSong}
                          i={i}
                          key={song.id}
                        />
                      )}
                    </>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <>
              {songs?.map((song, i) => (
                <div className="w-full relative flex flex-col ">
                  <>
                    {window.screen.width >= 768 ? (
                      <TopChartCard
                        songs={songs}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        i={i}
                        key={song.id}
                      />
                    ) : (
                      <SongCard
                        songs={songs}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        i={i}
                        key={song.id}
                      />
                    )}
                  </>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="w-full h-[10%]  ">
          <FiltrarNoticias
            setPosts={{}}
            setLoading={() => false}
            setFilter={''}
            setError={''}
          />
        </div>

        {songs.length > 0 && <LifterPlayer songs={songs} />}
      </div>
    </>
  );
}

export default ValuatedsSongs;

function FiltrarNoticias({ setPosts, setLoading, setError, setFilter }) {
  function loadPostsByFilter(e) {
    let filter = e.target.value;
    setLoading(true);
    setFilter(filter);
    axios
      .post(`/posts/${filter}`)
      .then(response => {
        if (response.status === 200) {
          setPosts(response.data);
          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      });
  }
  return (
    <div className="w-full px-24 pb-5 flex justify-center items-center  text-black ">
      <input
        placeholder="Filtrar músicas"
        className="transform-effect w-full p-3"
      />
    </div>
  );
}
