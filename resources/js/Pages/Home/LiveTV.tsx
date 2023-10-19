import React, { useState, useEffect, useRef } from 'react';
// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

//import './stylesGalery.css';

// import required modules
import InteracoesMusical from '@/Components/InteracoesMusical';
import AppLayout from '@/Layouts/AppLayout';
import AudioPlayer from '@/Components/AudioPlayer';
import VideoPlayer from '@/Components/VideoPlayer';
import {
  GiNextButton,
  GiPauseButton,
  GiPlayButton,
  GiPreviousButton,
} from 'react-icons/gi';
import Seekbar from '@/Components/MusicPlayer/Seekbar';
import MediaDeEstrelas from '@/Components/MediaDeEstrelas';
import Container from '@/Layouts/Container';
import axios from 'axios';
import { BiCalendar } from 'react-icons/bi';

export default function LiveTV({ songs, setSongsList }) {
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(true);
  const [shuffle, setShuffle] = useState(false);

  const initials = () => {
    if (songs?.length > 0) {
      if (selectedIndex + 1 === songs?.length) {
        setSelectedIndex(0);
        setActiveSong(songs[selectedIndex]);
      }
    }
  };

  const [activeSong, setActiveSong] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  function handleNextSong() {
    if (songs?.length > 0) {
      if (selectedIndex + 1 >= songs?.length) {
        setSelectedIndex(0);
        setActiveSong(songs[selectedIndex]);
      } else {
        setSelectedIndex(selectedIndex + 1);
        setActiveSong(songs[selectedIndex]);
      }
    }
  }

  function handlePreviousSong() {
    if (songs?.length > 0) {
      if (selectedIndex === 0) {
        setSelectedIndex(songs?.length - 1);
        setActiveSong(songs[selectedIndex]);
      } else {
        setSelectedIndex(selectedIndex - 1);
        setActiveSong(songs[selectedIndex]);
      }
    }
  }

  useEffect(initials, [songs]);

  setSongsList(
    songs?.map(song => (
      <PostSingleSidebar song={song} setDisplaySong={setActiveSong} />
    )),
  );

  return (
    <div className="w-full h-full overflow-y-auto flex gap-1 justify-cebter items-center rounded">
      {activeSong ? (
        <ActiveSong
          songs={songs}
          activeSong={activeSong}
          handleNextSong={handleNextSong}
          handlePreviousSong={handlePreviousSong}
        />
      ) : (
        <div className="w-full h-full flex flex-col">
          {songs?.map(song => (
            <>
              {song?.mime_type.includes('audio/') && (
                <>
                  <div className="relative flex flex-col w-full h-full  ">
                    <img
                      src={song?.cover}
                      alt={song?.title}
                      className="w-full h-[100%] "
                    />
                    <div className="absolute top-0 left-0 justify-between px-5 w-full flex flex-row gap-1">
                      <div className="flex flex-col">
                        <span>{song.title}</span>
                        <span>{song.artist} </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {song?.mime_type.includes('video/') && (
                <>
                  <VideoPlayer
                    activeSong={song}
                    isPlaying={false}
                    volume={volume}
                    seekTime={seekTime}
                    //onEnded={handleNextSong}
                    onTimeUpdate={event => setAppTime(event.target.currentTime)}
                    onLoadedData={event => setDuration(event.target.duration)}
                    repeat={false}
                  />
                  <div className="absolute top-0 left-0 justify-between px-5 w-full flex flex-row gap-1">
                    <div className="flex flex-col">
                      <span>{song.title}</span>
                      <span>{song.artist} </span>
                    </div>
                  </div>
                </>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
}

function ActiveSong({ activeSong, songs, handleNextSong, handlePreviousSong }) {
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(true);
  const [shuffle, setShuffle] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  function play(song, index) {
    setIsPlaying(true);
  }

  function pausePlay() {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }

  return (
    <>
      <div className="flex w-full h-full flex-col relative  ">
        {activeSong?.mime_type.includes('audio/') && (
          <>
            <div className="relative flex flex-col w-full h-full  ">
              <img
                src={activeSong?.cover}
                alt={activeSong?.title}
                className="w-full h-[100%] "
              />
              <div className="absolute top-0 left-0 justify-between px-5 w-full flex flex-row gap-1">
                <div className="flex flex-col">
                  <span>{activeSong.title}</span>
                  <span>{activeSong.artist} </span>
                </div>
              </div>
            </div>
          </>
        )}
        {activeSong?.mime_type.includes('video/') && (
          <>
            <VideoPlayer
              activeSong={activeSong}
              isPlaying={isPlaying}
              volume={volume}
              seekTime={seekTime}
              //onEnded={handleNextSong}
              onTimeUpdate={event => setAppTime(event.target.currentTime)}
              onLoadedData={event => setDuration(event.target.duration)}
              repeat={repeat}
            />
            <div className="absolute top-0 left-0 justify-between px-5 w-full flex flex-row gap-1">
              <div className="flex flex-col">
                <span>{activeSong.title}</span>
                <span>{activeSong.artist} </span>
              </div>
            </div>
          </>
        )}
        <div
          style={{ transition: '5s' }}
          className="absolute z-20 w-full h-full top-0 backdrop-blur-lg  left-0 justify-center items-center flex "
        >
          <div className="relative shadow-left shadow-right w-[60%] bg-white text-gray-900 h-full top-0   shadow-lg shadow-black justify-center items-center  ">
            <div className="items-center flex justify-center w-full">
              <InteracoesMusical song={activeSong} orientation="flex-row " />
            </div>
            <div className="relative flex flex-col w-full h-full  ">
              {activeSong?.mime_type.includes('audio/') && (
                <>
                  <AudioPlayer
                    activeSong={activeSong}
                    isPlaying={isPlaying}
                    volume={volume}
                    seekTime={seekTime}
                    //onEnded={()=> handleNextSong()}
                    onTimeUpdate={event => setAppTime(event.target.currentTime)}
                    onLoadedData={event => setDuration(event.target.duration)}
                    repeat={repeat}
                  />
                  <div className="relative flex flex-col w-full h-full  ">
                    <img
                      src={activeSong?.cover}
                      alt={activeSong?.title}
                      className="w-full h-[100%] "
                    />
                    <div className="absolute top-0 left-0 justify-between px-5 w-full flex flex-row gap-1">
                      <div className="flex flex-col">
                        <span>{activeSong.title}</span>
                        <span>{activeSong.artist} </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeSong?.mime_type.includes('video/') && (
                <>
                  <VideoPlayer
                    activeSong={activeSong}
                    isPlaying={isPlaying}
                    volume={volume}
                    seekTime={seekTime}
                    //onEnded={handleNextSong}
                    onTimeUpdate={event => setAppTime(event.target.currentTime)}
                    onLoadedData={event => setDuration(event.target.duration)}
                    repeat={repeat}
                  />
                  <div className="absolute top-0 left-0 justify-between px-5 w-full flex flex-row gap-1">
                    <div className="flex flex-col">
                      <span>{activeSong.title}</span>
                      <span>{activeSong.artist} </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="absolute bottom-5 left-0 w-full justify-center items-center flex mx-auto opacity-75 bg-black p-1">
              <div className="flex flex-row bg-gray-400 rounded-lg p-2">
                <Seekbar
                  appTime={appTime}
                  max={duration}
                  min="0"
                  value={appTime}
                  onInput={e => setSeekTime(e.target.value)}
                  setSeekTime={seekTime}
                />
                <button
                  onClick={handlePreviousSong}
                  className="text-xs p-1 flex justify-center items-center rounded"
                  style={{ transition: '5s' }}
                >
                  {isPlaying && <GiPreviousButton className="w-10 h-10" />}
                </button>
                <button
                  onClick={pausePlay}
                  className="text-xs p-1  justify-center items-center rounded"
                  style={{ transition: '5s' }}
                >
                  {!isPlaying ? (
                    <>
                      <GiPlayButton className="w-10 h-10" />
                    </>
                  ) : (
                    <>
                      <GiPauseButton className="w-10 h-10" />
                    </>
                  )}
                </button>
                <button
                  onClick={handleNextSong}
                  style={{ transition: '5s' }}
                  className="text-xs p-1  flex justify-center items-center rounded"
                >
                  {isPlaying && <GiNextButton className="w-10 h-10" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute z-10 top-8 right-0">
          <MediaDeEstrelas wich_flex="flex-row" song={activeSong} />
        </div>

        <div className="h-full items-center flex absolute top-10 right-0">
          <InteracoesMusical song={activeSong} orientation="flex-col " />
        </div>
      </div>
    </>
  );
}

function PostSingleSidebar({ song, setDisplaySong }) {
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  function play() {
    if (ref.current) {
      ref.current?.play();
    }
  }
  function pause() {
    if (ref.current) {
      ref.current?.pause();
    }
  }
  return (
    <>
      <div
        onClick={() => setDisplaySong(song)}
        className="relative w-full h-auto  overflow-hidden   rounded p-1 my-1 hover:cursor-pointer "
      >
        {' '}
        <div className="w-full h-1/2 backdrop-blur-lg justify-center items-center flex rounded shadow ">
          {song?.mime_type?.includes('image/') && (
            <img
              src={song.cover}
              alt=""
              className="object-cover h-full w-full rounded-t shadow"
            />
          )}

          {song?.mime_type?.includes('video/') && (
            <video
              onMouseEnter={play}
              onMouseLeave={pause}
              ref={ref}
              loop={false}
              //        onEnded={onEnded}
              onTimeUpdate={() => {}}
              onLoadedData={() => {}}
              muted
              controls
            >
              <source type={song.mime_type} src={song?.url} />
            </video>
          )}
        </div>
        <p className="w-full bg-white  flex flex-row text-gray-300  gap-1 items-center">
          {' '}
          <BiCalendar />{' '}
          {new Date(song?.created_at).getDate() +
            '/' +
            (new Date(song?.created_at).getUTCMonth() + 1) +
            '/' +
            new Date(song?.created_at).getFullYear() +
            ' ' +
            new Date(song?.created_at).getUTCHours() +
            ':' +
            new Date(song?.created_at).getUTCMinutes()}
        </p>
        <button
          className="w-full p-1 text-gray-300  justify-center bg-[#1422b1] rounded-t "
          onClick={() => setDisplaySong(song)}
        >
          Reproduzir
        </button>
      </div>
    </>
  );
}
