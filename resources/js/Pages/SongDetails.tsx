import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import route from 'ziggy-js';
import { songs } from '../../data/dummy';

function SongDetails() {
  return (
    <AppLayout title="Song Details">
      <div className="flex flex-col">
        {/*} 
           <DetailsHeader artistId ={1} songDaa={songs[0]} />
  {*/}
  <div className='mb-10'>
    <h2 className='text-white text-3xl font-bold'>
        Lyrics
    </h2>
  </div>
      </div>
    </AppLayout>
  );
}

export default SongDetails;
