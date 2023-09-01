import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';

import { Error, Loader, SongCard } from '../../Components';
import { generos, songs } from '../../../data/dummy';
import TopPlay from '@/Components/TopPlay';
import Player from '@/Components/Player/Player';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import TopArtists from '@/Components/TopArtists';

function Descobrir() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(state => state.player);

  return (
    <div className="flex flex-col rounded-lg p-2">
        <div className="w-full  justify-between items-center flex-row md:flex-col ">
          <h2 className="flex font-bold text-sm md:text-xl  text-left">Descobrir</h2>
          <form className="w-full hidden md:flex ">
            <input
              className="w-3/4 mx-5 rounded-lg"
              type="search"
              placeholder="Descobrir música"
            />
          </form>
          <div className="w-full flex flex-row justify-center items-center">
            <button className="md:hidden flex  text-bold text-xl  justify-center items-center bg-[#2e2c2e] dark:bg-gray-400  p-1 md:p-2 rounded-sm">
              <BiSearch className="text-xl" />
            </button>
            <select
              onChange={() => {}}
              value=""
              className="p-1 text-xs md:text-sm rounded-md outline-none "
            >
              {generos.map(genero => (
                <option key={genero.value} value={genero.value}>
                  {genero.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full max-h-screen flex pb-36 overflow-auto mx-auto px-2  dark:bg-gray-800 shadow-xl sm:rounded-lg">
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
        </div>
      </div>
  );
}

export default Descobrir;
