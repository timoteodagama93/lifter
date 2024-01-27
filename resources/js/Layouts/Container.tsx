import React, { PropsWithChildren, useEffect, useState } from 'react';
import loader from '../assets/loader.svg';
import { BiHome, BiMusic, BiVideo } from 'react-icons/bi';
import { GiJerusalemCross, GiPrayer, GiSoundWaves } from 'react-icons/gi';
import { BsNewspaper, BsStars, BsTrophy } from 'react-icons/bs';
import { Link } from '@inertiajs/react';
import MusicPlayer from '../Components/MusicPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { useGetVideosQuery } from '@/redux/services/coreApi';
import { FaArtstation, FaCross, FaPray } from 'react-icons/fa';
import UserAvatar from '@/Components/UserAvatar';
import { useStateContext } from '@/contexts/PaginaActualContext';
import Songs from '@/Pages/Musicas/Songs';
import useTypedPage from '@/Hooks/useTypedPage';
import route from 'ziggy-js';
import RestCountries from '@/Components/RestCountries';

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
  const dispatch = useDispatch();

  const [pageBG, setPageBG] = useState(bg);

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
      className="w-full h-full min-h-full min-w-full backdrop-blur-lg mb-16 "
      style={{ background: `url({pageBG})` }}
    >
      <div
        className={`relative backdrop-blur w-full  h-full min-h-full
          flex justify-center items-center`}
      >
        <div
          className={`relative text-gray-900 w-full
          lg:w-[75%]
          h-full top-0 left-0 shadow-xl flex flex-col   bg-cyan-400 `}
        >
          <div
            className={`relative  text-white w-full ${
              isPlaying ? 'h-[85%] lg:h-[70%]' : 'h-full md:h-[85%]'
            }  md:px-5 overflow-y-auto top-0 left-0 shadow-xl flex flex-wrap shadow-black justify-center items-start`}
          >
            <>{children}</>
          </div>
          <div
            className={`w-full 
            ${isPlaying ? 'h-[15%] md:h-[30%] flex' : 'h-0 md:h-[15%] hidden '}
               md:flex flex-col justify-center items-center  bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg `}
          >
            {!isFullScreenPlayer && isPlaying && (
              <div
                className="relative w-full p-2 transition-5s "
                style={{ transition: '5s' }}
              >
                <MusicPlayer />

                {/*}  php artisan serve --host=192.168.250.61
                <div className="w-full flex flex-row gap-1 px-5 justify-center items-center mt-2 border-t">
                  <InteracoesMusical song={activeSong} orientation="flex-row" />
                </div>
                  {*/}
              </div>
            )}

            <div className="w-full h-full hidden md:flex flex-row justify-center items-center mb-1 text-white text-xl ">
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
                  <BsStars className="w-14 lg:w-10 h-14 lg:h-10" />
                  <span
                    className={` ${
                      route().current('avaliacoes')
                        ? 'flex text-white font-bold uppercase'
                        : 'jhidden'
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
                        : 'lhidden'
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
                        : 'nhidden'
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
                        : 'nhidden'
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
                        : 'nhidden'
                    }`}
                  >
                    Concursos
                  </span>
                </Link>

                <Link
                  href="/arts"
                  className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
            ${
              route().current('arts')
                ? 'transform-effect text-cyan-400 font-bold'
                : ''
            }
            `}
                >
                  <FaArtstation className="w-10 h-10" />
                  <span
                    className={` ${
                      route().current('arts')
                        ? 'flex text-white font-bold uppercase'
                        : 'nhidden'
                    }`}
                  >
                    +Artes
                  </span>
                </Link>

                <Link
                  href="/gospel"
                  className={` hidden flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
            ${
              route().current('gospel')
                ? 'transform-effect text-cyan-400 font-bold'
                : ''
            }
            `}
                >
                  <FaCross className="w-10 h-10" />
                  <span
                    className={` ${
                      route().current('gospel')
                        ? 'flex text-white font-bold uppercase'
                        : 'nhidden'
                    }`}
                  >
                    Gospel
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
