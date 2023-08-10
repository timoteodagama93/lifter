import React from 'react';
import PlayPause from './PlayPause';
import DotsMenu from './DotsMenu';

function CardVideo({ video }) {
  return (
    <div className="w-full h-full p-1 flex flex-col items-center justify-center m-0">
      <div className="w-full h-4/5 rounded-lg">
        <img
          className="w-full h-full rounded-lg"
          src={video.images?.coverart}
        />
        <div className="flex w-auto relative bottom-10 left-0 items-center justify-between">
          <PlayPause />
          <DotsMenu />
        </div>
      </div>
      <div className="w-full h-1/5  mx-5 justify-start">
        <p className="w-full h-full bg-gray-50 text-xl flex flex-col">
          <span className="text-bold">{video.title}</span>
          <span className="text-base">{video.subtitle}</span>
        </p>
      </div>
    </div>
  );
}

export default CardVideo;
