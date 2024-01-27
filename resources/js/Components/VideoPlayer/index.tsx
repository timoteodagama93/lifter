import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  playPauseVideo,
  nextVideo,
  setTotalTime,
  prevVideo,
} from '../../redux/features/playerSlice';
import { BsStarFill, BsStar } from 'react-icons/bs';
import axios from 'axios';
import Track from './Track';
import Controls from './Controls';
import Seekbar from './Seekbar';
import Player from './Player';
import VolumeBar from './VolumeBar';
import { MdOutlineCloseFullscreen } from 'react-icons/md';

const VideoPlayer = ({
  fullscreen = false,
  setFullScreen: setRef = {},
  ref = useRef(null),
}) => {
  const {
    activeVideo,
    currentVideos,
    currentVideoIndex,
    isVideoActive,
    isPlayingVideo,
  } = useSelector(state => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentVideos?.length) dispatch(playPauseVideo(true));
  }, [currentVideoIndex]);

  const handlePlayPauseVideo = () => {
    if (!isVideoActive) return;

    if (isPlayingVideo) {
      dispatch(playPauseVideo(false));
    } else {
      dispatch(playPauseVideo(true));
    }
  };

  const handleNextVideo = () => {
    if (!shuffle) {
      dispatch(nextVideo((currentVideoIndex + 1) % currentVideos.length));
    } else {
      dispatch(nextVideo(Math.floor(Math.random() * currentVideos.length)));
    }
  };

  const handlePrevVideo = () => {
    if (currentVideoIndex === 0) {
      dispatch(prevVideo(currentVideos.length - 1));
    } else if (shuffle) {
      dispatch(prevVideo(Math.floor(Math.random() * currentVideos.length)));
    } else {
      dispatch(prevVideo(currentVideoIndex - 1));
    }
  };

  const stars = [1, 2, 3, 4, 5];
  const [selectedStar, setSelectedStar] = useState(0);

  function submitValuation(stars) {
    setSelectedStar(stars);
    const data = new FormData();
    data.append('song_id', activeVideo?.id);
    data.append('stars', stars);
    console.log(data);

    axios
      .post('/avaliar', data)
      .then(response => {
        setSelectedStar(response.data.stars);
      })
      .catch(errors => {
        console.log(errors);
      });
  }
  /**GET USER VALUATION TO SELECTED SONG */
  function getUserValuation() {
    const data = new FormData();
    data.append('song_id', activeVideo?.id);

    axios
      .post('/get-my-valluation', data)
      .then(response => {
        setSelectedStar(response.data);
      })
      .catch(errors => {
        console.log(errors);
      });
  }

  useEffect(getUserValuation, [activeVideo]);
  return (
    <div
      className={` ${
        fullscreen
          ? 'W-screen h-screen absolute top-0 left-0 z-40 bg-black'
          : 'w-full h-full'
      } px-1  flex flex-col justify-between items-center`}
    >
      {fullscreen && (
        <button
          onClick={() => setRef(false)}
          className="absolute top-0 left-0 z-50 flex transform-effect px-5 text-xl uppercase bg-blue-400 "
        >
          <MdOutlineCloseFullscreen className="w-10 h-10" />
        </button>
      )}
      <Player
        activeVideo={activeVideo}
        volume={volume}
        isPlayingVideo={isPlayingVideo}
        seekTime={seekTime}
        repeat={repeat}
        fullscreen={fullscreen}
        setFullScreen={setRef}
        //currentVideoIndex={currentVideoIndex}
        onEnded={handleNextVideo}
        onTimeUpdate={event => {
          setAppTime(event.target.currentTime);
          dispatch(setTotalTime(appTime));
        }}
        onLoadedData={event => setDuration(event.target.duration)}
      />

      <div
        className={` ${
          fullscreen ? 'hidden' : 'flex'
        } flex-1 flex flex-col items-center justify-center`}
      >
        <Controls
          isPlayingVideo={isPlayingVideo}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentVideos={currentVideos}
          handlePlayPauseVideo={handlePlayPauseVideo}
          handlePrevVideo={handlePrevVideo}
          handleNextVideo={handleNextVideo}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={event => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
      </div>

      <div className="hidden">
        <VolumeBar
          value={volume}
          min="0"
          max="1"
          onChange={event => setVolume(event.target.value)}
          setVolume={setVolume}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
