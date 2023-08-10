import React from 'react';
import PlayPause from './PlayPause.tsx';
import { Link } from '@inertiajs/react';
import Modal from './Modal.js';

import { playPause, setActiveSong } from '../redux/features/playerSlice.js';
import { useDispatch } from 'react-redux';
import { songs } from '../../data/dummy.js';

function SongCard({ song, i, activeSong, isPlaying, songs }) {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong(song, songs, i));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col w-[200px] p-4 bg-white/5 ng-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg border">
      <div className=" relative w-full h-50 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
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
        <img alt="song_img" src={song.images?.coverart} />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg  truncate">
          <Link href={`/song-details/${song?.id}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate  mt-1">
          <Link
            href={
              song.artist ? `/artists/${song?.subtitle.adamid}` : 'top-artists'
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
      {/*}
      <Modal isOpen={isPlaying} onClose={() => setIsPlaying(false)}</div>>
        <div className="">
          <audio controls>
            <source src={song.link} type="audio/ogg" />
            <source src='songs/remember.mp3' type="audio/mpeg" />
          </audio>
        </div>
      </Modal>
        {*/}
    </div>
  );
}

export default SongCard;
