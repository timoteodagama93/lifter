import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';
import SelectGenre from '@/Components/SelectGenre';
import { FaRandom } from 'react-icons/fa';
import CardVideo from '../Components/CardVideo';
import CardArtist from '@/Components/CardArtist';
import { MdLocationOn } from 'react-icons/md';
function ArtistsLibrary() {
  const [activar, setActivar] = useState('todos');
  const artists = [];
  return (
    <AppLayout title="Biblioteca de videos">
      <div className="pb-12">
        <div className="flex flex-col">
          <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-1 mb-10">
            <h2 className="font-bold text-3xl  text-left">Vídeos</h2>

            <div className="justify-center items-center mx-5">
              <button
                className="w-auto justify-center items-center text-xl text-bold p-3"
                onClick={() => setActivar('todos')}
              >
                Todos os vídeos
                {activar === 'todos' ? (
                  <div className="justify-center mx-auto mt-2 w-5 rounded-lg border-b-4 border-[#d17734] " />
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
                  <div className="justify-center mx-auto mt-2 w-5 rounded-lg border-b-4 border-[#d17734] " />
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
                  <div className="justify-center mx-auto mt-2 w-5 rounded-lg border-b-4 border-[#d17734] " />
                ) : (
                  ''
                )}
              </button>
            </div>
            <div className="w-auto ">
              <SelectGenre className="bg-[#997f2362]" />
            </div>
          </div>

          <div className="w-full h-16 flex flex-row justify-between items-center">
            <button className="items-center flex shadow-sm rounded-sm bg-[#997f2362] text-white p-3">
              <FaRandom />
              <span className="ml-1">Aleatória</span>
            </button>

            <button className="items-center flex shadow-sm rounded-sm bg-[#997f2362] text-white p-3">
              <MdLocationOn />
              <span className="ml-1">Filtrar por localidade</span>
            </button>
          </div>

          <div className="w-full mx-auto sm:px-6 lg:px-8">
            <div className="w-full flex flex-wrap m-2 dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
              {artists?.map((artist, id) => (
                <div className="md:w-1/3 sm:w-1/2 h-96">
                  <CardArtist key={id} artist={artist} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default ArtistsLibrary;
