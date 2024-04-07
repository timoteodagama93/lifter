import { Loader } from '@/Components';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TopChartCard from '@/Components/TopChartCard';
import VideoCard from '@/Components/VideoCard';
import useTypedPage from '@/Hooks/useTypedPage';
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Layouts/Container';
import {
  useGetActiveVoiceSongsQuery,
  useGetActiveVoiceVideosQuery,
  useGetActiveVoiceImagesQuery,
} from '@/redux/services/coreApi';
import { Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GiTribunalJury, GiVote } from 'react-icons/gi';
import { MdCloseFullscreen } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { EffectCards, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function Jurados({ amIJury, jury }) {
  const [jurados, setJurados] = useState(jury ? jury : []);

  const [seeArtistDetails, setSeeArtistDetails] = useState(false);

  const [artistTDetail, setArtistTDetail] = useState(null);
  const [joinJury, setJoinJury] = useState(false);

  const [loadingContests, setLoadingContests] = useState(false);
  const [loadingJury, setLoadingJury] = useState(false);
  const [concursos, setConcursos] = useState([]);

  useEffect(() => {
    setLoadingContests(true);
    setLoadingJury(true);
    axios
      .post('get-active-contests')
      .then(response => {
        setLoadingContests(false);
        setConcursos(response.data);
      })
      .catch(errors => {
        setLoadingContests(false);
      });
    axios
      .post('jurados')
      .then(response => {
        setLoadingJury(false);
        setJurados(response.data);
      })
      .catch(errors => {
        setLoadingJury(false);
      });
  }, []);

  const getJuryByContest = contestId => {
    setLoadingJury(true);
    axios
      .post('jurados', { contest_id: contestId })
      .then(response => {
        setLoadingJury(false);
        setConcursos(response.data);
      })
      .catch(errors => {
        setLoadingJury(false);
      });
  };

  return (
    <AppLayout title="Jurados">
      <Container>
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
          <Modal isOpen={joinJury} onClose={() => setJoinJury(false)}>
            <JoinJury onClose={setJoinJury} concursos={concursos} />
          </Modal>
          <div className="w-full flex justify-between items-center p-1 md:px-5 border-b">
            <h1 className="text-center font-bold text-4xl">Grande júri</h1>

            <div className="flex flex-row justify-center items-center">
              <button
                onClick={() => setJoinJury(true)}
                className="transform-effect p-1 justify-center items-center w-full flex flex-col"
              >
                {' '}
                <GiTribunalJury className="w-10 h-auto font-bold" />{' '}
                <span className="flex">Juntar-se ao júri</span>
              </button>
            </div>
          </div>

          {loadingContests ? (
            <Loader title="Carregando concursos..." />
          ) : (
            <>
              {concursos.length > 0 ? (
                <div className="flex flex-col p-1">
                  <InputLabel htmlFor="contest_id">
                    Veja a lista de júris por festival ou competição
                  </InputLabel>
                  <select
                    name="contest_id"
                    id="contest_id"
                    className="text-black"
                    onChange={e => getJuryByContest(e.target.value)}
                  >
                    {concursos.map(concurso => (
                      <option value={concurso.id}>
                        {' '}
                        {concurso.designacao}{' '}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <h1 className="text-center font-bold text-xl">
                  Parece que não existe no momento nenhum festival ou concurso
                  activo.
                </h1>
              )}
            </>
          )}

          {loadingJury ? (
            <Loader title="Carregando júris..." />
          ) : (
            <div className="w-full flex flex-col">
              {jurados.length > 0 ? (
                <>
                  <h1 className="text-center font-bold text-xl">
                    Histórico e jurados.
                  </h1>
                  <div className="w-full flex flex-wrap">
                    {jurados?.map(jurado => (
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
          )}
        </>
      </Container>
    </AppLayout>
  );
}

export default Jurados;
const JoinJury = ({ onClose, concursos }) => {
  const page = useTypedPage();
  const [requested, setRequest] = useState(false);

  const form = useForm({
    contest_id: '',
    name: page?.props?.auth?.user?.name,
    contact: page?.props?.auth?.user?.phone,
    ocupation: '',
    bio: '',
  });

  const requestPlaceOnJuryTable = () => {
    form.post('jury-requisition', {
      onSuccess: () => {
        setRequest(true);
      },
    });
  };

  return (
    <>
      <div className="w-full ">
        <button
          onClick={() => onClose(false)}
          className="p-5 transform-effect w-fit right-1 top-1 text-black"
        >
          <MdCloseFullscreen className="w-5 h-5 font-bold text-4xl" />
        </button>
      </div>
      {!requested ? (
        <>
          <h1 className="text-center font-bold text-4xl">
            Juntar-se ao Grande júri
          </h1>
          {!form.processing ? (
            <>
              {concursos.length <= 0 ? (
                <>
                  <p className="text-base px-5">
                    Parece que não temos nenhum concurso ou festival activo no
                    momento. Sendo assim, não te podes juntar nesse momento!
                    Fique atento.
                  </p>
                  <p className="text-base px-5">
                    Caso tenha qualquer projecto em que possamos colaborar, não
                    exite em nos contact <strong>contact@lifter.ao</strong>.
                  </p>
                </>
              ) : (
                <form
                  onSubmit={requestPlaceOnJuryTable}
                  action=""
                  className="w-full flex flex-col p-5"
                >
                  <p className="text-base">
                    Por favor, confirme os seus detalhes e forneça-nos alguns
                    detalhes adicionais de modos que possamos compreender melhor
                    o contributo que pode fornecer à comunidade.
                  </p>
                  <div className="flex flex-col p-1">
                    <label htmlFor="contest_id">
                      Escolha um concurso ou festival para ser jurado
                    </label>
                    <select
                      type="text"
                      name="contest_id"
                      id="contest_id"
                      required
                      value={form.data.contest_id}
                      onChange={e => form.setData('contest_id', e.target.value)}
                    >
                      <option value="">Esolher concurso</option>
                      {concursos.map(concurso => (
                        <option value={concurso.id}>
                          {' '}
                          {concurso.designacao}{' '}
                        </option>
                      ))}
                    </select>
                    <InputError message={form.errors.contest_id} />
                  </div>

                  {form.data.contest_id !== '' ? (
                    <>
                      <div className="flex flex-col p-1">
                        <label htmlFor="name">Precisamos do seu nome</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          value={form.data.name}
                          onChange={e => form.setData('name', e.target.value)}
                        />
                        <InputError message={form.errors.name} />
                      </div>
                      <div className="flex flex-col p-1">
                        <label htmlFor="contact">
                          O seu contacto por favor
                        </label>
                        <input
                          type="text"
                          name="contact"
                          id="contact"
                          value={form.data.contact}
                          required
                          onChange={e =>
                            form.setData('contact', e.target.value)
                          }
                        />
                        <InputError message={form.errors.contact} />
                      </div>
                      <div className="flex flex-col p-1">
                        <label htmlFor="ocupation">
                          Qual a sua ocupação profissional
                        </label>
                        <input
                          type="text"
                          name="ocupation"
                          id="ocupation"
                          required
                          value={form.data.ocupation}
                          onChange={e =>
                            form.setData('ocupation', e.target.value)
                          }
                        />
                        <InputError message={form.errors.ocupation} />
                      </div>
                      <div className="flex flex-col p-1">
                        <label htmlFor="ocupation">
                          Biografia, histórico ou dados relevantes
                        </label>
                        <input
                          type="text"
                          name="bio"
                          id="bio"
                          required
                          value={form.data.bio}
                          onChange={e => form.setData('bio', e.target.value)}
                        />
                        <InputError message={form.errors.bio} />
                      </div>
                      <div className="w-full p-2 flex justify-center items-center ">
                        <button className=" bg-cyan-300 text-white font-bold p-4 transform-effect text-xl ">
                          Juntar-se ao jurado
                        </button>
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </form>
              )}
            </>
          ) : (
            <Loader title="Enviando requisição..." />
          )}
        </>
      ) : (
        <>
          <h1 className="text-center font-bold text-4xl">
            Já é um membro do Grande júri
          </h1>
          <p className="text-base justify-normal p-2">
            Obrigado por fazer da comunidade o que ela é, sua colaboração é o
            que torna possível a realização e o alcance das metas particulares..
          </p>
        </>
      )}
    </>
  );
};

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
