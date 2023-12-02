import AddArtist from '@/Pages/PerfilProfissional/Registers/AddArtist';
import AddArtistCover from './AddArtistCover';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SectionBorder from '@/Components/SectionBorder';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import {
  BiEdit,
  BiInfoCircle,
  BiMessage,
  BiNote,
  BiPhotoAlbum,
  BiStar,
  BiUpload,
  BiUserVoice,
} from 'react-icons/bi';
import { BsEye, BsStars } from 'react-icons/bs';
import { MdMusicNote, MdOutlineAppRegistration, MdPhoto } from 'react-icons/md';

import React, { useRef, useState } from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import SecondaryButton from '@/Components/SecondaryButton';
import EditArtist from './EditArtist';
import { HiPhotograph } from 'react-icons/hi';
import ButtonWraper from '@/Components/Button';
import { ShowMusics } from '../Song';
import { GrAnnounce } from 'react-icons/gr';
import ArtistSongsFeedbacks from '../ArtistSongsFeedbacks/ArtistSongsFeedbacks';
import Marketing from '../Marketing';

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
            <h1 className="text-xl px-5">Não adicionou músicas ou músicos. </h1>
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
    <>
      <div
        className="relative w-full flex-col rounded-lg shadow-lg shadow-black p-5 justify-center items-center mb-5 hidden"
        style={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: `url(${artist?.url_cover})`,
        }}
      >
        <div className="w-20 h-20 m-2 flex relative">
          <img
            src={artist?.url_cover}
            className=" rounded-full w-full h-full border border-black transform-effect "
          />
          <ButtonWraper className="absolute bottom-1 right-1  ">
            <button className="">
              <MdPhoto className="w-2 h-2" />
            </button>
          </ButtonWraper>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="text-xl md:text-2xl text-bold">{artist?.name}</h2>
          <div className="w-full flex flex-row justify-center items-center">
            <span className="p-1 shadow-sm shadow-white gap-1 mb-2 justify-center items-center mr-2 flex">
              {' '}
              <BiNote /> 0{' '}
            </span>
            <span className="p-1 shadow-sm shadow-white gap-1 mb-2 justify-center items-center mr-2 flex">
              {' '}
              <BiMessage /> 0{' '}
            </span>
            <span className="p-1 shadow-sm shadow-white gap-1 mb-2 justify-center items-center flex">
              {' '}
              <BiStar /> 0{' '}
            </span>
          </div>
        </div>

        <div className="w-full flex justify-center gap-2">
          <button
            onClick={() => setPagina(<DetailsArtist artist={artist} />)}
            className="transform-effect border border-b-4 hover:bg-[#2e2c2e] border-[#4c88c4] rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
          >
            <BiInfoCircle className="text-xl mr-1" />
            Informações
          </button>
          <button
            onClick={() => setPagina(<Marketing artist={artist} />)}
            className="transform-effect border border-b-4 hover:bg-[#2e2c2e]   border-[#4c88c4] rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
          >
            <GrAnnounce className="text-xl mr-1" />
            Marketing
          </button>
          <button
            onClick={() =>
              setPagina(
                <ArtistSongsFeedbacks artist={artist} setPagina={setPagina} />,
              )
            }
            className="transform-effect border border-b-4 hover:bg-[#2e2c2e]  border-[#4c88c4] rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
          >
            <BsStars className="text-xl mr-1" />
            Avaliações
          </button>
          <button
            onClick={() => setPagina(<ShowMusics artist={artist} />)}
            className="transform-effect border border-b-4 hover:bg-[#2e2c2e]  border-[#4c88c4] rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
          >
            <MdMusicNote className="text-xl mr-1" />
            Músicas
          </button>
        </div>
      </div>
      <div className="relative w-full h-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-2 gap-2 flex border flex-row md:flex-col rounded-lg shadow-lg pb-1 justify-start">
          <ButtonWraper className="w-full">
            <button
              onClick={() => setPagina(<AboutArtist artist={artist} />)}
              className="w-full flex flex-row justify-star items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white "
            >
              <MdOutlineAppRegistration className="text-xl mr-3" />
              Detalhes
            </button>
          </ButtonWraper>
          <ButtonWraper className="w-full">
            <button
              onClick={() =>
                setPagina(<EditArtist artist={artist} setPagina={setPagina} />)
              }
              className="w-full flex flex-row justify-star items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white "
            >
              <BiUpload className="text-xl mr-3" />
              Editar Perfil
            </button>
          </ButtonWraper>
          <ButtonWraper className="w-full">
            <button
              onClick={() => setPagina(<AddArtistCover artist={artist} />)}
              className="w-full flex flex-row justify-star items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white "
            >
              <HiPhotograph className="mr-3 text-xl" />
              Adicionar capa
            </button>
          </ButtonWraper>
        </div>
        <div className="w-full md:w-2/3">{pagina}</div>
      </div>
    </>
  );
}

export default DetailsArtist;

function AboutArtist({ artist }) {
  console.log(artist.url_cover)
  return (
    <>
      <div className="w-full m-1 justify-start flex flex-row border-[#2e2c2e] border shadow-lg shadow-black p-5 rounded-lg">
        <div className="flex justify-start">
          <img
            className="w-36 h-auto"
            src={artist?.url_cover}
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
            Género musical: <span> {artist?.genres} </span>
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
