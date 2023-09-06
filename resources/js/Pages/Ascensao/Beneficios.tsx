import React from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import { BiMicrophone, BiTrophy } from 'react-icons/bi';
import { FaGraduationCap } from 'react-icons/fa';
import { MdEvent } from 'react-icons/md';

function Beneficios() {
  return (
    <div className="w-full flex flex-row">
      <div className="w-1/3 flex flex-col border-r border-[#2e2c2e] mr-2 pr-1 ">
        <button className="w-full flex flex-row justify-star items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <BiTrophy /> <span>Premios</span>
        </button>
        <button className="w-full flex flex-row justify-start items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <MdEvent /> <span>Shows</span>
        </button>
        <button className="w-full flex flex-row justify-start items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <FaGraduationCap /> <span>Palestras</span>
        </button>
        <button className="w-full flex flex-row justify-start items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <AiOutlinePicture /> <span>Sessões</span>
        </button>

        <button className="w-full flex flex-row justify-start items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <BiMicrophone /> <span>Marketing</span>
        </button>
      </div>
      <div className="w-2/3">Descrição</div>
    </div>
  );
}

export default Beneficios;
