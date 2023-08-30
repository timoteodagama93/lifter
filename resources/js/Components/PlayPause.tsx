import React, { useState } from 'react';

import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
function PlayPause({
  isPlaying,
  activeSong,
  song,
  handlePlay,
  handlePause,
  classNames,
}) {
  return isPlaying && activeSong?.title === song.title ? (
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

export default PlayPause;
