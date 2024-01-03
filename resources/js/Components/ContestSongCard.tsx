import React, { useEffect, useRef, useState } from 'react';
import PlayPause from './PlayPause.js';
import { Link } from '@inertiajs/react';

import { playPause, setActiveSong } from '../redux/features/playerSlice.js';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { FaPauseCircle, FaPlayCircle, FaVoteYea } from 'react-icons/fa';
import { smalLogo } from '../../img/index.js';
import axios from 'axios';
import { BiLike, BiPlay, BiShare, BiStar } from 'react-icons/bi';

function ContestSongCard({
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
    dispatch(playPause(true));
  };

  const [artist, setArtist] = useState(null);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    axios
      .post('get-artist', { artist_id: song.artist_id })
      .then(response => {
        setArtist(response.data);
      })
      .catch(error => {});
  }, []);

  useEffect(() => {
    axios
      .post('participant-votes', {
        song_id: song.song_id,
        contest_id: song.contest_id,
      })
      .then(response => {
        setVotes(response.data.length);
      })
      .catch(error => {});
  }, []);

  return (
    <div
      className={`flex flex-col ${w} p-4 bg-white/5 ng-opacity-80  animate-slideup rounded-lg cursor-pointer shadow-lg border`}
    >
      <div className=" relative w-full h-full flex justify-center group">
        <div
          className={`absolute z-10 inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
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
        <p className="text-sm truncate w-full flex gap-1 border-t mt-1">
          <span className="w-full gap-1 flex ">
            <FaVoteYea className="w-5 h-5" />
            <span>{votes}</span>
          </span>
          <span className="w-full gap-1 flex ">
            <BiLike className="w-5 h-5" />
            <span>{song.likes}</span>
          </span>
          <span className="w-full gap-1 flex ">
            <BiPlay className="w-5 h-5" />
            <span>{song.plays}</span>
          </span>
          <span className="w-full gap-1 flex ">
            <BiShare className="w-5 h-5" />
            <span>{song.shares}</span>
          </span>
          <span className="w-full gap-1 flex ">
            <BiStar className="w-5 h-5" />
            <span>{song.stars}</span>
          </span>
        </p>
      </div>
    </div>
  );
}

export default ContestSongCard;
