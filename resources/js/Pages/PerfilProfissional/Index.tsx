import AppLayout from '@/Layouts/AppLayout';
import React, { useEffect } from 'react';
import { useStateContext } from '@/contexts/PaginaActualContext';

import Welcome from './Registers/Welcome';
import Artist from './Artista/Index';
import useTypedPage from '@/Hooks/useTypedPage';
import Profissional from './Outros/Index';

function Index({ artist, profissional }) {
  const page = useTypedPage();
  console.log(artist);
  const { currentPage, setCurrentPage } = useStateContext();
  useEffect(() => {
    artist == null && profissional == null ? (
      setCurrentPage(<Welcome />)
    ) : artist != null || artist != null ? (
      <>
        {artist != null
          ? setCurrentPage(<Artist />)
          : setCurrentPage(<Profissional />)}
      </>
    ) : (
      ''
    );
  }, []);
  return (
    <AppLayout title="Perfil">
      <div className="w-full h-full">
        <div className="w-full h-full flex flex-col mb-96 pb-1">
          {currentPage}
        </div>
      </div>
    </AppLayout>
  );
}

export default Index;
