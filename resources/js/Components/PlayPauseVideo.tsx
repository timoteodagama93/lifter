import React, { useState } from 'react';

import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
function PlayPauseVideo({
  isPlayingVideo,
  activeVideo,
  video,
  handlePlay,
  handlePause,
  classNames='',
}) {
  return isPlayingVideo && activeVideo?.title === video.title ? (
    <FaPauseCircle
      size={35}
      className={`text-gray-300 cursor-pointer ${classNames}`}
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className={`text-gray-300 cursor-pointer ${classNames}`}
      onClick={handlePlay}
    />
  );
}

export default PlayPauseVideo;
