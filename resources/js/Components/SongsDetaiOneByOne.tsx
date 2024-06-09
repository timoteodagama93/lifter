import { Link } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GiPreviousButton, GiNextButton } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { smalLogo } from '../../img';
import CommentsSection from './CommentsSection';
import Interagir from './Interagir';
import SongStars from './SongStars';
import { BsCaretLeft, BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';

function SongsDetaiOneByOne({ songs }) {
  const { activeSong, isPlaying } = useSelector(state => state.player);
  const [x, setX] = useState(0);

  const [selectedValuation, setSelectedValuation] = useState(
    isPlaying ? activeSong : null,
  );

  useEffect(() => {
    if (!isPlaying) setSelectedValuation(null);
  }, [isPlaying]);

  useEffect(() => {
    if (songs?.length > 0) setSelectedValuation(songs[x]);
  }, [songs]);

  const handlePrevious = () => {
    if (x < 0) {
      setX(0);
    } else {
      setX(x - 1);
    }
    setSelectedValuation(songs[x]);
  };

  const handleNext = () => {
    if (x == songs.length) {
      setX(0);
    } else {
      setX(x + 1);
    }
    setSelectedValuation(songs[x]);
  };

  return (
    <div className="w-full flex flex-col md:flex-row relative dark:bg-black dark:text-gray-500 ">
      <div className="w-full h-full md:h-[70vh] md:w-2/3 shadow dark:shadow-[#323232] flex justify-between overflow-hidden items-center p-5 ">
        <button
          onClick={handlePrevious}
          className=" items-end text-[#0094f8] shadow-black dark:shadow-white shadow rounded "
        >
          {' '}
          <BsCaretLeftFill className="w-12 h-12" />{' '}
        </button>
        <div className="w-full h-full justify-center items-center flex flex-col p-1">
          <div className="w-full h-[88%] ">
            <div className="w-full h-full justify-center items-center relative ">
              {selectedValuation != null && (
                <>
                  <Displayer i={x} song={selectedValuation} />
                </>
              )}
            </div>
          </div>
          <div className="w-full h-[12%] items-end shadow-black dark:shadow-white shadow ">
            {selectedValuation != null && (
              <Interagir song={selectedValuation} collectionType="song" />
            )}
          </div>
        </div>
        <button
          onClick={handleNext}
          className=" items-end text-[#0094f8] shadow-black dark:shadow-white shadow rounded "
        >
          {' '}
          <BsCaretRightFill className="w-12 h-12" />{' '}
        </button>
      </div>
      <div className="w-screen h-full md:h-[70vh] md:w-1/3 overflow-y-auto">
        {selectedValuation != null && (
          <CommentsSection
            collection={selectedValuation}
            collectionType="song"
          />
        )}
      </div>
    </div>
  );
}

export default SongsDetaiOneByOne;

function Displayer({ song, i }) {
  const [artist, setArtist] = useState(null);
  const [commentsNumber, setCommentsNumber] = useState(0);

  useEffect(() => {
    axios
      .post('get-artist', { artist_id: song.artist_id })
      .then(response => {
        setArtist(response.data);
      })
      .catch(error => {});

    getComments();
  }, []);

  function getComments() {
    const data = new FormData();
    data.append('collection_id', song.id);
    data.append('collection_type', 'song');
    axios
      .post('get-comments', data)
      .then(response => {
        setCommentsNumber(response.data.length);
      })
      .catch(error => {});
  }

  const [selectedStar, setSelectedStar] = useState(0);
  const score =
    (song?.stars +
      song?.plays +
      song?.likes +
      song?.reprodution_time +
      song?.downloads +
      song?.shares) /
    5;
  return (
    <div
      className={`w-full h-full flex flex-row justify-center items-center p-4 bg-white/5 ng-opacity-80  animate-slideup rounded-lg shadow-lg border`}
    >
      <div className=" relative w-1/2 h-full flex justify-center group">
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

      <div className="w-1/2 flex flex-col p-2">
        <p className="font-bold text-lg  truncate ">
          <Link href={`/song-details/${song?.id}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate  mt-1">
          <Link
            href={
              song.artist ? `/artist-feed/${song?.artist_id}` : 'top-artists'
            }
          >
            {song.artist}{' '}
            {song?.participacoes ? ' ft ' + song.participacoes : ''}
          </Link>
        </p>
        <p> Comentários: {commentsNumber} </p>
        <p className="text-sm md:text-base flex justify-start items-center gap-2 ">
          {' '}
          Pontuação: {Math.floor(score)}
        </p>
        <p className="text-sm md:text-base flex justify-start items-center gap-2 ">
          {' '}
          Classificação: <SongStars song={song} />{' '}
        </p>
      </div>
    </div>
  );
}
