import React, { useState } from 'react';
import './style_gallery.css';
import PlayPause from '@/Components/PlayPause';
import AppLayout from '@/Layouts/AppLayout';
import { BsEye } from 'react-icons/bs';
import ArtistCard from '@/Components/ArtistCard';
import Modal from '@/Components/Modal';
import { MdCloseFullscreen } from 'react-icons/md';
import Detalhar from './Detalhar';

function Artistas({ artists }) {
  const [seeArtistDetails, setSeeArtistDetails] = useState(false);
  const [artistTDetail, setArtistTDetail] = useState(null);
  return (
    <AppLayout title="Artistas">
      <Modal
        isOpen={seeArtistDetails && artistTDetail ? true : false}
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
            <Detalhar artist={artistTDetail} />
          </div>
        </div>
      </Modal>
      <h1 className="text-center font-bold text-2xl">Artistas</h1>
      <div className="w-full flex flex-wrap">
        {artists?.map(artist => (
          <>
            <div className="w-full md:w-1/2 xl:w-1/3 h-1/2 flex flex-col items-center overflow-hidden shadow-lg p-1">
              <div className="w-full h-[320px] object-contain ">
                <img
                  src={artist.url_cover}
                  alt="name artist"
                  onClick={() => {
                    setArtistTDetail(artist);
                    setSeeArtistDetails(true);
                  }}
                  className=" hover:cursor-pointer w-full h-full rounded-sm rounded-t-lg border-t-2  object-cover"
                />
              </div>
              <button
                onClick={() => {
                  setArtistTDetail(artist);
                  setSeeArtistDetails(true);
                }}
                className="transform-effect w-full h-[10%] first-letter: rounded-lg flex-1 space-x-1 flex flex-col justify-start items-center mx-3 border-b-2 backdrop-blur-lg p-1 "
              >
                <p className="text-xl font-bold text-white"> {artist.name} </p>
                <p className="text-xs text-gray-300"> {artist.genres}</p>
              </button>
            </div>
          </>
        ))}
      </div>
    </AppLayout>
  );
}

export default Artistas;
