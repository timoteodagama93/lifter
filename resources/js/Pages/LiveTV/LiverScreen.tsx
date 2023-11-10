import React from 'react';
import { Link } from '@inertiajs/react';

 ;
import { useDispatch } from 'react-redux';
import { playPauseVideo, setActiveVideo } from '@/redux/features/playerSlice.js';
import PlayPauseVideo from '@/Components/PlayPauseVideo.js';

function LiverScreen({
  video,
  i,
  activeVideo,
  isPlayingVideo,
  videos,
  w = 'w-full lg:w-1/2',
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
      className={`flex flex-col ${w} w-full h-full  p-4 bg-white/5 ng-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg border`}
    >
      <div className=" relative w-full h-full group">
        <div
          style={{ transition: '1s' }}
          className={`absolute z-10 inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:${
            isPlayingVideo && activeVideo?.id === video.id ? 'flex' : 'flex'
          } ${
            activeVideo?.id === video.id
              ? 'hidden'
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
        {
          /*isPlayingVideo && activeVideo.id === video.id ? (
          <VideoPlayer />
        ) :*/
        }
          <video className="w-full h-full">
            <source src={video.url} type={video.mime_type} />
          </video>
      </div>


    </div>
  );
}

export default LiverScreen;
