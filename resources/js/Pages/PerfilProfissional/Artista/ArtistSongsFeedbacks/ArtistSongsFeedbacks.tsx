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
  useGetArtistSongsQuery,
  useGetSongsQuery,
} from '@/redux/services/coreApi';

import ValuationReader from './ValuationReader';
import OwnSongsList from './OwnSongsList';
import { smalLogo } from '../../../../../img';
import Interagir from '@/Components/Interagir';
import {
  BiArrowBack,
  BiInfoCircle,
  BiLibrary,
  BiStar,
  BiStats,
  BiUpload,
  BiVideo,
} from 'react-icons/bi';
import { HiHeart, HiMusicNote } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { DetailsArtist } from '../Info';
import { AddSong } from '../Song';
import { BsShare } from 'react-icons/bs';
import { MdOutlineMessage } from 'react-icons/md';
import { TiMessages } from 'react-icons/ti';
import { GrAnnounce } from 'react-icons/gr';
import Marketing from '../Marketing';
import OwnVideoList from './OwnVideoList';

const ArtistSongsFeedbacks = ({ artist, setPagina }) => {
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(true);
  const [shuffle, setShuffle] = useState(false);

  const { data: songs, isFetching, error } = useGetArtistSongsQuery(artist.id);
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const [selectedValuation, setSelectedValuation] = useState();
  const [isAddinSong, setIsAddinSong] = useState(false);

  useEffect(() => {
    setIsAddinSong(false);
  }, [selectedValuation]);

  const [paginaDetalhes, setPaginaDetalhes] = useState(
    <>
      <div className="my-1 w-full  text-base text-black  bg-[#fff] rounded relative flex flex-col  gap-1 p-5 shadow justify-center items-center">
        <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
          Nenhuma música adicionada ou selecionada.
        </h1>
        <p>
          Selecione uma de suas avaliações na lista a esquerda, caso ainda não
          tenha avaliado nenhuma música, explore as várias coleções disponíveis
          e partilhe a sua opinião.{' '}
          <strong>
            Participe da comunidade, vamos criar conexões através da partilha,
            da paixão, do talento e do bom gosto musical.
          </strong>
        </p>
      </div>
    </>,
  );

  return (
    <div className="w-full h-full flex flex-col overflow-y-hidden max-h-full md:gap-1">
      <div className="w-full h-[15%] md:h-[10%] flex flex-row justify-between items-center mb-2 p-1 md:px-5 border-b-2">
        <div className=" flex flex-row justify-between items-center w-full  gap-1">
          <div className="flex flex-row gap-1 justify-center items-center">
            <button
              className="transform-effect border"
              onClick={() => setPagina(<DetailsArtist artist={artist} />)}
            >
              {' '}
              <BiArrowBack className="w-5 md:w-12 h-10" />
            </button>
            <h1 className="text-base md:text-2xl uppercase">Músicas</h1>
          </div>
          <div className="flex flex-row gap-1">
            <button
              onClick={() => {
                setPaginaDetalhes(<AddSong artist={artist} from="Storage" />);
                setIsAddinSong(true);
              }}
              className="text-sm md:text-base transform-effect p-1 flex flex-col md:flex-row md:gap-1 justify-center items-center"
            >
              <BiUpload className="w-5 md:w-7 h-auto font-bold" />
              <span className="">Add música</span>
            </button>

            <button
              onClick={() => {
                Swal.fire({
                  title: 'Em correção',
                  text: 'A funcionalidade foi desabilitada por mau funcionamento,  pelo que não é possível neste momento adicionar músicas ou cídeos do Youtube. Estamos a trabalhar o mais rápido para resolvermos essa situação. Fique atento!',
                  icon: 'info',
                });
              }}
              className="text-sm md:text-base transform-effect p-1 flex flex-col md:flex-row md:gap-1 justify-center items-center"
            >
              <BiVideo className="w-5 md:w-7 h-auto font-bold" />
              <span className="">Add Youtube</span>
            </button>
          </div>

          <div className="flex flex-row justify-center items-center gap-1">
            <span className="hidden md:flex"> {artist.name} </span>
            {artist.url_cover ? (
              <img
                src={artist?.url_cover}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <img src={smalLogo} alt="" className="w-10 h-10 rounded-full" />
            )}
          </div>
        </div>
      </div>
      <div
        className={`w-full flex flex-row ${
          isPlaying ? 'h-[100%] ' : 'h-[100%]'
        }`}
      >
        {/**Lista de músicas avaliadas pelo usuário */}

        <OwnSongsList
          setIsAddinSong={setIsAddinSong}
          artist={artist}
          setPaginaDetalhes={setPaginaDetalhes}
          valuatedSongs={songs}
          songs={songs}
          selectedValuation={selectedValuation}
          setSelectedValuation={setSelectedValuation}
        />

        <div className="w-full h-[80%] overflow-y-auto px-1">
          {isAddinSong && (
            <>
              {/** Ete botão é renderizado quando estiver a ser mostrada a página de adição de música, permite voltar para a página de detalhes ou página em branco. */}
                <button
                  className={`transform-effect border ${isAddinSong ? 'flex': 'hidden'} `}
                  onClick={() =>
                    selectedValuation
                      ? setPaginaDetalhes(
                          <ValuationReader
                            key={selectedValuation.id}
                            activeSong={selectedValuation}
                          />,
                        )
                      : setPaginaDetalhes(
                          <>
                            <div className="my-1 w-full  text-base text-black  bg-[#fff] rounded relative flex flex-col  gap-1 p-5 shadow justify-center items-center">
                              <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                                Nenhuma música adicionada ou selecionada.
                              </h1>
                              <p>
                                Selecione uma de suas avaliações na lista a
                                esquerda, caso ainda não tenha avaliado nenhuma
                                música, explore as várias coleções disponíveis e
                                partilhe a sua opinião.{' '}
                                <strong>
                                  Participe da comunidade, vamos criar conexões
                                  através da partilha, da paixão, do talento e
                                  do bom gosto musical.
                                </strong>
                              </p>
                            </div>
                          </>,
                        )
                  }
                >
                  {' '}
                  <BiArrowBack className="w-5 md:w-12 h-10" />
                </button>
              
              {paginaDetalhes}
            </>
          )}
          {/**Área de leitura de mensagens */}
          <div
            className={`w-full h-full flex flex-col overflow-hidden smooth-transition  `}
          >
            {selectedValuation && paginaDetalhes && !isAddinSong && (
              <ValuationReader
                key={selectedValuation.id}
                activeSong={selectedValuation}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistSongsFeedbacks;
