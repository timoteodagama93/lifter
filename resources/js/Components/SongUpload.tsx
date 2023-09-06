import React, { useRef, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import SecondaryButton from './SecondaryButton';
import InputLabel from './InputLabel';
import { useForm } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import InputError from './InputError';
import AppLayout from '@/Layouts/AppLayout';
import Step from './Step';

function SongUpload({ song, hasSong }) {
  const steps = [1, 2, 3];
  const [activeStep, setActiveStep] = useState(1);

  const getCompStep = () => {
    switch (activeStep) {
      case 1:
        return <FormMusica setActiveStep={setActiveStep} />;
      case 2:
        return <FormCover setActiveStep={setActiveStep} />;
      case 3:
        return <FormPagamento setActiveStep={setActiveStep} />;
    }
  };
  return (
    <>
      <div className="w-full h-screen overflow-y-auto flex flex-col text-xs justify-center bg-white border-[#2e2c2e] border shadow-lg shadow-black p-5 rounded-lg items-center">
        <div className="w-full flex border-b-2 flex-row justify-center items-center mb-5">
          {/*}
          <button
            onClick={() => setActiveStep(activeStep + 1)}
            className={`cursor-pointer text-xs md:text-xl p-1 md:p-2 border rounded ${
              activeStep == 1 || activeStep == 2 ? 'bg-blue-400' : 'bg-white'
            } `}
          >
            <span>Seguinte </span>
          </button>
          {*/}
          {steps.map(step => (
            <Step
              index={step}
              active={activeStep}
              /*setActive={setActiveStep}*/
            />
          ))}
          {/*}
          <button
            onClick={() => setActiveStep(activeStep - 1)}
            className={`cursor-pointer text-xs md:text-xl p-1 md:p-2 border mx-1 rounded ${
              activeStep == 2 || activeStep == 3 ? 'bg-blue-400' : 'bg-white'
            } `}
          >
            <span>Anterior </span>
          </button>
          {*/}
        </div>
        <div className="w-full ">{getCompStep()}</div>
      </div>
    </>
  );
}

export default SongUpload;

function FormMusica({ setActiveStep }) {
  const { data, setData, progress, errors, post, wasSuccessful, processing } =
    useForm({
      _method: 'POST',
      title: '',
      artist_name: '',
      song: null as File | null,
    });
  const route = useRoute();
  const [songPreview, setSongPreview] = useState<string | null>(null);
  const songRef = useRef<HTMLInputElement>(null);
  const page = useTypedPage();
  function saveSong(e) {
    e.preventDefault();
    post('/upload.song');
    setData('title', '');
    setData('artist_name', '');
    setData('song', null as File | null);
  }

  function selectNewSong() {
    songRef.current?.click();
  }

  function updateSongPreview() {
    const song = songRef.current?.files?.[0];

    if (!song) {
      return;
    }

    setData('song', song);

    const reader = new FileReader();

    reader.onload = e => {
      setSongPreview(e.target?.result as string);
    };

    reader.readAsDataURL(song);
  }
  function clearPhotoFileInput() {
    if (songRef.current?.value) {
      songRef.current.value = '';
      setData('song', null);
    }
  }
  return (
    <div className="w-full h-full flex flex-col text-xs justify-center bg-white border-[#2e2c2e] border shadow-lg shadow-black p-5 rounded-lg items-center">
      <h1 className="text-base md:text-xl">Adicionar imagem de capa</h1>

      <form
        className="w-full h-full justify-center items-center flex flex-col"
        onSubmit={e => e.preventDefault()}
        encType="multipart/form-data"
      >
        {songPreview ? (
          // <!-- New Profile Photo Preview -->
          <div className="">
            <audio
              className="block rounded-lg w-36 h-36 "
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundImage: `url('${songPreview}')`,
              }}
              src={songPreview}
            ></audio>
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
            ref={songRef}
            onChange={updateSongPreview}
          />

          <InputLabel htmlFor="file" value="Ficheiro" />

          <SecondaryButton
            className="m-2"
            type="button"
            onClick={selectNewSong}
          >
            Selecionar música
          </SecondaryButton>
        </div>
        <span>{page.props} </span>

        <input
          value={data.title}
          onChange={e => {
            setData('title', e.currentTarget.value);
          }}
          placeholder="Titulo..."
          className="w-full p-2 border border-[#2e2c2e] rounded shadow-sm"
          type="text"
        />
        <input
          type="text"
          value={data.artist_name}
          onChange={e => {
            setData('artist_name', e.currentTarget.value);
          }}
          placeholder="Artista..."
          className="w-full p-2 border border-[#2e2c2e] rounded shadow-sm"
        />
        <button
          onClick={saveSong}
          className="h-full text-2xl flex justify-center items-center gap-1 shadow-lg shadow-black rounded p-1  "
        >
          <BiSend />
          <span className="text-base">Salvar e continuar</span>
        </button>
      </form>
    </div>
  );
}

function FormCover({ setActiveStep }) {
  const { data, setData, progress, post, wasSuccessful, processing } = useForm({
    _method: 'POST',
    title: '',
    artist_name: '',
    errors: { file: '' },
    song: null as File | null,
  });
  const route = useRoute();
  const [songPreview, setSongPreview] = useState<string | null>(null);
  const songRef = useRef<HTMLInputElement>(null);
  const page = useTypedPage();
  function saveSong(e) {
    e.preventDefault();
    post('/upload.song');
    setData('title', '');
    setData('artist_name', '');
    setData('song', null as File | null);
  }

  function selectNewSong() {
    songRef.current?.click();
  }

  function updateSongPreview() {
    const song = songRef.current?.files?.[0];

    if (!song) {
      return;
    }

    setData('song', song);

    const reader = new FileReader();

    reader.onload = e => {
      setSongPreview(e.target?.result as string);
    };

    reader.readAsDataURL(song);
  }
  function clearPhotoFileInput() {
    if (songRef.current?.value) {
      songRef.current.value = '';
      setData('song', null);
    }
  }

  return (
    <div className="w-full h-full flex flex-col text-xs justify-center bg-white border-[#2e2c2e] border shadow-lg shadow-black px-5 py-1 pb-5 rounded-lg items-center">
      <h1 className="text-base md:text-xl">Adicionar imagem de capa</h1>
      <form
        className="w-full h-full justify-center items-center flex flex-col"
        onSubmit={e => e.preventDefault()}
        encType="multipart/form-data"
      >
        {songPreview ? (
          // <!-- New Profile Photo Preview -->
          <div className="">
            <audio
              className="block rounded-lg w-36 h-36 "
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundImage: `url('${songPreview}')`,
              }}
              src={songPreview}
            ></audio>
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
            ref={songRef}
            onChange={updateSongPreview}
          />

          <InputLabel htmlFor="file" value="Ficheiro" />

          <SecondaryButton
            className="m-2"
            type="button"
            onClick={selectNewSong}
          >
            Selecionar música
          </SecondaryButton>

          <InputError message={data.errors.file} className="mt-2" />
        </div>

        <input
          value={data.title}
          onChange={e => {
            setData('title', e.currentTarget.value);
          }}
          placeholder="Titulo..."
          className="w-full p-2 border border-[#2e2c2e] rounded shadow-sm"
          type="text"
        />
        <input
          type="text"
          value={data.artist_name}
          onChange={e => {
            setData('artist_name', e.currentTarget.value);
          }}
          placeholder="Artista..."
          className="w-full p-2 border border-[#2e2c2e] rounded shadow-sm"
        />
        <button
          onClick={saveSong}
          className="h-full text-2xl flex justify-center items-center gap-1 shadow-lg shadow-black rounded p-1  "
        >
          <BiSend />
          <span className="text-base">Salvar e continuar</span>
        </button>
      </form>
    </div>
  );
}

function FormPagamento({ setActiveStep }) {
  const { data, setData, progress, post, wasSuccessful, processing } = useForm({
    _method: 'POST',
    title: '',
    artist_name: '',
    errors: { file: '' },
    song: null as File | null,
  });
  const route = useRoute();
  const [songPreview, setSongPreview] = useState<string | null>(null);
  const songRef = useRef<HTMLInputElement>(null);
  const page = useTypedPage();
  function saveSong(e) {
    e.preventDefault();
    post('/upload.song');
    setData('title', '');
    setData('artist_name', '');
    setData('song', null as File | null);
  }

  function selectNewSong() {
    songRef.current?.click();
  }

  function updateSongPreview() {
    const song = songRef.current?.files?.[0];

    if (!song) {
      return;
    }

    setData('song', song);

    const reader = new FileReader();

    reader.onload = e => {
      setSongPreview(e.target?.result as string);
    };

    reader.readAsDataURL(song);
  }
  function clearPhotoFileInput() {
    if (songRef.current?.value) {
      songRef.current.value = '';
      setData('song', null);
    }
  }

  return (
    <div className="w-full h-full flex flex-col text-xs justify-center bg-white border-[#2e2c2e] border shadow-lg shadow-black p-5 rounded-lg items-center">
      <form
        className="w-full h-full justify-center items-center flex flex-col"
        onSubmit={e => e.preventDefault()}
        encType="multipart/form-data"
      >
        {songPreview ? (
          // <!-- New Profile Photo Preview -->
          <div className="">
            <audio
              className="block rounded-lg w-36 h-36 "
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundImage: `url('${songPreview}')`,
              }}
              src={songPreview}
            ></audio>
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
            ref={songRef}
            onChange={updateSongPreview}
          />

          <InputLabel htmlFor="file" value="Ficheiro" />

          <SecondaryButton
            className="m-2"
            type="button"
            onClick={selectNewSong}
          >
            Selecionar música
          </SecondaryButton>

          <InputError message={data.errors.file} className="mt-2" />
        </div>

        <input
          value={data.title}
          onChange={e => {
            setData('title', e.currentTarget.value);
          }}
          placeholder="Titulo..."
          className="w-full p-2 border border-[#2e2c2e] rounded shadow-sm"
          type="text"
        />
        <input
          type="text"
          value={data.artist_name}
          onChange={e => {
            setData('artist_name', e.currentTarget.value);
          }}
          placeholder="Artista..."
          className="w-full p-2 border border-[#2e2c2e] rounded shadow-sm"
        />
        <button
          onClick={saveSong}
          className="h-full text-2xl flex justify-center items-center gap-1 shadow-lg shadow-black rounded p-1  "
        >
          <BiSend />
          <span className="text-base">Salvar e continuar</span>
        </button>
      </form>
    </div>
  );
}
