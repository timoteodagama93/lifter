import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SectionBorder from '@/Components/SectionBorder';
import Swal from 'sweetalert2';
import { Loader } from '@/Components';
import SecondaryButton from '@/Components/SecondaryButton';
export default function AddVideo({ from = '' }) {
  const [successOnAdd, setSuccessOnAdd] = useState(false);

  const formVideo = useForm({
    title: '',
    category: '',
    description: '',
    video: null as File | null,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    formVideo.post('add-video', {
      onSuccess: () => {
        formVideo.reset();
        clearSongFileInput();
        setSuccessOnAdd(true);
        Swal.fire({
          title: 'Bem feito',
          text: 'A música foi carregada.',
          icon: 'success',
        });
        //        window.location.reload();
      },
      onError: e => {},
      onFinish: r => {
        formVideo.setData('title', '');
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

    formVideo.setData('video', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }
  function clearSongFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      formVideo.setData('video', null);
    }
  }

  if (formVideo.processing)
    return (
      <div className="flex flex-col justify-center w-full h-full">
        <Loader title="Enviando a música..." />
        <progress value={formVideo.progress?.percentage}>
          {' '}
          {formVideo.progress?.percentage}{' '}
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
          <h1>A músca foi adicionada com sucesso!</h1>
          <PrimaryButton onClick={() => setSuccessOnAdd(false)}>
            Adicionar nova música?
          </PrimaryButton>
        </>
      ) : (
        <div className="p-1 md:p-5 shadow-lg shadow-black w-full h-full overflow-y-auto overflow-x-hidden flex flex-col">
          <p className="w-full text-xl flex flex-row justify-center uppercase gap-1">
            <strong>Adicionar vídeo</strong>
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

            {formVideo.progress && (
              <progress value={formVideo.progress.percentage} max={100}>
                {formVideo.progress.percentage}%
              </progress>
            )}

            <div className="col-span-6 sm:col-span-4">
              {/* <!-- Profile Photo File Input --> */}
              <input
                type="file"
                className=""
                ref={photoRef}
                onChange={updatePhotoPreview}
              />

              <InputLabel htmlFor="file" value="Ficheiro" />
              <InputError className="mt-2" message={formVideo.errors.video} />

              <SecondaryButton
                className="m-2"
                type="button"
                onClick={selectNewPhoto}
              >
                Selecionar Vídeo
              </SecondaryButton>
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="title">Título do vídeo</InputLabel>
              <span className="hidden">Título do vídeo</span>
              <TextInput
                id="title"
                type="text"
                className="mt-1 block w-full"
                value={formVideo.data.title}
                onChange={e =>
                  formVideo.setData('title', e.currentTarget.value)
                }
                required
              />
              <InputError className="mt-2" message={formVideo.errors.title} />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="name">Categoria</InputLabel>
              <span className="hidden">Categoria a que pertence o vídeo</span>
              <select
                id="category"
                className="mt-1 block w-full"
                value={formVideo.data.category}
                onChange={e =>
                  formVideo.setData('category', e.currentTarget.value)
                }
                required
              >
                <option>Comédia & Humor</option>
                <option>Músicas</option>
                <option>Dança</option>
                <option>Outro</option>
              </select>
              <InputError
                className="mt-2"
                message={formVideo.errors.category}
              />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="description">Descrição</InputLabel>
              <span>Adicione uma descrição ao teu vídeo. </span>
              <textarea
                id="description"
                className="mt-1 block w-full text-black"
                value={formVideo.data.description}
                onChange={e =>
                  formVideo.setData('description', e.currentTarget.value)
                }
              />
              <InputError
                className="mt-2"
                message={formVideo.errors.description}
              />
            </div>

            <div className="flex items-center justify-end mt-4">
              <PrimaryButton
                className={classNames('ml-4', {
                  'opacity-25': formVideo.processing,
                })}
                disabled={formVideo.processing}
              >
                Publicar vídeo
              </PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
