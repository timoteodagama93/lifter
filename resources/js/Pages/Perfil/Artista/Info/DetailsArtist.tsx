import AddArtist from '@/Components/AddArtist';
import AddArtistCover from '@/Pages/Perfil/Artista/Info/AddArtistCover';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SectionBorder from '@/Components/SectionBorder';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { BiEdit, BiPhotoAlbum, BiUpload, BiUserVoice } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { MdOutlineAppRegistration } from 'react-icons/md';

import React, { useRef, useState } from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import SecondaryButton from '@/Components/SecondaryButton';
import AddSong from '@/Pages/Perfil/Artista/Song/AddSong';
import EditArtist from './EditArtist';
import { HiPhotograph } from 'react-icons/hi';

function DetailsArtist({ artist }) {
  const [uploadCover, setUploadCover] = useState(false);
  const page = useTypedPage();
  const [pagina, setPagina] = useState(<AboutArtist artist={artist} />);

  function getMusicas() {
    axios.post('/get-artist-songs', artist).then(response => {
      const all_songs = response.data.all_songs;
      const songs = response.data.songs;
      if (songs.length <= 0) {
        setPagina(
          <>
            <h1 className="text-xl px-5">
              Você ainda não registrou-se como artista. Nem registrou qualquer
              músico sob-sua tutela.{' '}
            </h1>
            <SectionBorder />
            {all_songs.map(song => (
              <>
                <Link
                  key={song.id}
                  href={`artistas/detalhes/${song.id}`}
                  className="w-full h-full p-2 flex items-center "
                >
                  <div className="flex-1 flex flex-col justify-between items-center">
                    <div className="w-full ">
                      <img
                        src={song.images?.artistImage}
                        alt="name artist"
                        className="w-full h-full rounded-lg object-cover"
                      />
                    </div>
                    <div className="w-full absolute bottom-2 rounded-lg flex-1 space-x-1 flex flex-col justify-start items-center mx-3 bg-[#00000000] backdrop-blur-lg ">
                      <p className="text-base font-bold text-white">
                        {' '}
                        {song.name}{' '}
                      </p>
                      <p className="text-xs text-gray-300"> {song.genres}</p>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </>,
        );
      } else {
        setPagina(
          <>
            <ShowMusics
              artist={artist}
              songs={songs}
              setPagina={setPagina}
              setUploadCover={setUploadCover}
            />
          </>,
        );
      }
    });
  }

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row">
      <div className="w-1/3 p-2 flex border flex-row md:flex-col rounded-lg shadow-lg pb-1 justify-start">
        <button
          onClick={() => setPagina(<AboutArtist artist={artist} />)}
          className="border hover:bg-gray-200 rounded text-xs items-center justify-center flex flex-col md:flex-row m-1 p-2"
        >
          <MdOutlineAppRegistration className="text-xl mr-1" />
          Detalhes
        </button>
        <button
          onClick={() =>
            setPagina(<EditArtist artist={artist} setPagina={setPagina} />)
          }
          className="border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row md:p-2"
        >
          <BiUpload className="text-xl mr-1" />
          Editar Perfil
        </button>
        <button
          onClick={() => setPagina(<AddArtistCover artist={artist} />)}
          className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row"
        >
          <HiPhotograph className="mr-3 text-xl" />
          Adicionar capa
        </button>
      </div>
      <div className="w-2/3">{pagina}</div>
    </div>
  );
}

export default DetailsArtist;

function AboutArtist({ artist }) {
  return (
    <>
      <div className="w-full h-full justify-start flex flex-row border-[#2e2c2e] border shadow-lg shadow-black p-5 rounded-lg items-center">
        <div className="">
          <img
            src={localStorage.getItem('prefix_urk') + artist?.url_cover}
            alt={artist.name}
          />
        </div>
        <div className="w-full h-full justify-start flex flex-col">
          <div>
            Nome: <span> {artist?.name} </span>
          </div>
          <div>
            Contacto para shows: <span> {artist?.contact} </span>
          </div>
          <div>
            Género musical: <span> {artist?.genre} </span>
          </div>
          <div>
            País: <span> {artist?.country} </span>
          </div>
          <div>
            Cidade: <span> {artist?.city} </span>
          </div>
          <div>
            Sobre: <span> {artist?.about} </span>
          </div>
        </div>
      </div>
    </>
  );
}
