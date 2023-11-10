import React, { useState } from 'react';
import { BiDotsHorizontal, BiMusic } from 'react-icons/bi';
import { BsPencilFill, BsPencilSquare } from 'react-icons/bs';
import SongItemValuationList from './SongItemValuationList';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSongsQuery } from '@/redux/services/coreApi';
import { GiPencilRuler } from 'react-icons/gi';
import { smalLogo } from '../../../img';
import { Link } from '@inertiajs/react';
import { MdFeedback } from 'react-icons/md';
import {
  playPause,
  setActiveSong,
  setFullScreenPlayer,
} from '@/redux/features/playerSlice';
import PlayPause from '@/Components/PlayPause';
import classNames from 'classnames';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

function ListVideos({
  valuatedSongs,
  videos = [],
  setPlayingVideo,
  playingVideo,
}) {
  const dispatch = useDispatch();
  const [view, setView] = useState('Avaliar');

  const { isPlaying, activeSong } = useSelector(state => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, songs, i) => {
    setPlayingVideo(song);
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(playPause(true));
  };

  if (isPlaying && view === 'Avaliar') {
    setPlayingVideo;
  }

  return (
    <>
      <div className="w-4/12 h-full overflow-hidden border-r ">
        {/**Área de previsualização de conversas e notificações */}
        <div className="w-full h-[10%] flex flex-col md:flex-row justify-between items-center md:p-1">
          <h1 className=" md:flex md:text-3xl font-bold">{view}</h1>
          <div className="flex flex-row justify-center items-center w-full  gap-1">
            <button
              onClick={() => setView('Avaliar')}
              className="transform-effect flex flex-col justify-center"
            >
              <BiMusic className="w-7 h-7 font-bold" />
              <span style={{ fontSize: '0.5rem' }}> Avaliar </span>
            </button>
            <button
              onClick={() => setView('Avaliações')}
              className="transform-effect flex flex-col justify-center"
            >
              <MdFeedback className="w-7 h-7 font-bold" />
              <span style={{ fontSize: '0.5rem' }}>Avaliadas</span>
            </button>
          </div>
        </div>
        <div className="w-full h-[80%] overflow-y-auto flex flex-col md:px-5">
          {view === 'Avaliações' ? (
            <>
              {valuatedSongs?.map(valuatedItem => (
                <div
                  key={valuatedItem?.id}
                  onClick={() => setPlayingVideo(valuatedItem)}
                  className={`flex transform-effect flex-row items-center hover:rounded-md ${
                    playingVideo?.id === valuatedItem?.id
                      ? 'bg-[#2e2c2e] text-white'
                      : 'hover:bg-[#2e2c2e] hover:text-white'
                  }  p-0 md:p-1 cursor-pointer mb-2`}
                >
                  <div className="flex-1 flex flex-row justify-start space-x-2 items-center">
                    {valuatedItem.cover ? (
                      <img
                        src={valuatedItem?.cover}
                        alt=""
                        className="w-5 md:w-10 h-5 md:h-10 rounded-sm"
                      />
                    ) : (
                      <img
                        src={smalLogo}
                        alt=""
                        className="w-5 md:w-10 h-5 md:h-10 rounded-sm"
                      />
                    )}
                    <div className="w-full md:flex flex-col justify-start items-center">
                      <div className="w-full flex flex-col justify-between">
                        <p className="text-xs md:text-base lg:text-xl font-bold ">
                          {' '}
                          {valuatedItem.title}{' '}
                        </p>
                        <span className="text-xs">
                          {' '}
                          {valuatedItem?.messages?.time}{' '}
                        </span>
                      </div>
                      <span className="w-full flex justify-start text-xs md:text-base">
                        {' '}
                        {valuatedItem?.artist}{' '}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {videos?.map((song, i) => (
                <div
                  key={song?.id}
                  className={`flex transform-effect flex-row items-center hover:rounded-md ${
                    activeSong?.id === song?.id
                      ? 'bg-[#2e2c2e] text-white'
                      : 'hover:bg-[#2e2c2e] hover:text-white'
                  }  p-0 md:p-1 cursor-pointer mb-2`}
                >
                  <div className="flex-1 flex flex-row justify-start space-x-2 items-center">
                    {song.cover ? (
                      <img
                        src={song?.cover}
                        alt=""
                        className="w-5 md:w-10 h-5 md:h-10 rounded-sm"
                      />
                    ) : (
                      <img
                        src={smalLogo}
                        alt=""
                        className="w-5 md:w-10 h-5 md:h-10 rounded-sm"
                      />
                    )}
                    <div className="w-full md:flex flex-col justify-start items-center ">
                      <div className="w-full flex flex-col justify-between">
                        <p className="text-xs md:text-base lg:text-xl font-bold ">
                          {' '}
                          {song.title}{' '}
                        </p>
                        <span className="text-xs">
                          {' '}
                          {song?.messages?.time}{' '}
                        </span>
                      </div>
                      <span className="w-full flex justify-start text-xs md:text-base">
                        {' '}
                        {song?.artist}{' '}
                      </span>
                    </div>
                    {isPlaying && activeSong?.title === song.title ? (
                      <FaPauseCircle
                        size={35}
                        className={`text-gray-300 cursor-pointer ${classNames}`}
                        onClick={handlePauseClick}
                      />
                    ) : (
                      <FaPlayCircle
                        size={35}
                        className={`text-gray-300 cursor-pointer ${classNames}`}
                        onClick={() => handlePlayClick(song, videos, i)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="w-full h-[10%]  ">
          <FiltrarNoticias
            setPosts={{}}
            setLoading={() => false}
            setFilter={''}
            setError={''}
          />
        </div>
      </div>
    </>
  );
}

export default ListVideos;

function FiltrarNoticias({ setPosts, setLoading, setError, setFilter }) {
  function loadPostsByFilter(e) {
    let filter = e.target.value;
    setLoading(true);
    setFilter(filter);
    axios
      .post(`/posts/${filter}`)
      .then(response => {
        if (response.status === 200) {
          setPosts(response.data);
          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      });
  }
  return (
    <div className="w-full flex justify-center items-center  text-black ">
      <input
        placeholder="Filtrar músicas"
        className="transform-effect w-full p-3"
      />
    </div>
  );
}
