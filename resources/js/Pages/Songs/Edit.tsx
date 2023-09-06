import { SongCard } from '@/Components';
import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import PlayPause from '@/Components/PlayPause.js';
import { Link } from '@inertiajs/react';

function Edit({ song }) {
  return (
    <AppLayout title="Concluir envio">
      <div>
        <div className="flex flex-col w-full md:w-1/3 lg:w-1/4 p-4 bg-white/5 ng-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg border">
          <div className=" relative w-full h-full group">
            <div
              className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex flex `}
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
            <img
              className="w-full h-full"
              alt="song_img"
              src={song.images?.coverart}
            />
          </div>

          <div className="flex flex-col">
            <p className="font-semibold text-lg  truncate">
              <Link href={`/song-details/${song?.id}`}>{song.title}</Link>
            </p>
            <p className="text-sm truncate  mt-1">
              <Link
                href={
                  song.artist
                    ? `/artists/${song?.artist_name}`
                    : '/artists'
                }
              >
                {song.subtitle}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Edit;
