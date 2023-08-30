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
import Destaques from '../Jurados/Destaques';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/core';
import { useStateContext } from '@/contexts/PaginaActualContext';
import Galeria from '@/Components/Galeria';
import Inicio from './Inicio';

interface Props {
  pagina: string;
}

export default function Home({ pagina }: Props) {
  const route = useRoute();
  const page = useTypedPage();
  const { currentPage } = useStateContext();
  if (page.props.auth.user.verify_if_artist === 1) router.get('/artista');

  return (
    <AppLayout title="Home">
      <Head title="Home" />

      <div className="relative sm:flex flex-col sm:justify-center sm:items-center  bg-dots-darker bg-center dark:bg-dots-lighter  selection:bg-red-500 selection:text-white">
        {/*canLogin ? (
          <div className="sm:fixed flex flex-row justify-between sm:top-0 sm:right-10   z-10 md:text-right"></div>
        ) : null*/}

        <div className="max-w-7xl h-[85vh] overflow-y-auto mx-auto p-6 lg:p-8 border">
          {currentPage === '' && <Inicio nome_colecao="" />}
          {currentPage === 'destaques' && <Destaques />}
          {currentPage === 'sobre' && <SobreLifter />}

          <div className="absilute bottom-0 left-0 flex justify-center sm:items-center sm:justify-between">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-left">
              <div className="flex items-center gap-4">
                <Link
                  href={route('patrocinar')}
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
                </Link>
              </div>
            </div>
            <div className="flex space-x-2 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-left">
              <div className="flex items-center gap-4">
                <a
                  href={route('terms.show')}
                  className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 space-x-2"
                >
                  <FaHandshake />
                  <span>Termos de serviços</span>
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={route('policy.show')}
                  className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 space-x-2"
                >
                  <FaHandshake />
                  <span>Políticas de privacidade</span>
                </a>
              </div>
            </div>

            <div className="ml-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-right sm:ml-0">
              Lifter &copy; {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function SobreLifter() {
  return (
    <div className="flex pb-10">
      <div>
        <h1 className="text-4xl">O que é LIFTER?</h1>
        <p className="">
          Lifter đe uma plataforma de avaliačžao, sugestžao e classificačžao
          musical. A Lifter permite que seja o pđublico a criar e a promover as
          tendŽencias que possam se manter no mercado.
        </p>
        <p>
          Lifter đe um ponto de entrada para novas mđusicas e uma ponte que liga
          os mđusicos Đa audiŽencia, somos uma comunidade engajada em promover
          boa mđusica, partilhar emočžoes atravđes dela.
        </p>
      </div>
      <div>
        <h1 className="text-4xl">Quem faz a comunidade?</h1>
        <p className="">
          A comunidade Lifter đe feita do pđublico amante de mđusicos, de
          artistas e de profissionais do sector musical. Todos aqueles que
          vivenciam emočžoes atravđes da mđusica sžao sempre bem-vindos.{' '}
        </p>
        <p>
          Lifter đe um ponto de entrada para novas mđusicas e uma ponte que liga
          os mđusicos Đa audiŽencia, somos uma comunidade engajada em promover
          boa mđusica, partilhar emočžoes atravđes dela.
        </p>
      </div>
    </div>
  );
}
