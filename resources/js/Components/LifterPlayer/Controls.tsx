import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from 'react-icons/bs';

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
    <BsArrowRepeat
      size={20}
      color={repeat ? 'red' : 'white'}
      onClick={() => setRepeat(prev => !prev)}
      className="hidden sm:block cursor-pointer"
    />
    {currentSongs?.length && (
      <MdSkipPrevious
        size={30}
        className="text-black dark:text-gray-600 cursor-pointer"
        onClick={handlePrevSong}
      />
    )}
    {isPlaying ? (
      <BsFillPauseFill
        size={45}
        onClick={handlePlayPause}
        className="text-black dark:text-gray-600 cursor-pointer"
      />
    ) : (
      <BsFillPlayFill
        size={45}
        onClick={handlePlayPause}
        className="text-black dark:text-gray-600 cursor-pointer"
      />
    )}
    {currentSongs?.length && (
      <MdSkipNext
        size={30}
        className="text-black dark:text-gray-600 cursor-pointer"
        onClick={handleNextSong}
      />
    )}
    <BsShuffle
      size={20}
      className={`hidden sm:block ${
        shuffle ? 'red' : 'text-black dark:text-gray-600 '
      }cursor-pointer`}
      onClick={() => setShuffle(prev => !prev)}
    />
  </div>
);

export default Controls;
