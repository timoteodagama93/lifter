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
import { Descobrir, Ranking } from './Index0';
import RankingIcon from '@/Components/RankingIcon';
import {
  MdEmojiSymbols,
  MdExplore,
  MdGroups,
  MdOutlineMotionPhotosOn,
} from 'react-icons/md';
import { BsNewspaper } from 'react-icons/bs';
import { GrUserExpert } from 'react-icons/gr';
import { HiUserGroup } from 'react-icons/hi';
import { FaDirections, FaPray } from 'react-icons/fa';
import { BiBible, BiDownload } from 'react-icons/bi';
import Songs from './Songs';
import { GiLoveSong, GiSing, GiTeacher } from 'react-icons/gi';

export default function Index() {
  const page = route().current();
  const { currentPage, setCurrentPage } = useStateContext();

  useEffect(() => {
    setCurrentPage(StartGospel), [];
  });
  return (
    <AppLayout title="Gospel">
      <div className="w-full ">{currentPage}</div>
    </AppLayout>
  );
}

function StartGospel() {
  return (
    <>
      <div className="w-full flex flex-wrap relative h-full p-1 justifiy-center items-center">
        <div className="w-full md:w-1/2 lg:w-1/3 h-full  md:h-1/2 lg:h-1/3 p-2">
          <div className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect">
            <GiSing className="w-full h-full relative" />
            <span className="relative  left-0 bottom-0">Adoração</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 h-full  md:h-1/2 lg:h-1/3 p-2">
          <div className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect">
            <BiBible className="w-full h-full relative" />
            <span className="relative  left-0 bottom-0">Estudo bíblico</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 h-full  md:h-1/2 lg:h-1/3 p-2">
          <div className="w-full h-full  flex flex-col relative justify-center item-center border p-1 transform-effect">
            <FaPray className="w-full h-full relative" />
            <span className="relative  left-0 bottom-0">Grupo de oração</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 h-full  md:h-1/2 lg:h-1/3 p-2">
          <div className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect">
            <MdGroups className="w-full h-full relative" />
            <span className="relative  left-0 bottom-0">Corais</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 h-full  md:h-1/2 lg:h-1/3 p-2">
          <div className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect">
            <MdOutlineMotionPhotosOn className="w-full h-full relative" />
            <span className="relative  left-0 bottom-0">Coreografias</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 h-full  md:h-1/2 lg:h-1/3 p-2">
          <div className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect">
            <GiTeacher className="w-full h-full relative" />
            <span className="relative  left-0 bottom-0">Pregações</span>
          </div>
        </div>
      </div>
    </>
  );
}
