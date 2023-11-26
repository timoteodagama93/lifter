import React, { useEffect, useState } from 'react';
import {
  BiArrowBack,
  BiDotsHorizontal,
  BiMusic,
  BiUpload,
  BiVideo,
} from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSongsQuery } from '@/redux/services/coreApi';
import { GiPencilRuler } from 'react-icons/gi';
import { Link } from '@inertiajs/react';
import { MdFeedback } from 'react-icons/md';
import {
  playPauseVideo,
  setActiveVideo,
  setFullScreenPlayer,
} from '@/redux/features/playerSlice';
import PlayPause from '@/Components/PlayPause';
import classNames from 'classnames';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { smalLogo } from '../../../../../img';
import { DetailsArtist } from '../Info';
import { BsYoutube } from 'react-icons/bs';
import { AddSong } from '../Song';
import Swal from 'sweetalert2';
import { HiMusicNote } from 'react-icons/hi';
import VideoCardGrelha from '@/Components/VideoCardGrelha';

function OwnVideoList({
  setPaginaDetalhes,
  artist,
  valuatedSongs: videos,
  songs = [],
  show = '',
  setSelectedValuation,
  selectedValuation,
  setIsAddinSong,
}) {
  const dispatch = useDispatch();
  const [view, setView] = useState('Avaliar');

    const { isPlayingVideo, activeVideo } = useSelector(state => state.player);

  const handlePauseClick = () => {
    dispatch(playPauseVideo(false));
  };
  const handlePlayClick = (video, videos, i) => {
    setSelectedValuation(video);
    dispatch(setActiveVideo({ song: video, songs: videos, i }));
    dispatch(playPauseVideo(true));
  };

  if (isPlayingVideo && view === 'Avaliar') {
    setSelectedValuation;
  }

  useEffect(() => {
    setSelectedValuation(activeVideo);
  }, [activeVideo]);

  return (
    <>
      <div className="w-4/12 h-full overflow-hidden border-r ">
        {/**Área de previsualização de conversas e notificações */}
        <div className="w-full h-[80%] md:h-[90%] overflow-y-auto flex flex-col md:px-5">
          {videos?.map((video, i) => (
            <>
              <div
                className={`flex flex-col p-4 bg-white/5 ng-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer shadow-lg border`}
              >
                <div className=" relative w-2/3 h-full group">
                  <div
                    style={{ transition: '1s' }}
                    className={`absolute z-10 inset-0 justify-center items-center bg-black bg-opacity-50 ${
                      isPlayingVideo && activeVideo?.id == video.id
                        ? 'hidden'
                        : 'flex'
                    } ${
                      activeVideo?.id === video.id
                        ? 'flex'
                        : ' flex bg-black bg-opacity-70'
                    } `}
                  >
                    {isPlayingVideo && activeVideo?.title === video.title ? (
                      <FaPauseCircle
                        size={35}
                        className={`text-gray-300 cursor-pointer ${classNames}`}
                        onClick={() => handlePauseClick()}
                      />
                    ) : (
                      <FaPlayCircle
                        size={35}
                        className={`text-gray-300 cursor-pointer ${classNames}`}
                        onClick={() => handlePlayClick(video, videos, i)}
                      />
                    )}
                  </div>

                  <video className="w-full h-full">
                    <source src={video.url} type={video.mime_type} />
                  </video>
                </div>

                <div className="flex flex-col">
                  <p className="font-semibold text-lg  truncate">
                    <Link href={`/song-details/${video?.id}`}>
                      {video.title}
                    </Link>
                  </p>
                  <p className="text-sm truncate  mt-1">
                    <Link
                      href={
                        video.artist
                          ? `/artists/details/${video?.artist_id}`
                          : 'top-artists'
                      }
                    >
                      {video.artist}{' '}
                      {!(video.participacoes === '')
                        ? ' ft ' + video.participacoes
                        : ''}
                    </Link>
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default OwnVideoList;
