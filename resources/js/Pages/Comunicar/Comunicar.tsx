import SelectGenre from '@/Components/SelectGenre';
import AppLayout from '@/Layouts/AppLayout';
import React, { useState, useEffect } from 'react';
import { BiDotsHorizontal, BiSearch } from 'react-icons/bi';
import { BsCameraVideo, BsPencilSquare } from 'react-icons/bs';
import { FaRandom } from 'react-icons/fa';
import { chats_notifications, messages } from '../../../data/dummy';
import { Link } from '@inertiajs/react';
import { MdCall } from 'react-icons/md';
import { useStateContext } from '@/contexts/PaginaActualContext';
import ChatItemList from '@/Components/ChatItemList';
import ConversationReader from '@/Components/ConversationReader';
import { Notificacoes } from './Index';

function Mensagens() {
  const [activar, setActivar] = useState('musicas');
  const { currentPage, setCurrentPage } = useStateContext();
  const { setHideSider } = useStateContext();

  const loadDefaultPage = () => {
    setCurrentPage(<Notificacoes />);
  };
  useEffect(loadDefaultPage, []);

  return (
    <AppLayout title="Comunicações">
      <div className="pb-12 h-full md:h-[82vh] lg:h-[85vh] overflow-y-hidden">
        <div className="w-full">{currentPage}</div>
      </div>
    </AppLayout>
  );
}

export default Mensagens;
