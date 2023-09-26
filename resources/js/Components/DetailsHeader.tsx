import { Link } from '@inertiajs/react';
import React from 'react';
import { RelatedSongs } from '.';
import { useGetSongRelatedQuery } from '@/redux/services/coreApi';

function DetailsHeader({ artistId, artistData, songData }) {
  return (
    <div className="relative w-full flex-col">
      <div className="w-full-bg-gradiente-to-l from-tranparent to-black sm:h-48 h-28"></div>
      <div className="absolute inset-0 flex items-center w-full">
        {artistData?.url_cover ? (
          <img
            className="w-48 h-48 border-2 shadow-xl shadow-black"
            src={artistId.url_cover}
            alt="art"
          />
        ) : (
          <img
            className="w-16 h-16 rounded-full border-2 shadow-xl shadow-black flex"
            src={ songData?.cover}
            alt="art"
          />
        )}
        <div className="ml-5 ">
          <p className="font-bold text-xl textwhite"> {songData?.title} </p>
          {songData && (
            <Link href={`artists-details/${songData.artist_id}`}>
              <p className="flex"> {songData?.artist} </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsHeader;
