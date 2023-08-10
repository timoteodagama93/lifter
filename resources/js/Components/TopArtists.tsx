import React, { useEffect, useRef } from 'react';
import PlayPause from './PlayPause';
import { Link } from '@inertiajs/react';
import { artists } from '../../data/dummy';
import TopArtistCard from './TopArtistCard';

function TopArtist() {
  return (
    <div className="xl:ml-1 ml-0 xl:mb-0 mb-6 max-w-full flex flex-col bg-[#997f2362]">
      <div className="w-full flex flex-col">
        <div
          className="flex flex-row justify-between
             items-center"
        >
          <h2 className="text-white font-bold text-2xl">Top 10 Lifter </h2>
          <Link href="top-charts">
            <p className="text-gray-300 text-base cursor-pointer">Ver mais</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {artists?.map((artist, id) => (
            <TopArtistCard artist={artist} i={id} key={artist.id} />
          ))}
        </div>
        <PlayPause />
      </div>
    </div>
  );
}

export default TopArtist;
