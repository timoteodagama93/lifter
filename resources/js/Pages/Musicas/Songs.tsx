import React, { useEffect, useRef, useState } from 'react';
import PlayPause from '../../Components/PlayPause';
import { Link } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetDestaqueSongsQuery,
  useGetSongsAudiosQuery,
  useGetSongsQuery,
  useGetSongsVideosQuery,
  useGetVideosQuery,
} from '@/redux/services/coreApi';
import Loader from '../../Components/Loader';
import Error from '../../Components/Error';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import TopChartCard from '../../Components/TopChartCard';
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Layouts/Container';
import SongCard1 from '@/Components/SongCard1';
import { SongCard } from '@/Components';
import {
  FreeMode,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules';
import VideoCard from '@/Components/VideoCard';
import { GiTribunalJury } from 'react-icons/gi';
import { BiMusic, BiUpload } from 'react-icons/bi';
import Modal from '@/Components/Modal';

import useTypedPage from '@/Hooks/useTypedPage';
import { MdOutlineCloseFullscreen } from 'react-icons/md';
import { AddSong } from '../PerfilProfissional/Artista/Song';

function Songs({}) {
  const { data: songs, isFetching, error } = useGetSongsAudiosQuery('all');
  const {
    data: videos,
    isFetching: isF,
    error: errorV,
  } = useGetSongsVideosQuery('all');
  const {
    data: destaques,
    isFetching: fetchingDestaques,
    error: errorDestaques,
  } = useGetDestaqueSongsQuery('');

  const { activeSong, isPlaying, activeVideo, isPlayingVideo } = useSelector(
    state => state.player,
  );

  const [addSong, setAddSong] = useState(false);
  const [artist, setArtist] = useState(null);
  const page = useTypedPage();

  if (isFetching) return <Loader title="Carregando músicas..." />;

  return (
    <>
      {!error ? (
        <>
          <Modal isOpen={addSong} onClose={() => setAddSong(false)}>
            <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
              <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4] flex justify-between  ">
                <button
                  onClick={() => setAddSong(false)}
                  className="transform-effect p-1 justify-center items-center flex flex-col"
                >
                  {' '}
                  <MdOutlineCloseFullscreen className="w-10 h-auto font-bold" />{' '}
                </button>
                <span>Adicionar música</span>
              </h1>
              {page.props.auth?.user?.is_artist &&
              page?.props?.artist_account ? (
                <AddSong artist={page.props.artist_account} from="" />
              ) : (
                <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
                  <p className="p-5">
                    <p className="pb-2">
                      Parece que você não criou um perfil artísticos ainda.
                      Apenas artistas com um perfil artístico activo podem
                      adicionar músicas, para começares a adicionar as músicas
                      siga as etapas:{' '}
                    </p>
                    <ul className="flex flex-col">
                      <li className="list-decimal">
                        Active o perfil artísticos no
                        <Link href="perfis" className="underline">
                          {' '}
                          Gestor de perfís{' '}
                        </Link>{' '}
                        selecione a opção{' '}
                        <strong>Criar perfil artístico</strong>;
                      </li>
                      <li className="list-decimal">
                        No seu perfil artístico abra{' '}
                        <strong>Gestor de música</strong> ;
                      </li>
                      <li className="list-decimal">
                        No gestor musical clique em <strong>Add música</strong>.
                      </li>
                    </ul>
                  </p>{' '}
                  <a href=""></a>
                </div>
              )}
            </div>
          </Modal>
          <div className="w-full relative flex flex-row rounded">
            <div className="w-full flex flex-col px-4 rounded-lg">
              <div className="w-full flex justify-between items-center p-1 md:px-5 border-b">
                <h1 className="text-center font-bold text-4xl">
                  Ranking musical
                </h1>

                <div className="flex flex-row justify-center items-center">
                  <button
                    onClick={() => setAddSong(true)}
                    className="transform-effect p-1 justify-center items-center w-full flex flex-col"
                  >
                    {' '}
                    <BiUpload className="w-10 h-auto font-bold" />{' '}
                    <span className="flex">Adicionar música</span>
                  </button>
                  <div
                    className="fb-like"
                    data-share="true"
                    data-width="450"
                    data-show-faces="true"
                  ></div>

                  <div
                    class="fb-login-button"
                    data-width=""
                    data-size=""
                    data-button-type=""
                    data-layout=""
                    data-auto-logout-link="false"
                    data-
                    use-continue-as="falso"
                  ></div>
                </div>
              </div>

              <div
                className="w-full flex flex-row justify-between
             items-center"
              >
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Vídeos{' '}
                </h2>
                <Link href="top-charts">
                  <p className="text-sm md:text-base cursor-pointer">
                    Ver mais
                  </p>
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
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Aúdios{' '}
                </h2>
                <Link href="top-charts">
                  <p className="text-sm md:text-base cursor-pointer">
                    Ver mais
                  </p>
                </Link>
              </div>
              <div className="w-full relative flex flex-col ">
                {songs?.map((song, i) => (
                  <>
                    {window.screen.width >= 768 ? (
                      <TopChartCard
                        songs={songs}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        activeVideo={activeVideo}
                        isPlayingVideo={isPlayingVideo}
                        i={i}
                        key={song.id}
                      />
                    ) : (
                      <SongCard
                        songs={songs}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        activeVideo={activeVideo}
                        isPlayingVideo={isPlayingVideo}
                        i={i}
                        key={song.id}
                      />
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Error />
      )}
    </>
  );
}

export default Songs;
