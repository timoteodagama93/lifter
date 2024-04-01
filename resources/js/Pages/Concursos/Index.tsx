import ContestCard from './ContestCard';
import AppLayout from '@/Layouts/AppLayout';
import { useStateContext } from '@/contexts/PaginaActualContext';
import React, { useEffect, useState } from 'react';
import { MdOutlineCloseFullscreen } from 'react-icons/md';
import useTypedPage from '@/Hooks/useTypedPage';
import { generos } from '@/assets/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { Navigation, EffectCards } from 'swiper/modules';
import { Link } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './effectsCards.css';

import { useGetContestImagesQuery } from '@/redux/services/coreApi';
import { Loader } from '@/Components';
import Swal from 'sweetalert2';
import Concursos from './Concursos';
import PlayerLayout from '@/Layouts/PlayerLayout';
import PlayerContainer from '@/Layouts/PlayerContainer';

interface Props {
  contests: Array<Object>;
}
function Index({ contests, contest }: Props) {
  const { currentPage, setCurrentPage } = useStateContext();
  const [detailsContest, setDetailsContest] = useState();
  const [displayDetails, setDisplayDetails] = useState(false);

  const [showAscensao, setShowAscensao] = useState(false);

  function setDefaultPage() {
    if (contest) {
      setDetailsContest(contest);
      setDisplayDetails(true);
    } else {
      setCurrentPage(
        <Concursos
          showAscensao={showAscensao}
          setDisplayDetails={setDisplayDetails}
          setContestDetails={setDetailsContest}
          concursos={contests}
        />,
      );
    }
  }

  useEffect(setDefaultPage, []);
  const page = useTypedPage();

  const [filter, setFilter] = useState('');

  const filterContest = () => {
    if (filter === '') return;
    console.log(filter);
  };

  useEffect(() => {
    if (filter === '') return;
    filterContest();
  }, [filter]);
  return (
    <PlayerLayout title="Ascensão">
      <PlayerContainer>
        <>
          <div className="w-full h-full flex flex-col rounded-sm p-1">
            <div className="w-full flex mx-2 justify-between items-center flex-col md:flex-row shadow-lg">
              <div className="flexjustify-between">
                <div className="flex flex-row justify-between gap-2">
                  <h2 className="font-bold text-base md:text-xl uppercase">
                    {' '}
                    Festivais e concursos
                  </h2>
                  <button
                    id="select_style2"
                    onChange={() => setShowAscensao(true)}
                    value={filter}
                    className="flex justify-center items-center px-2 bg-[#4c88c4] text-gray-50 font-bold text-sm rounded-lg outline-none p-2 transform-effect"
                  >
                    Ascensão
                  </button>
                  <select
                    id="select_style2"
                    onChange={e => setFilter(e.currentTarget.value)}
                    value={filter}
                    className="flex md:hidden bg-[#000] text-gray-50 font-bold p-1 text-sm rounded-lg outline-none sm:mt-0 mt-0 mr-10"
                  >
                    <option value="">Filtrar</option>
                    {generos.map(genero => (
                      <option
                        key={genero.value}
                        id={genero.value}
                        value={genero.value}
                      >
                        {genero.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-center md:justify-between">
                <select
                  id="select_style"
                  onChange={e => setFilter(e.currentTarget.value)}
                  value={filter}
                  className="hidden md:flex text-black font-bold p-1 text-sm rounded-lg outline-none sm:mt-0 mt-0 mr-10"
                >
                  <option value="">Filtrar</option>
                  {generos.map(genero => (
                    <option
                      key={genero.value + 1}
                      id={genero.value + 2}
                      value={genero.value}
                    >
                      {genero.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full mx-auto sm:px-1 lg:px-1 dark:bg-gray-800 rounded-lg p-1">
              <div className="w-full flex flex-col">
                <div
                  className="w-full flex flex-row flex-wrap"
                  style={{ transition: '5s' }}
                >
                  {currentPage}
                </div>
              </div>
            </div>
          </div>
          {detailsContest && displayDetails && (
            <ContestDetails
              key={detailsContest?.id}
              contest={detailsContest}
              close={setDisplayDetails}
            />
          )}
        </>
      </PlayerContainer>
    </PlayerLayout>
  );
}

export default Index;

function ListContests({
  concursos,
  setContestDetails,
  setDisplayDetails,
  showAscensao,
}) {
  const participar = participarComo => {
    axios
      .post('participar-ascensao', { as: participarComo })
      .then(response => {
        console.log(response);
        Swal.fire(
          'Reserva efetcuada.',
          'Parabéns reseraste um lugar na digressão que vem aí, vai preparando as malas. Uma vez que tenhamos preparado tudo entraremos em contacto. ',
          'success',
        );
      })
      .catch(error => {
        Swal.fire(
          'Falha na Reserva.',
          'Alguma coisa correu mal, não conseguimos reservar o seu lugar na viagem, recarregue a página e tente novamente. ',
          'error',
        );
      });
  };

  return (
    <>
      {showAscensao || concursos.length <= 0 ? (
        <>
          <div className="flex w-full h-full flex-col relative p-5 shadow-inner shadow-black  ">
            <div
              className="w-full flex flex-row justify-between
                 items-center"
            >
              <h2 className=" font-bold text-base md:text-4xl text-[#]">
                Festival Ascensão
              </h2>
              <Link href="" disabled>
                <p className="text-base cursor-pointer transform-effect p-2 ">
                  Saiba mais
                </p>
              </Link>
            </div>
            <div className="my-1 w-full text-base text-black   bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
              <p>
                Queremos passear por Angola, conhecer e explorar os principais
                destinos turísticos nacionais e explorar, submergir e viver as
                culturas locais, podem juntar artistas e o público geral.
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                Vai juntar-se à viagem? Escolha um papel!
              </h1>
              <p>
                Clique na opção que melhor lhe descreve e reserve o seu lugar no
                comboio de exploração.
              </p>
              <div className="w-full flex flex-col gap-5 justify-center px-5 ">
                <div className="w-full flex flex-row gap-5 justify-center ">
                  <button onClick={() => participar('Palco')}>
                    <p className="text-base cursor-pointer transform-effect p-2 font-bold  text-white bg-[#4c88c4] ">
                      Quero estar no palco
                    </p>
                  </button>
                  <button onClick={() => participar('Plateia')}>
                    <p className="text-base cursor-pointer transform-effect p-2 font-bold  text-white bg-[#4c88c4]">
                      Quero estar na plateia
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div className="my-1 w-full text-base text-black   bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
              <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                O que é?
              </h1>
              <p>
                O festival Ascensão é um festival musical que irá decorrer nas
                principais cidades de Angola. O objectivo é promover a interação
                de talentos nacionais com o público local.
              </p>
            </div>
            <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
              <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                Quem pode participar?
              </h1>
              <p>
                Todo o artista com pelo menos uma música gravada pode
                participar. Podem ainda participar na categoria talentos
                emergentes aqueles que amem música e cantem mas que não tenham
                nenhuma música gravada.{' '}
              </p>
            </div>
            <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
              <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                Onde serão realizados os eventos do festival?
              </h1>
              <p>
                O festival não será realizado apenas em uma cidade, os artistas
                do festival e artistas convidados deverão participar de uma
                turnê que passará nos principais destinos culturais de Angola.
              </p>
            </div>
            <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
              <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                Benefícios para o público{' '}
              </h1>
              <p>
                Serão realizados sorteios em que vários brindes serão entregues
                ao público. Estará disponível um número de passagens a serem
                sorteados para o público possibilitando que estes acompanhem a
                turnê, viajando com os partcipantes em diferentes pontos.
              </p>
            </div>
            <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
              <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                Benefícios para os artistas
              </h1>
              <p>
                Os artistas receberão parte do lucro de bilheteria, contarão com
                acompanhamento em Marketing Musical, divulgação de seus
                trabalhos, etc.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {concursos?.map(concurso => (
            <ContestCard
              concursos={concursos}
              setContestDetails={setContestDetails}
              setDisplayDetails={setDisplayDetails}
              key={concurso.id}
              concurso={concurso}
            />
          ))}
        </>
      )}
    </>
  );
}

function ContestDetails({ close, contest }) {
  //const { data: videos } = useGetContestVideoQuery(contest.id);
  const {
    data: images,
    isFetching,
    error,
  } = useGetContestImagesQuery(contest.id);
  //const { activeSong, isPlaying } = useSelector(state => state.player);

  return (
    <div className="z-30 absolute top-0 left-0 fixed-top flex justify-center items-center w-full h-full  bg-gradient-to-br from-[#222d84] to-[#543889]">
      <div className="w-full h-full px-5 bg-[#4c88c4] rounded">
        <button
          onClick={() => close(false)}
          className="absolute top-0 right-0 justify-center items-center float-right bg-red-500 p-2 flex flex-col transform-effect"
        >
          <MdOutlineCloseFullscreen className="w-7 h-7" />
        </button>
        <div className="w-full h-full ">
          <p>Designação do concurso</p>
          <h1 className="text-xl"> {contest.designacao} </h1>
          <div className="w-full h-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex flex-col md:flex-row px-2">
              <div className="w-[320px] md:mx-16">
                <div className="effectsCardSwiper h-full w-full">
                  {isFetching ? (
                    <Loader title="Carregando Imagens" />
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <p className="text-xl">
                Género:{' '}
                <span className="font-bold">{contest.estilo_musical} </span>
              </p>
              Descrição:
              <p className="w-full text-justify text-xl font-bold">
                {contest.descricao}{' '}
              </p>
            </div>
            <div className="w-full md:w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
