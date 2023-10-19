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
} from 'react-icons/bi';
import {
  MdEmojiSymbols,
  MdExplore,
  MdLiveTv,
  MdVoiceChat,
} from 'react-icons/md';
import { GiJetpack, GiJumpAcross } from 'react-icons/gi';
import { BsNewspaper, BsTrophy } from 'react-icons/bs';
import RankingIcon from '../Components/RankingIcon';
import { Link } from '@inertiajs/react';
import MusicPlayer from '../Components/MusicPlayer';
import { useDispatch, useSelector } from 'react-redux';
import PlayPause from '../Components/PlayPause';
import { useGetValuateSongsQuery } from '@/redux/services/coreApi';
import Loader from '../Components/Loader';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import EnviarEstrelas from '../Components/EnviarEstrelas';
import InteracoesMusical from '../Components/InteracoesMusical';
import { FaDirections, FaPray } from 'react-icons/fa';
import UserAvatar from '@/Components/UserAvatar';
import { useStateContext } from '@/contexts/PaginaActualContext';
import Descobrir from '@/Pages/Musicas/Descobrir';
import Ranking from '@/Pages/Ranking';
import { GrUserExpert } from 'react-icons/gr';
import { HiUserGroup } from 'react-icons/hi';
import { RiUserStarFill } from 'react-icons/ri';
import Songs from '@/Pages/Musicas/Songs';
import Videos from '@/Pages/Musicas/Videos';
import { Posts } from '@/Pages/Home';
import ArtistsGalery from '@/Pages/ArtistsGalery';

interface Props {
  renderBottom?(): JSX.Element;
  bg?: String;
}

function Container({
  children,
  renderBottom,
  bg = loader,
}: PropsWithChildren<Props>) {
  const { activeSong, isPlaying } = useSelector(state => state.player);
  const { data, isFetching, error } = useGetValuateSongsQuery('/get-songs');
  const dispatch = useDispatch();

  const { background, setBackground } = useStateContext();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const i = 0;
  const handlePlayClick = () => {
    dispatch(setActiveSong({ activeSong, data, i }));
    dispatch(playPause(true));
  };
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
  const [activeBottomButton, setActiveBottomButton] = useState('musicas');
  const [sidebarList, setSidebarList] = useState(<></>);
  return (
    <div
      className="w-full h-[90%] backdrop-blur-lg  "
      style={{ background: `url({pageBG})` }}
    >
      <div className="relative backdrop-blur w-full h-[90vh] flex justify-center items-center">
        <div className="relative text-gray-900 w-full md:w-[75%] h-full top-0 left-0 shadow-xl flex flex-col   bg-[#4c88c4]">
          <div
            className={`relative  text-white w-full ${
              isPlaying ? 'h-[70%]' : 'h-[85%]'
            }  p-5 overflow-y-hidden top-0 left-0 shadow-xl flex flex-wrap shadow-black justify-center items-start`}
          >
            {children}
          </div>
          <div
            className={`w-full ${
              isPlaying ? 'h-[30%]' : 'h-[15%]'
            }   flex flex-col justify-center items-center  bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg `}
          >
            {isPlaying && (
              <div
                className="relative w-fullp-2 transition-5s "
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
                <button
                  onClick={() => {
                    setCurrentPage(<Songs />);
                    setActiveBottomButton('musicas');
                  }}
                  className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'musicas' ? 'bg-gray-100 text-black' : ''}
            `}
                >
                  <BiMusic className={`w-10 h-10`} />
                  <span
                    className={` ${
                      activeBottomButton === 'musicas' ? 'flex' : 'hidden'
                    }`}
                  >
                    Músicas
                  </span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(<Videos />);
                    setActiveBottomButton('videos');
                  }}
                  className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter: ${
                    activeBottomButton === 'videos' ? 'bg-gray-100 text-black' : ''
                  } `}
                >
                  <MdLiveTv className="w-10 h-10" />
                  <span
                    className={` ${
                      activeBottomButton === 'videos' ? 'flex' : 'hidden'
                    }`}
                  >
                    Vídeos
                  </span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(<ArtistsGalery nome_colecao='Artistas' />);
                    setActiveBottomButton('artistas');
                  }}
                  className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'artistas' ? 'bg-gray-100 text-black' : ''}
            `}
                >
                  <RiUserStarFill className="w-10 h-10" />
                  <span
                    className={` ${
                      activeBottomButton === 'artistas' ? 'flex' : 'hidden'
                    }`}
                  >
                    Artistas
                  </span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(<Ranking setSidebarList={setSidebarList} />);
                    setActiveBottomButton('concursos');
                  }}
                  className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'concursos' ? 'bg-gray-100 text-black' : ''}
            `}
                >
                  <BsTrophy className="w-10 h-10" />
                  <span
                    className={` ${
                      activeBottomButton === 'concursos' ? 'flex' : 'hidden'
                    }`}
                  >
                    Concursos
                  </span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(<Ranking setSidebarList={setSidebarList} />);
                    setActiveBottomButton('comunidade');
                  }}
                  className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'comunidade' ? 'bg-gray-100 text-black' : ''}
            `}
                >
                  <HiUserGroup className="w-10 h-10" />
                  <span
                    className={` ${
                      activeBottomButton === 'comunidade' ? 'flex' : 'hidden'
                    }`}
                  >
                    Comunidade
                  </span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(<Posts />);
                    setActiveBottomButton('noticias');
                  }}
                  className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 hover:text-black first-letter:
            ${activeBottomButton === 'noticias' ? 'bg-gray-100 text-black' : ''}
            `}
                >
                  <BsNewspaper className="w-10 h-10" />
                  <span
                    className={` ${
                      activeBottomButton === 'noticias' ? 'flex' : 'hidden'
                    }`}
                  >
                    Notícias
                  </span>
                </button>
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
