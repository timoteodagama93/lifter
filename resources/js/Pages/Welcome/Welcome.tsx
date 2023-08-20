import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Modal from '@/Components/Modal';
import { Fones, Musica, PlayMusica } from '../../../img';
import WelcomeToLifter from '@/Components/Welcome';

import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from 'swiper/modules';

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
import {
  BsEmojiExpressionless,
  BsEmojiHeartEyes,
  BsEmojiLaughing,
  BsEmojiSmile,
} from 'react-icons/bs';
import PrimaryButton from '@/Components/PrimaryButton';
import { GiVote } from 'react-icons/gi';
import { FaHandshake, FaVoteYea } from 'react-icons/fa';

interface Props {
  canLogin: boolean;
  canRegister: boolean;
  laravelVersion: string;
  phpVersion: string;
}

export default function Welcome({
  canLogin,
  canRegister,
  laravelVersion,
  phpVersion,
}: Props) {
  const route = useRoute();
  const page = useTypedPage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head title="Welcome" />

      <div className="relative sm:flex flex-col sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white bg-gradient-to-br from-[#f6cc33] to-[#f6cc33] z-20">
        {canLogin ? (
          <div className="sm:fixed flex flex-row justify-between sm:top-0 sm:right-10   z-10 md:text-right">
            <div className="w-1/3 md:w-2/12">
              <ApplicationLogo className="" />
            </div>
            <div className="w-2/3 md:w-9/12 p-6">
              {page.props.auth.user ? (
                <Link
                  href={route('inicio')}
                  className="font-semibold dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 border p-2 rounded-lg  bg-[#4c88c4] text-white  "
                >
                  Continuar exploração
                </Link>
              ) : (
                <>
                  <Link
                    href={route('login')}
                    className="font-semibold  first-letter hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 border p-2 rounded-lg  bg-[#4c88c4] text-white"
                  >
                    Entrar
                  </Link>

                  {canRegister ? (
                    <Link
                      href={route('register')}
                      className="ml-4 font-semibold  hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 border p-2 rounded-lg  bg-[#4c88c4] text-white"
                    >
                      Criar conta
                    </Link>
                  ) : null}
                </>
              )}
            </div>
          </div>
        ) : null}

        <div className="max-w-7xl mx-auto p-6 lg:p-8 border">
          <Index estilo="Bem vindo" />

          <div className="flex justify-center mt-16 px-6 sm:items-center sm:justify-between">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-left">
              <div className="flex items-center gap-4">
                <a
                  href="lifter.com/patrocinar"
                  className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    className="-mt-px mr-1 w-5 h-5 stroke-gray-400 dark:stroke-gray-600 group-hover:stroke-gray-600 dark:group-hover:stroke-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  Patrocinar uma iniciativa Lifter
                </a>
              </div>
            </div>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-left">
              <div className="flex items-center gap-4">
                <a
                  href="lifter.com/patrocinar"
                  className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 space-x-2"
                >
                  <FaHandshake />
                  <span>Políticas & Termos</span>
                </a>
              </div>
            </div>

            <div className="ml-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-right sm:ml-0">
              Lifter &copy; {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => {}}>
        <div>
          <div className="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-7 h-7 stroke-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
              />
            </svg>
          </div>

          <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
            Laravel News
          </h2>

          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Laravel News is a community driven portal and newsletter aggregating
            all of the latest and most important news in the Laravel ecosystem,
            including new package releases and tutorials.
          </p>
        </div>
      </Modal>
    </>
  );
}

const Index = ({ estilo }) => {
  const [activar, setActivar] = useState('tudo');

  const [notificarLogin, setNotificarLogin] = useState(false);
  const [sendFeedback, setSendFeedback] = useState(false);
  return (
    <div className="">
      <Swiper
        effect={'coverflow'}
        grabCursor={false}
        centeredSlides={true}
        slidesPerView={3}
        navigation={true}
        spaceBetween={0}
        loop={true}
        autoplay={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <div className="hidden w-full absolute z-20 top-0 left-0  flex justify-center items-center sm:flex-row flex-col">
          <div className="bg-[#997f2362] justify-center items-center space-x-1 md:space-x-5">
            <button
              className="text-xl text-bold p-1 hover:text-white hover:bg-[#4c88c4] rounded-lg"
              onClick={() => setActivar('tudo')}
            >
              Ver tudo
              {activar === 'tudo' ? (
                <div
                  className={`justify-center mx-auto w-10 rounded-lg border-b-4 border-[#d17734]`}
                />
              ) : (
                ''
              )}
            </button>
            <button
              className="w-auto justify-center items-center text-xl text-bold p-1 hover:text-white hover:bg-[#4c88c4] rounded-lg"
              onClick={() => setActivar('kuduro')}
            >
              Kuduro
              {activar === 'kuduro' ? (
                <div className="justify-center mx-auto w-10 rounded-lg border-b-4 border-[#d17734]" />
              ) : (
                ''
              )}
            </button>
            <button
              className="text-xl text-bold p-1 hover:text-white hover:bg-[#4c88c4] rounded-lg"
              onClick={() => setActivar('afrohouse')}
            >
              Afrohouse
              {activar === 'afrohouse' ? (
                <div className="justify-center mx-auto w-10 rounded-lg border-b-4 border-[#d17734]" />
              ) : (
                ''
              )}
            </button>
            <button
              className="text-xl text-bold p-1 hover:text-white hover:bg-[#4c88c4] rounded-lg"
              onClick={() => setActivar('RAP')}
            >
              RAP
              {activar === 'RAP' ? (
                <div
                  className={`justify-center mx-auto w-10 rounded-lg border-b-4 border-[#d17734]`}
                />
              ) : (
                ''
              )}
            </button>
            <button
              className="text-xl text-bold p-1 hover:text-white hover:bg-[#4c88c4] rounded-lg invisible md:visible"
              onClick={() => setActivar('GETTO-ZOUK')}
            >
              Getto-zouk
              {activar === 'GETTO-ZOUK' ? (
                <div
                  className={`justify-center mx-auto w-10 rounded-lg border-b-4 border-[#d17734]`}
                />
              ) : (
                ''
              )}
            </button>
            <button
              className="text-xl text-bold p-1 hover:text-white hover:bg-[#4c88c4] rounded-lg invisible md:visible"
              onClick={() => setActivar('KIZOMBA')}
            >
              kizomba
              {activar === 'KIZOMBA' ? (
                <div
                  className={`justify-center mx-auto w-10 rounded-lg border-b-4 border-[#d17734]`}
                />
              ) : (
                ''
              )}
            </button>
          </div>
        </div>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img className="w-full h-10/12" src="img/artists/artista1.jpeg" />
            <div className="w-full h-2/12 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img src="img/artists/artista2.jpeg" />
            <div className="w-full flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <video controls>
              <source type="video/mp4" src="videos/css.mp4" />
            </video>
            <div className="w-full flex flex-col justify-start">
              <h1 className="text-xl">Anselmo Ralph</h1>
              <span className="text-base">RnB</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img className="w-full h-10/12" src="img/artists/artist2.png" />
            <div className="w-full h-2/12 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img className="w-full h-10/12" src="img/artists/artista2.jpeg" />
            <div className="w-full h-2/12 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img className="w-full h-10/12" src="img/artists/artista1.jpeg" />
            <div className="w-full h-2/12 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img className="w-full h-10/12" src="img/artists/artist1.jpg" />
            <div className="w-full h-2/12 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <img className="w-full h-10/12" src="img/artists/artist2.png" />
            <div className="w-full h-2/12 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col ">
            <div className="w-full h-4/6">
              <img src="img/artists/artista1.jpeg" />
            </div>
            <div className="w-full h-2/6 flex flex-col justify-start">
              <h1 className="text-base md:text-xl">CEF</h1>
              <span className="text-xs">Getto-Zouk</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="flex flex-row justify-center items-center  space-x-5">
        <p className="append-buttons">
          <h1 className="text-xs ">Dê uma avaliação!</h1>
          <input type="range" defaultValue={0} onChange={() => setNotificarLogin(true)} />
        </p>
        <p className="append-buttons">
          <div className="flex flex-row justify-center items-center">
            <button className="" onClick={() => setNotificarLogin(true)}>
              <div className="flex flex-col items-center">
                <FaVoteYea className="text-3xl" />
                <span className="text-xs">Votar </span>
              </div>
            </button>
          </div>
        </p>
        <p className="append-buttons">
          <h1 className="text-xs ">Como se sentiu?</h1>
          <div className="append-buttons flex flex-row space-x-2 text-2xl">
            <span className="flex space-x-1">
              <BsEmojiHeartEyes />
            </span>
            <span className="flex space-x-1">
              <BsEmojiSmile />
            </span>
            <span className="flex space-x-1">
              <BsEmojiExpressionless />
            </span>
            <span className="flex space-x-1">
              <BsEmojiLaughing />
            </span>
          </div>
        </p>
      </div>

      <div className="flex flex-row justify-center items-center  space-x-5">
        <p className="append-buttons">
          <button onClick={() => setNotificarLogin(true)} className="prepend-2-slides">
            Partilhar
          </button>
          <button onClick={() => setNotificarLogin(true)} className="prepend-2-slides">
            Recomendar
          </button>

          <button
            onClick={() => setNotificarLogin(true)}
            className="prepend-2-slides"
          >
            Feedback
          </button>
        </p>
      </div>

      <Modal isOpen={notificarLogin} onClose={() => setNotificarLogin(false)}>
        <div className="w-[400px] h-[200px] flex flex-col">
          <h1 className="text-2xl text-center">
            Para interagir você precisa ter sessão iniciada, entre com a sua
            conta ou registre-se{' '}
          </h1>
        </div>
      </Modal>

      <Modal isOpen={sendFeedback} onClose={() => setSendFeedback(false)}>
        <div className="w-[400px] h-[200px] flex flex-col">
          <h1 className="text-2xl text-center">Julgar a música e o artista </h1>
        </div>
      </Modal>
    </div>
  );
};
