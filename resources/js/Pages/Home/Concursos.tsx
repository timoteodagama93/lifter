import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BiSend, BiTrophy } from 'react-icons/bi';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { useForm } from '@inertiajs/react';

function Concursos() {
  const [contests, setCOntests] = useState([]);
  const [createContest, setCreateContest] = useState(false);
  function loadContests() {
    axios.post('/contests').then(response => {
      if (response.status === 200) {
        setCOntests(response.data);
      }
    });
  }

  useEffect(loadContests, []);
  return (
    <>
      <div className="w-full md:px-2 flex flex-col">
        <div className="flex flex-col-reverse md:flex-row  justify-center items-center gap-5 pb-1">
          <span className="mt-0 flex justify-center items-center text-xs md:text-base gap-1">
            <span>Partilhar</span>{' '}
            <BiTrophy className="hidden md:flex" />{' '}
          </span>
          <div className="-mb-2 gap-5 md:mb-2 w-full h-full flex flex-row justify-center mt-0">
            <button 
            onClick={() => setCreateContest(true)}
            className=" shadow-lg shadow-black border flex flex-col text-4xl  justify-start items-center p-1 rounded ">
              <BiTrophy className="animate-bounce" />
              <span className="text-xs">Criar concurso</span>
            </button>
            
          </div>
        </div>
        <NewPost isOpen={createContest} onClose={setCreateContest} />
        <div className="flex flex-row flex-wrap mb-5 ">
          {contests?.map(contest => (
            <div className="w-full columns-lg  md:w-1/2 lg:w-1/3 flex flex-col p-1 border">
              <img
                src={'http://127.0.0.1:8000/storage/' + contest.file_url}
                alt=""
                className="h-full w-full"
              />
              <span>{} </span>
              <div className="px-10 md:px-1">
                <p>{contest.post_text} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Concursos;


function NewPost({ isOpen, onClose }) {
  const page = useTypedPage();
  const route = useRoute();
  const { data, setData, progress, post } = useForm({
    text: '',
    erros: [],
    file: null as File | null,
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  function saveNewPost(e) {
    e.preventDefault();
    const newData = {
      text: data.text,
      file: data.file,
      errors: data.erros,
    };
    post('/post', {
      onSuccess: () => {
        setData('text', '');
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

          <textarea
            value={data.text}
            onChange={e => {
              setData('text', e.currentTarget.value);
            }}
            placeholder="Conte a história..."
            className="w-full p-2 border border-[#2e2c2e] rounded shadow-sm"
          ></textarea>
          <button className="h-full text-2xl flex justify-center items-center gap-1 shadow-lg shadow-black rounded p-1  ">
            <BiSend />
            <span className="text-base">Partilhar poste</span>
          </button>
        </form>
      </div>
    </Modal>
  );
}

