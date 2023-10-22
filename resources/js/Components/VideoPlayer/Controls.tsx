import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from 'react-icons/bs';

const Controls = ({
  isPlayingVideo,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentVideos,
  handlePlayPauseVideo,
  handlePrevVideo,
  handleNextVideo,
}) => (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80 ">
    <BsArrowRepeat
      size={20}
      color={repeat ? 'red' : 'white'}
      onClick={() => setRepeat(prev => !prev)}
      className="hidden sm:block cursor-pointer"
    />
    {currentVideos?.length && (
      <MdSkipPrevious
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handlePrevVideo}
      />
    )}
    {isPlayingVideo ? (
      <BsFillPauseFill
        size={45}
        color="#FFF"
        onClick={handlePlayPauseVideo}
        className="cursor-pointer"
      />
    ) : (
      <BsFillPlayFill
        size={45}
        color="#FFF"
        onClick={handlePlayPauseVideo}
        className="cursor-pointer"
      />
    )}
    {currentVideos?.length && (
      <MdSkipNext
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handleNextVideo}
      />
    )}
    <BsShuffle
      size={20}
      color={shuffle ? 'red' : 'white'}
      onClick={() => setShuffle(prev => !prev)}
      className="hidden sm:block cursor-pointer"
    />
  </div>
);

export default Controls;
