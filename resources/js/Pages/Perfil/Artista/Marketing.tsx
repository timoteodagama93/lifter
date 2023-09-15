import React, { useState, useEffect } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import { BiTrophy, BiMicrophone } from 'react-icons/bi';
import { FaGraduationCap } from 'react-icons/fa';
import { MdEvent } from 'react-icons/md';

function Marketing({ artist }) {
  const [pagina, setPagina] = useState(<>
  <h1 className="text-xl">Brevemente vais poder criar as tua campanhas de Marketing, colecionar o teu material publicitário e deixá-lo disponível em seu Kit de imprensa.</h1>
  <p className='text-base'>Fique atento as novidades...</p>
  </>);
  return (
    <div className="w-full flex flex-row">
      <div className="w-1/3 flex flex-col border-r border-[#2e2c2e] mr-2 pr-1 ">
        <button className="w-full flex flex-row justify-star items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <BiTrophy /> <span>Concursos</span>
        </button>
        <button className="w-full flex flex-row justify-start items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <MdEvent /> <span>Kit de imprensa</span>
        </button>
        <button className="w-full flex flex-row justify-start items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white ">
          <FaGraduationCap /> <span>Campanhas</span>
        </button>
      </div>
      <div className="w-2/3">{pagina}</div>
    </div>
  );
}

export default Marketing;
