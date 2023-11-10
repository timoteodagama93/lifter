import SelectGenre from '@/Components/SelectGenre';
import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';
import { BiDotsHorizontal, BiSearch } from 'react-icons/bi';
import { BsCameraVideo, BsPencilSquare } from 'react-icons/bs';
import { FaRandom } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { MdCall } from 'react-icons/md';
import { useStateContext } from '@/contexts/PaginaActualContext';
import ChatItemList from '@/Components/ChatItemList';
import ConversationReader from '@/Components/ConversationReader';

function Comunicar() {
  const [activar, setActivar] = useState('musicas');
  const { currentPage } = useStateContext();
  const { setHideSider } = useStateContext();
  const chats_notifications = [];
  //TODO: How to hide and show the sider -> setHideSider(true);

  return (
    <div className="w-full flex flex-row">
      <div className="w-4/12 h-screen overflow-y-auto mr-5 ">
        {/**Área de previsualização de conversas e notificações */}
        <div className="w-full  flex flex-row justify-between p-1">
          <h1 className="hidden md:flex md:text-3xl font-bold">Notificações</h1>
          <div className="flex flex-row justify-between w-full px-5">
            <button className="text-2xl border">
              <BsPencilSquare />
            </button>
            <button className="text-2xl border">
              <BiDotsHorizontal />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col">
          {chats_notifications?.map(chatItem => (
            <ChatItemList chatItem={chatItem} key={chatItem.id} />
          ))}
        </div>
      </div>

      {/**Área de leitura de mensagens */}
      <div className="w-8/12 h-full">
        <ConversationReader conversation={chats_notifications[0]} />
      </div>
    </div>
  );
}

export default Comunicar;
