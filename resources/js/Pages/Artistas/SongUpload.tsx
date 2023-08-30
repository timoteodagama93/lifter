import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';
import React, {useState} from 'react';

function SongUpload({ image }) {
  const { data, setData, post, progress } = useForm({
    name: undefined,
    'avatar': undefined,
  });

  function submit(e) {
    e.preventDefault();
    post('/upload');
  }

 
  return (
    <AppLayout title="Upload">
      <form encType="multipart/form-data" onSubmit={submit}>
        <input
          type="text"
          value={data.name}
          onChange={e => setData('name',e.target.value)}
        />

        <input
          type="file"
          name='avatar'
          onChange={e => setData('avatar',e.target.files[0])}
        />
        {progress && (
          <progress value={progress.percentage} max={100}>
            {progress.percentage}%
          </progress>
        )}
        <button>Guardar</button>
      </form>
      <div className=''>
        {image && (
            <img src={image} />
        )}
      </div>
    </AppLayout>
  );
}

export default SongUpload;
