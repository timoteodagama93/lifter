import InputLabel from '@/Components/InputLabel';
import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';
import React from 'react';

function UploadVideo({}) {
  const { data, setData, post, progress } = useForm({
    title: '',
    artist: '',
    cover: null as File | null,
    file: null as File | null,
    avatar: undefined,
  });

  function submit(e) {
    e.preventDefault();
    post('/upload-song');
  }
  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setData(data => ({ ...data, [key]: value }));
  }
  return (
    <>
      <h1 className="w-full text-xl md:text-2xl text-center py-2 ">
        Carregar Vídeo
      </h1>
      <form className="flex flex-col" onSubmit={submit} encType="multipart/form-data">
        <div>
          <InputLabel htmlFor="title"></InputLabel>
          <input
            name="title"
            type="text"
            value={data.title}
            onChange={e => setData('title', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="artist">
            <input
              name="artist"
              type="text"
              value={data.artist}
              onChange={e => setData('artist', e.target.value)}
            />
          </label>
        </div>
        <input
          type="file"
          name="file"
          value={data.cover}
          onChange={e => setData('cover', e.target.files[0])}
        />
        {progress && (
          <progress value={progress.percentage} max={100}>
            {progress.percentage}%
          </progress>
        )}
        <button>Guardar</button>
      </form>
    </>
  );
}

export default UploadVideo;
