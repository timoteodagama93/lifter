import React, { useState, useEffect } from 'react';
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

export default function Avaliar({ songs }) {
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(true);
  const [shuffle, setShuffle] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [activeSong, setActiveSong] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);

  function play(song, index) {
    setSelectedIndex(index);
    setActiveSong(song);
    setIsPlaying(true);
  }

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
  function pausePlay() {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }

  const initials = () => {
    if (songs?.length > 0) {
      if (selectedIndex + 1 === songs?.length) {
        setSelectedIndex(0);
        setActiveSong(songs[selectedIndex]);
      }
    }
  };

  useEffect(initials, [songs]);

  return (
    <AppLayout title="Avaliar">
      <div className="w-full h-[100vh] flex gap-1 justify-cebter items-center rounded-lg">
        {songs?.length > 0 && activeSong ? (
          <div className="flex w-full h-full flex-col relative ">
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
            <div className="absolute z-10 top-8 right-0">
              <MediaDeEstrelas wich_flex="flex-row" song={activeSong} />
            </div>

            <div className="z-10 absolute  bottom-16 left-0 w-full justify-center items-center flex mx-auto opacity-75 bg-black ">
              <Seekbar
                appTime={appTime}
                max={duration}
                min="0"
                value={appTime}
                onInput={e => setSeekTime(e.target.value)}
                setSeekTime={seekTime}
              />
              <button
                className="text-xs p-1 flex justify-center items-center rounded"
                onClick={handlePreviousSong}
              >
                {isPlaying && <GiPreviousButton className="w-10 h-10" />}
              </button>
              <button
                className="text-xs p-1  justify-center items-center rounded"
                onClick={pausePlay}
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
                className="text-xs p-1  flex justify-center items-center rounded"
                onClick={handleNextSong}
              >
                {isPlaying && <GiNextButton className="w-10 h-10" />}
              </button>
            </div>
            <div className="h-full items-center flex absolute top-10 right-0">
              <InteracoesMusical song={activeSong} orientation="flex-col " />
            </div>
          </div>
        ) : (
          <h1 className="text-xl text-center">
            Não existe nenhum destaque no momento..
          </h1>
        )}

        {/*}
        <div className="w-full md:w-3/12 h-[10vh] md:h-full overflow-y-auto relative flex flex-row md:flex-col border ">
          <div className="w-full h-full md:h-[80%] overflow-y-auto relative flex flex-row md:flex-col border ">
            {songs?.map((song, i) => (
              <div
                onClick={() => play(song, i)}
                className="p-2 shadow-sm shadow-white w-1/5 md:w-full h-auto md:h-1/3 flex flex-row relative "
              >
                {song.mime_type.includes('audio/') ? (
                  <>
                    <img
                      onClick={() => play(song, i)}
                      key={i}
                      src={song?.cover}
                      alt={song.title}
                      className="w-full md:w-2/3 h-auto"
                    />
                    <div className="flex flex-col w-full h-full justify-center items-center overflow-hidden">
                      <span className="w-full absolute bottom-0 left-0 md:relative text-xs md:text-base md:flex-row flex-col flex gap-1 rounded bg-[#2e2c2e5f]  p-1 justify-center items-center  ">
                        {' '}
                        <GiStarAltar className=" text-[#f6cc33] " />{' '}
                        {song.stars}{' '}
                      </span>
                      <span className="relative bottom-0 hidden md:flex w-full text-sm">
                        {' '}
                        {song.title}{' '}
                      </span>
                      <span className="relative bottom-0 hidden md:flex w-full text-xs">
                        {' '}
                        {song.artist}{' '}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={
                        song?.cover === null
                          ? microImage
                          : song?.cover
                      }
                      key={i}
                      onClick={() => play(song, i)}
                      className="w-full md:w-2/3 h-full auto border"
                    />
                    <div className="flex flex-col w-full h-full justify-center items-center">
                      <span className="w-full absolute bottom-0 left-0 md:relative text-xs flex-col md:flex-row flex gap-1 rounded bg-[#2e2c2e5f]  p-1 justify-center items-center  ">
                        {' '}
                        <GiStarAltar className=" text-[#f6cc33] " />{' '}
                        {song.stars}{' '}
                      </span>
                      <span className="relative bottom-0 hidden md:flex w-full text-sm">
                        {' '}
                        {song.title}{' '}
                      </span>
                      <span className="relative bottom-0 hidden md:flex w-full text-xs">
                        {' '}
                        {song.artist}{' '}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <Link
            href="/ranking"
            className="w-full md:w-[80%] h-full md:h-[15%] m-2 bg-slate-300 text-black rounded shadow shadow-white justify-center items-center flex cursor-pointer hover:animate-pulse text-xl border "
          >
            Ver rank
          </Link>{' '}
        </div>
        {*/}
      </div>
    </AppLayout>
  );
}
