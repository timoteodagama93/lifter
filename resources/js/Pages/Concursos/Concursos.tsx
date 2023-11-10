import ContestCard from '@/Components/ContestCard';
import SectionBorder from '@/Components/SectionBorder';
import AppLayout from '@/Layouts/AppLayout';
import { useStateContext } from '@/contexts/PaginaActualContext';
import React, { useEffect, useState } from 'react';
import { BsList } from 'react-icons/bs';
import { MdClose, MdCreate, MdOutlineCloseFullscreen } from 'react-icons/md';
import NewContest from '@/Components/Contest/Index';
import useTypedPage from '@/Hooks/useTypedPage';
import { generos } from '@/assets/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import VideoCard from '@/Components/VideoCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Navigation, EffectCube, EffectCards } from 'swiper/modules';
import TopChartCard from '@/Components/TopChartCard';
import { Link } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './effectsCards.css';

import { useGetContestImagesQuery } from '@/redux/services/coreApi';
import { Loader } from '@/Components';
import Swal from 'sweetalert2';
import { icons } from 'react-icons';

interface Props {
  contests: Array<Object>;
}
function Concursos({ contests }: Props) {
  const { currentPage, setCurrentPage } = useStateContext();
  const [detailsContest, setDetailsContest] = useState();
  const [displayDetails, setDisplayDetails] = useState(false);

  function setDefaultPage() {
    setCurrentPage(
      <ListContests
        setDisplayDetails={setDisplayDetails}
        setContestDetails={setDetailsContest}
        concursos={contests}
      />,
    );
  }

  useEffect(setDefaultPage, []);
  const page = useTypedPage();

  return (
    <AppLayout title="Ascensão">
      <div className="w-full h-full flex flex-col rounded-sm p-1">
        <div className="w-full flex mx-2 justify-between items-center flex-col md:flex-row shadow-lg">
          <div className="flexjustify-between">
            <h2 className="font-bold text-base md:text-xl uppercase">
              {' '}
              Festivais e concursos
            </h2>
            <select
              id="select_style"
              onChange={() => {}}
              value=""
              className="flex md:hidden bg-[#000] text-gray-50 font-bold p-1 text-sm rounded-lg outline-none sm:mt-0 mt-0 mr-10"
            >
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
          <div className="flex justify-center md:justify-between">
            <select
              id="select_style"
              onChange={() => {}}
              value=""
              className="hidden md:flex text-black font-bold p-1 text-sm rounded-lg outline-none sm:mt-0 mt-0 mr-10"
            >
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
          key={detailsContest.id}
          contest={detailsContest}
          close={setDisplayDetails}
        />
      )}
    </AppLayout>
  );
}

export default Concursos;

function ListContests({ concursos, setContestDetails, setDisplayDetails }) {
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
      {concursos.length > 0 ? (
        <>
          {concursos?.map(concurso => (
            <ContestCard
              setContestDetails={setContestDetails}
              setDisplayDetails={setDisplayDetails}
              key={concurso.id}
              concurso={concurso}
            />
          ))}
        </>
      ) : (
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
                destinos turísticos nacionais e explorar, submergir e viver as culturas locais, podem juntar
                artistas e o público geral.
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
