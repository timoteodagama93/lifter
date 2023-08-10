
import { Link } from '@inertiajs/react';
import React from 'react'
import PlayPause from './PlayPause';

const TopArtistCard = ({ artist, i }) => {
    return (
      <div className="flex flex-row items-center hover:bg-[#4c88c4] py-2 p-4 rounded-lg cursor-pointer mb-2">
        <h3 className="font-bold text-base text-white mr-3"> {i + 1}. </h3>
        <div className="flex-1 flex flex-row justify-between items-center">
          <Link href="">
            <img
              src={artist.images.artistImage}
              alt="name artist"
              className="w-20 rounded-full object-cover"
            />
          </Link>
          <div className="flex-1 flex flex-col justify-center mx-3">
            <Link href={`song-details/${artist.id}`} className="">
              <p className="text-2xl font-bold text-white"> {artist.name} </p>
            </Link>
            <Link href={`song-details/${artist.id}`} className="">
              <p className="text-xl text-gray-300"> {artist.style} </p>
            </Link>
            <p className='text-base text-white'>
                {artist.about}
            </p>
          </div>
        </div>
        <PlayPause />
      </div>
    );
  };
  

export default TopArtistCard