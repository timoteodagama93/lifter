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
import { Lifter } from '.';
import {
  BiChat,
  BiHome,
  BiMusic,
  BiSearch,
  BiSpeaker,
  BiVideo,
} from 'react-icons/bi';
import { BsArrowDown, BsNewspaper, BsStars, BsTrophy } from 'react-icons/bs';
import {
  FaArtstation,
  FaCross,
  FaMusic,
  FaSadCry,
  FaSadTear,
} from 'react-icons/fa';
import Sobre from '../Concursos/Sobre';

import {
  useGetDestaqueSongsQuery,
  useGetDestaqueVideosQuery,
  useGetSongsAudiosQuery,
  useGetWelcomeSongDestaqueQuery,
  useGetWelcomeVideoDestaqueQuery,
} from '@/redux/services/coreApi';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { Sidebar, SongCard } from '@/Components';
import VideoCardGrelha from '@/Components/VideoCardGrelha';
import Banner from '@/Components/Banner';
import { motion } from 'framer-motion';
import { random } from 'lodash';
import { GiSoundWaves } from 'react-icons/gi';
import { HiEmojiSad, HiOutlineEmojiSad, HiOutlineMenu } from 'react-icons/hi';
import {
  MdClose,
  MdCloseFullscreen,
  MdEmojiEvents,
  MdTask,
} from 'react-icons/md';
import { Logo, smalLogo } from '../../../img';
import VideoSinglePlayer from '../Videos/VideoSinglePlayer';
import { FI, ngola, FILuanda } from '@/assets/parceria';
import SectionBorder from '@/Components/SectionBorder';
import Player from '@/Components/MusicPlayer/Player';
import MusicPlayer from '@/Components/MusicPlayer';
import TopChartCard from '@/Components/TopChartCard';
import VideoCard from '@/Components/VideoCard';
import axios from 'axios';
import CardVideo from '@/Components/CardVideo';
import { AiOutlineSound } from 'react-icons/ai';
import { RiTodoLine } from 'react-icons/ri';
import LifterPlayer from '@/Components/LifterPlayer';
import Modal from '@/Components/Modal';
import VideoPlayer from '@/Components/VideoPlayer';
import { playPauseVideo } from '@/redux/features/playerSlice';

interface Props {
  pagina: string;
  songs: Array<Object>;
  posts: Array<Object>;
  APP_URL: String;
}

export default function Welcome({ posts }: Props) {
  const route = useRoute();
  const page = useTypedPage();

  const { currentPage, setCurrentPage } = useStateContext();

  const [sidebarList, setSidebarList] = useState(<></>);

  const { data: songs, isFetching, error } = useGetWelcomeSongDestaqueQuery('');

  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: videos,
    isFetching: fetchV,
    error: errorV,
  } = useGetWelcomeVideoDestaqueQuery('');
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);
  const dispatch = useDispatch();
  return (
    <>
      <motion.div
        animate={{ x: 0 }}
        transition={{ delay: 1 }}
        className="w-screen h-screen flex bg-gradient-to-br from-[#000000] to-[#000000] __dark:from-[#282728] __dark:to-[#2e2525w] fixed top-0 left-0 right-0 py-5 md:px-10 __bg-white text-white overflow-y-auto"
      >
        {!isPlaying && isPlayingVideo && (
          <motion.div
            className="fixed position-fixed bottom-0 left-0 z-20 w-screen h-screen p-2 transition-5s "
            style={{ transition: '5s' }}
          >
            <VideoSinglePlayer
              key={activeVideo.id + Math.floor(random() / 60)}
            />
          </motion.div>
        )}

        {isPlayingVideo && isPlaying && (
          <motion.div
            className="fixed position-fixed bottom-0 left-0 z-20 w-full bg-black p-2 transition-5s "
            style={{ transition: '5s' }}
          >
            <MusicPlayer />
          </motion.div>
        )}

        <Head title="Bem-vindo" />
        <Banner />
        <div className="relative w-full h-full min-h-full min-w-full flex flex-col">
          <header className="example  _from-[#f6cc33] _to-[#f6cc33]  relative w-full h-28 md:h-[12%] flex flex-col justify-center items-center  shadow-lg  rounded shadow-black mb-2 md:pb-1 px-0 md:px-5 ">
            <div className="w-full h-12 border-[#2689ce] border-b md:border-b-0 md:h-full flex justify-between items-center px-1">
              <div className="w-full h-12 border-[#2689ce] border-b md:border-b-0 md:h-full flex justify-between items-center px-1">
                {/**LOGO */}
                <Link href="/">
                  <img
                    className="w-auto h-12 md:h-20 object-contain flex"
                    src={Logo}
                    alt="logo"
                  />
                </Link>
                <div className="w-full h-14 justify-between py-1 hidden md:flex  ">
                  <div className="w-full h-full flex  flex-row justify-center items-center mb-1 text-[#fff] text-xl gap-5 ">
                    <>
                      <a
                        href="#home"
                        className={` text-[#00abfc] text-bold text-xl  justify-center items-center -bg-[#0094f8] p-2 rounded-lg  
            `}
                      >
                        <span
                          className={` 
                          flex  font-bold uppercase
                              
                          `}
                        >
                          Home
                        </span>
                      </a>
                      <a
                        href="#lifter"
                        className={` text-[#00abfc] text-bold text-xl  justify-center items-center -bg-[#0094f8] p-2 rounded-lg  
            `}
                      >
                        <span
                          className={` 
                          flex  font-bold uppercase
                              
                          `}
                        >
                          O que é Lifter?
                        </span>
                      </a>

                      <a
                        href="#biblioteca"
                        className={` text-[#00abfc] text-bold text-xl  justify-center items-center -bg-[#0094f8] p-2 rounded-lg  
            `}
                      >
                        <span
                          className={` 
                          flex  font-bold uppercase
                              
                          `}
                        >
                          Bliblioteca
                        </span>
                      </a>

                      <a
                        href="#empresa"
                        className={` text-[#00abfc] text-bold text-xl  justify-center items-center -bg-[#0094f8] p-2 rounded-lg  
            `}
                      >
                        <span
                          className={` 
                          flex  font-bold uppercase
                              
                          `}
                        >
                          Empresa
                        </span>
                      </a>
                    </>
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <>
                  {page.props.auth.user ? (
                    <Link
                      href={route('avaliacoes')}
                      className=" flex text-bold text-base md:text-xl  justify-center items-center bg-[#0094f8] p-2 rounded-lg "
                    >
                      Continuar
                    </Link>
                  ) : (
                    <>
                      <Link
                        href={route('login')}
                        className=" flex text-[#00395f] text-bold text-base md:text-xl  justify-center items-center -bg-[#0094f8] p-2 rounded-lg "
                      >
                        Entrar
                      </Link>
                      <Link
                        href={route('register')}
                        className=" flex text-bold text-base md:text-xl  justify-center items-center bg-[#0094f8] p-2 rounded-lg "
                      >
                        Registrar
                      </Link>
                    </>
                  )}
                </>
              </div>
            </div>
          </header>
          {/* <!-- Page Content --> */}
          <main className="relative w-full  flex flex-col mx-auto justify-start items-start  p-1 rounded mt-12 pb-28  ">
            <div className="w-full flex flex-col gap-1" id="home">
              <div className="w-full flex flex-col md:flex-row gap-1">
                <div className="w-full md:w-[60%] flex flex-col gap-5 ">
                  <h1 className="text-2xl md:text-5xl text-bold text-gradient">
                    Lifter, comunidade de apoio e suporta para o talento e a
                    arte
                  </h1>
                  <p className=" tex-[#008ed2] text-base md:text-xl ">
                    Somos um ecossistema que conecta artistas ao publico
                    permitindo que haja partilha constante das artes e que o
                    talento e a criatividade possam criar emoões inesquecíveis.
                    Músicas são avaliadas e validadas pela rede Lifter e
                    tendencias são criadas.
                  </p>
                  <div className="w-full  flex flex-row items-center justify-center">
                    <form
                      action=""
                      className="w-full h-full flex flex-row hover:shadow-lg hover:shadow-black transition-all "
                    >
                      <input
                        type="search"
                        name=""
                        id=""
                        className="w-[80%] text-black"
                      />
                      <button
                        type="submit"
                        className="rounded-r p-1 bg-[#0094f8] w-[20%] text-xl "
                      >
                        Saber Mais
                      </button>
                    </form>
                  </div>
                </div>
                <div className="w-full md:w-[40%] p-5 .bg-[#f6cc33] rounded  ">
                  <div className="w-full rounded blur-0 ">
                    <img
                      src={smalLogo}
                      alt=""
                      className="transition-all blur-none hover:bg-[#f6cc33] hover:rounded-lg hover:shadow-xl shadow-black "
                    />
                  </div>
                </div>
              </div>
              <h1 className="text-xl text-center text-[#29a5f9] text-bold ">
                Parcerias & Suporte
              </h1>
              <div className="w-full h-28 gap-2 flex my-10 justify-center items-center  object-contain bg-white">
                <img src={FI} alt="" className="w-auto h-full" />
                <img src={ngola} alt="" className="w-auto h-12" />
              </div>
            </div>
            <SectionBorder />

            <div className="w-full flex flex-col gap-1" id="lifter">
              <div className="w-full flex flex-col gap-1">
                <div className="w-full flex flex-col gap-5 mb-20 ">
                  <h1 className="text-2xl md:text-5xl text-bold text-gradient_ flex justify-center items-center gap-5">
                    Qual problema você enfrenta como artista?
                  </h1>
                  <p className="text-xl md:text-2xl text-center">
                    Muitos artistas que conhecemos que buscam reconhecimento e
                    profissionalização listaram as barreiras que não conseguiram
                    ultrapassar sozinhos:
                  </p>
                  <div className="w-full flex flex-col md:flex-row items-center justify-center ">
                    <div className="w-full grouped h-full flex flex-col transform-effect transite-left  p-5">
                      <h1 className="text-xl md:text-2xl text-bold text-gradient_ flex justify-start items-center gap-2">
                        <span>
                          {' '}
                          <AiOutlineSound className=" w-12 h-12" />{' '}
                        </span>

                        <div className="flex gap-2 justify-center items-center flex-row">
                          <span className="h-12 text-2xl text-bold border-2 focus:border-black rounded" />
                          <span>Promoção</span>
                        </div>
                      </h1>
                      <p className="tex-base">
                        Quais canais? Locais? Eventos? Como? Com quem? Aonde e
                        como distribuir a música? Quais parcerias preciso?
                      </p>
                    </div>
                    <div className="w-full grouped  h-full flex flex-col transform-effect p-1">
                      <h1 className="text-xl md:text-2xl text-bold text-gradient_ flex justify-start items-center gap-2">
                        <span>
                          {' '}
                          <BiChat className=" w-12 h-12" />{' '}
                        </span>

                        <div className="flex gap-2 justify-center items-center flex-row">
                          <span className="h-12 text-2xl text-bold border-2 focus:border-black rounded" />
                          <span>Feedbacks</span>
                        </div>
                      </h1>
                      <h1 className="text-xl md:text-2xl text-bold"></h1>
                      <p className="tex-base">
                        Quem ouve minhas músicas? O que acham os ouvintes? O que
                        posso melhorar? O que tenho de mellhor coteúdo,
                        produção?
                      </p>
                    </div>
                    <div className="w-full grouped h-full flex flex-col transform-effect p-5">
                      <h1 className="text-xl md:text-2xl text-bold text-gradient_ flex justify-start items-center gap-2">
                        <span>
                          {' '}
                          <MdEmojiEvents className=" w-12 h-12" />{' '}
                        </span>

                        <div className="flex gap-2 justify-center items-center flex-row">
                          <span className="h-12 text-2xl text-bold border-2 focus:border-black rounded" />
                          <span>Oportunidades</span>
                        </div>
                      </h1>
                      <p className="tex-base">
                        Aonde me apresentar? Que eventos estão acontecendo e
                        aonde? Como actualizo-me sobre oportunidas por vir?
                      </p>
                    </div>
                    <div className="w-full grouped h-full flex flex-col transform-effect p-5">
                      <h1 className="text-xl md:text-2xl text-bold text-gradient_ flex justify-start items-center gap-2">
                        <span>
                          {' '}
                          <RiTodoLine className=" w-12 h-12" />{' '}
                        </span>

                        <div className="flex gap-2 justify-center items-center flex-row">
                          <span className="h-12 text-2xl text-bold border-2 focus:border-black rounded" />
                          <span>Planejamento</span>
                        </div>
                      </h1>
                      <p className="tex-base">
                        Como construir uma carreira? Preciso de um agente? A
                        quem me aliar? Como fazer marketing? Como planejar?
                      </p>
                    </div>
                  </div>
                </div>

                <SectionBorder />
                <div className="w-full flex flex-col gap-5 mb-20 ">
                  <h1 className="text-2xl md:text-5xl text-bold text-gradient_ flex justify-center items-center gap-5">
                    Uma luz no final do túnel!
                  </h1>
                  <p className="text-xl md:text-2xl text-center">
                    A Lifter nasce portanto como o resultado de +100 sessões de
                    entrevistas com artistas, público, organizadores de eventos,
                    DJs, produtores, etc, discutindo os problemas acima.
                  </p>
                  <div className="w-full flex flex-col md:flex-row items-center justify-center ">
                    <img src={Logo} className="w-auto h-auto" alt="" />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-5 ">
                  <div className="w-full text-center">
                    <h1 className="text-2xl md:text-5xl text-bold">
                      Como funciona?
                    </h1>
                    <p className="text-base">
                      A lifter é um processo simples e eficiente que possibilita
                      dar visibilidade aos artistas através de quatro etapas.
                    </p>
                  </div>
                </div>

                <div className="w-full flex md:flex-col  gap-5  ">
                  <div className="w-full flex flex-col items-center justify-center my-5 ">
                    <div className="w-full flex flex-col md:flex-row gap-5 ">
                      <div className="w-full grouped flex flex-col  items-center p-2  border-b-2 border-b-[#ccc] hover:border-b-[#045] hover:border-b-4 hover:cursor-pointer ">
                        <div className=" text-bold flex flex-row items-center  gap-5  ">
                          {' '}
                          <span className="border flex  justify-center items-center rounded-lg w-10 h-10 text-5xl">
                            1
                          </span>{' '}
                          <span className="text-3xl">Captação musical</span>
                        </div>
                        <p className="w-full tex-base hover:flex">
                          Crie uma conta e envie a sua música na plataforma.
                        </p>
                      </div>

                      <div className="w-full flex grouped flex-col   items-center p-2  border-b-2 border-b-[#ccc] hover:border-b-[#045] hover:border-b-4 hover:cursor-pointer ">
                        <div className=" text-bold flex flex-row items-center  gap-5  ">
                          {' '}
                          <span className="border flex  justify-center items-center rounded-lg w-10 h-10 text-5xl">
                            2
                          </span>{' '}
                          <span className="text-3xl">Avaliação Musical</span>
                        </div>
                        <p className="w-full tex-base hover:flex">
                          A <strong>Rede Lifter</strong> vai ouvir, avaliar e
                          partilhar a sua música.
                        </p>
                      </div>

                      <div className="w-full flex grouped  flex-col   items-center p-2 border-b-2 border-b-[#ccc] hover:border-b-[#045] hover:border-b-4 hover:cursor-pointer ">
                        <div className=" text-bold flex flex-row items-center  gap-5  ">
                          {' '}
                          <span className="border flex  justify-center items-center rounded-lg w-10 h-10 text-5xl">
                            3
                          </span>{' '}
                          <span className="text-3xl">Marketing Musical</span>
                        </div>
                        <p className="w-full tex-base hover:flex">
                          A Lifter vai fazer-te um plano de marketing eficiente
                        </p>
                      </div>

                      <div className="w-full flex grouped flex-col  items-center p-2  border-b-2 border-b-[#ccc] hover:border-b-[#045] hover:border-b-4 hover:cursor-pointer ">
                        <div className=" text-bold flex flex-row items-center  gap-5  ">
                          {' '}
                          <span className="border flex  justify-center items-center rounded-lg w-10 h-10 text-5xl">
                            4
                          </span>{' '}
                          <span className="text-3xl">Divulgação musical</span>
                        </div>
                        <p className="w-full tex-base hover:flex">
                          Use a rede Lifter e seus parceiros para divulgar na
                          Internet, televisão, rádio, etc.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <SectionBorder />

                <div className="w-full flex flex-col gap-5 mb-20 ">
                  <h1 className="text-2xl md:text-5xl text-bold">
                    O que é a rede Lifter?
                  </h1>
                  <div className="w-full flex flex-col md:flex-row">
                    <div className="flex flex-row justify-between items-center">
                      <h1 className="w-[40%] md:w-[50%] text-xl md:text-2xl md:text-bold">
                        A Rede Lifter é o conjunto de pessoas e instituições
                        comprometidas a avaliar, promover arte e a criar
                        oportunidades.{' '}
                      </h1>

                      <div className="w-full flex flex-col md:flex-row items-center justify-center ">
                        <div className="w-full grouped h-full flex flex-col transform-effect p-5">
                          <span className="w-12 text-2xl text-bold border-2 rounded" />
                          <h1 className="text-xl md:text-2xl text-bold">
                            Produtores e DJs
                          </h1>
                        </div>
                        <div className="w-full grouped h-full flex flex-col transform-effect p-5">
                          <span className="w-12 text-2xl text-bold border-2 rounded" />
                          <h1 className="text-xl md:text-2xl text-bold">
                            Influenciadores e Parceiros diversos
                          </h1>
                        </div>
                        <div className="w-full grouped h-full flex flex-col transform-effect p-5">
                          <span className="w-12 text-2xl text-bold border-2 rounded" />
                          <h1 className="text-xl md:text-2xl text-bold">
                            Público e Músicos
                          </h1>
                        </div>
                        <div className="w-full grouped h-full flex flex-col transform-effect p-5">
                          <span className="w-12 text-2xl text-bold border-2 rounded" />
                          <h1 className="text-xl md:text-2xl text-bold">
                            Empresas e Empresários
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <SectionBorder />

            <div className="w-full flex flex-col gap-1 " id="biblioteca">
              <h1 className="text-5xl text-bold text-center">Biblioteca</h1>
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
                  <div className="w-full relative flex flex-row flex-shrink">
                    {videos?.map((video, i) => (
                      <CardVideo
                        type="song"
                        video={video}
                        i={i}
                        key={video.id}
                        activeVideo={activeSong}
                        isPlayingVideo={isPlaying}
                        videos={videos}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col">
                  <h1 className="text-xl text-center w-full">
                    Nenhum vídeo em destaque neste momento...
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
                    {songs?.map((song, i) => (
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
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col">
                  <h1 className="text-xl text-center w-full">
                    Nenhuma música em destaque neste momento...
                  </h1>
                </div>
              )}
            </div>
            <SectionBorder />
            <div className="w-full flex flex-col gap-1" id="empresa">
              <div className="w-full flex flex-col gap-1">
                <div className="w-full flex flex-col gap-5 mb-20 ">
                  <h1 className="text-2xl md:text-5xl text-bold">
                    Quem somos?
                  </h1>
                  <div className="w-full flex flex-row">
                    <div className="flex flex-row justify-between items-center gap-5">
                      <h1 className="w-full text-xl md:text-2xl md:text-bold">
                        Somos um grupo altamente motivado e comprometido a
                        encontrar e criar oportunidades para artistas cujo
                        talento é notável.
                      </h1>

                      <p className=".w-[50%] tex-[#008ed2] text-xl "></p>
                    </div>
                  </div>
                  <div className="w-full flex flex-row items-center justify-center my-5 hidden ">
                    <div className="w-full flex flex-col">
                      <span className="w-12 text-2xl text-bold border-2 rounded" />
                      <h1 className="text-2xl text-bold">Promoção</h1>
                      <p className="tex-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.!
                      </p>
                    </div>
                    <div className="w-full flex flex-col">
                      <span className="w-12 text-2xl text-bold border-2 rounded" />
                      <h1 className="text-2xl text-bold">Feedbacks</h1>
                      <p className="tex-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.!
                      </p>
                    </div>
                    <div className="w-full flex flex-col">
                      <span className="w-12 text-2xl text-bold border-2 rounded" />
                      <h1 className="text-2xl text-bold">Oportunidades</h1>
                      <p className="tex-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.!
                      </p>
                    </div>
                    <div className="w-full flex flex-col">
                      <span className="w-12 text-2xl text-bold border-2 rounded" />
                      <h1 className="text-2xl text-bold"> Planejamento </h1>
                      <p className="tex-base">
                        Os artistas não conceituados não conseguem dispor que
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-5 ">
                  <h1 className="text-2xl md:text-5xl text-bold">
                    Eis no que podemos ajudar!
                  </h1>
                  <div className="w-full flex  flex-row">
                    <div className="flex flex-row justify-between items-center gap-5">
                      <h1 className="w-full text-xl md:text-2xl md:text-bold">
                        Buscamos oferecer acessibilidade em nossos serviços
                        mantendo a mesma qualidade e excelência. Nosso
                        compromisso é com as metas dos nossos clientes e
                        parceiros pois é através delas que nos realizamos.
                      </h1>

                      <p className=".w-[50%] tex-[#008ed2] text-xl ">.</p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-center justify-center  gap-y-16 ">
                    <div className="w-full flex flex-col gap-y-5">
                      <div className="w-full grouped flex flex-col md:flex-row  items-center p-5 gap-1 transform-effect">
                        <div className=" text-bold flex flex-row items-center  gap-5  ">
                          {' '}
                          <span className="text-xl md:text-3xl">
                            Publicação musical
                          </span>
                          <span className="rounded-full border p-1 hidden">
                            KZ
                          </span>
                          <span className="border flex  justify-center items-center rounded-lg  text-5xl p-1 hidden">
                            5000
                          </span>{' '}
                        </div>
                        <p className="w-full tex-base">
                          Este serviço permite aos artistas disponibilizar suas
                          músicas na Lifter e através de suas integrações a
                          música é propagada por toda a Internet.
                        </p>
                      </div>
                      <div className="w-full grouped flex  flex-col md:flex-row  items-center p-2 gap-5  transform-effect ">
                        <div className=" text-bold flex flex-row items-center  gap-5 ">
                          {' '}
                          <span className="text-xl md:text-3xl">
                            Avaliação musical
                          </span>
                          <span className="rounded-full border p-1 hidden">
                            KZ
                          </span>
                          <span className="border flex  justify-center items-center rounded-lg  text-5xl p-1 hidden">
                            15000
                          </span>{' '}
                        </div>
                        <p className="w-full tex-base">
                          Este serviço permite aos artistas disponibilizar suas
                          músicas na Lifter e através de suas integrações a
                          música é propagada por toda a Internet.
                        </p>
                      </div>

                      <div className="w-full grouped flex  flex-col md:flex-row  items-center p-2 gap-5  transform-effect ">
                        <div className=" text-bold flex flex-row items-center  gap-5 ">
                          {' '}
                          <span className="text-xl md:text-3xl">
                            Marketing musical
                          </span>
                          <span className="rounded-full border p-1 hidden">
                            KZ
                          </span>
                          <span className="border flex  justify-center items-center rounded-lg  text-5xl p-1 hidden">
                            35000
                          </span>{' '}
                        </div>
                        <p className="w-full tex-base">
                          {' '}
                          hidden Este serviço permite aos artistas
                          disponibilizar suas músicas na Lifter e através de
                          suas integrações a música é propagada por toda a
                          Internet.
                        </p>
                      </div>

                      <div className="w-full grouped flex flex-col md:flex-row  items-center p-2 gap-5  transform-effect ">
                        <div className=" text-bold flex flex-row items-center  gap-5 ">
                          {' '}
                          <span className="text-xl md:text-3xl">
                            Divulgação musical
                          </span>
                          <span className="rounded-full border p-1 hidden">
                            KZ
                          </span>
                          <span className="border flex  justify-center items-center rounded-lg  text-5xl p-1 hidden">
                            25000
                          </span>{' '}
                        </div>
                        <p className="w-full tex-base">
                          Este serviço permite aos artistas disponibilizar suas
                          músicas na Lifter e através de suas integrações a
                          música é propagada por toda a Internet.
                        </p>
                      </div>

                      <div className="w-full grouped flex flex-col md:flex-row  items-center p-2 gap-5  transform-effect ">
                        <div className=" text-bold flex flex-row items-center  gap-5 ">
                          {' '}
                          <span className="text-xl md:text-3xl">
                            Sondagem musical
                          </span>
                          <span className="rounded-full border p-1 hidden">
                            KZ
                          </span>
                          <span className="border flex  justify-center items-center rounded-lg  text-5xl p-1 hidden">
                            35000
                          </span>{' '}
                        </div>
                        <p className="w-full tex-base">
                          Este serviço permite aos artistas disponibilizar suas
                          músicas na Lifter e através de suas integrações a
                          música é propagada por toda a Internet.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SectionBorder />

            <Footer />


             

          </main>
        </div>
      </motion.div>

      <Modal
        isOpen={isPlayingVideo && false}
        onClose={() => dispatch(playPauseVideo(false))}
      >
        <div className="flex flex-col animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded gap-1 ">
          <div className="w-full flex float-right justify-end">
            <button
              onClick={() => dispatch(playPauseVideo(false))}
              className="p-4 transform-effect w-fit right-1 text-black"
            >
              <MdCloseFullscreen className="w-5 h-5 font-bold text-4xl" />
            </button>
          </div>
          <VideoPlayer />
        </div>
      </Modal>
    </>
  );
}

function Footer() {
  return (
    <div className="w-full my-2 opacity-95 absolute bottom-0 left-10 justify-center items-center text-2xl text-center">
      {' '}
      Lifter @ {new Date().getFullYear()}{' '}
    </div>
  );
}
