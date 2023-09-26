import AddArtist from '@/Components/AddArtist';
import AddArtistCover from '@/Pages/Perfil/Artista/Info/AddArtistCover';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SectionBorder from '@/Components/SectionBorder';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { BiEdit, BiPhotoAlbum, BiUserVoice } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { MdOutlineAppRegistration } from 'react-icons/md';

import React, { useState } from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import SecondaryButton from '@/Components/SecondaryButton';
import { useStateContext } from '@/contexts/PaginaActualContext';
import DetailsArtist from './Info/DetailsArtist';

function Artistas() {
  const [uploadCover, setUploadCover] = useState(false);
  const page = useTypedPage();
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
      console.log(artists)
      console.log(page)
      if (artists.length <= 0) {
        setPagina(
          <>
            <h1 className="text-xl px-5">
              Você ainda não registrou-se como artista. Nem registrou qualquer
              músico sob-sua tutela.{' '}
            </h1>
            
          </>,
        );
      } else {
        setPagina(
          <>
            <ShowArtists
              artists={artists}
              setPagina={setPagina}
              setArtist={setArtist}
              setUploadCover={setUploadCover}
            />
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
    </div>
  );
}

export default Artistas;

function ShowArtists({ artists, setPagina, setArtist, setUploadCover }) {
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

/**
 *
 * Edit as informações do artista, adiciona uma imagem de capa.
 * @param param0
 * @returns
 *
 */
function EditArtist({ artist, setPagina }) {
  const formArtist = useForm({
    id: artist.id,
    name: artist.name,
    genre: artist.genres,
    contact: artist.contact,
    about: artist.about,
    country: artist.country,
    city: artist.city,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    axios.post('/update-artist', formArtist).then(response => {
      if (response.status === 200) {
        setPagina(<></>);
      }
    });
  }

  return (
    <div className="p-5 h-[60vh] mb-36 overflow-y-auto m-1 shadow-lg shadow-black">
      <p className="w-full text-xl flex justify-center uppercase">
        Actualizar dados do artista
      </p>
      <SectionBorder></SectionBorder>
      <form onSubmit={onSubmit} className="">
        {formArtist.progress && (
          <progress value={formArtist.progress.percentage} max={100}>
            {formArtist.progress.percentage}%
          </progress>
        )}

        <div className="">
          <InputLabel htmlFor="name">Nome artístico</InputLabel>
          <span className="hidden">Nome artístico, ciclo profissional</span>
          <TextInput
            id="name"
            type="text"
            className="mt-1 block w-full"
            value={formArtist.data.name}
            onChange={e => formArtist.setData('name', e.currentTarget.value)}
            required
            autoComplete="new-password"
          />
          <InputError className="mt-1" message={formArtist.errors.name} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="genre">Estilo Musical</InputLabel>
          <select
            id="genre"
            className="mt-1 block w-full"
            value={formArtist.data.genre}
            onChange={e => formArtist.setData('genre', e.currentTarget.value)}
            required
          >
            <option value="kuduro">Kuduro</option>
            <option value="house">House</option>
            <option value="semba">Semba</option>
            <option value="kizomba">Kizomba</option>
            <option value="rnb">RnB</option>
            <option value="rap">Rap</option>
            <option value="naija">Naija</option>
            <option value="hiphop">Hip Hop</option>
          </select>
          <InputError className="mt-2" message={formArtist.errors.genre} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="contact">Contacto para shows</InputLabel>
          <span>Indicativo de país, ex: Angola - (+244)</span>
          <TextInput
            id="contact"
            type="text"
            className="mt-1 block w-full"
            value={formArtist.data.contact}
            onChange={e => formArtist.setData('contact', e.currentTarget.value)}
            required
            autoComplete="new-password"
          />
          <InputError className="mt-2" message={formArtist.errors.contact} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="country">País</InputLabel>
          <select
            id="country"
            className="mt-1 block w-full"
            value={formArtist.data.country}
            onChange={e => formArtist.setData('country', e.currentTarget.value)}
            required
          >
            <option value="angola">Angola</option>
            <option value="mocambique">Moçambique</option>
            <option value="caboverde">Cabo Verde</option>
            <option value="portugal">Portugal</option>
            <option value="brasil">Brasil</option>
            <option value="outro">Outro</option>
          </select>
          <InputError className="mt-2" message={formArtist.errors.country} />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="city">Cidade</InputLabel>
          <TextInput
            id="city"
            className="mt-1 block w-full"
            value={formArtist.data.city}
            onChange={e => formArtist.setData('city', e.currentTarget.value)}
            required
          />

          <InputError className="mt-2" message={formArtist.errors.country} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="about">Sobre o artista</InputLabel>
          <span>Apresentação artística chamativa. </span>
          <textarea
            id="about"
            className="mt-1 block w-full"
            value={formArtist.data.about}
            onChange={e => formArtist.setData('about', e.currentTarget.value)}
            required
          />
          <InputError className="mt-2" message={formArtist.errors.about} />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className={`'ml-4`} disabled={formArtist.processing}>
            Actualizar informações
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
  1;
}
