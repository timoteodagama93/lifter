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
import { useGetSongsQuery } from '@/redux/services/coreApi';

import PlayingVideo from './PlayingVideo';
import ListVideos from './ListVideos';

const VideoShow = ({ videos, playThis }) => {
  const [selectedVideo, setPlayingVideo] = useState(playThis);

  return (
    <AppLayout title="Avaliações">
      <div className="w-full h-full flex flex-col overflow-y-hidden max-h-full md:gap-1">
        <div
          className={`w-full flex flex-row h-[100%]
          `}
        >
          {/**Lista de músicas avaliadas pelo usuário */}
          <ListVideos
            valuatedSongs={videos}
            videos={videos}
            playingVideo={selectedVideo}
            setPlayingVideo={setPlayingVideo}
          />
          {/**Área de leitura de mensagens */}
          <div
            style={{ transition: '2s' }}
            className={`w-8/12 h-full flex flex-col overflow-hidden smooth-transition ${
              selectedVideo ? 'left-0' : '-rigth-full'
            } `}
          >
            {selectedVideo ? (
              <PlayingVideo playingVideo={selectedVideo} />
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
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default VideoShow;
