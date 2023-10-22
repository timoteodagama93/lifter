import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';
import { generos, songs } from '../../../data/dummy';
import SelectGenre from '@/Components/SelectGenre';
import { FaRandom } from 'react-icons/fa';
import CardVideo from '../../Components/CardVideo';
import Galeria from '../../Components/Galeria';
import ArtistsGalery from '@/Pages/VozActiva';
function Videos-old() {
  const [activar, setActivar] = useState('todos');
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[10%] flex justify-between items-center sm:flex-row flex-col">
        <h2 className="font-bold text-3xl text-white text-left">Vídeos</h2>

        <div className="justify-center items-center mx-5">
          <button
            className="w-auto justify-center items-center text-xl text-bold p-3"
            onClick={() => setActivar('todos')}
          >
            Destaques
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
            Recentes
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
            Tendências
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

      <div className="w-full h-10 flex flex-row justify-between items-center text-white">
        <button className="items-center flex shadow-lg shadow-white rounded-sm bg-[#2e2c2e] text-white p-2">
          <FaRandom />
          <span className="ml-5">Ordem aleatória e reproduzir</span>
        </button>
        <span className="text-white ">
          Ordenar por:
          <select className="m-0 p-0 ml-2 pl-1 h-8 bg-[#4c88c4]">
            <option>A - Z</option>
            <option>Artista</option>
            <option>Album</option>
            <option>Ano de lançamento</option>
          </select>
        </span>
      </div>

      <div className="w-full h-[50%] overflow-y-auto mx-auto sm:px-6 lg:px-8">
        <div className="w-full h-full flex flex-wrap  dark:bg-gray-800  sm:rounded-lg ">
          <Galeria nome_colecao="Vídeos" />
        </div>
      </div>
    </div>
  );
}

export default Videos-old;
