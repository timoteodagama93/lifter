import {
  nextVideo,
  playPauseVideo,
  prevVideo,
} from '@/redux/features/playerSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPause, BsPauseBtn } from 'react-icons/bs';
import { HiOutlinePlay, HiPlay } from 'react-icons/hi';

function VideoSinglePlayer({ type = 'normal' }) {
  const {
    activeVideo,
    currentVideos,
    currentVideoIndex,
    isVideoActive,
    isPlayingVideo,
  } = useSelector(state => state.player);

  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const [fullscreen, setFullScreen] = useState(false);
  const ref = useRef(null);

  const dispatch = useDispatch();

  const handleNextVideo = () => {
    if (!shuffle) {
      dispatch(nextVideo((currentVideoIndex + 1) % currentVideos.length));
    } else {
      dispatch(nextVideo(Math.floor(Math.random() * currentVideos.length)));
    }
  };

  const handlePrevVideo = () => {
    if (currentVideoIndex === 0) {
      dispatch(prevVideo(currentVideos.length - 1));
    } else if (shuffle) {
      dispatch(prevVideo(Math.floor(Math.random() * currentVideos.length)));
    } else {
      dispatch(prevVideo(currentVideoIndex - 1));
    }
  };

  const handlePlayPause = () => {
    if (!isVideoActive) return;

    if (isPlayingVideo) {
      dispatch(playPauseVideo(false));
    } else {
      dispatch(playPauseVideo(true));
    }
  };

  // converts the time to format 0:00
  const getTime = time =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div className="flex w-screen h-screen bg-white shadow-md rounded-lg overflow-hidden mx-auto">
      <div className="w-full h-full flex flex-col m-5">
        <div className="relative w-full h-full ">
          {activeVideo && isPlayingVideo ? (
            <PlayerVideo
              type={type}
              activeVideo={activeVideo}
              volume={volume}
              isPlaying={isPlayingVideo}
              seekTime={seekTime}
              repeat={repeat}
              //currentIndex={currentIndex}
              onEnded={handleNextVideo}
              onTimeUpdate={event => {
                setAppTime(event.target.currentTime);
                dispatch(setTotalTime(appTime));
              }}
              onLoadedData={event => setDuration(event.target.duration)}
            />
          ) : (
            <></>
          )}

          <div className="absolute bottom-0 w-full bg-gradient-to-r from-black">
            <span className="text-white text-xs uppercase px-2"> {activeVideo.title} </span>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full">
            <div className="w-full relative h-1 bg-gray-200">
              <input
                type="range"
                step="any"
                value={appTime}
                min={0}
                max={duration}
                onInput={event => setSeekTime(event.target.value)}
                className="md:block w-full h-1 mx-4 2xl:mx-6 rounded-lg"
              />
            </div>
          </div>
          <div className="z-50 flex justify-between text-xs font-medium  text-gray-500 py-1 mx-10">
            <div> {appTime === 0 ? '0:00' : getTime(appTime)} </div>
            <div className="flex space-x-3 pt-5">
              <button onClick={handlePrevVideo} className="focus:outline-none">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon points="19 20 9 12 19 4 19 20"></polygon>
                  <line x1="5" y1="19" x2="5" y2="5"></line>
                </svg>
              </button>
              {isPlayingVideo ? (
                <button
                  onClick={handlePlayPause}
                  className="rounded-full w-8 h-8 flex items-center justify-center pl-0.5 ring-2 ring-green-500 focus:outline-none"
                >
                  <BsPause className="w-10 h-10" />
                </button>
              ) : (
                <button
                  onClick={handlePlayPause}
                  className="rounded-full w-8 h-8 flex items-center justify-center pl-0.5 ring-2 ring-green-500 focus:outline-none"
                >
                  <HiPlay className="w-10 h-10" />
                </button>
              )}

              <button onClick={handleNextVideo} className="focus:outline-none">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                  <line x1="19" y1="5" x2="19" y2="19"></line>
                </svg>
              </button>
            </div>
            <div> {duration === 0 ? '0:00' : getTime(duration)} </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoSinglePlayer;

function PlayerVideo({
  activeVideo,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
  type,
}) {
  const src =
    type == 'normal'
      ? `/videos/${activeVideo.user_id}/${activeVideo.saved_name}`
      : `/songs/${activeVideo.artist_id}/${activeVideo.saved_name}`;

  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);
  return (
    <>
      {activeVideo?.mime_type?.includes('audio/') && (
        <audio
          src={src}
          ref={ref}
          loop={repeat}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
          onLoadedData={onLoadedData}
        />
      )}
      {activeVideo?.mime_type?.includes('video/') && (
        <>
          <video
            src={src}
            ref={ref}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
            onLoadedData={onLoadedData}
            className="w-full h-full"
          />
        </>
      )}
    </>
  );
}
