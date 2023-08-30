import React, { useEffect, useRef } from 'react';
import PlayPause from './PlayPause';
import { Link } from '@inertiajs/react';
import { songs, top5Songs } from '../../data/dummy';
import Swiper, { SwiperSlide } from 'swiper/react';

const TopChartCard = ({ song, i }) => {
  return (
    <div className="w-full flex flex-row items-center border shadow-lg hover:bg-[#6ba976] py-1 p-0 md:p1 rounded-lg cursor-pointer mb-1">
      <h3 className="hidden md:flex font-bold text-base  mr-1"> {i + 1}. </h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          src={song?.images?.coverart}
          alt=""
          className="hidden md:flex w-10 h-10 rounded-lg"
        />
        <div className="flex-1 flex flex-col justify-center mx-1">
          <Link href={`song-details/${song.id}`} className="">
            <p className="text-sm md:text-xl font-bold "> {song.title} </p>
          </Link>
          <Link href={`song-details/${song.id}`} className="">
            <p className="text-xs md:text-base text-"> {song.subtitle} </p>
          </Link>
        </div>
      </div>
      <PlayPause />
    </div>
  );
};

function Ranking() {
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
        <div 
        className="mt-1 flex flex-col h-[100vh] pb-36 md:h-[75vh] overflow-auto ">
          {songs?.map((song, id) => (
            <TopChartCard song={song} i={id} key={song.id} />
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

        <div className="flex flex-row justify-end h-[65vh] md:h-[75vh] bg-black overflow-auto ">
          <div className="flex flex-col justify-start shadow-lg rounded-lg animate-slideright px-1">
            {top5Songs?.map((song, i) => (
              <>
                <Link href="">
                  <img
                  key={song.id}
                    src={song.images.artistImage}
                    alt="name artist"
                    className="px-1 rounded-sm md:rounded-lg w-full object-cover"
                  />
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
