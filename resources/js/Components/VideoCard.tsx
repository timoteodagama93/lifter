import React from 'react';
import { Link } from '@inertiajs/react';

import {
  playPauseVideo,
  setActiveVideo,
} from '../redux/features/playerSlice.js';
import { useDispatch } from 'react-redux';
import PlayPauseVideo from './PlayPauseVideo.js';
import VideoPlayer from './VideoPlayer/index.js';
import { useStateContext } from '@/contexts/PaginaActualContext.js';
import VideoShow from './PlayingVideo/Index.js';

function VideoCard({
  video,
  i,
  activeVideo,
  isPlayingVideo,
  videos,
  w = 'w-full',
}) {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPauseVideo(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveVideo({ video, videos, i }));
    dispatch(playPauseVideo(true));
  };

  return (
    <div
      className={`flex flex-row gap-1 ${w} p-10 bg-white/5 ng-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg my-1  mx-10`}
    >
      <div className=" relative w-1/2 h-full group">
        <div
          style={{ transition: '1s' }}
          className={`absolute z-10 inset-0 justify-center items-center bg-black bg-opacity-50 ${
            isPlayingVideo && activeVideo?.id == video.id ? 'hidden' : 'flex'
          } ${
            activeVideo?.id === video.id
              ? 'flex'
              : ' flex bg-black bg-opacity-70'
          } `}
        >
          <PlayPauseVideo
            isPlayingVideo={isPlayingVideo}
            activeVideo={activeVideo}
            video={video}
            handlePlay={handlePlayClick}
            handlePause={handlePauseClick}
          />
        </div>
        
        {isPlayingVideo && activeVideo.id === video.id ? (
          <VideoPlayer />
        ) : (
          <video className="w-full h-full">
            <source src={video.url} type={video.mime_type} />
          </video>
        )}
      </div>

      <div className="w-1/2 flex flex-col justify-center ">
        <p className="font-bold text-2xl  truncate">
          <Link href={`/song-details/${video?.id}`}>{video.title}</Link>
        </p>
        <p className="text-xl truncate  mt-1">
          <Link
            href={
              video.artist
                ? `/artists/details/${video?.artist_id}`
                : 'top-artists'
            }
          >
            {video.artist}{' '}
            {video?.participacoes ? ' ft ' + video.participacoes : ''}
          </Link>
        </p>
        <p className="font-bold text-xs  truncate">
          {' '} {video.genre}
        </p>
      </div>
    </div>
  );
}

export default VideoCard;
