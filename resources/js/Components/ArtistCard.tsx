import { Link } from '@inertiajs/react';
import React from 'react';
import PlayPause from './PlayPause';

const ArtistCard = ({ artist, i = 0 }) => {
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 h-1/2 flex flex-col items-center overflow-hidden shadow-lg p-1">
      <div className="w-full h-[320px] object-contain ">
        <img
          src={artist.url_cover}
          alt="name artist"
          className="w-full h-full rounded-sm rounded-t-lg border-t-2  object-cover"
        />
      </div>
      <Link
        href={`artist-details/${artist.id}`}
        className="transform-effect w-full h-[10%] first-letter: rounded-lg flex-1 space-x-1 flex flex-col justify-start items-center mx-3 border-b-2 backdrop-blur-lg p-1 "
      >
        <p className="text-xl font-bold text-white"> {artist.name} </p>
        <p className="text-xs text-gray-300"> {artist.genres}</p>
      </Link>
    </div>
  );
};

export default ArtistCard;
