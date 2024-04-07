import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  nextSong,
  prevSong,
  playPause,
  setActiveSong,
} from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { BsStarFill, BsStar } from 'react-icons/bs';
import axios from 'axios';
import Interagir from '../Interagir';
import DotsMenu from '../DotsMenu';
import Dropup from '../Dropup';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import DropdownLink from '../DropdownLink';
import route from 'ziggy-js';
import Swal from 'sweetalert2';

const LifterPlayer = ({ songs }) => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector(state => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
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
  
    const handlePlayVideo = () => {
      Swal.fire({
        title: 'Vídeo desponível',
        text: 'Para reproduzir o vídeo pause o aúdio actualmente em reprodução e clique no botão play desta música.',
        icon: 'info',
      });
    };
  
  const handleNextSong = () => {
    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };
  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const stars = [1, 2, 3, 4, 5];
  const [selectedStar, setSelectedStar] = useState(0);

  function submitValuation(stars) {
    setSelectedStar(stars);
    const data = new FormData();
    data.append('song_id', activeSong?.id);
    data.append('stars', stars);
    console.log(data);

    axios
      .post('/avaliar', data)
      .then(response => {
        setSelectedStar(response.data.stars);
      })
      .catch(errors => {
        console.log(errors);
      });
  }
  /**GET USER VALUATION TO SELECTED SONG */
  function getUserValuation() {
    const data = new FormData();
    data.append('song_id', activeSong?.id);

    axios
      .post('/get-my-valluation', data)
      .then(response => {
        setSelectedStar(response.data);
      })
      .catch(errors => {
        console.log(errors);
      });
  }

  useEffect(getUserValuation, [activeSong]);
  return (
    <div className="w-full flex  flex-col justify-center items-center">
      <div className="w-full flex flex-row justify-center md:justify-between">
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={event => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <VolumeBar
          value={volume}
          min="0"
          max="1"
          onChange={event => setVolume(event.target.value)}
          setVolume={setVolume}
        />
      </div>
      <div className="relative sm:px-12 px-8 w-full flex flex-col md:flex-row items-center justify-between">
        <div className="relative sm:px-12 px-8 w-full flex flex-row items-center justify-between">
          <Track
            isPlaying={isPlaying}
            isActive={isActive}
            activeSong={activeSong}
          />

          <div className="w-full flex-1 flex flex-col items-center justify-center">
            <Controls
              isPlaying={isPlaying}
              repeat={repeat}
              setRepeat={setRepeat}
              shuffle={shuffle}
              setShuffle={setShuffle}
              currentSongs={currentSongs}
              handlePlayPause={handlePlayPause}
              handlePrevSong={handlePrevSong}
              handleNextSong={handleNextSong}
            />
            {isPlaying && (
              <>
                <Player
                  activeSong={activeSong}
                  volume={volume}
                  isPlaying={isPlaying}
                  seekTime={seekTime}
                  repeat={repeat}
                  currentIndex={currentIndex}
                  onEnded={handleNextSong}
                  onTimeUpdate={event => setAppTime(event.target.currentTime)}
                  onLoadedData={event => setDuration(event.target.duration)}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex gap-1 justify-end items-center">
          <span className="inline-flex rounded-md">
            <div className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150">
              {activeSong?.title ? (
                <Interagir song={activeSong} collectionType="song" />
              ) : (
                <>Nada activo</>
              )}
            </div>
          </span>
          <OptionsPopup song={activeSong} />
        </div>
      </div>
    </div>
  );
};

export default LifterPlayer;

function OptionsPopup({ song }) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  return (
    <div className="mr-3 relative">
      <div>
        <span className="inline-flex rounded-md">
          <button
            type="button"
            onClick={() => {
              showMoreOptions
                ? setShowMoreOptions(false)
                : setShowMoreOptions(true);
            }}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
          >
            <BiDotsHorizontalRounded
              size={30}
              className=""
              onClick={() => {}}
            />
          </button>
        </span>
        <div
          className={`absolute z-50 bottom-12 -right-2 transition-all  text-xs text-gray-400 bg-white w-[200px] shadow-sm rounded ${
            showMoreOptions ? 'block' : 'hidden'
          } `}
        >
          {/* <!-- Account Management --> */}

          {song?.title ? (
            <>
              <div className="block px-4 py-2 text-xs text-gray-400">
                Mais opções
              </div>

              <div>
                <DropdownLink href={route('jurados')}>Partilhar</DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('perfil')}>Colecionar</DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('profile.show')}>
                  Comentários
                </DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('profile.show')}>
                  Feedbacks
                </DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('profile.show')}>Baixar</DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('perfis')}>
                  Detalhes da música
                </DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('perfis')}>
                  Denunciar conteúdo
                </DropdownLink>
              </div>
            </>
          ) : (
            <>Sem música activa</>
          )}

          <div className="border-t border-gray-200 dark:border-gray-600"></div>
        </div>
      </div>
    </div>
  );
}
