import { Link } from '@inertiajs/react';
import React from 'react';
import { BiStats, BiUpload, BiUserVoice } from 'react-icons/bi';
import { TiMessages } from 'react-icons/ti';

function HeaderAbout() {
  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="w-20 m-2">
          <img
            src={page.props.auth.user?.profile_photo_url}
            className=" rounded-full w-20 border border-black"
          />
        </div>
        <div className="w-2/3 flex flex-col">
          <h2 className="text-base md:text-4xl text-bold">
            {page.props.auth.user?.name}
          </h2>
          <div className="flex w-full flex-row gap-1">
            <h2 className="text-xs md:text-xl flex">
              {songs[0].genero ? songs[0].genero : 'Gênero Desconhecido'}{' '}
            </h2>
            <div className="w-full flex flex-row text-xs">
              <span className="mr-2"> Albuns: 5 </span>
              <span> Músicas: 59 </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Link
          href="/upload.song"
          className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row"
        >
          <BiUpload className="mr-3 text-xl md:text-4xl" />
          Carregar
        </Link>

        <button className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row">
          <BiStats className="mr-3 text-xl" />
          Relatórios
        </button>
        <button className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row">
          <TiMessages className="mr-3 text-xl" />
          Feedbacks
        </button>
      </div>
    </div>
  );
}

export default HeaderAbout;
