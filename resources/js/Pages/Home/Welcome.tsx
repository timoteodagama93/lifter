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
import { BiHome, BiMusic, BiSearch, BiVideo } from 'react-icons/bi';
import { BsArrowDown, BsNewspaper, BsStars, BsTrophy } from 'react-icons/bs';
import { FaArtstation, FaCross, FaMusic } from 'react-icons/fa';
import Sobre from '../Concursos/Sobre';

import {
  useGetDestaqueSongsQuery,
  useGetDestaqueVideosQuery,
} from '@/redux/services/coreApi';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { Sidebar, SongCard } from '@/Components';
import VideoCardGrelha from '@/Components/VideoCardGrelha';
import Banner from '@/Components/Banner';
import { motion } from 'framer-motion';
import { random } from 'lodash';
import { GiSoundWaves } from 'react-icons/gi';
import { HiOutlineMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { Logo, smalLogo } from '../../../img';
import VideoSinglePlayer from '../Videos/VideoSinglePlayer';
import partners, { FI, FILuanda } from '@/assets/parceria';

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

  const { data: songs, isFetching, error } = useGetDestaqueSongsQuery('');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: videos,
    isFetching: fetchV,
    error: errorV,
  } = useGetDestaqueVideosQuery('');
  const { activeVideo, isPlayingVideo } = useSelector(state => state.player);

  return (
    <>
      <motion.div
        animate={{ x: 0 }}
        transition={{ delay: 1 }}
        className="w-screen h-screen flex bg-gradient-to-br from-[#00395f] to-[#005792] __dark:from-[#282728] __dark:to-[#2e2525w] fixed top-0 left-0 right-0 py-5 px-10 __bg-white text-white overflow-y-auto"
      >
        {isPlayingVideo && (
          <VideoSinglePlayer key={activeVideo.id + Math.floor(random() / 60)} />
        )}

        <Head title="Bem-vindo" />
        <Banner />
        <div className="relative w-full h-full min-h-full min-w-full flex flex-col">
          <header className="bg-gradient-to-br from-[#f6cc33] to-[#f6cc33]  _from-[#f6cc33] _to-[#f6cc33]  relative w-full h-28 md:h-[12%] flex flex-col justify-center items-center  shadow-lg  rounded shadow-black mb-2 md:pb-1 px-0 md:px-5">
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
                <div className="w-full h-14 flex justify-between py-1  ">
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
                <Link
                  href={route('login')}
                  className=" md:flex text-[#00395f] text-bold text-xl  justify-center items-center -bg-[#0094f8] p-2 rounded-lg hidden"
                >
                  Entrar
                </Link>
                <Link
                  href={route('register')}
                  className=" md:flex text-bold text-xl  justify-center items-center bg-[#0094f8] p-2 rounded-lg hidden"
                >
                  Registrar
                </Link>
              </div>
            </div>
          </header>
          {/* <!-- Page Content --> */}
          <main className="relative w-full  flex flex-col mx-auto justify-start items-start  p-1 rounded mt-12 pb-28  ">
            <div className="w-full flex flex-col gap-1" id="home">
              <div className="w-full flex flex-row gap-1">
                <div className="w-[60%] flex flex-col gap-5 ">
                  <h1 className="text-5xl text-bold">
                    Lifter, comunidade de apoio e suporta para o talento e a
                    arte
                  </h1>
                  <p className="tex-[#008ed2] text-xl ">
                    Um ecossistema que conecta artistas ao publico permitindo
                    que haja partilha constante das artes e que o talento e a
                    criatividade possam criar emoões inesquecíveis. Músicas são
                    avaliadas e validadas pela rede Lifter e tendencias são
                    criadas.
                  </p>
                  <div className="w-full flex flex-row items-center justify-center">
                    <form action="" className="w-full h-full flex flex-row">
                      <input type="search" name="" id="" className="w-[80%]" />
                      <button
                        type="submit"
                        className="rounded-r p-1 bg-[#0094f8] w-[20%] text-xl "
                      >
                        Saber Mais
                      </button>
                    </form>
                  </div>
                </div>
                <div className="w-[40%] p-5 .bg-[#f6cc33] rounded  ">
                  <div className="w-full rounded blur-0 ">
                    <img src={smalLogo} alt="" className="blur-none" />
                  </div>
                </div>
              </div>
              <h1 className="text-xl text-center text-[#29a5f9] text-bold ">
                Parcerias & Suporte
              </h1>
              <div className="w-full h-28 gap-1 flex my-10 justify-center items-center  object-contain bg-white">
                <img src={FI} alt="" className="w-auto h-full" />
              </div>
            </div>

            <div className="w-full flex flex-col gap-1" id="lifter">
              <div className="w-full flex flex-col gap-1">
                <div className="w-full flex flex-col gap-5 mb-20 ">
                  <h1 className="text-5xl text-bold">
                    Qual é o problema comum?
                  </h1>
                  <div className="w-full flex flex-row">
                    <div className="flex flex-row justify-between items-center gap-5">
                      <h1 className="w-[50%] text-2xl text-bold">
                        Interação, um problema difícil de ultrapassar no seio
                        artistíco{' '}
                      </h1>

                      <p className="w-[50%] tex-[#008ed2] text-xl ">
                        Os artistas, principalmente emergentes e não
                        conceituados, enumeraram os principais problemas que
                        enfrentam, os mais difíceis são os seguintes problemas:{' '}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex flex-row items-center justify-center my-5 ">
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
                  <h1 className="text-5xl text-bold">Lifter, uma solução!</h1>
                  <div className="w-full flex flex-row">
                    <div className="flex flex-row justify-between items-center gap-5">
                      <h1 className="w-[50%] text-2xl text-bold">
                        A Lifter ajuda artistas a divulgarem suas músicas e
                        imagem{' '}
                      </h1>

                      <p className="w-[50%] tex-[#008ed2] text-xl ">
                        A lifter é um processo simples e eficiente que
                        possibilita dar visibilidade aos artistas através de
                        quatro etapas.
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-center justify-center my-5 ">
                    <div className="w-full flex flex-col">
                      <div className="w-full flex flex-row  items-center p-2 ">
                        <div className=" text-bold flex flex-row items-center  gap-5  ">
                          {' '}
                          <span className="border flex  justify-center items-center rounded-lg w-10 h-10 text-5xl">
                            1
                          </span>{' '}
                          <span className="text-3xl">Captação musical</span>
                        </div>
                        <p className="w-full tex-base">
                          Durante esta fase a lifter percorrerá Angola com o
                          objetivo de procurar, atrair e captar artistas que
                          tenham trabalhos bons e que procuram espaços de
                          promoção e valorização. Os artistas são encaminhados
                          para a plataforma onde deverão partilhar seus
                          trabalhos com a rede lifter, dando inicio a segunda
                          fase da nossa cadeia de valor.
                        </p>
                      </div>
                      <div className="flex flex-col text-5xl">
                        <BsArrowDown />
                      </div>

                      <div className="w-full flex flex-row  items-center p-2 ">
                        <div className=" text-bold flex flex-row items-center  gap-5  ">
                          {' '}
                          <span className="border flex  justify-center items-center rounded-lg w-10 h-10 text-5xl">
                            2
                          </span>{' '}
                          <span className="text-3xl">Avaliação Musical</span>
                        </div>
                        <p className="w-full tex-base">
                          Durante a fase de avaliação e validação as músicas que
                          forem submetidas a plataforma são colocadas em
                          avaliação pela REDE LIFTER aonde os intervenientes
                          deverão dar feedbacks e atribuir notas avaliativas
                          para cada música. Diariamente deverão ser avaliadas
                          até 5 músicas inicialmente. O resultado dessas
                          avaliações é usado como validação que irá determinar a
                          qualidade da música e medir a aceitação do conteúdo
                          por parte do público. Com essas avaliações termina a
                          validação dando lugar a fase do marketing.
                        </p>
                      </div>
                      <div className="flex flex-col text-5xl">
                        <BsArrowDown />
                      </div>

                      <div className="w-full flex flex-row  items-center p-2 ">
                        <div className=" text-bold flex flex-row items-center  gap-5  ">
                          {' '}
                          <span className="border flex  justify-center items-center rounded-lg w-10 h-10 text-5xl">
                            3
                          </span>{' '}
                          <span className="text-3xl">Marketing Musical</span>
                        </div>
                        <p className="w-full tex-base">
                          Esta fase usa os dados de validação para criar
                          relatórios detalhados contendo informações sobre o
                          conteúdo sua aceitação. A partir desses dados cria-se
                          um plano de divulgação desse conteúdo. Uma vez criado
                          o plano de marketing específico da música prossegue-se
                          para a fase de divulgação ou promoção.
                        </p>
                      </div>
                      <div className="flex flex-col text-5xl">
                        <BsArrowDown />
                      </div>
                      <div className="w-full flex flex-row  items-center p-2 ">
                        <div className=" text-bold flex flex-row items-center  gap-5  ">
                          {' '}
                          <span className="border flex  justify-center items-center rounded-lg w-10 h-10 text-5xl">
                            4
                          </span>{' '}
                          <span className="text-3xl">Divulgação musical</span>
                        </div>
                        <p className="w-full tex-base">
                          Nesta fase as musicas com as melhores avaliações são
                          submetidas para os vários canais para efectivamente
                          serem divulgadas.Servindo do estudo de marketing da
                          música em causa, ela pode ser encaminhada para os
                          seguintes canais de promoção:{' '}
                          <strong>Rede lifter</strong>
                          que tem agora o compromisso de veicular em diferentes
                          plataformas a música; Promoção em eventos Promoção em
                          televisão; Promoção em estações de radio; Promoção e
                          destaque na plataforma; Promoção nas redes sociais
                          próprias da empresa; Criação de conteúdo com
                          influenciadores
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-1 my-10" id="biblioteca">
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
                    Nenhuma música em destaque neste momento...
                  </h1>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col gap-1" id="empresa">
              <div className="w-full flex flex-col gap-1">
                <div className="w-full flex flex-col gap-5 mb-20 ">
                  <h1 className="text-5xl text-bold">Quem somos?</h1>
                  <div className="w-full flex flex-row">
                    <div className="flex flex-row justify-between items-center gap-5">
                      <h1 className="w-[50%] text-2xl text-bold">
                        Somos um grupo altamente motivado e comprometido a criar
                        oportunidades para artistas cujo talento é notável.
                      </h1>

                      <p className="w-[50%] tex-[#008ed2] text-xl "></p>
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
                  <h1 className="text-5xl text-bold">
                    Eis no que podemos ajudar!
                  </h1>
                  <div className="w-full flex flex-row">
                    <div className="flex flex-row justify-between items-center gap-5">
                      <h1 className="w-[50%] text-2xl text-bold">
                        Buscamos oferecer acessibilidade em nossos serviços
                        mantendo a mesma qualidade e excelência. Nosso
                        compromisso é com as metas dos nossos clientes e
                        parceiros pois é através delas que nos realizamos.
                      </h1>

                      <p className="w-[50%] tex-[#008ed2] text-xl ">.</p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-center justify-center  gap-y-16 ">
                    <div className="w-full flex flex-col">
                      <div className="w-full flex flex-row  items-center p-2 gap-5 ">
                        <div className=" text-bold flex flex-row items-center  gap-5  ">
                          {' '}
                          <span className="text-3xl">Publicação musical</span>
                          <span className="rounded-full border p-1">KZ</span>
                          <span className="border flex  justify-center items-center rounded-lg  text-5xl p-1">
                            5000
                          </span>{' '}
                        </div>
                        <p className="w-full tex-base">
                          Este serviço permite aos artistas disponibilizar suas
                          músicas na Lifter e através de suas integrações a
                          música é propagada por toda a Internet.
                        </p>
                      </div>
                      <div className="w-full flex flex-row  items-center p-2 gap-5 ">
                        <div className=" text-bold flex flex-row items-center  gap-5 ">
                          {' '}
                          <span className="text-3xl">Avaliação musical</span>
                          <span className="rounded-full border p-1">KZ</span>
                          <span className="border flex  justify-center items-center rounded-lg  text-5xl p-1">
                            15000
                          </span>{' '}
                        </div>
                        <p className="w-full tex-base">
                          Este serviço permite aos artistas disponibilizar suas
                          músicas na Lifter e através de suas integrações a
                          música é propagada por toda a Internet.
                        </p>
                      </div>

                      <div className="w-full flex flex-row  items-center p-2 gap-5 ">
                        <div className=" text-bold flex flex-row items-center  gap-5 ">
                          {' '}
                          <span className="text-3xl">Marketing musical</span>
                          <span className="rounded-full border p-1">KZ</span>
                          <span className="border flex  justify-center items-center rounded-lg  text-5xl p-1">
                            35000
                          </span>{' '}
                        </div>
                        <p className="w-full tex-base">
                          Este serviço permite aos artistas disponibilizar suas
                          músicas na Lifter e através de suas integrações a
                          música é propagada por toda a Internet.
                        </p>
                      </div>

                      <div className="w-full flex flex-row  items-center p-2 gap-5 ">
                        <div className=" text-bold flex flex-row items-center  gap-5 ">
                          {' '}
                          <span className="text-3xl">Divulgação musical</span>
                          <span className="rounded-full border p-1">KZ</span>
                          <span className="border flex  justify-center items-center rounded-lg  text-5xl p-1">
                            25000
                          </span>{' '}
                        </div>
                        <p className="w-full tex-base">
                          Este serviço permite aos artistas disponibilizar suas
                          músicas na Lifter e através de suas integrações a
                          música é propagada por toda a Internet.
                        </p>
                      </div>

                      <div className="w-full flex flex-row  items-center p-2 gap-5 ">
                        <div className=" text-bold flex flex-row items-center  gap-5 ">
                          {' '}
                          <span className="text-3xl">Sondagem musical</span>
                          <span className="rounded-full border p-1">KZ</span>
                          <span className="border flex  justify-center items-center rounded-lg  text-5xl p-1">
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

            <Footer />
          </main>
        </div>
      </motion.div>
    </>
  );
}

function Footer() {
  return (
    <div className="w-full my-2 opacity-95 absolute bottom-0 left-10 justify-center items-center text-xl">
      {' '}
      Lifter @ {new Date().getFullYear()}{' '}
    </div>
  );
}
