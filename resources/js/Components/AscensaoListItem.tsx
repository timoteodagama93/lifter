import React, { useState } from 'react';
import Votar from './Votar';
import PlayPause from './PlayPause';
import { Link } from '@inertiajs/react';
import FeedbackOnSong from './FeedbackOnSong';
import Modal from './Modal';
import { AiOutlineClose } from 'react-icons/ai';

function AscensaoListItem({ song, i }) {
  const [playVideo, setPlayVideo] = useState(false);
  return (
    <>
      <div className="flex flex-row  items-center border hover:bg-[#0b494d] hover:text-[#fff] py-2 p-4 rounded-lg cursor-pointer mb-2">
        <div className="w-3/5 flex items-center">
          <h3 className="font-bold text-base mr-3"> {i + 1}. </h3>
          <div className="flex-1 flex flex-row justify-between items-center">
            <img
              src={song?.images?.coverart}
              alt=""
              className="w-10 h-10 rounded-lg"
            />
            <div className="flex-1 flex flex-col justify-center mx-3">
              <Link href={`song-details/${song.id}`} className="">
                <p className="text-xl font-bold"> {song.title} </p>
              </Link>
              <Link href={`song-details/${song.id}`} className="">
                <p className="flex flex-row items-center text-base">
                  <div
                    className="shadow-lg mr-1 rounded-full animate-slideright"
                    style={{ width: '10%', height: 'auto' }}
                  >
                    <img
                      src={song.images.artistImage}
                      alt="name artist"
                      className="rounded-full w-full object-cover"
                    />
                  </div>
                  {song.subtitle}
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-1/5 h-20 flex mx-2 ">
          <img
            onClick={() => setPlayVideo(true)}
            src={song?.images?.coverart}
            alt=""
            className="w-20 rounded-lg"
          />
        </div>
        <div className="w-1/5 flex">
          <PlayPause song={song} />
        </div>
        <div className="w-1/5 flex">
          <FeedbackOnSong song={song} />
        </div>
        <div className="w-1/5">
          <Votar song={song} />
        </div>
      </div>

      <Modal isOpen={playVideo} onClose={() => setPlayVideo(false)}>
        <div className="w-full">
          <div className="w-full">
            <h1 className="text-4xl">Reproduzindo vídeo</h1>
            <AiOutlineClose
              onClick={() => setPlayVideo(false)}
              className="cursor-pointer absolute top-0 right-0 m-5"
            />
          </div>
          <div className="w-full">
            <audio 
            className='w-full h-56'
            controls>
              <source type="video/mp3" src={song.link} />
            </audio>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AscensaoListItem;
