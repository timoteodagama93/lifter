import React from 'react';

import { smalLogo } from '../../../img';

const Track = ({ isPlayingVideo, isVideoActive, activeVideo }) => (
  <div className="flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlayingVideo && isVideoActive ? '' : ''
      } hidden sm:block h-16 w-16 mr-4`}
    >
      <video>
        <source className="w-full h-full" src={activeVideo?.url} />
      </video>
    </div>

    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeVideo?.title ? activeVideo?.title : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeVideo?.artist ? activeVideo?.artist : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
