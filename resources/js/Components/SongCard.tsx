import React, { useRef } from 'react';
import PlayPause from './PlayPause.tsx';
import { Link } from '@inertiajs/react';

import { playPause, setActiveSong } from '../redux/features/playerSlice.js';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

function SongCard({
  song,
  i,
  activeSong,
  isPlaying,
  songs,
  refVideo,
  setRefVideo,
}) {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(playPause(true));
  };

  const localVideoRef = useRef(null);
  const video = (
    <video id={i} ref={localVideoRef}>
      <source type={song.mmime_type} src={song.url} />
    </video>
  );

  function playVideo() {
    if (refVideo?.current?.id === i) {
      refVideo.current.play();
    } else {
      refVideo.current.pause();
      setRefVideo(localVideoRef);
      refVideo.current.play();
    }
  }
  function playPauseVideo() {
    if (refVideo?.current?.id === i) {
      if (refVideo?.current?.playing) {
        refVideo.current.pause();
      } else {
        refVideo.current.play();
      }
    } else {
      setRefVideo(localVideoRef);
    }
    if (refVideo?.current?.playing) {
      refVideo.current.pause();
    } else {
      refVideo?.current?.play();
    }
  }
  return (
    <div className="flex flex-col w-full p-4 bg-white/5 ng-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg border">
      {song.mime_type.includes('audio/') ? (
        <div className=" relative w-full h-full group">
          <div
            className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
              activeSong?.title === song.title
                ? 'flex bg-black bg-opacity-70'
                : ' hidden'
            } `}
          >
            <PlayPause
              classNames={''}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          </div>
          {song.mime_type.includes('audio/') && (
            <img className="w-full h-full" alt={song.title} src={song.cover} />
          )}
          {song.mime_type.includes('video/') && (
            <video className="">
              <source type={song.mmime_type} src={song.url} />
            </video>
          )}
        </div>
      ) : (
        <div className=" relative w-full h-full group">
          <div
            className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
              activeSong?.title === song.title
                ? 'flex bg-black bg-opacity-70'
                : ' hidden'
            } `}
          >
            {refVideo?.current?.playing ? (
              <FaPlayCircle
                className={`w-16 h-16 text-gray-300 cursor-pointer `}
                onClick={playPauseVideo}
              />
            ) : (
              <FaPauseCircle
                className={`w-16 h-16 text-gray-300 cursor-pointer `}
                onClick={playPauseVideo}
              />
            )}
          </div>
          {video}
        </div>
      )}
      <div className="flex flex-col">
        <p className="font-semibold text-lg  truncate">
          <Link href={`/song-details/${song?.id}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate  mt-1">
          <Link
            href={
              song.artist
                ? `/artists/details/${song?.artist_id}`
                : 'top-artists'
            }
          >
            {song.artist}{' '}
            {!(song.participacoes === '') ? ' ft ' + song.participacoes : ''}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SongCard;
