import { useStateContext } from '@/contexts/PaginaActualContext';
import React from 'react';
import { BiBookOpen, BiBrush } from 'react-icons/bi';
import { BsCameraVideo } from 'react-icons/bs';
import { GiCrimeSceneTape } from 'react-icons/gi';
import { MdOutlineMotionPhotosOn } from 'react-icons/md';
import Dance from './Dance';
import ArtesMistas from './ArtesMistas';
import Exposicoes from './Exposicoes';
import Visuais from './Visuais';
import BibliotecaLiteraria from './BibliotecaLiteraria';

export default function Arts({}) {
  const { setCurrentPage } = useStateContext();
  return (
    <>
      <div className="w-full flex flex-wrap relative h-full p-5 justifiy-center items-center ">
        <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
          <div
            onClick={() => setCurrentPage(<BibliotecaLiteraria />)}
            className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer  "
          >
            <div className="flex justify-center items-center w-full rigth-0">
              <BiBookOpen className="w-1/2 h-full relative right-0" />
            </div>
            <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
              Literatura
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
          <div
            onClick={() => setCurrentPage(<Dance />)}
            className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer"
          >
            <div className="flex justify-center items-center w-full rigth-0">
              <MdOutlineMotionPhotosOn className="w-1/2 h-full relative right-0" />
            </div>
            <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
              Dança
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
          <div
            onClick={() => setCurrentPage(<ArtesMistas />)}
            className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer "
          >
            <div className="flex justify-center items-center w-full rigth-0">
              <GiCrimeSceneTape className="w-1/2 h-full relative right-0" />
            </div>
            <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
              Artes mistas
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-1/4  md:h-1/2 lg:h-1/3 p-2">
          <div
            onClick={() => setCurrentPage(<Exposicoes />)}
            className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect hover:cursor-pointer hover:text-cyan-400 hover:bg-gradient-to-br from-black/10 to-[#000000]"
          >
            <div className="flex justify-center items-center w-full rigth-0">
              <BiBrush className="w-1/2 h-full relative right-0" />
            </div>
            <span className="border-t-2 relative  left-0 bottom-0 text-2xl text-yellow-400 font-bold">
              Exposições
            </span>
          </div>
        </div>
        <div className="hidden w-full md:w-1/2 lg:w-1/3 h-full  md:h-1/2 lg:h-1/3 p-2">
          <div className="w-full h-full  flex flex-col relative justify-center item-center border p-1  transform-effect">
            <BsCameraVideo className="w-full h-full relative" />
            <span className="relative  left-0 bottom-0">
              Representação: Cinema
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
