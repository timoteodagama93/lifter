import React, { useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Layouts/Container';

import route from 'ziggy-js';

import { useStateContext } from '@/contexts/PaginaActualContext';
import Arts from './Arts';
import Exposicoes from './Exposicoes';
import BibliotecaLiteraria from './BibliotecaLiteraria';

export default function Index({ has }) {
  const page = route().current();
  const { currentPage, setCurrentPage } = useStateContext();

  useEffect(() => {
    if (has && has == 'expositions') {
      setCurrentPage(<Exposicoes />);
    }
    if (has == 'estante') {
      alert(has);
      setCurrentPage(<BibliotecaLiteraria />);
    }
    if (!has) {
      setCurrentPage(<Arts />);
    }
  }, []);
  return (
    <AppLayout title="Artes">
      <Container>
        <div className="w-full ">{currentPage}</div>
      </Container>
    </AppLayout>
  );
}
