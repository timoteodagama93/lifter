import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SectionBorder from '@/Components/SectionBorder';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
import { BiAlbum, BiData, BiPhotoAlbum } from 'react-icons/bi';
import AddSongCover from './AddSongCover';
import { MdAlbum } from 'react-icons/md';

export default function EditSong({ song, setPagina }) {
  const [localPage, setLocalPage] = useState(
    <LocalPage setPagina={setPagina} song={song} />,
  );

  return (
    <div className="p-5  m-1 shadow-lg shadow-black bg-[#4c88c4]">
      <p className="w-full text-xl flex justify-center uppercase">
        <span>Actualizar dados da música</span>
      </p>
      <div className="w-full flex">
        <button
          onClick={() => setLocalPage(<AddSongCover song={song} />)}
          className="transform-effect p-1 justify-center items-center w-full flex flex-col"
        >
          <BiPhotoAlbum className="w-5 md:w-7 h-auto font-bold" />
          <span style={{ fontSize: '.5rem' }} className="hidden md:flex">
            Adicionar capa
          </span>
        </button>
        <button
          onClick={() =>
            setLocalPage(<LocalPage setPagina={setPagina} song={song} />)
          }
          className="transform-effect p-1 justify-center items-center w-full flex flex-col"
        >
          <BiData className="w-5 md:w-7 h-auto font-bold" />
          <span style={{ fontSize: '.5rem' }} className="hidden md:flex">
            Alter dados
          </span>
        </button>
      </div>
      <SectionBorder></SectionBorder>
      {localPage}
    </div>
  );
}

const LocalPage = ({ setPagina, song }) => {
  const formArtist = useForm({
    id: song.id,
    artist_id: song.artist_id,
    title: song.title,
    genre: song.genre,
    artist: song.artist,
    gravadora: song.gravadora,
    participacoes: song.participacoes,
    letra: song.letra,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    formArtist.post('/update-song', {
      onSuccess: () => setPagina(<></>),
      onError: () => alert('Erro na actualização, tente novamente'),
      onFinish: () => setPagina(<></>),
    });
  }

  return (
    <form onSubmit={onSubmit} className="" encType="multipart/form-data">
      {formArtist.progress && (
        <progress value={formArtist.progress.percentage} max={100}>
          {formArtist.progress.percentage}%
        </progress>
      )}

      <div className="">
        <InputLabel htmlFor="title">Título </InputLabel>
        <span className="hidden">Titulos sugestivos, chama atenção</span>
        <TextInput
          id="title"
          type="text"
          className="mt-1 block w-full"
          value={formArtist.data.title}
          onChange={e => formArtist.setData('title', e.currentTarget.value)}
          required
          autoComplete="new-password"
        />
        <InputError className="mt-1" message={formArtist.errors.title} />
      </div>

      <div className="mt-4">
        <InputLabel htmlFor="genre">Estilo Musical</InputLabel>
        <TextInput
          id="genre"
          className="mt-1 block w-full"
          value={formArtist.data.genre}
          onChange={e => formArtist.setData('genre', e.currentTarget.value)}
          required
        />
        <InputError className="mt-2" message={formArtist.errors.genre} />
      </div>

      <div className="mt-4">
        <InputLabel htmlFor="artist">Artista</InputLabel>
        <span></span>
        <TextInput
          id="artist"
          type="text"
          className="mt-1 block w-full"
          value={formArtist.data.artist}
          onChange={e => formArtist.setData('artist', e.currentTarget.value)}
          disabled
          required
        />
        <InputError className="mt-2" message={formArtist.errors.artist} />
      </div>

      <div className="mt-4">
        <InputLabel htmlFor="gravadora">Gravadora</InputLabel>
        <TextInput
          id="gravadora"
          className="p-1 block w-full"
          value={formArtist.data.gravadora}
          onChange={e => formArtist.setData('gravadora', e.currentTarget.value)}
          
        />
        <InputError className="mt-2" message={formArtist.errors.gravadora} />
      </div>
      <div className="mt-4">
        <InputLabel htmlFor="participacoes">Participantes</InputLabel>
        <TextInput
          id="participacoes"
          className="p-1 "
          value={formArtist.data.participacoes}
          onChange={e =>
            formArtist.setData('participacoes', e.currentTarget.value)
          }
        />

        <InputError
          className="mt-2"
          message={formArtist.errors.participacoes}
        />
      </div>

      <div className="mt-4 text-black">
        <InputLabel htmlFor="letra">Letra da música</InputLabel>
        <span>Coloque em uma linha cada refrão</span>
        <textarea
          id="letra"
          className="mt-1 block w-full"
          value={formArtist.data.letra}
          onChange={e => formArtist.setData('letra', e.currentTarget.value)}
        />
        <InputError className="mt-2" message={formArtist.errors.letra} />
      </div>

      <div className="flex items-center justify-end mt-4">
        <PrimaryButton className={`'ml-4`} disabled={formArtist.processing}>
          Actualizar informações
        </PrimaryButton>
      </div>
    </form>
  );
};
