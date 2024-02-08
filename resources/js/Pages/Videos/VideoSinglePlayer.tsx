import Interagir from '@/Components/Interagir';
import PlayPauseVideo from '@/Components/PlayPauseVideo';
import VideoPlayer from '@/Components/VideoPlayer';
import { playPauseVideo, setActiveVideo } from '@/redux/features/playerSlice';
import { Link } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../../../img';
import {
  MdOutlineCloseFullscreen,
  MdOutlineFullscreenExit,
  MdOutlineOpenInFull,
} from 'react-icons/md';

function VideoSinglePlayer({}) {
  const [fullscreen, setFullScreen] = useState(false);
  const [ref, setRef] = useState(useRef(null));
  const {
    activeVideo,
    isPlayingVideo,

    currentVideos: videos,
    currentIndex: i,
  } = useSelector(state => state.player);

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPauseVideo(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveVideo({ activeVideo, videos, i }));
    dispatch(playPauseVideo(true));
  };

  const handleFull = () => {
    console.log(ref);
    fullscreen ? setFullScreen(false) : setFullScreen(true);
  };

  return (
    <div
      className={`w-screen h-screen absolute flex flex-col justify-center items-center z-30 top-0 left-0 bottom-0 right-0 backdrop-blur-sm ${
        fullscreen ? 'p-0' : ' p-5 md:p-12'
      } `}
    >
      <div
        className={`w-full h-full relative flex flex-col justify-center items-center ${
          fullscreen ? 'p-0' : ' p-1 md:p-5'
        }   rounded-md bg-black`}
      >
        <div
          className={`w-full h-full flex flex-col  justify-center items-center p-1 bg-white/5 ng-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg my-1  mx-1`}
        >
          {!fullscreen && (
            <button
              onClick={handlePauseClick}
              className="absolute top-0 left-0 flex transform-effect px-5 text-xl uppercase bg-blue-400 z-50 "
            >
              <MdOutlineCloseFullscreen className="w-10 h-10" />
            </button>
          )}
          <button
            onClick={handleFull}
            className="absolute top-0 right-0 float-right  transform-effect px-5 text-xl uppercase bg-blue-400 z-50 "
          >
            {fullscreen ? (
              <MdOutlineCloseFullscreen className="w-10 h-10" />
            ) : (
              <MdOutlineOpenInFull className="w-10 h-10" />
            )}
          </button>
          <div
            className={` relative ${
              fullscreen ? 'w-screen h-screen' : ' w-full md:w-1/2'
            }  group`}
          >
            <div
              style={{ transition: '1s' }}
              className={`absolute z-10 inset-0 justify-center items-center  bg-opacity-50 ${
                isPlayingVideo && activeVideo?.id == activeVideo.id
                  ? 'hidden'
                  : 'flex'
              } ${
                activeVideo?.id === activeVideo.id
                  ? 'flex'
                  : ' flex bg-black bg-opacity-70'
              } `}
            >
              <PlayPauseVideo
                isPlayingVideo={isPlayingVideo}
                activeVideo={activeVideo}
                video={activeVideo}
                handlePlay={handlePlayClick}
                handlePause={handlePauseClick}
              />
            </div>

            {!fullscreen && isPlayingVideo ? (
              <VideoPlayer />
            ) : (
              <video className="w-full h-full">
                <source src={activeVideo.url} type={activeVideo.mime_type} />
              </video>
            )}

            {fullscreen && (
              <div className="absolute z-40 min-h-screen w-screen h-screen top-0 left-0 bg-black">
                <video autoPlay className=" min-h-screen w-screen h-screen">
                  <source src={activeVideo.url} type={activeVideo.mime_type} />
                </video>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col mt-2 md:mt-0 md:justify-center justify-start ">
            <div className="w-full flex justify-center md:justify-start">
              <Interagir collectionType="video" song={activeVideo} />
            </div>
            <p className="font-bold text-2xl  truncate">
              <Link href={`/song-details/${activeVideo?.id}`}>
                {activeVideo.title}
              </Link>
            </p>
            <p className="text-xl truncate  mt-1">
              <Link
                href={
                  activeVideo.artist
                    ? `/artists/details/${activeVideo?.artist_id}`
                    : 'top-artists'
                }
              >
                {activeVideo.artist}{' '}
                {activeVideo?.participacoes
                  ? ' ft ' + activeVideo.participacoes
                  : ''}
              </Link>
            </p>
            <p className="font-bold text-xs  truncate"> {activeVideo.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoSinglePlayer;
