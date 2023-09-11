import React, { useEffect, useRef } from 'react';
import PlayPause from './PlayPause';
import { Link } from '@inertiajs/react';
import { songs, top5Songs } from '../../data/dummy';
import Swiper, { SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetArtistsQuery,
  useGetValuateSongsQuery,
} from '@/redux/services/coreApi';
import Loader from './Loader';
import Error from './Error';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import TopChartCard from './TopChartCard';

function Ranking() {
  const { data, isFetching, error } = useGetValuateSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);
  if (isFetching) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="w-full flex flex-row rounded">
      <div className="w-3/4  flex flex-col px-4 rounded-lg">
        <div
          className="flex flex-row justify-between
             items-center"
        >
          <h2 className=" font-bold text-base md:text-4xl">Top 10 </h2>
          <Link href="top-charts">
            <p className="text-sm md:text-base cursor-pointer">Ver mais</p>
          </Link>
        </div>
        <div className="mt-1 flex flex-col h-[100vh] pb-36 md:h-[75vh] overflow-auto ">
          {data?.map((song, id) => (
            <TopChartCard
              songs={data}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              i={id}
              key={song.id}
            />
          ))}
        </div>
      </div>
      <div className="w-1/4  bg-red-500d flex flex-col mt-0">
        <div
          className="flex flex-row justify-between
             items-center mx-2"
        >
          <h2 className="font-bold text-sm md:text-xl flex space-x-1">
            <span className="md:flex">Top</span> <span>Artistas</span>
          </h2>
          <Link href="top-charts">
            <p className="hidden lg:flex text-base cursor-pointer">Ver mais</p>
          </Link>
        </div>

        <div className="flex flex-row justify-end h-[65vh] md:h-[75vh] overflow-auto ">
          <TopArtists />
        </div>
      </div>
    </div>
  );
}

export default Ranking;

function TopArtists({}) {
  const { data, isFetching, error } =
    useGetValuateSongsQuery('/get-top-artists');
  if (isFetching) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="relative w-full h-full flex flex-col justify-start shadow-lg rounded-lg animate-slideright px-1">
      {data?.data?.map((artist, i) => (
        <>
          <Link href="">
            <div className="w-full relative justify-center items-center">
              <img
                key={i}
                src={localStorage.getItem('prefix_storage') + artist.url_cover}
                alt="name artist"
                className="px-1 rounded-sm md:rounded-lg w-full object-cover"
              />
              <div className="w-full justify-center items-center text-white bg-[#000000aa] relative bottom-5 left-0 right-0">
                <span className=""> {artist.name} </span>
              </div>
            </div>
          </Link>
        </>
      ))}
    </div>
  );
}
