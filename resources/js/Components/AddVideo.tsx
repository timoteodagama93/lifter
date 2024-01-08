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
import axios from 'axios';
import Swal from 'sweetalert2';
import { Loader } from '@/Components';
import SecondaryButton from './SecondaryButton';
export default function AddVideo({ default_category = '' }) {
  const [successOnAdd, setSuccessOnAdd] = useState(false);
  const page = useTypedPage();

  const formSong = useForm({
    title: '',
    producer: page.props.auth.user?.name,
    category: '',
    description: '',
    video: null as File | null,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    formSong.post('add-video', {
      onSuccess: () => {
        formSong.reset();
        clearSongFileInput();
        setSuccessOnAdd(true);
        Swal.fire({
          title: 'Bem feito',
          text: 'A música foi carregada. Ela fica disponível na plataforma tão logo que a aprovarmos.',
          icon: 'success',
        });
        //        window.location.reload();
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

    formSong.setData('video', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }
  function clearSongFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      formSong.setData('video', null);
    }
  }

  if (formSong.processing)
    return (
      <div className="flex flex-col justify-center w-full h-full">
        <Loader title="Enviando a música..." />
        <progress value={formSong.progress?.percentage}>
          {' '}
          {formSong.progress?.percentage}{' '}
        </progress>
        <p className="text-base">
          Dependendo da sua Internet, o processo pode demorar.
        </p>
      </div>
    );
  return (
    <>
      {successOnAdd === true ? (
        <>
          <h1>O vídeo foi Carregado com sucesso!</h1>
          <PrimaryButton onClick={() => setSuccessOnAdd(false)}>
            Adicionar novo vídeo?
          </PrimaryButton>
        </>
      ) : (
        <div className="p-1 md:p-5 shadow-lg shadow-black w-full h-full overflow-y-auto overflow-x-hidden flex flex-col">
          <p className="w-full text-xl flex flex-row justify-center uppercase gap-1">
            Novo vídeo
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
                className="hidden"
                ref={photoRef}
                onChange={updatePhotoPreview}
              />

              <InputLabel htmlFor="file" value="Ficheiro" />
              <InputError className="mt-2" message={formSong.errors.video} />

              <SecondaryButton
                className="m-2"
                type="button"
                onClick={selectNewPhoto}
              >
                Selecionar vídeo
              </SecondaryButton>
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="title">Título do vídeo </InputLabel>
              <span className="hidden">Título do vídeo </span>
              <TextInput
                id="title"
                type="text"
                className="mt-1 block w-full"
                value={formSong.data.title}
                onChange={e => formSong.setData('title', e.currentTarget.value)}
                required
              />
              <InputError className="mt-2" message={formSong.errors.title} />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="producer">Produtor/Criador </InputLabel>
              <span className="">
                Responsável pela concepção do vídeo (Opcional)
              </span>
              <TextInput
                id="producer"
                type="text"
                className="mt-1 block w-full"
                value={formSong.data.producer}
                onChange={e =>
                  formSong.setData('producer', e.currentTarget.value)
                }
                required
              />
              <InputError className="mt-2" message={formSong.errors.producer} />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="category">Categoria</InputLabel>
              <select
                id="category"
                className="mt-1 block w-full"
                value={formSong.data.category}
                onChange={e =>
                  formSong.setData('category', e.currentTarget.value)
                }
                required
              >
                {default_category == 'dance' && (
                  <>
                    <option value="">Selecione uma categoria</option>
                    <option value="dance">Dança</option>
                  </>
                )}
                {default_category == 'mistas' && (
                  <>
                    <option value="">Selecione uma categoria</option>
                    <option value="teatro">Teatro</option>
                    <option value="cinema">Cinema</option>
                    <option value="humor">Humor</option>
                  </>
                )}
                {default_category == '' && (
                  <>
                    <option value="">Selecione uma categoria</option>
                    <option value="dance">Dança</option>
                    <option value="teatro">Teatro</option>
                    <option value="cinema">Cinema</option>
                    <option value="humor">Humor</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="motivacional">Motivacional</option>
                  </>
                )}
              </select>
              <InputError className="mt-2" message={formSong.errors.category} />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="letra">Descrição do vídeo</InputLabel>
              <span>Opcional. </span>
              <textarea
                id="letra"
                className="mt-1 block w-full text-black"
                value={formSong.data.description}
                onChange={e =>
                  formSong.setData('description', e.currentTarget.value)
                }
              />
              <InputError
                className="mt-2"
                message={formSong.errors.description}
              />
            </div>

            <div className="flex items-center justify-end mt-4">
              <PrimaryButton
                className={classNames('ml-4', {
                  'opacity-25': formSong.processing,
                })}
                disabled={formSong.processing}
              >
                Enviar vídeo
              </PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
