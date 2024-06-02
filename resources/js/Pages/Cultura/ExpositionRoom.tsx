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
  useGetExpositionItemsQuery,
  useGetExpositionsQuery,
} from '@/redux/services/coreApi';
import { Loader } from '@/Components';
import useTypedPage from '@/Hooks/useTypedPage';
import AddExpositionItem from '@/Components/AddExpositionItem';
import Interagir from '@/Components/Interagir';
import Exposicoes from './Exposicoes';
import CardObra from '@/Components/CardObra';

export default function ExpositionRoom({ room }) {
  const { setCurrentPage } = useStateContext();
  const page = useTypedPage();

  const [addExposicao, setAddExposicao] = useState(false);

  const {
    data: obras,
    isFetching,
    error,
  } = useGetExpositionItemsQuery(room.id);
  if (isFetching) return <Loader title="Carregando artes da sala" />;
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
            <span>Adicionar obra de arte à sala de exposição</span>
          </h1>
          <AddExpositionItem room={room} />
        </div>
      </Modal>
      <div className="w-full h-full relative flex flex-row rounded">
        <div className="w-full h-full flex flex-col px-4 rounded-lg">
          <div className="w-full h-full flex justify-between items-center p-1 md:px-5 border-b">
            <button
              onClick={() => setCurrentPage(<Exposicoes />)}
              className="transform-effect p-1 justify-center items-center flex flex-col"
            >
              {' '}
              <BiArrowBack className="w-10 h-auto font-bold" />{' '}
            </button>
            <h1 className="text-center font-bold text-4xl">
              Sala de exposição
            </h1>

            <div className="flex flex-row justify-center items-center gap-5">
              {page.props.auth.user?.id == room.user_id && (
                <button
                  onClick={() => setAddExposicao(true)}
                  className="transform-effect p-1 justify-center items-center w-full flex flex-col"
                >
                  <BiUpload className="w-10 h-auto font-bold" />{' '}
                  <span className="flex">Adicionar obra</span>
                </button>
              )}
              <div
                className="fb-like"
                data-share="true"
                data-width="450"
                data-show-faces="true"
              ></div>
            </div>
          </div>

          <div className="w-full flex flex-wrap p-5 relative h-full justifiy-center items-center ">
            {obras?.map(obra => (
              <CardObra obra={obra} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
