import AppLayout from '@/Layouts/AppLayout';
import React, { useEffect, useState } from 'react';

import { Error, Loader, SongCard } from '@/Components';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetTopChartsQuery,
  useGetSongsQuery,
} from '@/redux/services/coreApi';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import TopPlay from '@/Components/TopPlay';
import axios from 'axios';
import { generos } from '@/assets/constants';

function Descover() {
  //const { data, isFetching, error } = useGetTopChartsQuery('');
  const { data, isFetching, error } = useGetSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);


  const [results, setResults] = useState();
  const [query, setFilter] = useState('Angola Top Artists Video Songs');

  useEffect(() => {
    const apiKey = 'AIzaSyA45maJSYR-JSsZfNFroy-NZ2ozmsaGiiw';
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=10&q=${query}`,
      )
      .then(response => {
        
        setResults(response.data.items);
        console.log(results);

        // Faça algo com os resultados, como renderizá-los em seu site.
      })
      .catch(error => {
        console.error('Erro na pesquisa do YouTube:', error);
      });
  }, [query]);
  if (isFetching) return <Loader title='' />;
  if (error) return <Error />;
  return (
    <AppLayout title="Descobrir">
      <div className="w-full flex flex-col-reverse md:flex-row relative ">
        <div className="w-full flex flex-col rounded-lg">
          <div className="w-full flex justify-between items-center flex-row shadow-lg mb-5 pb-1">
            <h2 className="flex font-bold text-3xl  text-left ">Descobrir</h2>
            <form className="w-full flex ">
              <input
                onChange={e => setFilter(e.target.value)}
                className="w-3/4 mx-5 rounded-lg text-black"
                type="search"
                placeholder="Descobrir música"
              />
            </form>
            <button className="md:hidden flex text-bold text-2xl  justify-center items-center bg-gray-400 p-1 rounded-lg text-black">
              <BiSearch className="mr-2 text-3xl text-center" />
            </button>
            <select
              onChange={e => setFilter(e.target.value)}
              className="p-1 text-sm rounded-lg outline-none text-black "
            >
              {generos.map(genero => (
                <option key={genero.value} value={genero.value}>
                  {genero.title}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full h-fit bg-green-400 flex flex-col relative max-h-screen mx-auto  dark:bg-gray-800 shadow-xl sm:rounded-lg flex-wrap justify-start">
          <div className="w-full h-full border">
              {data.map((song, i) => (
                <SongCard
                w='w-full'
                  song={song}
                  i={i}
                  key={i}
                  activeSong={activeSong}
                  isPlaying={isPlaying}
                  songs={data}
                />
              ))}
            </div>
            <div className="w-full border">
              {results?.map((result, i) => (
                <div className=" w-full h-auto shadow rounded object-contain">
                  <img
                    className="object-cover w-full h-auto p-5"
                    src={result.snippet.thumbnails.default.url}
                  />
                </div>
              ))}
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
