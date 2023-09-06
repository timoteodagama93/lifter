import SelectGenre from '@/Components/SelectGenre';
import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';
import { BiDotsHorizontal, BiSearch } from 'react-icons/bi';
import { BsCameraVideo, BsPencilSquare } from 'react-icons/bs';
import { FaRandom } from 'react-icons/fa';
import { chats_notifications, messages } from '../../../data/dummy';
import { Link } from '@inertiajs/react';
import { MdCall } from 'react-icons/md';
import { useStateContext } from '@/contexts/PaginaActualContext';
import ChatItemList from '@/Components/ChatItemList';
import ConversationReader from '@/Components/ConversationReader';

function Mensagens() {
  const [activar, setActivar] = useState('musicas');
  const { currentPage } = useStateContext();
  const { setHideSider } = useStateContext();
  //TODO: How to hide and show the sider -> setHideSider(true);

  return (
    <AppLayout title="Comunicações">
      <div className="pb-12 h-full md:h-[82vh] lg:h-[85vh] overflow-y-hidden">
        <div className="w-full">
          {currentPage}
        </div>
      </div>
    </AppLayout>
  );
}

export default Mensagens;
