import AppLayout from '@/Layouts/AppLayout';
import React, { useEffect } from 'react';
import { useStateContext } from '@/contexts/PaginaActualContext';

import Welcome from './Registers/Welcome';
import Artist from './Artista/Index';
import useTypedPage from '@/Hooks/useTypedPage';

function Index({}) {
  const page = useTypedPage();

  const { currentPage, setCurrentPage } = useStateContext();
  useEffect(() => {
    page.props.auth?.user?.is_artist && page?.props?.artist_account
      ? setCurrentPage(<Artist />)
      : setCurrentPage(<Welcome />);
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
