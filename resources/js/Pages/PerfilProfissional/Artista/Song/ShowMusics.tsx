import { Link } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiEdit, BiPhotoAlbum, BiUpload } from 'react-icons/bi';
import { BsEye, BsUpload, BsYoutube } from 'react-icons/bs';
import EditSong from './EditSong';
import { HiPhotograph } from 'react-icons/hi';
import { MdOutlineAppRegistration } from 'react-icons/md';
import { EditArtist, AddArtistCover } from '../Info';
import AddSong from './AddSong';
import AddYoutubeSong from './AddYoutubeSong';
import AddSongCover from './AddSongCover';
import ButtonWraper from '@/Components/Button';

export default function ShowMusics({ artist }) {
  const [pagina, setPagina] = useState(<h1>Gerencie suas músicas aqui!</h1>);
  const [songs, setsongs] = useState([]);
  function getSongs() {
    axios.post('/get-artist-songs', artist).then(response => {
      console.log('ARTIST SONGS:');
      console.log(response.data.artist_songs);
      const artist_songs = [...response.data.artist_songs];
      const popular_songs = response.data.popular_songs;
      setsongs(artist_songs);
      setPagina(<ListSongs setPagina={setPagina} songs={artist_songs} />);
    });
  }
  useEffect(getSongs, []);

  return (
    <div className="w-full relative flex flex-col">
      <div className="w-full p-1 gap-2 flex flex-row rounded-lg shadow-lg pb-1 justify-start">
        <ButtonWraper className="w-full">
          <button
            onClick={() =>
              setPagina(<ListSongs setPagina={setPagina} songs={songs} />)
            }
            className="w-full flex flex-row justify-star items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white "
          >
            <HiPhotograph className="mr-3 text-xl" />
            Minhas Músicas
          </button>
        </ButtonWraper>
        <ButtonWraper className="w-full">
          <button
            onClick={() => setPagina(<AddSong artist={artist} />)}
            className="w-full flex flex-row justify-star items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white "
          >
            <BiUpload className="text-xl mr-1" />
            Carregar música
          </button>
        </ButtonWraper>
        <ButtonWraper className="w-full">
          <button
            disabled
            onClick={() => setPagina(<AddYoutubeSong artist={artist} />)}
            className="w-full flex flex-row justify-star items-center space-x-2 p-2 rounded-md  hover:bg-[#2e2c2e] hover:text-white "
          >
            <BsYoutube className="text-xl mr-1" />
            Adicionar do Youtube
          </button>
        </ButtonWraper>
      </div>
      <div className="w-full h-full overflow-y-auto"> {pagina} </div>
    </div>
  );
}

function ListSongs({ songs, setPagina }) {
  return (
    <div className="w-full h-full md:h-[55vh] overflow-y-auto">
      <h1 className="text-center ">Músicas adicionadas</h1>
      {songs?.map((song, i) => (
        <div
          key={i}
          className="w-full flex flex-row items-center border shadow-lg hover:bg-[#2e2c2e] py-1 p-0 md:p-1 md:px-10 rounded-lg cursor-pointer mb-1"
        >
          <h3 className="hidden md:flex font-bold text-base  mr-1">
            {' '}
            {i + 1}.{' '}
          </h3>
          {song.mime_type.includes('audio/') && (
            <img
              src={song?.cover}
              alt=""
              className="flex w-10 h-10 rounded-sm"
            />
          )}
          <div className="flex-1 flex flex-col justify-center mx-1">
            <Link
              href={`/song-details/${song.id}`}
              className="flex-1 flex flex-row justify-between items-center"
            >
              <p className="text-sm md:text-xl font-bold "> {song.title} </p>
            </Link>
            <p className="text-xs md:text-base text-"> {song.genre} </p>
          </div>
          {song.mime_type.includes('audio/') && (
            <audio controls>
              <source type={song.mime_type} src={song.url} />
            </audio>
          )}
          {song.mime_type.includes('video/') && (
            <video className="w-36 h-36" controls>
              <source type={song.mime_type} src={song.url} />
            </video>
          )}
          <div className="flex p-2 gap-2 justify-center items-center">
            <button
              onClick={() => {
                setPagina(<AddSongCover song={song} />);
              }}
            >
              <BiPhotoAlbum className="text-xl" /> Foto
            </button>

            <Link
              href={`/artist-details/${song.id}`}
              className="px-2 shadow-black shadow-lg gap-1 flex flex-col text-xs"
            >
              <BsEye className="text-xl" /> Ver
            </Link>
            <button
              onClick={() =>
                setPagina(<EditSong setPagina={setPagina} song={song} />)
              }
              className="px-2 shadow-black shadow-lg gap- flex flex-col text-xs"
            >
              <BiEdit className="text-xl" /> Editar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
