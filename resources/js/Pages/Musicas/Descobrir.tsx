import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';

import { Error, Loader, SongCard } from '../../Components';
import { generos, songs } from '../../../data/dummy';
import TopPlay from '@/Components/TopPlay';
import Player from '@/Components/Player/Player';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

function Descobrir() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(state => state.player);

  return (
    <AppLayout title="Descobrir">
      <div className="flex flex-col bg-gray-200 rounded-lg p-2">
        <div className="w-full flex justify-between items-center flex-row shadow-lg mb-5 pb-1">
          <h2 className="flex font-bold text-3xl  text-çeft">Descobrir</h2>
          <form className="w-full hidden md:flex ">
            <input
              className="w-3/4 mx-5 rounded-lg"
              type="search"
              placeholder="Descobrir música"
            />
          </form>
          <button className="md:hidden flex text-bold text-2xl  justify-center items-center bg-gray-400 p-2 rounded-lg">
            <BiSearch className="mr-2 text-3xl text-center" />
          </button>
          <select
            onChange={() => {}}
            value=""
            className="p-1 text-sm rounded-lg outline-none "
          >
            {generos.map(genero => (
              <option key={genero.value} value={genero.value}>
                {genero.title}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full max-h-screen pb-56 overflow-auto mx-auto px-2  dark:bg-gray-800 shadow-xl sm:rounded-lg">
            <div className="flex">
              <div className="flex flex-wrap justify-start md:justify-center">
                {songs.map((song, i) => (
                  <SongCard
                    song={song}
                    i={i}
                    key={i}
                    activeSong={activeSong}
                    isPlaying={isPlaying}
                    songs={songs}
                  />
                ))}
              </div>
              {/*} <TopPlay />{*/}
            </div>
  
        </div>
      </div>
    </AppLayout>
  );
}

export default Descobrir;
