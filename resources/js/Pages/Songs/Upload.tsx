import SongUpload from '@/Components/SongUpload';
import AppLayout from '@/Layouts/AppLayout';
import React from 'react';

function Upload({ artists }) {
  return (
    <AppLayout title="Upload">
      <SongUpload artists={artists} />
    </AppLayout>
  );
}

export default Upload;
