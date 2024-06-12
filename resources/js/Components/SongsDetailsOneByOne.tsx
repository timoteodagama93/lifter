import { Link } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { smalLogo } from '../../img';
import CommentsSection from './CommentsSection';
import SongStars from './SongStars';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import {
  nextSong,
  playPause,
  playPauseVideo,
  prevSong,
  setActiveSong,
  setCurrentTime,
} from '@/redux/features/playerSlice';
import PlayPause from './PlayPause';
import { generos } from '@/assets/constants';
import { useGetDestaquesQuery } from '@/redux/services/coreApi';
import Loader from './Loader';

function SongsDetailsOneByOne({ songs, category, setCategory }) {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector(state => state.player);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs?.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    if (!activeSong) return;
    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs?.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs?.length)));
    }
  };

  const [shuffle, setShuffle] = useState(false);
  const handlePrevSong = () => {
    if (!activeSong) return;
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs?.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs?.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    if (songs?.length < 0) return;
    let song = songs[0];
    const i = 0;
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(setCurrentTime({ i }));
    if (song.mime_type.includes('audio/')) {
      dispatch(playPause(true));
    } else {
      dispatch(playPauseVideo(true));
    }
  };

  useEffect(() => {
    handlePauseClick();
  }, [category]);

  return (
    <div className="w-full flex flex-col md:flex-row relative dark:bg-black dark:text-gray-500 ">
      <div className="w-full h-full md:h-[70vh] md:w-2/3 shadow dark:shadow-[#323232] flex justify-between overflow-hidden items-center p-5 ">
        <button
          onClick={handlePrevSong}
          disabled={!isPlaying ? true : false}
          className="flex items-end text-[#0094f8] shadow-black dark:shadow-white shadow rounded-full "
        >
          {' '}
          <BsCaretLeftFill className="w-12 h-12" />{' '}
        </button>
        <div className="w-full h-full justify-center items-center flex flex-col p-1">
          <div className="w-full h-[13%] shadow-black dark:shadow-white shadow flex gap-2 items-center justify-center  ">
            <h1 className="text-xl">Selecione a categoria a avaliar:</h1>
            <select
              className="border-none"
              defaultValue={category}
              name="cat"
              id="cat"
              onChange={e => setCategory(e.currentTarget.value)}
            >
              {generos.map(g => (
                <>
                  <option value={g.value}> {g.title} </option>
                </>
              ))}
            </select>

            {/*isPlaying && <Interagir song={activeSong} collectionType="song" />*/}
          </div>

          <div className="w-full h-[87%] ">
            <div className="w-full h-full justify-center items-center relative ">
              {isPlaying && activeSong?.artist != undefined ? (
                <>
                  <Displayer
                    i={0}
                    song={activeSong}
                    activeSong={activeSong}
                    handlePauseClick={handlePauseClick}
                    handlePlayClick={handlePlayClick}
                    isPlaying={isPlaying}
                    songs={songs}
                  />
                  ,
                </>
              ) : (
                <>
                  {songs?.length > 0 ? (
                    <>
                      <div
                        className={`absolute z-20 inset-0 justify-center items-center bg-black bg-opacity-50  flex flex-col `}
                      >
                        <PlayPause
                          classNames={''}
                          song={songs[0]}
                          isPlaying={isPlaying}
                          activeSong={activeSong}
                          handlePause={handlePauseClick}
                          handlePlay={handlePlayClick}
                        />

                        <p>Clique para reproduzir</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`absolute z-20 inset-0 justify-center items-center p-5  flex flex-col `}
                      >
                        <h1 className="text-center text-xl md:text-2xl">
                          {' '}
                          Nenhuma música em avaliação na categoria: {category} .
                        </h1>
                        <p className="text-base md:text-xl">
                          Sugerimos que selecione outra categoria na listagem
                          acima.
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleNextSong}
          disabled={!isPlaying ? true : false}
          className=" items-end text-[#0094f8] shadow-black dark:shadow-white shadow rounded-full "
        >
          {' '}
          <BsCaretRightFill className="w-12 h-12" />{' '}
        </button>
      </div>
      <div className="w-screen h-full flex flex-col md:h-[70vh] md:w-1/3 overflow-y-auto">
        <h1 className="text-center text-base md:text-xl uppercase">
          Comentários
        </h1>
        {activeSong && isPlaying && (
          <CommentsSection collection={activeSong} collectionType="song" />
        )}
      </div>
    </div>
  );
}

export default SongsDetailsOneByOne;

function Displayer({
  song,
  songs,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) {
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
  }, [activeSong]);

  function getComments() {
    const data = new FormData();
    data.append('collection_id', song.id);
    data.append('collection_type', 'song');
    axios
      .post('get-comments', data)
      .then(response => {
        setCommentsNumber(response?.data?.length);
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
        <div className=" relative w-full h-full flex justify-center group">
          <div
            className={`absolute z-20 inset-0 justify-center items-center bg-black bg-opacity-50  flex  `}
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
          {song?.mime_type?.includes('audio/') && song.cover && (
            <img className="w-full h-full" alt={song.title} src={song?.cover} />
          )}
          {song?.mime_type?.includes('audio/') &&
            artist?.url_cover &&
            !song.cover && (
              <img
                className="w-full h-full"
                alt={artist?.name}
                src={artist?.url_cover}
              />
            )}
          {song?.mime_type?.includes('audio/') &&
            !artist?.url_cover &&
            !song.cover && (
              <div className="w-full h-full flex justify-center">
                <img
                  className="w-full h-full"
                  alt={song.title}
                  src={smalLogo}
                />
              </div>
            )}
        </div>
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
