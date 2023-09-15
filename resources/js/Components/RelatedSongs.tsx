import React from 'react';
import SongBar from './SongBar';

function RelatedSongs({
  data,
  isPlaying,
  activeSong,
  songId,
  handlePlay,
  handlePause,
}) {
  console.log('FROM RELATED, THE DATA: ')
  console.log(data)
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Relacionadas</h1>
      {data?.map((song, i) => (
        <SongBar
          song={song}
          i={i}
          artistId={{}}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePause}
          handlePlayClick={handlePlay}
        />
      ))}
    </div>
  );
}

export default RelatedSongs;
