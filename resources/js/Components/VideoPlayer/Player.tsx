/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const Player = ({
  activeVideo,
  isPlayingVideo,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
  fullscreen,
  setFullScreen: setRef,
}) => {
  // eslint-disable-next-line no-unused-expressions
  const ref = useRef(null);
  if (ref.current) {
    if (isPlayingVideo) {
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
      {activeVideo.mime_type.includes('video/') ? (
        <video
          className={` ${
            fullscreen ? ' w-screen h-screen' : ' w-full h-full'
          }  `}
          src={activeVideo?.url}
          ref={ref}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
          onLoadedData={onLoadedData}
        />
      ) : (
        <audio
          className="w-full h-full"
          src={activeVideo?.url}
          ref={ref}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
          onLoadedData={onLoadedData}
        />
      )}
    </>
  );
};

export default Player;
