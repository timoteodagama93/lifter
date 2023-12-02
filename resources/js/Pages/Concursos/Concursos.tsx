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

interface Props {
  concursos: Array<Object>;
}
function Concursos({ concursos, showAscensao = false }: Props) {
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
              key={concurso.id}
              concurso={concurso}
            />
          ))}
        </>
      )}
    </>
  );
}

export default Concursos;
