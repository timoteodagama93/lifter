import React, { useState, useEffect } from 'react';
// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

//import './stylesGalery.css';

// import required modules
import AppLayout from '@/Layouts/AppLayout';

import { useSelector } from 'react-redux';
import {
  useGetSongsAudiosQuery,
  useGetSongsQuery,
} from '@/redux/services/coreApi';

import ValuationReader from './ValuationReader';
import ValuatedsSongs from './ValuatedsSongs';

const Avaliacoes = ({}) => {
  const { data: songs, isFetching, error } = useGetSongsAudiosQuery('destaque');

  const { activeSong, isPlaying } = useSelector(state => state.player);
  const [selectedValuation, setSelectedValuation] = useState(
    isPlaying ? activeSong : null,
  );

  useEffect(() => {
    if (!isPlaying) setSelectedValuation(null);
  }, [isPlaying]);

  return (
    <AppLayout title="Avaliações">
      <div className="w-full h-full flex flex-col overflow-y-hidden max-h-full md:gap-1">
        <div
          className={`w-full flex flex-row ${
            isPlaying ? 'h-[100%] ' : 'h-[100%]'
          }`}
        >
          {/**Lista de músicas avaliadas pelo usuário */}
          <ValuatedsSongs
            valuatedSongs={songs}
            songs={songs}
            selectedValuation={selectedValuation}
            setSelectedValuation={setSelectedValuation}
          />
          {/**Área de leitura de mensagens */}
          <div
            style={{ transition: '2s' }}
            className={`h-full hidden  flex-col overflow-hidden smooth-transition ${
              selectedValuation ? 'left-0' : '-rigth-full'
            } `}
          >
            {/*selectedValuation  ? (
              <ValuationReader activeValuation={selectedValuation} />
            ) : (
              <>
                <div className="my-1 w-full  text-base text-black  bg-[#fff] rounded relative flex flex-col  gap-1 p-5 shadow justify-center items-center">
                  <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                    Nenhuma avaliação selecionada.
                  </h1>
                  <p>
                    Selecione uma de suas avaliações na lista a esquerda, caso
                    ainda não tenha avaliado nenhuma música, explore as várias
                    coleções disponíveis e partilhe a sua opinião.{' '}
                    <strong>
                      Participe da comunidade, vamos criar conexões através da
                      partilha, da paixão, do talento e do bom gosto musical.
                    </strong>
                  </p>
                </div>
              </>
            )*/}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Avaliacoes;
