import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head, Link, useForm } from '@inertiajs/react';

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
import { useStateContext } from '@/contexts/PaginaActualContext';
import { BiChat } from 'react-icons/bi';

import Banner from '@/Components/Banner';
import { motion } from 'framer-motion';
import { MdEmojiEvents } from 'react-icons/md';
import { Logo, smalLogo, artistas } from '../../../img';
import { FI, ngola } from '@/assets/parceria';
import SectionBorder from '@/Components/SectionBorder';
import { AiOutlineSound } from 'react-icons/ai';
import { RiTodoLine } from 'react-icons/ri';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  a1,
  a2,
  a3,
  a4,
  a5,
  a7,
  a8,
  a9,
  a10,
  a11,
  a12,
  a13,
  a14,
  a15,
  a16,
} from '@/assets/sessoes';
import { fotod_das_sessoes, services } from '@/assets/constants';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import classNames from 'classnames';
import Swal from 'sweetalert2';
import PartnerCard from '@/Components/PartnerCard';

interface Props {
  pagina: string;
  songs: Array<Object>;
  posts: Array<Object>;
  APP_URL: String;
}

export default function Welcome({ posts }: Props) {
  const route = useRoute();
  const page = useTypedPage();

  const [solicitar, setSolicitar] = useState(false);
  const [serviceSelected, setServiceSelected] = useState('');

  const sessoes = () => {};

  const { currentPage, setCurrentPage } = useStateContext();

  const [sidebarList, setSidebarList] = useState(<></>);
  /*
  const { data: songs, isFetching, error } = useGetWelcomeSongDestaqueQuery('');

  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: videos,
    isFetching: fetchV,
    error: errorV,
  } = useGetWelcomeVideoDestaqueQuery('');
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);
  const dispatch = useDispatch();*/

  const letter_a = 'a';
  return (
    <>
      <div className="scroll-watcher" />
      <motion.div
        animate={{ x: 0 }}
        transition={{ delay: 1 }}
        className="w-screen h-screen flex bg-gradient-to-br from-[#000000] to-[#000000] __dark:from-[#282728] __dark:to-[#2e2525w] fixed top-0 left-0 right-0 py-5 md:px-10 __bg-white text-white overflow-y-auto overflow-x-hidden"
      >
        {/*!isPlaying && isPlayingVideo && (
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
        )*/}

        <Head title="Bem-vindo" />
        <Banner />
        <div className="relative w-full h-full min-h-full min-w-full flex flex-col">
          <header className="example   _from-[#f6cc33] _to-[#f6cc33]  relative w-full h-28 md:h-[12%] flex flex-col justify-center items-center  shadow-lg  rounded shadow-black mb-2 md:pb-1 px-0 md:px-5 ">
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
            <div className="w-full h-screen_ flex flex-col" id="home">
              <div className="w-full flex flex-col  ">
                <div className="w-full h-auto flex flex-col md:flex-row justify-center items-center ">
                  <div className="w-full md:w-[60%] flex flex-col gap-1 ">
                    <h1 className="text-2xl md:text-5xl text-bold text-gradient_">
                      Lifter, comunidade de apoio e suporte para o talento e a
                      arte
                    </h1>
                    <p className=" tex-[#008ed2] text-base md:text-xl ">
                      Somos um ecossistema que conecta artistas ao publico
                      permitindo que haja partilha constante das artes e que o
                      talento e a criatividade possam criar emoões
                      inesquecíveis. Músicas são avaliadas e validadas pela rede
                      Lifter e tendencias são criadas.
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
                          Saber mais
                        </button>
                      </form>
                    </div>
                    <div className="w-ful flex">
                      <p className="text-base md:text-xl">
                        Alguns artistas com quem já trabalhamos
                      </p>
                    </div>
                    <div className="w-full gap-5 rounded flex flex-row shrink-0">
                      <div className="w-full flex gap-1">
                        <div className="w-1/6 h-[8rem] flex flex-col justify-center items-center bg-[#045]">
                          <img
                            src={a1}
                            alt=""
                            className="w-24 h-24 rounded transition-all blur-none hover:rounded-lg hover:shadow-xl shadow-black "
                          />
                          <span>Man Chic</span>
                        </div>
                        <div className="w-1/6 h-[8rem] flex flex-col justify-center items-center bg-[#045]">
                          <img
                            src={a2}
                            alt=""
                            className="w-24 h-24 rounded transition-all blur-none hover:rounded-lg hover:shadow-xl shadow-black "
                          />
                          <span>Cacusso Viana</span>
                        </div>
                        <div className="w-1/6 h-[8rem] flex flex-col justify-center items-center bg-[#045]">
                          <img
                            src={a5}
                            alt=""
                            className="w-24 h-24 rounded transition-all blur-none hover:rounded-lg hover:shadow-xl shadow-black "
                          />
                          <span>DKG</span>
                        </div>
                        <div className="w-1/6 h-[8rem] flex flex-col justify-center items-center bg-[#045]">
                          <img
                            src={a9}
                            alt=""
                            className="w-24 h-24 rounded transition-all blur-none hover:rounded-lg hover:shadow-xl shadow-black "
                          />
                          <span>Bênção e Luz</span>
                        </div>
                        <div className="w-1/6 h-[8rem] flex flex-col justify-center items-center bg-[#045]">
                          <img
                            src={a7}
                            alt=""
                            className="w-24 h-24 rounded transition-all blur-none hover:rounded-lg hover:shadow-xl shadow-black "
                          />
                          <span>Os Delavegas</span>
                        </div>
                        <div className="w-1/6 h-[8rem] flex flex-col justify-center items-center bg-[#045]">
                          <img
                            src={a10}
                            alt=""
                            className="w-auto h-[80%] relative rounded transition-all blur-none hover:rounded-lg hover:shadow-xl shadow-black "
                          />
                          <span>Sampaio Txitxi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-[40%] p-1 rounded  ">
                    <div className="w-full rounded blur-0 ">
                      <img
                        src={artistas}
                        alt=""
                        className="transition-all blur-none hover:rounded-lg hover:shadow-xl shadow-black "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="fb-share"
              data-share="true"
              data-width="450"
              data-show-faces="true"
            ></div>

            <div className="w-full flex flex-col fader-in my-28 " id="partners">
              <h1 className="text-2xl md:text-5xl fader-in text-center text-[#29a5f9] text-bold ">
                Parcerias & Suporte
              </h1>
              <div className="w-full flex flex-wrap h-48 gap-2 justify-center items-center  object-contain bg-white">
                <PartnerCard src={FI} nome="Founder Institute" />
                <PartnerCard src={ngola} nome="Ngola Pro Arte" />
              </div>
            </div>
            <SectionBorder />

            <div className="w-full flex flex-col gap-1 " id="lifter">
              <div className="w-full flex flex-col gap-1">
                <div className="w-full flex flex-col gap-5 mb-20 ">
                  <h1 className="text-2xl md:text-5xl text-bold text-gradient_ flex justify-center items-center fader-in gap-5">
                    Qual problema você enfrenta como artista?
                  </h1>
                  <p className="text-xl md:text-2xl text-center fader-in">
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
                  <h1 className="text-2xl md:text-5xl text-bold text-gradient_ flex justify-center fader-in items-center gap-5">
                    Uma luz no final do túnel!
                  </h1>
                  <p className="text-xl md:text-2xl text-center fader-in">
                    A Lifter nasce portanto como o resultado de +100 sessões de
                    entrevistas com artistas, público, organizadores de eventos,
                    DJs, produtores, etc, discutindo os problemas acima e
                    muitos.
                  </p>
                  <div className="w-full flex flex-col md:flex-row items-center justify-center ">
                    <img src={Logo} className="w-auto h-auto fader-in" alt="" />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-5 ">
                  <div className="w-full text-center">
                    <h1 className="text-2xl fader-in md:text-5xl text-bold">
                      Como funciona?
                    </h1>
                    <p className="text-base md:text-xl fader-in">
                      A lifter é um processo simples e eficiente que possibilita
                      dar visibilidade aos artistas através de quatro etapas.
                    </p>
                  </div>
                </div>

                <div className="w-full flex md:flex-col  gap-5  ">
                  <div className="w-full flex flex-col items-center justify-center my-5 ">
                    <div className="w-full flex flex-col md:flex-row gap-5 fader-in ">
                      <div className="w-full grouped flex flex-col  items-center p-2  border-b-2 border-b-[#ccc] hover:border-b-[#045] hover:border-b-4 hover:cursor-pointer ">
                        <div className=" text-bold flex flex-row items-center  gap-5  ">
                          {' '}
                          <span className="border flex  justify-center items-center rounded-lg w-10 h-10 text-5xl">
                            1
                          </span>{' '}
                          <span className="text-3xl">Publicação musical</span>
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

                <div className="w-full  flex flex-col gap-5 mb-20 shadow-2xl shadow-white p-2 ">
                  <div className="w-full flex flex-col md:flex-row">
                    <div className="flex fader-in flex-row justify-between items-center">
                      <div className="w-[50%] text-xl md:text-2xl md:text-bold text-start ">
                        <h1 className="w-full text-xl md:text-2xl md:text-bold text-end ">
                          <h1 className="text-2xl md:text-5xl text-bold text-center  ">
                            Rede Lifter:
                          </h1>
                          é o conjunto de pessoas e instituições comprometidas a
                          avaliar, promover arte e a criar oportunidades. São:{' '}
                        </h1>
                      </div>
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
            <div className="w-full flex flex-col gap-1  " id="empresa">
              <div className="w-full flex flex-col gap-1">
                <div className="w-full flex flex-col gap-5 my-24 ">
                  <h1 className="text-2xl md:text-5xl text-bold fader-in">
                    Quem somos?
                  </h1>
                  <div className="w-full flex flex-row">
                    <div className="flex flex-row justify-between items-center gap-5">
                      <h1 className="w-full fader-in text-xl md:text-2xl md:text-bold">
                        Somos LIFTER - PRESTAÇÃO DE SERVIÇOS, LDA. um grupo
                        altamente motivado e comprometido a encontrar e criar
                        oportunidades para artistas cujo talento é notável.
                        Trabalhamos principalmente com:
                      </h1>

                      <p className=".w-[50%] tex-[#008ed2] text-xl "></p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col md:flex-row items-center justify-center my-5 gap-10 md:gap-2  ">
                    <div className="w-full flex flex-col">
                      <span className="w-12 text-2xl text-bold border-2 rounded" />
                      <h1 className="text-2xl text-bold">Marketing</h1>
                      <p className="tex-base">
                        Nossa missão é sempre entregar através do marketing
                        efectivo soluções que impactem positivamente a
                        comunidade, parceiros e clientes.
                      </p>
                    </div>

                    <div className="w-full flex flex-col">
                      <span className="w-12 text-2xl text-bold border-2 rounded" />
                      <h1 className="text-2xl text-bold">Publicidade</h1>
                      <p className="tex-base">
                        Criamos a Rede Lifter e procuramos reunir através dela
                        um conjunto de pessoas que se tranformam em canais de
                        Publicidade multiplataformas: internet, televisão,
                        rádio, etc.
                      </p>
                    </div>
                    <div className="w-full flex flex-col">
                      <span className="w-12 text-2xl text-bold border-2 rounded" />
                      <h1 className="text-2xl text-bold"> Eventos </h1>
                      <p className="tex-base">
                        Nosso compromisso primario é a promoção cultural como
                        resultado realizamos com outros interessados eventos
                        culturais de expressão cultural e artistíca.{' '}
                      </p>
                    </div>
                    <div className="w-full flex flex-col">
                      <span className="w-12 text-2xl text-bold border-2 rounded" />
                      <h1 className="text-2xl text-bold">Formação</h1>
                      <p className="tex-base">
                        Estamos sempre preocupados com a qualidade, por isso
                        oferecemos constantemente a comunidade, nossos clientes
                        e parceiros acções formativas.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-5 ">
                  <h1 className="fader-in text-2xl md:text-5xl text-bold">
                    Eis no que podemos ajudar!
                  </h1>
                  <div className="w-full flex   flex-row">
                    <div className="flex flex-row justify-between items-center gap-5">
                      <h1 className="fader-in w-full text-xl md:text-2xl md:text-bold">
                        Buscamos oferecer acessibilidade em nossos serviços
                        mantendo a mesma qualidade e excelência. Nosso
                        compromisso é com as metas dos nossos clientes e
                        parceiros pois é através delas que nos realizamos.
                      </h1>
                    </div>
                  </div>
                  <div className="w-full flex flex-col md:flex-row items-center justify-center flex-wrap gap-5 ">
                    {services.map(service => (
                      <>
                        <div className="fader-in w-full md:w-1/2 xl:md:w-1/3  transform-effect hover:shadow-white hover:shadow-lg  flex flex-col  items-center p-5 gap-1 border ">
                          <div className=" text-bold flex flex-row items-center  gap-5  ">
                            {' '}
                            <span className="text-xl md:text-3xl">
                              {service.title}
                            </span>
                          </div>
                          <p className="w-full tex-base text-xl text-justify ">
                            {service.description}
                          </p>
                          <div className=" text-bold flex flex-row items-center  gap-5  ">
                            <button
                              onClick={() => setSolicitar(true)}
                              className="border transform-effect flex  justify-center items-center rounded-lg grouped  text-2xl p-1 "
                            >
                              Solicitar serviço
                            </button>{' '}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <SectionBorder />
            <div className="w-full">
              <Footer />
            </div>
          </main>
        </div>
      </motion.div>

      <Modal isOpen={solicitar} onClose={() => setSolicitar(false)}>
        <SolicitarServico service={serviceSelected} onClose={setSolicitar} />
      </Modal>
    </>
  );
}

function Footer() {
  return (
    <div className="w-full my-2 opacity-95 absolute bottom-0 left-0 justify-center items-center text-2xl text-center border-t border-t-white ">
      <div className="w-full flex flex-row flex-shrink justify-between  p-5  hidden ">
        <a className="p-2 border hover:bg-slate-400 rounded " href="http://">
          Termos e condições
        </a>
        <a
          className="p-2 border hover:bg-slate-400 rounded "
          target="blank"
          rel="noopener noreferrer"
          href="https://cultura.lifter.ao"
        >
          Cultura e artes
        </a>
        <a className="p-2 border hover:bg-slate-400 rounded " href="http://">
          Contactos
        </a>
        <a className="p-2 border hover:bg-slate-400 rounded " href="http://">
          Testemunhos e criticas
        </a>
      </div>{' '}
      LIFTER - PRESTAÇÃO DE SERVIÇOS, LDA. @ {new Date().getFullYear()}{' '}
    </div>
  );
}

function SolicitarServico({ service, onClose }) {
  const form = useForm({
    service: service,
    name: '',
    title: 'Mr.',
    contact: '',
    email: '',
    problem: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post('/request-services', {
      onSuccess: () =>
        Swal.fire(
          'Successo na solicitação.',
          'Sua solicitação foi registrada, assim que compreendermos sua necessidade retornaremos o contacto.',
          'success',
        ),
      onFinish: () => form.reset('problem'),
    });
  }

  return (
    <div className="w-full h-full p-5">
      <h1 className="text-2xl w-full text-center text-[#4c88c4] font-bold ">
        Solicitar serviço de {service}{' '}
      </h1>
      <form onSubmit={onSubmit}>
        <div>
          <InputLabel htmlFor="name">Nome completo</InputLabel>
          <TextInput
            id="name"
            type="text"
            className="mt-1 block w-full"
            value={form.data.name}
            onChange={e => form.setData('name', e.currentTarget.value)}
            required
            autoFocus
            autoComplete="name"
          />
          <InputError className="mt-2" message={form.errors.name} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="title">Título</InputLabel>
          <select
            id="title"
            className="mt-1 block w-full"
            value={form.data.title}
            onChange={e => form.setData('title', e.currentTarget.value)}
            required
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Sr.</option>
            <option>Sra.</option>
            <option>Dona.</option>
          </select>
          <InputError className="mt-2" message={form.errors.email} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="contact">
            Contacto telefónico (Indicativo do país, ex: AO - +244 927678173){' '}
          </InputLabel>
          <TextInput
            id="contact"
            type="number"
            className="mt-1 block w-full"
            value={form.data.contact}
            onChange={e => form.setData('contact', e.currentTarget.value)}
            required
            autoComplete="number"
          />
          <InputError className="mt-2" message={form.errors.contact} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email">Contacto de e-mail</InputLabel>
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={e => form.setData('email', e.currentTarget.value)}
            required
            autoComplete="email"
          />
          <InputError className="mt-2" message={form.errors.email} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="problem">Descrição da necessidade</InputLabel>
          <textarea
            id="problem"
            className="mt-1 block w-full"
            value={form.data.problem}
            onChange={e => form.setData('problem', e.currentTarget.value)}
            required
            placeholder="Para melhor o servirmos, descreva brevemente a necessidade que precisa ver resolvida."
          />
          <InputError className="mt-2" message={form.errors.problem} />
        </div>

        <div className="flex items-center justify-end mt-4">
          <SecondaryButton
            onClick={() => onClose(false)}
            className={classNames('ml-4', { 'opacity-25': form.processing })}
          >
            Cancelar
          </SecondaryButton>
          <PrimaryButton
            className={classNames('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Enviar solicitação
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
