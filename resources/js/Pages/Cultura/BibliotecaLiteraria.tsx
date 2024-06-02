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
import Coltura from './Cultura';
import AddExposicao from '@/Components/AddExposicao';
import {
  useGetEstantesQuery,
  useGetExpositionsQuery,
} from '@/redux/services/coreApi';
import { Loader } from '@/Components';
import ExpositionRoom from './ExpositionRoom';
import AddEstante from '@/Components/AddEstante';
import Estante from './Estante';

export default function BibliotecaLiteraria({}) {
  const { setCurrentPage } = useStateContext();
  const [addExposicao, setAddExposicao] = useState(false);

  const { data: estantes, isFetching, error } = useGetEstantesQuery('');
  if (isFetching) return <Loader title="Carregando estantes de livros" />;
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
            <span>Criar estante de livros</span>
          </h1>
          <AddEstante />
        </div>
      </Modal>
      <div className="w-full h-full relative flex flex-row rounded">
        <div className="w-full h-full flex flex-col px-4 rounded-lg">
          <div className="w-full h-full flex justify-between items-center p-1 md:px-5 border-b">
            <button
              onClick={() => setCurrentPage(<Coltura />)}
              className="transform-effect p-1 justify-center items-center flex flex-col"
            >
              {' '}
              <BiArrowBack className="w-10 h-auto font-bold" />{' '}
            </button>
            <h1 className="text-center font-bold text-4xl">Livraria</h1>

            <div className="flex flex-row justify-center items-center gap-5">
              <button
                onClick={() => setAddExposicao(true)}
                className="transform-effect p-1 justify-center items-center w-full flex flex-col"
              >
                {' '}
                <BiUpload className="w-10 h-auto font-bold" />{' '}
                <span className="flex">Criar estante</span>
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
            {estantes?.map(estante => (
              <div className="w-full md:w-1/2 h-1/4 md:h-1/2 lg:h-1/3 p-2">
                <div
                  onClick={() =>
                    setCurrentPage(<Estante estante={estante} />)
                  }
                  className="w-full h-full  flex flex-col relative justify-center item-center   shadow-black shadow-inner p-5"
                >
                  <div className="w-full h-full  flex flex-col relative justify-center item-center p-1 border  hover:cursor-pointer ">
                    <div className="w-full h-full flex justify-center items-center rigth-0">
                      <img
                        className="w-full h-full relative right-0"
                        src={estante.cover}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-0">
                      <span className="border-t-2 relative text-2xl text-yellow-400 font-bold">
                        {estante?.title}
                      </span>
                      <span className=" relative text-base  font-bold">
                        Estante de {estante?.category}
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
