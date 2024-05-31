import React from 'react';

import { smalLogo } from '../../../img';

const Track = ({ isPlaying, isActive, activeSong, handleePlayVideo: handlePlayVideo }) => (
  <div className="flex-1 flex items-center justify-start">
    {activeSong?.mime_type?.includes('audio/') && (
      <div
        className={`${
          isPlaying && isActive && activeSong.cover
            ? 'animate-[spin_3s_linear_infinite]'
            : ''
        } hidden sm:block h-16 w-16 mr-4`}
      >
        {activeSong.cover ? (
          <img
            src={activeSong?.cover}
            alt="cover art"
            className=" h-full w-full rounded-full"
          />
        ) : (
          <img
            src={smalLogo}
            alt="cover art"
            className=" h-14 w-14 rounded-full"
          />
        )}
      </div>
    )}
    {activeSong?.mime_type?.includes('video/') && (
      <div
        onClick={handlePlayVideo}
        className={`${
          isPlaying && isActive && activeSong.url
            ? 'animate-[bounce_5s_linear_infinite] border hover:cursor-pointer'
            : ''
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <video className="h-full w-full rounded">
          <source className=" h-full w-full rounded" src={activeSong?.url} />
        </video>
      </div>
    )}
    <div className="w-[50%]">
      <p className="truncate  font-bold text-lg">
        {activeSong?.title ? activeSong?.title : 'No active Song'}
      </p>
      <p className="truncate text-gray-500">
        {activeSong?.artist ? activeSong?.artist : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
