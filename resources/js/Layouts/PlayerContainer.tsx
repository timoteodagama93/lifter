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
import { motion } from 'framer-motion';
import LifterPlayer from '@/Components/LifterPlayer';

/*
interface Props {
  renderBottom?(): JSX.Element;
  bg?: String;
}*/

function PlayerContainer({
  children=<></>,
  bg = loader,
  songs,
}) //: PropsWithChildren<Props>
{
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
    <motion.div
      className="w-full h-full min-h-full min-w-full backdrop-blur-lg mb-96 "
      //style={{ background: `url({pageBG})` }}
    >
      <div
        className={`relative backdrop-blur w-full  h-full min-h-full
          flex justify-center items-center`}
      >
        <div
          className={`relative text-gray-900 w-full
          lg:w-[95%]
          h-full top-0 left-0 shadow-xl flex flex-col   bg-[#245575] `}
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
               md:flex flex-col justify-center items-center  bg-gradient-to-br from-[#0094f8] to-[#245575]  backdrop-blur-lg `}
          >
            {!isFullScreenPlayer && isPlaying && (
              <div
                className="relative w-full p-2 transition-5s "
                style={{ transition: '5s' }}
              ></div>
            )}

            <div className="w-full h-full flex flex-row justify-center items-center mb-1 text-white text-xl ">
              <LifterPlayer songs={songs} />
            </div>n
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PlayerContainer;
