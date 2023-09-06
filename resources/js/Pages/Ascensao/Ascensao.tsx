import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';

import { generos, songs } from '../../../data/dummy';
import { BiMicrophone, BiTrophy } from 'react-icons/bi';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { MdClose, MdEvent } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa';
import { AiOutlinePicture } from 'react-icons/ai';

function Ascensao() {
  const [activeSong, setActiveSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentPage } = useStateContext();
  return (
    <AppLayout title="Ascensão">
      <div className="w-full h-full flex flex-col bg-gray-200 pb-16 m-2 rounded-sm">
        <div className="w-full flex mx-2 justify-between items-center flex-row shadow-lg">
          <h2 className="font-bold text-base md:text-xl uppercase">
            {' '}
            Asecensão
          </h2>
          <select
            id="select_style"
            onChange={() => {}}
            value=""
            className="bg-[#000] text-gray-50 font-bold p-1 text-sm rounded-lg outline-none sm:mt-0 mt-0 mr-10"
          >
            {generos.map(genero => (
              <option key={genero.value} id={genero.value} value={genero.value}>
                {genero.title}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full mx-auto sm:px-1 lg:px-1 dark:bg-gray-800 shadow-xl rounded-lg p-1">
          {currentPage}
        </div>
      </div>
    </AppLayout>
  );
}

export default Ascensao;
