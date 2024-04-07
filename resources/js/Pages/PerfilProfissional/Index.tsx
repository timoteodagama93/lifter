import AppLayout from '@/Layouts/AppLayout';
import React, { useEffect } from 'react';
import { useStateContext } from '@/contexts/PaginaActualContext';

import Welcome from './Registers/Welcome';
import Artist from './Artista/Index';
import useTypedPage from '@/Hooks/useTypedPage';
import Profissional from './Outros/Index';
import { Error } from '@/Components';

import Container from '@/Layouts/Container';

function Index({ artist, profissional }) {
  const page = useTypedPage();

  const { currentPage, setCurrentPage } = useStateContext();
  useEffect(() => {
    if (artist == null && profissional == null) setCurrentPage(<Welcome />);
    if (artist != null) setCurrentPage(<Artist />);
    if (profissional != null) setCurrentPage(<Profissional />);
  }, []);
  return (
    <AppLayout title="Perfil">
      <Container>
        <div className="w-full h-full">
          <div className="w-full h-full flex flex-col mb-96 pb-1">
            {currentPage}
          </div>
        </div>
      </Container>
    </AppLayout>
  );
}

export default Index;
