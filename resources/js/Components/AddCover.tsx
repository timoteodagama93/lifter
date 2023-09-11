import React, { useRef, useState } from 'react';
import { BiSave } from 'react-icons/bi';
import InputError from './InputError';
import SecondaryButton from './SecondaryButton';
import InputLabel from './InputLabel';
import axios from 'axios';
import { useForm } from '@inertiajs/react';

function AddCover() {
  const { data, setData, progress } = useForm({
    file: null as File | null,
  });
  function saveNewPost(e) {
    e.preventDefault();
    axios.post('save-cover', data).then(response => {
      if (response.status == 200) clearPhotoFileInput;
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

    setData('file', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }
  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      setData('file', null);
    }
  }

  return (
    <>
      <div className="w-full h-full flex flex-col text-xs justify-center bg-white border-[#2e2c2e] border shadow-lg shadow-black p-5 rounded-lg items-center">
        <form
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
              Selecionar Imagem
            </SecondaryButton>
          </div>

          <button className="h-full text-2xl flex justify-center items-center gap-1 shadow-lg shadow-black rounded p-1  ">
            <BiSave />
            <span className="text-base">Salvar foto</span>
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCover;
