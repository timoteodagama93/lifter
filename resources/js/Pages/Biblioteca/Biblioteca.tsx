import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';

import CardMusica from '../../Components/CardMusica';

import { generos, songs } from '../../../data/dummy';
import SelectGenre from '@/Components/SelectGenre';
import { FaRandom } from 'react-icons/fa';
import { zela_orange } from '../../assets/constants';
import { BiSearch } from 'react-icons/bi';
import { useStateContext } from '@/contexts/PaginaActualContext';
import Videos from './Videos';

function Biblioteca() {
  const [activar, setActivar] = useState('musicas');
  const { currentPage } = useStateContext();
  return (
    <AppLayout title="Bibliotecas">
      <div className="w-full flex flex-col bg-gray-200 rounded-lg">
        <div className="w-full h-16 flex justify-between items-center sm:flex-row flex-col mb-0 bg-gray-300 px-2">
          <h2 className="font-bold text-xl text-left">Biblioteca Musical</h2>

          <div className="justify-center items-center mx-5">
            <button
              className="w-auto justify-center items-center text-xl text-bold p-3"
              onClick={() => setActivar('musicas')}
            >
              Tudo
              {activar === 'musicas' ? (
                <div className="justify-center mx-auto mt-2 w-10 rounded-lg border-b-4 border-[#d17734]" />
              ) : (
                ''
              )}
            </button>
            <button
              className="w-auto justify-center items-center text-xl text-bold p-3"
              onClick={() => setActivar('biblioteca')}
            >
              Biblioteca
              {activar === 'biblioteca' ? (
                <div className="justify-center mx-auto mt-2 w-10 rounded-lg border-b-4 border-[#d17734]" />
              ) : (
                ''
              )}
            </button>
            <button
              className="text-xl text-bold p-3"
              onClick={() => setActivar('albuns')}
            >
              Albuns
              {activar === 'albuns' ? (
                <div className="justify-center mx-auto mt-2 w-10 rounded-lg border-b-4 border-[#d17734]" />
              ) : (
                ''
              )}
            </button>
            <button
              className="text-xl text-bold p-3"
              onClick={() => setActivar('artistas')}
            >
              Artistas
              {activar === 'artistas' ? (
                <div
                  className={`justify-center mx-auto mt-2 w-10 rounded-lg border-b-4 border-[#d17734]`}
                />
              ) : (
                ''
              )}
            </button>
          </div>

          <div className="w-auto">
            <SelectGenre className="" />
          </div>
        </div>
        <div className="w-full h-screen flex flex-col overflow-y-auto pb-36">
          {currentPage === 'index' && <Videos />}
          {currentPage === 'videos' && <Videos />}
          {currentPage === 'musicas' && (
            <>
              {songs.map(song => (
                <CardMusica song={song} />
              ))}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default Biblioteca;
