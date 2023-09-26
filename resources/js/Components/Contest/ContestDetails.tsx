import React, { useState } from 'react';
import { AiFillSchedule, AiOutlinePicture } from 'react-icons/ai';
import { BiCoinStack, BiMicrophone, BiNote, BiTrophy } from 'react-icons/bi';
import { FaGraduationCap, FaHandshake, FaHandshakeSlash } from 'react-icons/fa';
import { MdEvent } from 'react-icons/md';
import { Concursos } from '../Home';
import { BsArrowDownRight, BsInfo } from 'react-icons/bs';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { GrSchedule } from 'react-icons/gr';

function ContestDetails({ concurso }) {
  const [showItem, setShowItem] = useState(<Info contest={concurso} />);
  return (
    <div className="w-full flex flex-row-reverse">
      <div className="w-full md:w-1/3 flex flex-row md:flex-col border-b border md:border-l border-[#c2bec2] mr-1 pr-1 ">
        <button className="w-full flex flex-row justify-star items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <BsInfo /> <span className="hidden md:flex">Detalhes</span>
        </button>
        <button className="w-full flex flex-row justify-star items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <AiFillSchedule className="text-white" />{' '}
          <span className="hidden md:flex">Cronograma</span>
        </button>
        <button className="w-full flex flex-row justify-star items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <BiTrophy /> <span className="hidden md:flex">Inscrições</span>
        </button>
        <button className="w-full flex flex-row justify-star items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <FaHandshake />{' '}
          <span className="hidden md:flex">Condições e termos</span>
        </button>
        <button className="w-full flex flex-row justify-start items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <BiCoinStack /> <span className="hidden md:flex">Prémios</span>
        </button>
        <button className="w-full flex flex-row justify-start items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <BiNote /> <span className="hidden md:flex">Outros benefícios</span>
        </button>
      </div>
      <div className="w-full min-w-max relative">
        {showItem}
      </div>
    </div>
  );
}

export default ContestDetails;

function Info({ contest }) {
  return <ContestDetails concurso={contest} />;
}
