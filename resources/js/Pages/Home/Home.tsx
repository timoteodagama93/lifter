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
import { BiSend } from 'react-icons/bi';

interface Props {
  pagina: string;
}

export default function Home({ pagina, ruid }: Props) {
  const route = useRoute();
  const page = useTypedPage();
  console.log(ruid);
  const { currentPage } = useStateContext();
  //if (page.props.auth.user.verify_if_artist === 1) router.get('/artista');
  console.log(page.props)

  return (
    <AppLayout title="Home">
      <Head title="Home" />

      <div className="relative sm:flex flex-col sm:justify-center sm:items-center  bg-dots-darker bg-center dark:bg-dots-lighter  selection:bg-red-500 selection:text-white">
       
        <div className="w-full h-[85vh] overflow-y-auto mx-auto p-2 lg:p-4">
          {currentPage === '' && <Postagens />}
          {currentPage === 'inicio' && <Postagens />}
          {currentPage === 'destaques' && <Destaques />}
          {currentPage === 'sobre' && <SobreLifter />}
 
          <div className="flex justify-center sm:items-center sm:justify-between space-x-2">
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
                  Patrocinar
                </Link>
                <Link
                  href={route('parceiros')}
                  className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 space-x-2"
                >
                  <FaHandshake />
                  Parceiros
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
                  <span>Termos</span>
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={route('policy.show')}
                  className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 space-x-2"
                >
                  <FaHandshake />
                  <span>Políticas</span>
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
  const [show, setShow] = useState('about');
  return (
    <div className="flex flex-col pb-10">
      <div className="w-full flex flex-row justify-center space-x-1">
        <button
          onClick={() => setShow('about')}
          className="text-base md:text-xl py-2 px-4 hover:bg-[#2e2c2e] hover:text-white border border-[#fff] rounded-lg "
        >
          Sobre
        </button>
        <button
          onClick={() => setShow('join')}
          className="text-base md:text-xl py-2 px-4 hover:bg-[#2e2c2e] hover:text-white border border-[#fff] rounded-lg "
        >
          Juntar-se
        </button>
        <button
          onClick={() => setShow('vagas')}
          className="text-base md:text-xl py-2 px-4 hover:bg-[#2e2c2e] hover:text-white border border-[#fff] rounded-lg "
        >
          Vagas abertas
        </button>
      </div>
      {show === 'about' && (
        <div className="flex">
          <div>
            <h1 className="text-4xl">O que é LIFTER?</h1>
            <p className="">
              Lifter đe uma plataforma de avaliačžao, sugestžao e classificačžao
              musical. A Lifter permite que seja o pđublico a criar e a promover
              as tendŽencias que possam se manter no mercado.
            </p>
            <p>
              Lifter đe um ponto de entrada para novas mđusicas e uma ponte que
              liga os mđusicos Đa audiŽencia, somos uma comunidade engajada em
              promover boa mđusica, partilhar emočžoes atravđes dela.
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
              Lifter đe um ponto de entrada para novas mđusicas e uma ponte que
              liga os mđusicos Đa audiŽencia, somos uma comunidade engajada em
              promover boa mđusica, partilhar emočžoes atravđes dela.
            </p>
          </div>
        </div>
      )}
      {show === 'join' && (
        <div className="flex">
          <div>
            <h1 className="text-4xl">Vagas</h1>
            <p className="">
              Você pode juntar-se a equipa Lifter candidatando-se às vagas em
              aberto.
            </p>
          </div>
          <div>
            <h1 className="text-4xl">Outras formas</h1>
            <p className="">
              Caso queira juntar-se de outra forma ou através de um projecto em
              mente, sinta-se livre em enviar um e-mail para{' '}
              <strong>join@lifter.net</strong> para a nossa equipa detalhando o
              projecto.
            </p>
          </div>
        </div>
      )}
      {show === 'vagas' && (
        <div className="flex flex-col p-2 spce-y-5">
          <div>
            <h1 className="text-4xl">Gestor de Marketing e vendas</h1>
            <p className="">
              Procuramos por um profissional no sector de Marketing e vendas.
              Possuir experiência em Marketing Musical e/ou Digital pode ser um
              diferencial.
            </p>
          </div>
          <div>
            <h1 className="text-4xl">Programador</h1>
            <p className="">
              Procuramos um desenvolvedor Web e/ou Mobile para integrar o nosso
              time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Postagens() {
  return (
    <>
      <div className="w-full md:px-36 flex flex-col py-5">
        <form onSubmit={e => e.preventDefault()}>
          <div className="w-full h-full flex text-xs justify-center bg-white border-[#2e2c2e] border shadow-lg p-1 rounded-lg items-center">
            <textarea
              cols={100}
              rows={3}
              maxLength={100}
              placeholder="Liberte-se, partilhe, inspire o mundo e seja uma referência, seja musa de alguém..."
              className="w-full border-none"
            ></textarea>
            <button className="h-full text-4xl   ">
              <BiSend />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
