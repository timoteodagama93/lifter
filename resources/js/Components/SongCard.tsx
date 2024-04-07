import React, { useEffect, useRef, useState } from 'react';
import PlayPause from './PlayPause.tsx';
import { Link } from '@inertiajs/react';

import {
  playPause,
  playPauseVideo,
  setActiveSong,
} from '../redux/features/playerSlice.js';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { smalLogo } from '../../img';
import axios from 'axios';
import Interagir from './Interagir.js';

function SongCard({
  song,
  i,
  activeSong,
  isPlaying,
  songs,
  w = 'w-full md:w-1/2 lg:w-1/3',
}) {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, songs, i }));
    if (song.mime_type.includes('audio/')) {
      dispatch(playPause(true));
    } else {
      dispatch(playPauseVideo(true));
    }
  };

  const [artist, setArtist] = useState(null);

  useEffect(() => {
    axios
      .post('get-artist', { artist_id: song.artist_id })
      .then(response => {
        setArtist(response.data);
      })
      .catch(error => {});
  }, []);

  return (
    <div
      className={`flex flex-col ${w} p-4 bg-white/5 ng-opacity-80  animate-slideup rounded-lg cursor-pointer shadow-lg border`}
    >
      <div className=" relative w-full h-full flex justify-center group">
        <div
          className={`absolute z-20 inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
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
        {song.mime_type.includes('audio/') && song.cover && (
          <img className="w-full h-full" alt={song.title} src={song.cover} />
        )}
        {song.mime_type.includes('audio/') &&
          artist?.url_cover &&
          !song.cover && (
            <img
              className="w-full h-full"
              alt={artist?.name}
              src={artist?.url_cover}
            />
          )}
        {song.mime_type.includes('audio/') &&
          !artist?.url_cover &&
          !song.cover && (
            <div className="w-full h-full flex justify-center">
              <img className="w-full h-full" alt={song.title} src={smalLogo} />
            </div>
          )}
      </div>

      <div className="flex flex-col">
        <p className="font-semibold text-lg  truncate ">
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
            {song?.participacoes ? ' ft ' + song.participacoes : ''}
          </Link>
        </p>
      </div>
      <div className="w-full flex hidden">
        <Interagir
          collectionType="song"
          song={song}
          key={song.id + Math.random() * i}
        />
      </div>
    </div>
  );
}

export default SongCard;
