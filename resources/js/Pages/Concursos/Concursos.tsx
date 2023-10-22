import ContestCard from '@/Components/ContestCard';
import SectionBorder from '@/Components/SectionBorder';
import AppLayout from '@/Layouts/AppLayout';
import { useStateContext } from '@/contexts/PaginaActualContext';
import React, { useEffect } from 'react';
import { BsList } from 'react-icons/bs';
import { MdCreate } from 'react-icons/md';
import { generos } from '../../../data/dummy';
import NewContest from '@/Components/Contest/Index';
import useTypedPage from '@/Hooks/useTypedPage';

interface Props {
  contests: Array<Object>;
}
function Concursos({ contests }: Props) {
  const { currentPage, setCurrentPage } = useStateContext();
  function setDefaultPage() {
    setCurrentPage(<ListContests concursos={contests} />);
  }

  useEffect(setDefaultPage, []);
  const page = useTypedPage();
  return (
    <AppLayout title="Ascensão" renderHeader={() => <></>}>
      <div className="w-full h-full flex flex-col  m-2 rounded-sm transition-opacity">
        <div className="w-full flex mx-2 justify-between items-center flex-col md:flex-row shadow-lg">
          <div className="flex w-full justify-between">
            <h2 className="font-bold text-base md:text-xl uppercase">
              {' '}
              Concursos
            </h2>
            <select
              id="select_style"
              onChange={() => {}}
              value=""
              className="flex md:hidden bg-[#000] text-gray-50 font-bold p-1 text-sm rounded-lg outline-none sm:mt-0 mt-0 mr-10"
            >
              {generos.map(genero => (
                <option
                  key={genero.value}
                  id={genero.value}
                  value={genero.value}
                >
                  {genero.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center md:justify-between w-full ml-5">
            <select
              id="select_style"
              onChange={() => {}}
              value=""
              className="hidden md:flex text-black font-bold p-1 text-sm rounded-lg outline-none sm:mt-0 mt-0 mr-10"
            >
              {generos.map(genero => (
                <option
                  key={genero.value}
                  id={genero.value}
                  value={genero.value}
                >
                  {genero.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full mx-auto sm:px-1 lg:px-1 dark:bg-gray-800 rounded-lg p-1">
          <div className="w-full flex flex-col">
            <div
              className="w-full flex flex-row flex-wrap"
              style={{ transition: '5s' }}
            >
              {currentPage}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Concursos;

interface ListProps {
  concursos: Array<Object>;
}
function ListContests({ concursos }: ListProps) {
  return (
    <>
      {concursos.map(concurso => (
        <ContestCard key={concurso.id} concurso={concurso} />
      ))}
    </>
  );
}
