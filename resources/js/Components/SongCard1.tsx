import React from 'react';
import './SongCard1.css';

const SongCard1 = ({ song }) => {
  return (
    <div className="song-card">
      <img src={song.cover} alt={`${song.title} Cover`} />
      <div className="song-details">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
        <p>{song.album}</p>
      </div>
    </div>
  );
};

export default SongCard1;
