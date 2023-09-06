import AppLayout from '@/Layouts/AppLayout';
import React, { useRef, useState } from 'react';
import { artists, songs } from '../../../../data/dummy';
import {
  BiEdit,
  BiMusic,
  BiPhotoAlbum,
  BiSend,
  BiStats,
  BiUpload,
  BiUserVoice,
} from 'react-icons/bi';
import { TiMessages } from 'react-icons/ti';
import Modal from '@/Components/Modal';
import { MdClose, MdOutlineAppRegistration } from 'react-icons/md';
import UserAvatar from '@/Components/UserAvatar';
import { Link, useForm } from '@inertiajs/react';
import useTypedPage from '@/Hooks/useTypedPage';
import { router } from '@inertiajs/core';
import { useStateContext } from '@/contexts/PaginaActualContext';
import Upload from '../../Songs/Upload';
import SongUpload from '@/Components/SongUpload';
import { Router } from 'ziggy-js';
import axios from 'axios';
import RegisterArtist from '../../Auth/RegisterArtist';
import AddArtist from '@/Components/AddArtist';
import SecondaryButton from '@/Components/SecondaryButton';
import TopArtists from '@/Components/TopArtists';
import SectionBorder from '@/Components/SectionBorder';
import MyArtists from '@/Components/MyArtists';
import PlayPause from '@/Components/PlayPause';
import { BsEye } from 'react-icons/bs';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import useRoute from '@/Hooks/useRoute';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AddArtistCover from '@/Components/AddArtistCover';

function DetalhesMusico({ artist }) {
  const page = useTypedPage();
  const { currentPage } = useStateContext();
  return (
    <AppLayout title="Perfil">
      <div className="w-full h-full">
        <DadosPerfil artist={artist} page={page} />
      </div>
    </AppLayout>
  );
}

export default DetalhesMusico;

function GerirArtista({ page, artists }) {
  const [uploadCover, setUploadCover] = useState(false);
  const [updateArtist, setUpdateArtis] = useState(false);
  const [editaArtist, setEditArtist] = useState(false);

  const [pagina, setPagina] = useState(
    <>
      <div className="w-full flex flex-col p-5 bg-gray-50 rounded-lg shadow-lg">
        <div className="w-full">
          <p className="w-full mt-2 p-5 ">
            Seja bem-vindo, gerencie aqui todas as tuas contas de perfil
            artístico. Podes adicionar outros músicos se você é um agente,
            produtor ou empresário.
          </p>
        </div>
      </div>
    </>,
  );

  const [artist, setArtist] = useState({});

  function getArtistas() {
    axios.post('/get-my-artist', page.props.auth.user).then(response => {
      const all_artists = response.data.all_artists;
      const artists = response.data.artists;
      if (artists.length <= 0) {
        setPagina(
          <>
            <h1 className="text-xl px-5">
              Você ainda não registrou-se como artista. Nem registrou qualquer
              músico sob-sua tutela.{' '}
            </h1>
            <SectionBorder />
            {all_artists.map(artist => (
              <>
                <Link
                  key={artist.id}
                  href={`artistas/detalhes/${artist.id}`}
                  className="w-full h-full p-2 flex items-center "
                >
                  <div className="flex-1 flex flex-col justify-between items-center">
                    <div className="w-full ">
                      <img
                        src={artist.images?.artistImage}
                        alt="name artist"
                        className="w-full h-full rounded-lg object-cover"
                      />
                    </div>
                    <div className="w-full absolute bottom-2 rounded-lg flex-1 space-x-1 flex flex-col justify-start items-center mx-3 bg-[#00000000] backdrop-blur-lg ">
                      <p className="text-base font-bold text-white">
                        {' '}
                        {artist.name}{' '}
                      </p>
                      <p className="text-xs text-gray-300"> {artist.genres}</p>
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
            {artists?.map((artist, i) => (
              <div
                key={i}
                className="w-full flex flex-row items-center border shadow-lg hover:bg-[#eaeaea] py-1 p-0 md:p-1 md:px-10 rounded-lg cursor-pointer mb-1"
              >
                <h3 className="hidden md:flex font-bold text-base  mr-1">
                  {' '}
                  {i + 1}.{' '}
                </h3>
                <div className="flex-1 flex flex-row justify-between items-center">
                  <img
                    src={'http://127.0.0.1:8000/storage/' + artist?.url_cover}
                    alt=""
                    className="flex w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 flex flex-col justify-center mx-1">
                    <Link href={`song-details/${artist.id}`} className="">
                      <p className="text-sm md:text-xl font-bold ">
                        {' '}
                        {artist.name}{' '}
                      </p>
                    </Link>
                    <Link href={`song-details/${artist.id}`} className="">
                      <p className="text-xs md:text-base text-">
                        {' '}
                        {artist.genres}{' '}
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="flex p-2 gap-2 justify-center items-center">
                  <button
                    onClick={() => {
                      setArtist(artist);
                      setUploadCover(true);
                    }}
                  >
                    <BiPhotoAlbum className="text-xl" /> Foto
                  </button>
                  <button className="px-2 shadow-black shadow-lg gap-1 flex flex-col text-xs">
                    <BsEye className="text-xl" /> Ver
                  </button>
                  <button
                    onClick={() => setPagina(<EditArtist artist={artist} />)}
                    className="px-2 shadow-black shadow-lg gap- flex flex-col text-xs"
                  >
                    <BiEdit className="text-xl" /> Editar
                  </button>
                </div>
              </div>
            ))}
            <SectionBorder />
            {/** TOP ARTISTS */}
            <div className="flex flex-col md:flex-row flex-wrap">
              {all_artists?.map(artist => (
                <div className="w-full flex">
                  <Link
                    href={`artistas/detalhes/${artist.id}`}
                    className="w-full h-full p-2 flex items-center "
                  >
                    <div className="flex-1 flex flex-col justify-between items-center">
                      <div className="w-full ">
                        <img
                          src={
                            'http://127.0.0.1:8000/storage/' + artist.url_cover
                          }
                          alt="name artist"
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </div>
                      <div className="hidden w-full absolute bottom-2 rounded-lg flex-1 space-x-1 flex flex-col justify-start items-center mx-3 bg-[#00000000] backdrop-blur-lg ">
                        <p className="text-base font-bold text-white">
                          {' '}
                          {artist.name}{' '}
                        </p>
                        <p className="text-xs text-gray-300">
                          {' '}
                          {artist.genres}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>,
        );
      }
    });
  }

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col">
      <div className="w-full flex flex-col rounded-lg shadow-lg mb-2 pb-1">
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
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={() => setPagina(<AddArtist />)}
            className="border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row md:p-2"
          >
            <MdOutlineAppRegistration className="text-xl mr-1" />
            Associação artística
          </button>
          <button
            onClick={getArtistas}
            className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded text-xs items-center justify-center flex flex-col md:flex-row"
          >
            <BiUserVoice className="mr-3 text-xl" />
            Artistas associados
          </button>
        </div>
      </div>
      {pagina}
      <AddArtistCover
        isOpen={uploadCover}
        onClose={setUploadCover}
        artist={artist}
      />
      ,
    </div>
  );
}
