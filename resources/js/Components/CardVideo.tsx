import React, { useRef, useState } from 'react';
import PlayPauseVideo from './PlayPauseVideo';
import { playPauseVideo, setActiveVideo } from '@/redux/features/playerSlice';
import { useDispatch } from 'react-redux';
import { MdOutlineCloseFullscreen } from 'react-icons/md';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import route from 'ziggy-js';
import DropdownLink from './DropdownLink';
import OwnerCard from './OwnerCard';

function CardVideo({
  type = 'normal',
  videos,
  video,
  isPlayingVideo,
  activeVideo,
  i,
}) {
  const ref = useRef(null);

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPauseVideo(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveVideo({ video, videos, i }));
    dispatch(playPauseVideo(true));
  };

  const score =
    (video.stars +
      video.plays +
      video.likes +
      video.reprodution_time +
      video.downloads +
      video.shares) /
    5;

  const src =
    type == 'normal'
      ? `/videos/${video.user_id}/${video.saved_name}`
      : `/songs/${video.artist_id}/${video.saved_name}`;

  return (
    <>
      <div className="w-full h-full p-1 flex flex-col items-center justify-center  hover:bg-[#0094f8] opacity-90 rounded-lg ">
        <div className="relative w-full h-4/5  border rounded-lg group ">
          <div
            style={{ transition: '1s' }}
            className={`absolute z-10 inset-0 justify-center items-center  bg-opacity-50 flex ${
              activeVideo?.id === video.id ? 'flex' : ' flex  bg-opacity-70'
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

          <video className="w-full h-full rounded-lg">
            <source src={src} type={activeVideo.mime_type} />
          </video>

          <div className="w-full flex flex-row absolute z-10 bottom-0 right-0 items-center justify-between">
            <button
              onClick={handlePauseClick}
              className=" transform-effect text-xl uppercase bg-blue-400 "
            >
              <MdOutlineCloseFullscreen className="w-7 h-7" />
            </button>
            <OptionsPopup song={video} />
          </div>
        </div>
        <div className="w-full h-1/5  mx-5 justify-start">
          <OwnerCard
            collectionId={video.id}
            ownerId={type == 'normal' ? video.user_id : video.artist_id}
            title={video.title}
            collectionType={type}
            category_or_style={video.category}
            collectionScore={score}
          />
        </div>
      </div>
    </>
  );
}

export default CardVideo;

function OptionsPopup({ song }) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  return (
    <div className="mr-3 relative">
      <div>
        <span className="inline-flex rounded-md">
          <button
            type="button"
            onClick={() => {
              showMoreOptions
                ? setShowMoreOptions(false)
                : setShowMoreOptions(true);
            }}
            className="inline-flex items-center border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
          >
            <BiDotsHorizontalRounded
              size={30}
              className=""
              onClick={() => {}}
            />
          </button>
        </span>
        <div
          className={`absolute z-50 bottom-12 -right-2 transition-all  text-xs text-gray-400 bg-white w-[200px] shadow-sm rounded ${
            showMoreOptions ? 'block' : 'hidden'
          } `}
        >
          {/* <!-- Account Management --> */}

          {song?.title ? (
            <>
              <div className="block px-4 py-2 text-xs text-gray-400">
                Mais opções
              </div>

              <div>
                <DropdownLink href={route('jurados')}>Partilhar</DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('perfil')}>Colecionar</DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('profile.show')}>
                  Comentários
                </DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('profile.show')}>
                  Feedbacks
                </DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('profile.show')}>Baixar</DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('perfis')}>
                  Detalhes da música
                </DropdownLink>
              </div>
              <div>
                <DropdownLink href={route('perfis')}>
                  Denunciar conteúdo
                </DropdownLink>
              </div>
            </>
          ) : (
            <>Sem música activa</>
          )}

          <div className="border-t border-gray-200 dark:border-gray-600"></div>
        </div>
      </div>
    </div>
  );
}
