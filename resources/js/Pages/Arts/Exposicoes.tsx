import { useStateContext } from '@/contexts/PaginaActualContext';
import React, { useState } from 'react';
import { BiArrowBack, BiBookOpen, BiBrush, BiUpload } from 'react-icons/bi';
import { BsCameraVideo } from 'react-icons/bs';
import { GiCrimeSceneTape } from 'react-icons/gi';
import {
  MdOutlineCloseFullscreen,
  MdOutlineMotionPhotosOn,
} from 'react-icons/md';
import Dance from './Dance';
import ArtesMistas from './ArtesMistas';
import Modal from '@/Components/Modal';
import AddVideo from '../Videos/AddVideo';
import Arts from './Arts';
import AddExposicao from '@/Components/AddExposicao';
import { useGetExpositionsQuery } from '@/redux/services/coreApi';
import { Loader } from '@/Components';
import ExpositionRoom from './ExpositionRoom';

export default function Exposicoes({}) {
  const { setCurrentPage } = useStateContext();
  const [addExposicao, setAddExposicao] = useState(false);

  const { data: rooms, isFetching, error } = useGetExpositionsQuery('');
  if (isFetching) return <Loader title="Carregando salas de exposições" />;
  return (
    <>
      <Modal isOpen={addExposicao} onClose={() => setAddExposicao(false)}>
        <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
          <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4] flex justify-between  ">
            <button
              onClick={() => setAddExposicao(false)}
              className="transform-effect p-1 justify-center items-center flex flex-col"
            >
              {' '}
              <MdOutlineCloseFullscreen className="w-10 h-auto font-bold" />{' '}
            </button>
            <span>Criar sala de exposição</span>
          </h1>
          <AddExposicao />
        </div>
      </Modal>
      <div className="w-full h-full relative flex flex-row rounded">
        <div className="w-full h-full flex flex-col px-4 rounded-lg">
          <div className="w-full h-full flex justify-between items-center p-1 md:px-5 border-b">
            <button
              onClick={() => setCurrentPage(<Arts />)}
              className="transform-effect p-1 justify-center items-center flex flex-col"
            >
              {' '}
              <BiArrowBack className="w-10 h-auto font-bold" />{' '}
            </button>
            <h1 className="text-center font-bold text-4xl">Exposições</h1>

            <div className="flex flex-row justify-center items-center gap-5">
              <button
                onClick={() => setAddExposicao(true)}
                className="transform-effect p-1 justify-center items-center w-full flex flex-col"
              >
                {' '}
                <BiUpload className="w-10 h-auto font-bold" />{' '}
                <span className="flex">Criar exposição</span>
              </button>
              <div
                className="fb-like"
                data-share="true"
                data-width="450"
                data-show-faces="true"
              ></div>
            </div>
          </div>

          <div className="w-full flex flex-wrap p-5 relative h-full p-5 justifiy-center items-center ">
            {rooms?.map(room => (
              <div className="w-full md:w-1/2 h-1/4 md:h-1/2 lg:h-1/3 p-2">
                <div
                  onClick={() => setCurrentPage(<ExpositionRoom room={room} />)}
                  className="w-full h-full  flex flex-col relative justify-center item-center   shadow-black shadow-inner p-5"
                >
                  <div className="w-full h-full  flex flex-col relative justify-center item-center p-1 border  hover:cursor-pointer ">
                    <div className="w-full h-full flex justify-center items-center rigth-0">
                      <img
                        className="w-full h-full relative right-0"
                        //src={room.cover}
                        src={`/arts/${room?.id}/${room?.cover}`}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-0">
                      <span className="border-t-2 relative text-2xl text-yellow-400 font-bold">
                        {room?.title}
                      </span>
                      <span className=" relative text-base  font-bold">
                        Exposição de {room?.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
