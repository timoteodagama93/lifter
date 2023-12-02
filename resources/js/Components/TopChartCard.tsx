import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import EnviarEstrelas from './EnviarEstrelas';
import axios from 'axios';
import MediaDeEstrelas from './MediaDeEstrelas';
import { HiHeart, HiStar } from 'react-icons/hi';
import { BiStar } from 'react-icons/bi';
import { AiOutlineLike } from 'react-icons/ai';
import { smalLogo } from '../../img';
import Interagir from './Interagir';

function TopChartCard({ song, i, isPlaying, activeSong, songs }) {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(playPause(true));
  };

  const isAudio = song.mime_type.includes('audio/');
  return (
    <div
      className={`w-full flex ${
        isAudio ? 'flex-row' : 'flex-col'
      }  items-center border shadow-lg bg-black transform-effect hover:text-white p-0 md:p1 rounded-lg  mb-1 py-2 `}
    >
      <h3 className="flex font-bold text-base  mr-1"> {i + 1}. </h3>
      <div
        className={`flex-1 flex ${
          isAudio ? 'flex-row' : 'flex-col'
        } justify-between items-center`}
      >
        {song.mime_type.includes('audio/') && song.cover && (
          <img
            className="flex w-10 h-10 rounded-lg"
            alt={song.title}
            src={song.cover}
          />
        )}
        {song.mime_type.includes('audio/') && !song.cover && (
          <img
            className="flex w-10 h-10 rounded-lg"
            alt={song.title}
            src={smalLogo}
          />
        )}

        {song.mime_type.includes('video/') && (
          <div className="w-ful">
            <video controls>
              <source
                type={song.mime_type}
                src={song?.url}
                className="flex w-10 h-10 rounded-lg"
              />
            </video>
          </div>
        )}
        <div className="flex flex-col flex-1 justify-start md:mx-1 ">
          <Link href={`song-details/${song.id}`} className="">
            <p className="text-sm md:text-xl font-bold"> {song.title} </p>
          </Link>
          <Link href={`artists-details/${song.artist_id}`} className="">
            <p className="text-xs md:text-base text-"> {song.artist} </p>
          </Link>
        </div>
      </div>
      <div className="">
        <Interagir song={song} />
      </div>
      {song.mime_type.includes('audio/') && (
        <PlayPause
          classNames=""
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
        />
      )}
    </div>
  );
}

export default TopChartCard;
