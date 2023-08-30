import { Link } from '@inertiajs/react';
import React from 'react';
import PlayPause from './PlayPause';

const ArtistCard = ({ artist, i }) => {
  return (
    <Link
      href={`artistas/detalhes/${artist.id}`}
      className="w-full h-full p-2 flex items-center "
    >
      <div className="flex-1 flex flex-col justify-between items-center">
        <div className="w-full ">
          <img
            src={artist.images.artistImage}
            alt="name artist"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
        <div className="w-full absolute bottom-2 rounded-lg flex-1 space-x-1 flex flex-col justify-start items-center mx-3 bg-[#00000000] backdrop-blur-lg ">
          <p className="text-base font-bold text-white"> {artist.name} </p>
          <p className="text-xs text-gray-300"> {artist.style}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;
