import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  nextSong,
  prevSong,
  playPause,
  setActiveSong,
} from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { BsStarFill, BsStar } from 'react-icons/bs';
import axios from 'axios';
import Interagir from '../Interagir';

const LifterPlayer = ({ songs }) => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector(state => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const song = songs[0];
    const i = 0;
    dispatch(setActiveSong({ song, songs, i }));

    if (songs?.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const stars = [1, 2, 3, 4, 5];
  const [selectedStar, setSelectedStar] = useState(0);

  function submitValuation(stars) {
    setSelectedStar(stars);
    const data = new FormData();
    data.append('song_id', activeSong?.id);
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
    data.append('song_id', activeSong?.id);

    axios
      .post('/get-my-valluation', data)
      .then(response => {
        setSelectedStar(response.data);
      })
      .catch(errors => {
        console.log(errors);
      });
  }

  useEffect(getUserValuation, [activeSong]);
  return (
    <div className="w-full flex  flex-col md:flex-row justify-center items-center">
      <div className="relative sm:px-12 px-8 w-full flex flex-col md:flex-row items-center justify-between">
        {isPlaying && (
          <Track
            isPlaying={isPlaying}
            isActive={isActive}
            activeSong={activeSong}
          />
        )}
        <div className="flex-1 flex flex-col items-center justify-center">
          <Seekbar
            value={appTime}
            min="0"
            max={duration}
            onInput={event => setSeekTime(event.target.value)}
            setSeekTime={setSeekTime}
            appTime={appTime}
          />
          <Controls
            isPlaying={isPlaying}
            repeat={repeat}
            setRepeat={setRepeat}
            shuffle={shuffle}
            setShuffle={setShuffle}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
          />
          {isPlaying && (
            <>
              <Player
                activeSong={activeSong}
                volume={volume}
                isPlaying={isPlaying}
                seekTime={seekTime}
                repeat={repeat}
                currentIndex={currentIndex}
                onEnded={handleNextSong}
                onTimeUpdate={event => setAppTime(event.target.currentTime)}
                onLoadedData={event => setDuration(event.target.duration)}
              />
            </>
          )}
          <VolumeBar
            value={volume}
            min="0"
            max="1"
            onChange={event => setVolume(event.target.value)}
            setVolume={setVolume}
          />
        </div>
        <div className="w-full flex">
          <Interagir song={activeSong} collectionType="song" />
        </div>
      </div>
      <div className="hidden flex flex-row items-center justify-center md:flex-col">
        <span className="text-xs animate-bounce">Avalie</span>
        <div className="justify-center items-center flex flex-row">
          {stars.map(stars => (
            <span key={stars} className="text-4xl ">
              <button key={stars} onClick={() => submitValuation(stars)}>
                {selectedStar >= stars ? (
                  //                    || (isHovering == false && hoverStar >=  stars)
                  <BsStarFill className="text-[#f6cc33]" />
                ) : (
                  <BsStar />
                )}
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LifterPlayer;
