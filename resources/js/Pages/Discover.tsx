import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';

import { Error, Loader, SongCard } from '@/Components';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetTopChartsQuery,
  useGetValuateSongsQuery,
} from '@/redux/services/coreApi';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import { generos } from '../../data/dummy';
import TopPlay from '@/Components/TopPlay';

function Descover() {
  //const { data, isFetching, error } = useGetTopChartsQuery('');
  const { data, isFetching, error } = useGetValuateSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  return (
    <AppLayout title="Descobrir">
      <div className="w-full flex flex-col-reverse md:flex-row relative ">
        <div className="w-full flex flex-col rounded-lg">
          <div className="w-full flex justify-between items-center flex-row shadow-lg mb-5 pb-1">
            <h2 className="flex font-bold text-3xl  text-çeft">Descobrir</h2>
            <form className="w-full hidden flex ">
              <input
                className="w-3/4 mx-5 rounded-lg"
                type="search"
                placeholder="Descobrir música"
              />
            </form>
            <button className="md:hidden flex text-bold text-2xl  justify-center items-center bg-gray-400 p-1 rounded-lg">
              <BiSearch className="mr-2 text-3xl text-center" />
            </button>
            <select
              onChange={e => {}}
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
          <div className="w-full max-h-screen mx-auto  dark:bg-gray-800 shadow-xl sm:rounded-lg justify-start">
            <div className="flex">
              <div className="flex flex-wrap justify-start">
                {data.map((song, i) => (
                  <SongCard
                    song={song}
                    i={i}
                    key={i}
                    activeSong={activeSong}
                    isPlaying={isPlaying}
                    songs={data}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="xl:stick relative h-fit">
          <TopPlay />
        </div>
      </div>
    </AppLayout>
  );
}

export default Descover;
