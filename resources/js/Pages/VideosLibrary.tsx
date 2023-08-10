import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';
import { generos, songs } from '../../data/dummy';
import SelectGenre from '@/Components/SelectGenre';
import { FaRandom } from 'react-icons/fa';
import CardVideo from '../Components/CardVideo.tsx';
function VideosLibrary() {
  const [activar, setActivar] = useState('todos');
  return (
    <AppLayout title="Biblioteca de videos">
      <div className="pb-12">
        <div className="flex flex-col">
          <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-1 mb-10">
            <h2 className="font-bold text-3xl text-white text-left">
              Biblioteca de vídeos
            </h2>

            <div className="justify-center items-center mx-5">
              <button
                className="w-auto justify-center items-center text-xl text-bold p-3"
                onClick={() => setActivar('todos')}
              >
                Todos os vídeos
                {activar === 'todos' ? (
                  <div className="justify-center mx-auto mt-2 w-5 rounded-lg border-b-4 border-white" />
                ) : (
                  ''
                )}
              </button>
              <button
                className="text-xl text-bold p-3"
                onClick={() => setActivar('clipes')}
              >
                Clipes musicais
                {activar === 'clipes' ? (
                  <div className="justify-center mx-auto mt-2 w-5 rounded-lg border-b-4 border-white" />
                ) : (
                  ''
                )}
              </button>
              <button
                className="text-xl text-bold p-3"
                onClick={() => setActivar('recortes')}
              >
                Recortes
                {activar === 'recortes' ? (
                  <div className="justify-center mx-auto mt-2 w-5 rounded-lg border-b-4 border-white" />
                ) : (
                  ''
                )}
              </button>
            </div>

            <div className="w-auto">
              <SelectGenre className="" />
            </div>
          </div>

          <div className="w-full h-16 flex flex-row justify-between items-center">
            <button className="items-center flex shadow-sm rounded-sm bg-black text-white p-3">
              <FaRandom />
              <span className="ml-5">Ordem aleatória e reproduzir</span>
            </button>
            <span className="text-white">
              Ordenar por:
              <select className="m-0 p-0 ml-2 pl-1 h-8 bg-transparent">
                <option>A - Z</option>
                <option>Artista</option>
                <option>Album</option>
                <option>Ano de lançamento</option>
              </select>
            </span>
          </div>

          <div className="w-full mx-auto sm:px-6 lg:px-8">
            <div className="w-full flex flex-wrap m-2 dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
              {songs?.map((song, id) => (
                <div className="md:w-1/3 sm:w-1/2 h-60">
                  <CardVideo video={song} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default VideosLibrary;
