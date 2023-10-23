import React from 'react';
import { Link } from '@inertiajs/react';
import { playPauseVideo, setActiveVideo } from '@/redux/features/playerSlice';
import { useDispatch } from 'react-redux';
import PlayPauseVideo from '@/Components/PlayPauseVideo';

function LiverPreview({
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
      className={`flex flex-col ${w} p-4 bg-white/5 ng-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg border`}
    >
      <div className=" relative w-full h-full group">
        <video className="w-full h-full">
          <source src={video.url} type={video.mime_type} />
        </video>
      </div>
    </div>
  );
}

export default LiverPreview;
