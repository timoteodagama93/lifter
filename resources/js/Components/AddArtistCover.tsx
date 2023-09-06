import React, { useState, useRef } from 'react';
import { BiMusic, BiSend } from 'react-icons/bi';
import { Musica } from '../../../img';
import { BsArrowBarRight, BsCameraVideo, BsImage } from 'react-icons/bs';
import { useForm } from '@inertiajs/react';
import useTypedPage from '@/Hooks/useTypedPage';
import useRoute from '@/Hooks/useRoute';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import { router } from '@inertiajs/core';

function AddArtistCover({ artist, isOpen, onClose }) {
  const page = useTypedPage();
  const route = useRoute();
  const { data, setData, progress, post } = useForm({
    artist: artist,
    cover: null as File | null,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  function saveNewPost(e) {
    e.preventDefault();
    post('/add-cover', {
      onSuccess: () => {
        clearPhotoFileInput();
      },
      onFinish: onClose(false),
    });
  }
  function selectNewPhoto() {
    photoRef.current?.click();
  }

  function updatePhotoPreview() {
    const photo = photoRef.current?.files?.[0];

    if (!photo) {
      return;
    }

    setData('cover', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }
  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      setData('cover', null);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full h-full flex flex-col text-xs justify-center bg-white border-[#2e2c2e] border shadow-lg shadow-black p-5 rounded-lg items-center">
        <form
          method="Post"
          onSubmit={e => saveNewPost(e)}
          className="w-full h-full justify-center items-center flex flex-col"
          encType="multipart/form-data"
        >
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

          {progress && (
            <progress value={progress.percentage} max={100}>
              {progress.percentage}%
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

            <SecondaryButton
              className="m-2"
              type="button"
              onClick={selectNewPhoto}
            >
              Selecionar Imagem
            </SecondaryButton>

            <InputError message={data.erros} className="mt-2" />
          </div>
          <button className="h-full text-2xl flex justify-center items-center gap-1 shadow-lg shadow-black rounded p-1  ">
            <BiSend />
            <span className="text-base">Guardar</span>
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddArtistCover;
