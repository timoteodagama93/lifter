import React, { useRef, useState } from 'react';
import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import AuthenticationCard from '@/Components/AuthenticationCard';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SectionBorder from '@/Components/SectionBorder';
import { BiHappy } from 'react-icons/bi';
import { router } from '@inertiajs/core';
import SecondaryButton from '../../../../Components/SecondaryButton';
import axios from 'axios';
import Swal from 'sweetalert2';
export default function AddSong({ artist }) {
  const [successOnAdd, setSuccessOnAdd] = useState(false);

  const formSong = useForm({
    artist_id: artist?.id,
    title: '',
    artist: artist?.name,
    genre: artist?.genres,
    gravadora: '',
    participacoes: '',
    letra: '',
    song: null as File | null,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    formSong.post('add-song', {
      onSuccess: () => {
        formSong.setData('gravadora', '');
        formSong.setData('letra', '');
        formSong.setData('participacoes', '');
        formSong.setData('title', '');
        clearSongFileInput();
        setSuccessOnAdd(true);
        Swal.fire({
          title: 'Bem feito',
          text: 'A música foi carregada.',
          icon: 'success',
        });
      },
      onError: e => {},
      onFinish: r => {
        formSong.setData('title', '');
        clearSongFileInput();
      },
    });
  }

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  function selectNewPhoto() {
    photoRef.current?.click();
  }

  function updatePhotoPreview() {
    const photo = photoRef.current?.files?.[0];

    if (!photo) {
      return;
    }

    formSong.setData('song', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }
  function clearSongFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      formSong.setData('song', null);
    }
  }

  return (
    <>
      {successOnAdd === true ? (
        <>
          <h1>A músca foi adicionada com sucesso!</h1>
          <PrimaryButton onClick={() => setSuccessOnAdd(false)}>
            Adicionar nova música?
          </PrimaryButton>
        </>
      ) : (
        <div className="p-5  m-5 shadow-lg shadow-black">
          <p className="w-full text-xl flex justify-center uppercase gap-1">
            Adicionar música de <strong> {artist.name}</strong>
          </p>
          <SectionBorder></SectionBorder>
          <form onSubmit={onSubmit} className="">
            {photoPreview ? (
              // <!-- New Profile Photo Preview -->
              <audio className="">
                <source
                  className="block rounded-lg w-36 h-36 "
                  type="video/mp4"
                  src={photoPreview}
                />
              </audio>
            ) : (
              ''
            )}

            {formSong.progress && (
              <progress value={formSong.progress.percentage} max={100}>
                {formSong.progress.percentage}%
              </progress>
            )}

            <div className="col-span-6 sm:col-span-4">
              {/* <!-- Profile Photo File Input --> */}
              <input
                type="file"
                className=""
                required
                ref={photoRef}
                onChange={updatePhotoPreview}
              />

              <InputLabel htmlFor="file" value="Ficheiro" />

              <SecondaryButton
                className="m-2"
                type="button"
                onClick={selectNewPhoto}
              >
                Selecionar Música
              </SecondaryButton>
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="title">Título da música</InputLabel>
              <span className="hidden">Titulo da musica</span>
              <TextInput
                id="title"
                type="text"
                className="mt-1 block w-full"
                value={artist.title}
                onChange={e => formSong.setData('title', e.currentTarget.value)}
                required
              />
              <InputError className="mt-2" message={formSong.errors.title} />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="name">Nome do artista</InputLabel>
              <span className="hidden">Nome artístico, ciclo profissional</span>
              <TextInput
                id="name"
                type="text"
                className="mt-1 block w-full"
                value={artist.name}
                disabled
                onChange={e =>
                  formSong.setData('artist', e.currentTarget.value)
                }
                required
              />
              <InputError className="mt-2" message={formSong.errors.artist} />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="genre">Estilo Musical</InputLabel>
              <TextInput
                id="genre"
                className="mt-1 block w-full"
                value={formSong.data.genre}
                onChange={e => formSong.setData('genre', e.currentTarget.value)}
                required
              />
              <InputError className="mt-2" message={formSong.errors.genre} />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="gravadora">
                Gravadora ou produtora
              </InputLabel>
              <span>Ex. Lifter Records (Opcional)</span>
              <TextInput
                id="gravadora"
                type="text"
                className="mt-1 block w-full"
                value={formSong.data.gravadora}
                onChange={e =>
                  formSong.setData('gravadora', e.currentTarget.value)
                }
                required
                autoComplete="new-password"
              />
              <InputError
                className="mt-2"
                message={formSong.errors.gravadora}
              />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="participacoes">Participações</InputLabel>
              <span>Separe com vírgulas (Opcional). </span>
              <TextInput
                id="participacoes"
                className="mt-1 block w-full"
                value={formSong.data.participacoes}
                onChange={e =>
                  formSong.setData('participacoes', e.currentTarget.value)
                }
                required
              />
              <InputError
                className="mt-2"
                message={formSong.errors.participacoes}
              />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="letra">Letra musical</InputLabel>
              <span>Opcional. </span>
              <textarea
                id="letra"
                className="mt-1 block w-full"
                value={formSong.data.letra}
                onChange={e => formSong.setData('letra', e.currentTarget.value)}
              />
              <InputError className="mt-2" message={formSong.errors.letra} />
            </div>

            <div className="flex items-center justify-end mt-4">
              <PrimaryButton
                className={classNames('ml-4', {
                  'opacity-25': formSong.processing,
                })}
                disabled={formSong.processing}
              >
                Publicar música
              </PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
