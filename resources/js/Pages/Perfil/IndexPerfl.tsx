import AppLayout from '@/Layouts/AppLayout';
import React, {useEffect} from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import { useStateContext } from '@/contexts/PaginaActualContext';
import Perfil from './Perfil';

function IndexPerfl() {
  const page = useTypedPage();
  const { currentPage, setCurrentPage } = useStateContext();

  const loadDefaultPage = () => {
    setCurrentPage(<Perfil />);
  };

  useEffect(loadDefaultPage,[]);
  return (
    <AppLayout title="Perfil">
      <div className="w-full h-full">{currentPage}</div>
    </AppLayout>
  );
}

export default IndexPerfl;
