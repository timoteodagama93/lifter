import React, { useEffect, useRef } from 'react';
import PlayPause from './PlayPause';
import { Link } from '@inertiajs/react';
import { top5Songs } from '../../data/dummy';
import Swiper, { SwiperSlide } from 'swiper/react';

const TopChartCard = ({ song, i }) => {
  return (
    <div className="w-full flex flex-row items-center border shadow-lg hover:bg-[#6ba976] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base  mr-3"> {i + 1}. </h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          src={song?.images?.coverart}
          alt=""
          className="w-10 h-10 rounded-lg"
        />
        <div className="flex-1 flex flex-col justify-center mx-1">
          <Link href={`song-details/${song.id}`} className="">
            <p className="text-xl font-bold "> {song.title} </p>
          </Link>
          <Link href={`song-details/${song.id}`} className="">
            <p className="text-base text-"> {song.subtitle} </p>
          </Link>
        </div>
      </div>
      <PlayPause />
    </div>
  );
};

function TopPlay() {
  return (
    <div className="xl:ml-1 ml-0 xl:mb-0 mb-6 xl:max-w-[400px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div
          className="flex flex-row justify-between
             items-center"
        >
          <h2 className=" font-bold text-2xl">Talentos: Top 10 </h2>
          <Link href="top-charts">
            <p className="text-base cursor-pointer">Ver mais</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {top5Songs?.map((song, id) => (
            <TopChartCard song={song} i={id} key={song.id} />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div
          className="flex flex-row justify-between
             items-center"
        >
          <h2 className=" font-bold text-2xl">Top Artistas</h2>
          <Link href="top-charts">
            <p className="text-base cursor-pointer">Ver mais</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-row ">
          <div
            className="flex flex-row shadow-lg rounded-full animate-slideright"
            style={{ width: '50%', height: 'auto' }}
          >
              {top5Songs?.map((song, i) => (
                <>
                
                  <Link href="">
                    <img
                      src={song.images.artistImage}
                      alt="name artist"
                      className="rounded-full w-full object-cover"
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

export default TopPlay;
