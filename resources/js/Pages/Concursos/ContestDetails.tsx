import { Loader, SongCard } from '@/Components';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TopChartCard from '@/Components/TopChartCard';
import VideoCard from '@/Components/VideoCard';
import useTypedPage from '@/Hooks/useTypedPage';
import { useStateContext } from '@/contexts/PaginaActualContext';
import {
  useGetActiveVoiceSongsQuery,
  useGetActiveVoiceVideosQuery,
  useGetActiveVoiceImagesQuery,
  useGetArtistSongsQuery,
} from '@/redux/services/coreApi';
import { Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GiSing, GiTeacher, GiTribunalJury, GiVote } from 'react-icons/gi';
import {
  MdCloseFullscreen,
  MdGroups,
  MdOutlineMotionPhotosOn,
} from 'react-icons/md';
import { useSelector } from 'react-redux';

import { EffectCards, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Concursos from './Concursos';
import { BiArrowBack, BiBible, BiPlay } from 'react-icons/bi';
import Swal from 'sweetalert2';
import { FaPray } from 'react-icons/fa';
import ArtistCard from '@/Components/ArtistCard';
import ParticipantCard from '@/Components/ParticipantCard';
import AddContestParticipant from './AddContestParticipant';

function ContestDetails({ contest, contests }) {
  const [seeArtistDetails, setSeeArtistDetails] = useState(false);

  const [artistTDetail, setArtistTDetail] = useState(null);
  const [joinContest, setJoinContest] = useState(false);

  const [dataToShow, setDataToShow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [artists, setArtists] = useState([]);

  const { activeSong, isPlaying } = useSelector(state => state.player);

  useEffect(() => {
    setLoading(true);
    axios
      .post('contest-participants', {
        contest_id: contest.id,
        filter: contest.category,
      })
      .then(response => {
        setParticipants(response.data);
        setDataToShow(response.data);
        setLoading(false);
      })
      .catch(errors => {
        setLoading(false);
      });
  }, []);

  const [show, setShow] = useState('Músicas');
  const filterFromContest = filterType => {
    if (filterType == 'songs') {
      setShow('Músicas');
    } else if (filterType == 'videos') {
      setShow('Vídeos');
    } else if (filterType == 'artists') {
      setShow('Artistas');
    } else if (filterType == 'jury') {
      setShow('Jurís');
    }
    setLoading(true);
    axios
      .post('filter-contest', {
        contest_id: contest.id,
        filter: filterType,
      })
      .then(response => {
        setLoading(false);
        setDataToShow(response.data);
      })
      .catch(errors => {
        setLoading(false);
      });
  };

  const { setCurrentPage } = useStateContext();

  if (loading) return <Loader title="Carregando detalhes do concurso..." />;

  return (
    <>
      <Modal
        isOpen={seeArtistDetails && artistTDetail ? true : false}
        onClose={() => setSeeArtistDetails(false)}
      >
        <div className="w-full h-full flex flex-col bg-[#4c88c4] ">
          <div className="w-full ">
            <button
              onClick={() => setSeeArtistDetails(false)}
              className="p-5 transform-effect w-fit right-1 top-1 text-black"
            >
              <MdCloseFullscreen className="w-5 h-5 font-bold text-4xl" />
            </button>
          </div>
          <div className="w-full flex float-right justify-end">
            <Detalhar artist={artistTDetail} />
          </div>
        </div>
      </Modal>
      <Modal isOpen={joinContest} onClose={() => setJoinContest(false)}>
        <AddContestParticipant contest={contest} />
      </Modal>
      <div className="w-full flex justify-between items-center p-1 md:px-5 border-b">
        <button
          onClick={() => setCurrentPage(<Concursos concursos={contests} />)}
          className="transform-effect p-2 justify-center items-center flex "
        >
          <BiArrowBack />
        </button>
        <h1 className="text-center font-bold text-4xl">
          {' '}
          {contest.designacao}{' '}
        </h1>

        <div className="flex flex-row justify-center items-center">
          <button
            onClick={() => setJoinContest(true)}
            className="transform-effect p-1 justify-center items-center w-full flex flex-col"
          >
            {' '}
            <GiTribunalJury className="w-10 h-auto font-bold" />{' '}
            <span className="flex">Inscrever-se</span>
          </button>
        </div>
      </div>

      <div className="hidden flex-row justify-between w-full items-center p-1">
        <div>
          <InputLabel htmlFor="contest_id">Escolha o que deseja ver</InputLabel>
          <select
            name="contest_id"
            id="contest_id"
            className="text-black"
            onChange={e => filterFromContest(e.target.value)}
          >
            <option value="songs">Músicas do concurso</option>
            <option value="videos">Vídeos do concurso</option>
            <option value="artists">Artistas do concurso</option>
            <option value="jury">Jurados do concurso</option>
          </select>
        </div>
        <h1 className="text-center font-bold text-xl">
          Mostrando {show} do concurso
        </h1>
      </div>

      {!loading && show == 'Músicas' && participants.length > 0 ? (
        <>
          <div className="w-full h-full flex flex-wrap">
            {participants?.map((participant, i) => (
              <div className="w-full md:w-1/2 h-full flex items-center overflow-hidden .shadow-lg border p-1">
                <ParticipantCard
                  contest={contest}
                  song={participant}
                  songs={participants}
                  i={i}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center ">
          <h1 className="text-center font-bold text-xl">
            O concurso não tem ainda nenhum participante inscrito.
          </h1>
        </div>
      )}
      {!loading && show == 'Músicas' && participants.length < 0 && <></>}

      {loading ? (
        <Loader title="Carregando..." />
      ) : (
        <>
          {/** EXIBIR LISTA DE ARTISTAS DO CONCURSO */}
          {show == 'Artistas' && (
            <div className="w-full h-full flex flex-col">
              {dataToShow.length > 0 ? (
                <>
                  <div className="w-full h-full flex flex-wrap">
                    {dataToShow?.map(artista => (
                      <div className="w-full md:w-1/2 h-96 flex items-center overflow-hidden .shadow-lg border p-1">
                        <ArtistCard artist={artista} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-center font-bold text-xl">
                    Nenhum artista encontrado para a seleção.
                  </h1>
                </>
              )}
            </div>
          )}
          {/** EXIBIR LISTA DE ARTISTAS DO CONCURSO */}
          {show == 'Jurís' && (
            <>
              <div className="w-full flex flex-col">
                {dataToShow.length > 0 ? (
                  <div className="w-full flex flex-wrap">
                    {dataToShow?.map(jurado => (
                      <></>
                    ))}
                  </div>
                ) : (
                  <h1 className="text-center font-bold text-xl">
                    Nenhum júri encontrado para a seleção.
                  </h1>
                )}
              </div>
            </>
          )}
          {/** EXIBIR LISTA DE MÙSICAS DO CONCURSO */}
          {show == 'Vídeos' && (
            <>
              <div className="w-full flex flex-col">
                {dataToShow.length > 0 ? (
                  <>
                    <div className="w-full flex flex-wrap">
                      {dataToShow?.map(jurado => (
                        <>
                          <div className="w-full md:w-1/2 xl:w-1/3 h-1/2 flex flex-col items-center overflow-hidden shadow-lg p-1">
                            <div className="w-full h-[320px] object-contain ">
                              <img
                                src={jurado.profile_photo_path}
                                alt="name artist"
                                onClick={() => {
                                  setArtistTDetail(jurado);
                                  setSeeArtistDetails(true);
                                }}
                                className=" hover:cursor-pointer w-full h-full rounded-sm rounded-t-lg border-t-2  object-cover"
                              />
                            </div>
                            <button
                              onClick={() => {
                                setArtistTDetail(jurado);
                                setSeeArtistDetails(true);
                              }}
                              className="transform-effect w-full h-[10%] first-letter: rounded-lg flex-1 space-x-1 flex flex-col justify-start items-center mx-3 border-b-2 backdrop-blur-lg p-1 "
                            >
                              <p className="text-xl font-bold text-white">
                                {' '}
                                {jurado.name}{' '}
                              </p>
                              <p className="text-xs text-gray-300">
                                {' '}
                                {jurado.ocupation}
                              </p>
                            </button>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-center font-bold text-xl">
                      Nenhum júri encontrado para a seleção.
                    </h1>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ContestDetails;

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
                Ocupação: <span className="font-bold">{artist.genres} </span>
              </p>
              <p className="w-full text-justify"> {artist?.bio} </p>
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
