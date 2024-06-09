import React from 'react';
import { Link } from '@inertiajs/react';

import {
  playPauseVideo,
  setActiveVideo,
} from '../redux/features/playerSlice.js';
import { useDispatch } from 'react-redux';
import PlayPauseVideo from './PlayPauseVideo.js';
import VideoPlayer from './VideoPlayer/index.js';
import Interagir from './Interagir.js';

function VideoCardGrelha({
  video,
  i,
  activeVideo,
  isPlayingVideo,
  videos,
  w = 'w-full md:w-1/2 2xl:w-1/4',
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
      className={` w-full md:w-1/2 xxl:w-1/3 h-full md:[70vh]  flex flex-col ${w} p-4 bg-white/5 ng-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg border`}
    >
      <div className=" relative w-full h-full group">
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
          <></>
        ) : (
          <video className="w-full h-full">
            <source src={video.url} type={video.mime_type} />
          </video>
        )}
      </div>

      <div className="flex flex-col">
        <p className="font-semibold text-lg  truncate">
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
            {video.producer}{' '}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default VideoCardGrelha;
