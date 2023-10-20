import React, { useRef } from 'react';
import PlayPause from './PlayPause.tsx';
import { Link } from '@inertiajs/react';

import { playPause, setActiveSong } from '../redux/features/playerSlice.js';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

function SongCard({ song, i, activeSong, isPlaying, songs }) {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-full p-4 bg-white/5 ng-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg border">
      <div className=" relative w-full h-full group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? 'flex bg-black bg-opacity-70 z-20'
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
      </div>

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
