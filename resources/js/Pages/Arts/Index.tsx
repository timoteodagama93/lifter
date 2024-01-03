import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import route from 'ziggy-js';

import { useStateContext } from '@/contexts/PaginaActualContext';
import RankingIcon from '@/Components/RankingIcon';
import {
  MdEmojiSymbols,
  MdExplore,
  MdGroups,
  MdOutlineMotionPhotosOn,
} from 'react-icons/md';
import { BsCameraVideo, BsNewspaper } from 'react-icons/bs';
import { GrUserExpert } from 'react-icons/gr';
import { HiUserGroup } from 'react-icons/hi';
import { FaDirections, FaPray } from 'react-icons/fa';
import { BiBible, BiBook, BiBookmarks, BiDownload, BiLibrary, BiPaint } from 'react-icons/bi';
import { GiCrimeSceneTape, GiLoveSong, GiSing, GiTeacher } from 'react-icons/gi';

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
            <BiBook className="w-full h-full relative" />
            <span className="relative  left-0 bottom-0">Literatura</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 h-full  md:h-1/2 lg:h-1/3 p-2">
          <div className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect">
            <MdOutlineMotionPhotosOn className="w-full h-full relative" />
            <span className="relative  left-0 bottom-0">Dança</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 h-full  md:h-1/2 lg:h-1/3 p-2">
          <div className="w-full h-full  flex flex-col relative justify-center item-center border p-1 transform-effect">
            <GiCrimeSceneTape className="w-full h-full relative" />
            <span className="relative  left-0 bottom-0">Teatro</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 h-full  md:h-1/2 lg:h-1/3 p-2">
          <div className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect">
            <BsCameraVideo className="w-full h-full relative" />
            <span className="relative  left-0 bottom-0">Cinema</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 h-full  md:h-1/2 lg:h-1/3 p-2">
          <div className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect">
            <BiPaint className="w-full h-full relative" />
            <span className="relative  left-0 bottom-0">Pintura</span>
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
