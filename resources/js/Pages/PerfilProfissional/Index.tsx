import AppLayout from '@/Layouts/AppLayout';
import React, { useEffect } from 'react';
import { useStateContext } from '@/contexts/PaginaActualContext';

import Welcome from './Registers/Welcome';
import Artist from './Artista/Index';

function Index({ isArtist }) {
  const { currentPage, setCurrentPage } = useStateContext();
  useEffect(() => {
    isArtist ? setCurrentPage(<Artist />) : setCurrentPage(<Welcome />);
  }, []);
  return (
    <AppLayout title="Perfil">
      <div className="w-full h-full">
        <div className="relattive w-full h-full flex flex-col">
          {currentPage}
        </div>
      </div>
    </AppLayout>
  );
}

export default Index;
