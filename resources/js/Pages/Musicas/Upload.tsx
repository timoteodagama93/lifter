import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';
import React from 'react';

function Upload({ wel_done }) {
  console.log(wel_done);
  const { data, setData, post, progress } = useForm({
    name: '',
    avatar: undefined,
  });

  function submit(e) {
    e.preventDefault();
    post('/upload');
  }
  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setData(data => ({ ...data, [key]: value }));
  }
  return (
    <>
      <form onSubmit={submit}>
        <input type="text" value={data.name} onChange={e=>setData('name', e.target.value)} />
        <input type="file" value={data.avatar}  />
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

export default Upload;
