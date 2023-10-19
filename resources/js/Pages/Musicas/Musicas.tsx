import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import route from 'ziggy-js';

// import Swiper core and required modules

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

import { useStateContext } from '@/contexts/PaginaActualContext';
import { Descobrir, Ranking } from '.';
import RankingIcon from '@/Components/RankingIcon';
import { MdEmojiSymbols, MdExplore } from 'react-icons/md';
import { BsNewspaper } from 'react-icons/bs';
import { GrUserExpert } from 'react-icons/gr';
import { HiUserGroup } from 'react-icons/hi';
import { FaDirections } from 'react-icons/fa';
import { BiDownload } from 'react-icons/bi';
import Songs from './Songs';

export default function Musicas() {
  const page = route().current();
  const { currentPage, setCurrentPage } = useStateContext();



  /**Para marcar o botão  de baixo actualmente activo */
  const [activeBottomButton, setActiveBottomButton] = useState('Ranking');
  const [sidebarList, setSidebarList] = useState(<></>);
  return (
    <AppLayout
      title="Músicas"
      renderSidebarList={() => sidebarList}
      renderBottom={() => (
        <>
          <button
            onClick={() => {
              setCurrentPage(<Songs />);
              setActiveBottomButton('Ranking');
            }}
            className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'Ranking' ? 'bg-gray-300' : ''}
            `}
          >
            <RankingIcon className="w-10 h-10" />
            Ranking
          </button>
          <button
            onClick={() => {
              setCurrentPage(<Descobrir />);
              setActiveBottomButton('Descobrir');
            }}
            className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'Descobrir' ? 'bg-gray-300' : ''}
            `}
          >
            <MdExplore className="w-10 h-10" />
            Descobrir
          </button>
          <button
            onClick={() => {
              setCurrentPage(<Ranking setSidebarList={setSidebarList} />);
              setActiveBottomButton('Downloads');
            }}
            className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'Downloads' ? 'bg-gray-300' : ''}
            `}
          >
            <BiDownload className="w-10 h-10" />
            Downloads
          </button>
          <button
            onClick={() => {
              setCurrentPage(<Ranking setSidebarList={setSidebarList} />);
              setActiveBottomButton('Recomendacoes');
            }}
            className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'Recomendacoes' ? 'bg-gray-300' : ''}
            `}
          >
            <FaDirections className="w-10 h-10" />
            Recomendações
          </button>
          <button
            onClick={() => {
              setCurrentPage(<Ranking setSidebarList={setSidebarList} />);
              setActiveBottomButton('Emocoes');
            }}
            className={`flex flex-col w-full h-full justify-center items-center text-xs hover:bg-gray-300 first-letter:
            ${activeBottomButton === 'Emocoes' ? 'bg-gray-300' : ''}
            `}
          >
            <MdEmojiSymbols className="w-10 h-10" />
            Emoções
          </button>
        </>
      )}
    >
      <div className="w-full ">{currentPage}</div>
    </AppLayout>
  );
}
