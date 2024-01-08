import Interagir from '@/Components/Interagir';
import PlayPauseVideo from '@/Components/PlayPauseVideo';
import VideoPlayer from '@/Components/VideoPlayer';
import { playPauseVideo, setActiveVideo } from '@/redux/features/playerSlice';
import { Link } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../../../img';

function VideoSinglePlayer({}) {
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
  return (
    <div
      className={`w-screen h-screen absolute flex flex-col z-50 top-0 left-0 bottom-0 right-0 backdrop-blur-sm bg-black  `}
    >
      <div className="w-full flex justify-between items-center bg-gradient-to-br from-[#222d84] to-[#543889] px-2 md:px-10">
        <button
          onClick={handlePauseClick}
          className="flex transform-effect px-5 text-xl uppercase "
        >
          <BiArrowBack className="w-10 h-10" /> Voltar
        </button>

        <Link href="/">
          <img
            className="w-auto h-16 object-contain flex"
            src={Logo}
            alt="logo"
          />
        </Link>
      </div>
      <div
        className={`w-full h-full flex flex-col md:flex-row justify-center items-center p-1 bg-white/5 ng-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg my-1  mx-1`}
      >
        <div className=" relative w-full md:w-1/2 group">
          <div
            style={{ transition: '1s' }}
            className={`absolute z-10 inset-0 justify-center items-center bg-black bg-opacity-50 ${
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

          {isPlayingVideo ? (
            <VideoPlayer />
          ) : (
            <video className="w-full h-full">
              <source src={activeVideo.url} type={activeVideo.mime_type} />
            </video>
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
  );
}

export default VideoSinglePlayer;
