import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    {!activeSong ? (
      <div
        className={`${
          isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img
          src={activeSong?.cover}
          alt="cover art"
          className="h-full w-full rounded-full"
        />
      </div>
    ) : (
      <>
        {' '}
        {activeSong?.mime_type?.includes('audio/') && (
          <div
            className={`${
              isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''
            } hidden sm:block h-16 w-16 mr-4`}
          >
            <img
              src={activeSong?.cover}
              alt="cover art"
              className="h-full w-full rounded-full"
            />
          </div>
        )}
        {activeSong?.mime_type?.includes('video/') && (
          <div
            className={`${
              isPlaying && isActive ? '' : ''
            } hidden sm:block h-16 w-16 mr-4`}
          >
            <video>
              <source className="w-full h-full" src={activeSong?.url} />
            </video>
          </div>
        )}
      </>
    )}

    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title ? activeSong?.title : 'Sem música activa'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.artist ? activeSong?.artist : 'Sem música activa'}
      </p>
    </div>
  </div>
);

export default Track;
