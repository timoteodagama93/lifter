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
export default function AddExpositionItem({ room }) {
  const [successOnAdd, setSuccessOnAdd] = useState(false);
  const page = useTypedPage();

  const formSong = useForm({
    room_id: room?.id,
    title: '',
    category: '',
    description: '',
    item: null as File | null,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    formSong.post('save-room-item', {
      onSuccess: () => {
        formSong.reset();
        formSong.setData('title', '');
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
      onFinish: r => {},
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

    formSong.setData('item', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }
  function clearSongFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      formSong.setData('item', null);
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
          <h1>A obra foi adicionada à exposição com sucesso!</h1>
          <PrimaryButton onClick={() => setSuccessOnAdd(false)}>
            Adicionar outra obra?
          </PrimaryButton>
        </>
      ) : (
        <div className="p-1 md:p-5 shadow-lg shadow-black w-full h-full overflow-y-auto overflow-x-hidden flex flex-col">
          <p className="w-full text-xl flex flex-row justify-center uppercase gap-1">
            Nova obra de arte
          </p>
          <SectionBorder></SectionBorder>
          <form onSubmit={onSubmit} className="" encType="multipart/form-data">
            {photoPreview ? (
              // <!-- New Profile Photo Preview -->
              <div className="">
                <span
                  className="block rounded-lg w-36 h-36 "
                  style={{
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundImage: `url('${photoPreview}')`,
                  }}
                ></span>
              </div>
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
              <InputError className="mt-2" message={formSong.errors.item} />

              <SecondaryButton
                className="m-2"
                type="button"
                onClick={selectNewPhoto}
              >
                Selecionar imagem da arte
              </SecondaryButton>
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="title">Título da da obra </InputLabel>
              <span className="hidden">Título da obra </span>
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
                <option value="">Selecione uma categoria</option>
                <option value="Desenho">Desenho</option>
                <option value="Pintura">Pintura</option>
                <option value="Escultura">Escultura</option>
                <option value="Fotografia">Fotografia</option>
                <option value="Arquitetura">Arquitetura</option>
                <option value="Artes Úteis">Artes Úteis</option>
              </select>
              <InputError className="mt-2" message={formSong.errors.category} />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="letra">Descrição da obra</InputLabel>
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
                Publicar obra
              </PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
