import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import PlayPause from './PlayPause';
import Detalhar from '@/Pages/Detalhar';
import { MdCloseFullscreen } from 'react-icons/md';
import Modal from './Modal';

const ArtistCard = ({ artist, i = 0 }) => {
  const [seeArtistDetails, setSeeArtistDetails] = useState(false);

  return (
    <>
      <Modal
        isOpen={seeArtistDetails}
        onClose={() => setSeeArtistDetails(false)}
      >
        <div className="w-full h-full flex flex-col bg-[#4c88c4] ">
          <div className="w-full ">
            <button
              onClick={() => setSeeArtistDetails(false)}
              className="p-5 transform-effect w-fit right-1 top-1 text-black"
            >
              <MdCloseFullscreen className="w-5 h-5 font-bold text-4xl" />
            </button>
          </div>
          <div className="w-full flex float-right justify-end">
            <Detalhar prof={artist} />
          </div>
        </div>
      </Modal>

      <div className="w-full h-full flex flex-col items-center overflow-hidden shadow-lg p-1">
        <div className="w-full h-[320px] object-contain ">
          <img
            src={artist.url_cover}
            alt="name artist"
            onClick={() => {
              setSeeArtistDetails(true);
            }}
            className=" hover:cursor-pointer w-full h-full rounded-sm rounded-t-lg border-t-2  object-cover"
          />
        </div>
        <button
          onClick={() => {
            setSeeArtistDetails(true);
          }}
          className="transform-effect w-full h-[10%] first-letter: rounded-lg flex-1 space-x-1 flex flex-col justify-start items-center mx-3 border-b-2 backdrop-blur-lg p-1 "
        >
          <p className="text-xl font-bold text-white"> {artist.name} </p>
          <p className="text-xs text-gray-300"> {artist.genres}</p>
        </button>
      </div>

    </>
  );
};

export default ArtistCard;
