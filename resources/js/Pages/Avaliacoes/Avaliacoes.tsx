import React, { useState, useEffect, useRef } from 'react';
// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

//import './stylesGalery.css';

// import required modules
import Interagir from '@/Components/Interagir';
import AppLayout from '@/Layouts/AppLayout';
import AudioPlayer from '@/Components/AudioPlayer';
import VideoPlayer from '@/Components/VideoPlayer';
import {
  GiNextButton,
  GiPauseButton,
  GiPlayButton,
  GiPreviousButton,
} from 'react-icons/gi';
import Seekbar from '@/Components/MusicPlayer/Seekbar';
import MediaDeEstrelas from '@/Components/MediaDeEstrelas';
import Container from '@/Layouts/Container';
import { BiCalendar, BiDotsHorizontal } from 'react-icons/bi';
import { useStateContext } from '@/contexts/PaginaActualContext';

import microImage from '../../assets/micro.jpg';
import { useSelector } from 'react-redux';
import { useGetSongsQuery, useGetVideosQuery } from '@/redux/services/coreApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import VideoCard from '@/Components/VideoCard';
import {
  EffectCards,
  EffectCoverflow,
  EffectCube,
  Navigation,
} from 'swiper/modules';
import { Link } from '@inertiajs/react';
import { SongCard } from '@/Components';

import ValuationReader from './ValuationReader';
import ValuatedsSongs from './ValuatedsSongs';
import axios from 'axios';
import ListSongs from './ListSongs';
import { transform } from 'lodash';

const Avaliacoes = ({}) => {
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(true);
  const [shuffle, setShuffle] = useState(false);

  const { data: songs, isFetching, error } = useGetSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const [selectedValuation, setSelectedValuation] = useState();

  useEffect(() => {}, [songs]);

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
            className={`w-8/12 h-full flex flex-col overflow-hidden smooth-transition ${
              selectedValuation ? 'left-0' : '-rigth-full'
            } `}
          >
            {selectedValuation ? (
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
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Avaliacoes;
