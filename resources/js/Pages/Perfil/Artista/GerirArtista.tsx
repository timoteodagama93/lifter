import AddArtist from '@/Components/AddArtist';
import AddArtistCover from '@/Pages/Perfil/Artista/Info/AddArtistCover';
import SectionBorder from '@/Components/SectionBorder';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { BiEdit, BiInfoCircle } from 'react-icons/bi';
import { MdMusicNote } from 'react-icons/md';

import React, { useState } from 'react';
import useTypedPage from '@/Hooks/useTypedPage';

import { GiSpearFeather } from 'react-icons/gi';
import { GrAnnounce } from 'react-icons/gr';
import { DetailsArtist } from './Info';
import { ShowMusics } from './Song';
import Marketing from './Marketing';

function GerirArtista() {
  const [uploadCover, setUploadCover] = useState(false);
  const page = useTypedPage();
  const [artist, setArtist] = useState(page.props.artist_account);

  console.log(page.props);
  console.log(artist);

  const [pagina, setPagina] = useState(
    <>
      <div className="w-full flex flex-col p-5 bg-gray-50 rounded-lg shadow-lg">
        <div className="w-full">
          <p className="w-full mt-2 p-5 ">
            Seja bem-vindo, gerencie aqui o perfil artístico. Podes adicionar
            outros músicos se você é um agente, produtor ou empresário.
          </p>
        </div>
      </div>
    </>,
  );

  return (
    <div className="relattive w-full h-full flex flex-col">
      {page.props.auth.user.is_artist === 0 ? (
        <div className="flex flex-col justify-center ">
          <h1 className="text-center">
            Você não tem um perfil artístico activo.
            <p>
              Se você for um produtor, empresário, agencia, etc e gostaria de
              gerenciar múltiplos artistas, por favor entre em contacto com a
              nossa equipa.
            </p>
          </h1>
          <button
            onClick={() => setPagina(<AddArtist setPagina={setPagina} />)}
            className="border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-row md:p-2"
          >
            <GiSpearFeather className="text-4xl mr-1" />
            Criar perfil artístico
          </button>
        </div>
      ) : (
        <HeaderArtist artist={artist} setPagina={setPagina} page={page} />
      )}
      {pagina}
    </div>
  );
}

export default GerirArtista;

function HeaderArtist({ artist, setPagina, page }) {
  return (
    <div className="relative w-full flex flex-col rounded-lg shadow-lg mb-2 pb-1">
      <div className="relative flex justify-start items-center">
        <div className="w-full h-full m-2">
          <img
            src={localStorage.getItem('prefix_storage') + artist?.url_cover}
            className="w-20 h-20 rounded-full  border border-black"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-base md:text-4xl text-bold">{artist?.name}</h2>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={() => setPagina(<DetailsArtist artist={artist} />)}
          className="border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
        >
          <BiInfoCircle className="text-xl mr-1" />
          Informações
        </button>
        <button
          onClick={() => setPagina(<Marketing artist={artist} />)}
          className="border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
        >
          <GrAnnounce className="text-xl mr-1" />
          Marketing
        </button>
        <button
          onClick={() => setPagina(<ShowMusics artist={artist} />)}
          className="border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
        >
          <MdMusicNote className="text-xl mr-1" />
          Músicas
        </button>
      </div>
    </div>
  );
}

function HeaderArtistManager({ artist, setPagina, page }) {
  return (
    <div className="w-full flex flex-col rounded-lg shadow-lg mb-2 pb-1">
      <div className="w-full flex justify-center items-center">
        <div className="w-20 m-2">
          <img
            src={artist?.url_cover}
            className=" rounded-full w-20 border border-black"
          />
        </div>
        <div className="w-2/3 flex flex-col">
          <h2 className="text-base md:text-4xl text-bold">{artist?.name}</h2>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={() => setPagina(<AddArtist />)}
          className="border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
        >
          <GiSpearFeather className="text-xl mr-1" />
          Novo perfil
        </button>
        <button
          onClick={() => setPagina(<AddArtist />)}
          className="border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
        >
          <MdMusicNote className="text-xl mr-1" />
          Músicas
        </button>
        <button
          onClick={() => setPagina(<AddArtist />)}
          className="border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
        >
          <MdMusicNote className="text-xl mr-1" />
          Feedbacks
        </button>
        <button
          onClick={() => setPagina(<AddArtist />)}
          className="border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
        >
          <BiEdit className="text-xl mr-1" />
          Todos Perfis
        </button>
      </div>
    </div>
  );
}
