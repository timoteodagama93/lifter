import React, { PropsWithChildren, useEffect, useState } from 'react';
import loader from '../assets/loader.svg';
import logo from '../../img/logo.svg';
import {
  BiDownload,
  BiHome,
  BiLike,
  BiMap,
  BiMusic,
  BiNews,
  BiVideo,
} from 'react-icons/bi';
import {
  MdEmojiSymbols,
  MdExplore,
  MdLiveTv,
  MdVoiceChat,
} from 'react-icons/md';
import { GiJetpack, GiJumpAcross, GiSoundWaves } from 'react-icons/gi';
import { BsNewspaper, BsStars, BsTrophy } from 'react-icons/bs';
import RankingIcon from '../Components/RankingIcon';
import { Link, router } from '@inertiajs/react';
import MusicPlayer from '../Components/MusicPlayer';
import { useDispatch, useSelector } from 'react-redux';
import PlayPause from '../Components/PlayPause';
import { useGetSongsQuery, useGetVideosQuery } from '@/redux/services/coreApi';
import Loader from '../Components/Loader';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import EnviarEstrelas from '../Components/EnviarEstrelas';
import Interagir from '../Components/Interagir';
import { FaDirections, FaPray } from 'react-icons/fa';
import UserAvatar from '@/Components/UserAvatar';
import { useStateContext } from '@/contexts/PaginaActualContext';
import Descobrir from '@/Pages/Musicas/Descobrir';
import Ranking from '@/Pages/Ranking';
import { GrUserExpert } from 'react-icons/gr';
import { HiUserGroup } from 'react-icons/hi';
import { RiUserStarFill } from 'react-icons/ri';
import Songs from '@/Pages/Musicas/Songs';
import Videos from '@/Pages/Videos/Videos';
import { Posts } from '@/Pages/Home';
import ArtistsGalery from '@/Pages/VozActiva';
import ContestCard from '@/Pages/Concursos/ContestCard';
import useTypedPage from '@/Hooks/useTypedPage';
import route from 'ziggy-js';
import CommunityDiscussion from '@/Pages/CommunityDiscussion';
import GallerySwiperSlide from '@/Pages/LiveTV/LiverTV';
import EffectsCards from '@/Pages/Musicas/EffectsCards';
import VideoPlayer from '@/Components/VideoPlayer';
import NavLink from '@/Components/NavLink';

interface Props {
  renderBottom?(): JSX.Element;
  bg?: String;
}

function Container({
  children,
  renderBottom,
  bg = loader,
}: PropsWithChildren<Props>) {
  const { activeSong, isPlaying, isPlayingVideo, isFullScreenPlayer } =
    useSelector(state => state.player);
  const { data, isFetching, error } = useGetVideosQuery('/get-videos');
  const dispatch = useDispatch();

  const { background, setBackground } = useStateContext();

  useEffect(function () {
    background != undefined ? setBackground(background) : setBackground(loader);
  }, []);

  const [pageBG, setPageBG] = useState(bg);
  useEffect(() => {
    setPageBG(background);
  }, [background]);

  const { currentPage, setCurrentPage } = useStateContext();

  function setDefaultPage() {
    setCurrentPage(<Songs />);
  }

  useEffect(setDefaultPage, []);

  /**Para marcar o botão  de baixo actualmente activo */
  const [activeBottomButton, setActiveBottomButton] = useState('');
  const page = useTypedPage();
  return (
    <div
      className="w-full h-[90%] backdrop-blur-lg"
      style={{ background: `url({pageBG})` }}
    >
      <div
        className={`relative backdrop-blur w-full  h-[90vh]
          flex justify-center items-center`}
      >
        <div
          className={`relative text-gray-900 w-full
          md:w-[75%]
          h-full top-0 left-0 shadow-xl flex flex-col   bg-cyan-400`}
        >
          <div
            className={`relative  text-white w-full ${
              isPlaying ? 'h-[85] md:h-[70%]' : 'h-[85%]'
            }  md:px-5 overflow-y-auto top-0 left-0 shadow-xl flex flex-wrap shadow-black justify-center items-start`}
          >
            <>{children}</>
          </div>
          <div
            className={`w-full 
            ${isPlaying ? 'h-[15%] md:h-[30%]' : 'h-[15%]'}
               flex flex-col justify-center items-center  bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg `}
          >
            {!isFullScreenPlayer && isPlaying && (
              <div
                className="relative w-full p-2 transition-5s "
                style={{ transition: '5s' }}
              >
                <MusicPlayer />

                {/*}
                <div className="w-full flex flex-row gap-1 px-5 justify-center items-center mt-2 border-t">
                  <InteracoesMusical song={activeSong} orientation="flex-row" />
                </div>
                  {*/}
              </div>
            )}

            <div className="w-full h-full flex flex-row justify-center items-center mb-1 text-white ">
              <>
                <Link
                  href="/avaliacoes"
                  className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
            ${
              route().current('avaliacoes')
                ? 'transform-effect text-cyan-400 font-bold '
                : ''
            }
            `}
                >
                  <BsStars className="w-10 h-10" />
                  <span
                    className={` ${
                      route().current('avaliacoes')
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Avaliações
                  </span>
                </Link>
                <Link
                  href="/musicas"
                  className={`flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
            ${
              route().current('musicas')
                ? 'transform-effect text-cyan-400 font-bold'
                : ''
            }
            `}
                >
                  <BiMusic className={`w-10 h-10`} />
                  <span
                    className={` ${
                      route().current('musicas')
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Músicas
                  </span>
                </Link>
                <Link
                  href="/video"
                  className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter: ${
                    route().current('video')
                      ? 'transform-effect text-cyan-400 font-bold'
                      : ''
                  } `}
                >
                  <BiVideo className="w-10 h-10" />
                  <span
                    className={` ${
                      route().current('video')
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Vídeos
                  </span>
                </Link>
                <Link
                  href="/vozactiva"
                  className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
            ${
              route().current('vozactiva')
                ? 'transform-effect text-cyan-400 font-bold '
                : ''
            }
            `}
                >
                  <GiSoundWaves className="w-10 h-10" />
                  <span
                    className={` ${
                      route().current('vozactiva')
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Voz Activa
                  </span>
                </Link>
                <Link
                  href="/concursos"
                  className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
            ${
              route().current()?.includes('concursos')
                ? 'transform-effect text-cyan-400 font-bold '
                : ''
            }
            `}
                >
                  <BsTrophy className="w-10 h-10" />
                  <span
                    className={` ${
                      route().current('concursos')
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Festivais
                  </span>
                </Link>

                <Link
                  href="/noticias"
                  className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
            ${
              route().current('noticias')
                ? 'transform-effect text-cyan-400 font-bold'
                : ''
            }
            `}
                >
                  <BsNewspaper className="w-10 h-10" />
                  <span
                    className={` ${
                      route().current('noticias')
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Notícias
                  </span>
                </Link>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container;

function AppLinks({}) {
  return (
    <div className="w-full flex flex-row gap-1 justify-between items-center">
      {' '}
      <Link
        href="/"
        className="w-full h-full flex  flex-col justify-center items-center hover:bg-gray-300"
      >
        <BiHome />
        Home
      </Link>
      <Link
        href="/musicas"
        className="w-full h-full flex flex-col justify-center items-center hover:bg-gray-300"
      >
        <BiMusic />
        Músicas
      </Link>
      <div className="w-full h full justify-center items-center flex">
        {/** USER AVATAR */}
        <UserAvatar />
      </div>
      <Link
        href="/concursos"
        className="w-full h-full flex flex-col justify-center items-center hover:bg-gray-300"
      >
        <BsTrophy />
        Concursos
      </Link>
      <Link
        href="/gospel"
        className="w-full h-full flex flex-col justify-center items-center hover:bg-gray-300"
      >
        <FaPray />
        Gospel
      </Link>
    </div>
  );
}
