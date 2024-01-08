import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

import {
  playPauseVideo,
  setActiveVideo,
} from '../redux/features/playerSlice.js';
import { useDispatch } from 'react-redux';
import PlayPauseVideo from './PlayPauseVideo.js';
import VideoPlayer from './VideoPlayer/index.js';
import Interagir from './Interagir.js';
import { BiLike, BiPlay, BiShare, BiStar } from 'react-icons/bi';
import { FaVoteYea } from 'react-icons/fa';
import axios from 'axios';

function VideoCardGrelhaContest({
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

  const [votes, setVotes] = useState(0);

  useEffect(() => {
    axios
      .post('participant-votes', {
        song_id: video.song_id,
        contest_id: video.contest_id,
      })
      .then(response => {
        setVotes(response.data.length);
      })
      .catch(error => {});
  }, []);

  return (
    <div
      className={`flex flex-col ${w} p-4 bg-white/5 ng-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg border`}
    >
      <div className=" relative w-2/3 h-full group">
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
        <p className="text-sm truncate  mt-1">
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

        <p className="text-sm truncate w-full flex gap-1 border-t mt-1">
          <span className="w-full gap-1 flex ">
            <FaVoteYea className="w-5 h-5" />
            <span>{votes}</span>
          </span>
          <span className="w-full gap-1 flex ">
            <BiLike className="w-5 h-5" />
            <span>{video.likes}</span>
          </span>
          <span className="w-full gap-1 flex ">
            <BiPlay className="w-5 h-5" />
            <span>{video.plays}</span>
          </span>
          <span className="w-full gap-1 flex ">
            <BiShare className="w-5 h-5" />
            <span>{video.shares}</span>
          </span>
          <span className="w-full gap-1 flex ">
            <BiStar className="w-5 h-5" />
            <span>{video.stars}</span>
          </span>
        </p>
      </div>
    </div>
  );
}

export default VideoCardGrelhaContest;
