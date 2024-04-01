import React, { useEffect, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head, Link } from '@inertiajs/react';

// import Swiper core and required modules

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './style.css';
import Destaques from './Destaques';
import AppLayout from '@/Layouts/AppLayout';
import { useStateContext } from '@/contexts/PaginaActualContext';
import Avaliar from './Avaliar';
import { Lifter } from './';
import { BiHome } from 'react-icons/bi';
import { BsNewspaper, BsTrophy } from 'react-icons/bs';
import { FaMusic } from 'react-icons/fa';
import Sobre from '../Concursos/Sobre';
import {
  useGetDestaqueSongsQuery,
  useGetDestaqueVideosQuery,
} from '@/redux/services/coreApi';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { SongCard } from '@/Components';
import VideoCardGrelha from '@/Components/VideoCardGrelha';
import PlayerContainer from '@/Layouts/PlayerContainer';
import Player from '@/Components/MusicPlayer/Player';
import PlayerLayout from '@/Layouts/PlayerLayout';

interface Props {
  pagina: string;
  songs: Array<Object>;
  posts: Array<Object>;
  APP_URL: String;
}

export default function Home({ posts }: Props) {
  const route = useRoute();
  const page = useTypedPage();

  /*
  const { data, isFetching, error } = useGetValuateSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  */

  const { currentPage, setCurrentPage } = useStateContext();
  const [bgPage, setBgPage] = useState(undefined);

  function setDefaultPage() {
    setCurrentPage(<Avaliar />);
  }

  const [sidebarList, setSidebarList] = useState(<></>);

  useEffect(setDefaultPage, []);
  const { data: songs, isFetching, error } = useGetDestaqueSongsQuery('');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: videos,
    isFetching: fetchV,
    error: errorV,
  } = useGetDestaqueVideosQuery('');
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);

  return (
    <PlayerLayout
      title="Home"
      renderSidebarList={() => sidebarList}
      bg={bgPage}
    >
      <Head title="Home" />
      <PlayerContainer>
        <div className="w-full relative sm:flex flex-col sm:justify-center sm:items-center  bg-dots-darker bg-center dark:bg-dots-lighter  selection:bg-red-500 selection:text-white">
          <div className="w-full h-full overflow-y-hidden flex flex-col gap-1 justify-cebter items-center rounded-lg">
            <div className="w-full flex justify-between items-center p-1 md:px-5 border-b">
              <h1 className="text-center font-bold text-4xl"></h1>

              <div className="flex flex-row justify-center items-center">
                <Link
                  href="noticias"
                  className="transform-effect p-1 justify-center items-center w-full flex flex-col"
                >
                  {' '}
                  <BsNewspaper className="w-10 h-auto font-bold" />{' '}
                  <span className="flex">Ver as notícias</span>
                </Link>
              </div>
            </div>
            {videos ? (
              <div className="flex w-full h-full flex-col relative  ">
                <div
                  className="w-full flex flex-row justify-between
             items-center"
                >
                  <h2 className=" font-bold text-base md:text-4xl text-[#]">
                    Vídeos em Destaques{' '}
                  </h2>
                  <Link href="/video">
                    <p className="text-sm md:text-base cursor-pointer">
                      Ver mais
                    </p>
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
                        <VideoCardGrelha
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
                  <Link href="musicas">
                    <p className="text-sm md:text-base cursor-pointer">
                      Ver mais
                    </p>
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
                          key={song.id}
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
            <div className="flex w-full h-full flex-col relative  p-5 shadow-inner shadow-black my-5">
              <div
                className="w-full flex flex-row justify-between
             items-center"
              >
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Sobre a Lifter{' '}
                </h2>
                <a target="_blank" href={route('policy.show')}>
                  <p className="text-base cursor-pointer p-2 transform-effect">
                    Políticas de privacidades
                  </p>
                </a>
              </div>
              <div className="my-1 w-full text-base text-black   bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
                <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                  Lifter é uma plataforma de avaliação, sugestão e classificação
                  musical.
                </h1>
                <p>
                  Lifter existe para criar conexões através da partilha da
                  paixão individual, do talento querendo emergir e do bom gosto
                  musical.
                </p>
              </div>
              <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
                <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                  Missão.
                </h1>
                <p>
                  <ul>
                    <ol className="list-decimal">
                      1. Valorizar artistas e culturas;
                    </ol>
                    <ol className="list-decimal">
                      2. Originar emoções positivas nas pessoas através da
                      música;
                    </ol>
                    <ol className="list-decimal">
                      2. Conectar artistas e o público amante de boa música
                      através da partilha.
                    </ol>
                  </ul>
                </p>{' '}
                <a href=""></a>
              </div>
            </div>
            <div className="flex w-full h-full flex-col relative p-5 shadow-inner shadow-black  ">
              <div
                className="w-full flex flex-row justify-between
             items-center"
              >
                <h2 className=" font-bold text-base md:text-4xl text-[#]">
                  Core Business{' '}
                </h2>
                <Link href="/services">
                  <p className="text-base cursor-pointer transform-effect p-2 ">
                    Veja todos os serviços
                  </p>
                </Link>
              </div>
              <div className="my-1 w-full text-base text-black   bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
                <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                  Marketing e Publicidade.
                </h1>
                <p>
                  A Lifter é uma resposta a necessidade de conectar-se pessoas e
                  produtos que vai muito além de simplesmente querer-se vender
                  uma mercadoria para uma pessoas sem entender-se as suas
                  necessidades. Actuamos em Marketing pensando nas dores de
                  cabeça local e desenvolvemos as soluções que se precisem.
                  Finalmente através da publicidade levamos ao seu conhecimento
                  soluções que resolvem e acabam com as necessidades.
                </p>
              </div>
              <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
                <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                  Marketing Musical
                </h1>
                <p>
                  O Marketing Musical é nosso principal foco, isso nos permite
                  pensar em formas de conectar as pessoas e os artistas de modos
                  que músicas se tornem emoções e as emoções experiências que
                  mudem seu estado mental e de espírito e sua qualidade de vida.
                </p>
              </div>
              <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
                <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                  Organização de feiras, congressos e eventos
                </h1>
                <p>
                  Nosso lema é "CRIAR CONEXÕES ATRAVÉS DA PARTILHA", através de
                  nossos eventos procuramos criar um ambiente de networking e
                  colaboração que visam mudar a visão dos participantes.
                </p>
              </div>
              <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
                <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                  Estudos de mercado e Sondagens{' '}
                </h1>
                <p>
                  Condução de estudos de mercado e sondagens através de
                  feedbacks do público com o objectivo de mensurar diferentes
                  fenomenos sociais, culturais e económicos.
                </p>
              </div>
              <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-2 shadow">
                <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                  Formação Profissional
                </h1>
                <p>
                  Nossas formações são um complemento aos nossos objectivos de
                  impactar as comunidades locais. Como parte de nossa missão
                  queremos que os artísticas e as comunidades sejam cada vez
                  mais auto-suficientes e possam contribuir para o crescimento
                  cultural local e não só.
                </p>
              </div>
            </div>
            <Lifter />
          </div>
        </div>
      </PlayerContainer>
    </PlayerLayout>
  );
}
