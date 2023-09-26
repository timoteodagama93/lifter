import { useStateContext } from '@/contexts/PaginaActualContext';
import { Link } from '@inertiajs/react';
import React from 'react'
import { BiPhotoAlbum, BiEdit } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import DetailsArtist from './Info/DetailsArtist';

export default function ShowArtists({ artists, setPagina, setArtist, setUploadCover }) {
    const { setCurrentPage } = useStateContext();
    return (
      <>
        {artists?.map((artist, i) => (
          <div
            key={i}
            className="w-full flex flex-row items-center border shadow-lg hover:bg-[#eaeaea] py-1 p-0 md:p-1 md:px-10 rounded-lg cursor-pointer mb-1"
          >
            <h3 className="hidden md:flex font-bold text-base  mr-1">
              {' '}
              {i + 1}.{' '}
            </h3>
            <Link
              href={`/artist-details/${artist.id}`}
              className="flex-1 flex flex-row justify-between items-center"
            >
              <img
                src={artist?.url_cover}
                alt=""
                className="flex w-10 h-10 rounded-full"
              />
              <div className="flex-1 flex flex-col justify-center mx-1">
                <Link href={`/artist-details/${artist.id}`} className="">
                  <p className="text-sm md:text-xl font-bold "> {artist.name} </p>
                </Link>
                <Link href={`artist-details/${artist.id}`} className="">
                  <p className="text-xs md:text-base text-"> {artist.genres} </p>
                </Link>
              </div>
            </Link>
            <div className="flex p-2 gap-2 justify-center items-center">
              <button
                onClick={() => {
                  setArtist(artist);
                  setUploadCover(true);
                }}
              >
                <BiPhotoAlbum className="text-xl" /> Foto
              </button>
              <button
                onClick={() => setCurrentPage(<DetailsArtist artist={artist} />)}
                className="px-2 shadow-black shadow-lg gap-1 flex flex-col text-xs"
              >
                <BsEye className="text-xl" /> Ver
              </button>
              <Link
                href={`/artist-details/${artist.id}`}
                onClick={() =>
                  setPagina(<EditArtist setPagina={setPagina} artist={artist} />)
                }
                className="px-2 shadow-black shadow-lg gap- flex flex-col text-xs"
              >
                <BiEdit className="text-xl" /> Editar
              </Link>
            </div>
          </div>
        ))}
      </>
    );
  }