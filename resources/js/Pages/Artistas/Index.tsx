import AppLayout from '@/Layouts/AppLayout';
import { Props } from '@headlessui/react/dist/types';
import React from 'react';

function Index({ data, pagina, id, routas }) {
  
    return (
    <AppLayout title="Artistas">
      <div className="">Detalhes artista de id {id} </div>
    </AppLayout>
  );
}

export default Index;
