/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  // onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}) => {
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
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
      <video
        ref={ref}
        loop={repeat}
        autoPlay
        //        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
      >
        <source
          type={activeSong.mime_type}
          src={localStorage.getItem('prefix_storage') + activeSong?.url}
        />
      </video>
    </>
  );
};

export default VideoPlayer;
