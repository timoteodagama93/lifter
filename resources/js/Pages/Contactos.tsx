import SelectGenre from '@/Components/SelectGenre';
import AppLayout from '@/Layouts/AppLayout'
import React, { useState } from 'react'
import { BiDotsHorizontal, BiSearch } from 'react-icons/bi';
import { BsCameraVideo, BsPencilSquare } from 'react-icons/bs';
import { chats_notifications, messages } from '../../data/dummy';
import { MdCall } from 'react-icons/md';
import { Link } from '@inertiajs/react';

function Contactos() {
  const [activar, setActivar] = useState('musicas');

  return (
    <AppLayout title='Contactos'>
        <div className="pb-12 h-screen overflow-y-hidden">
        <div className="w-full">
          <div className="w-full  flex justify-between items-center sm:flex-row flex-col mt-1 mb-10">
            <h2 className="font-bold text-3xl text-left">
              Contactos 
            </h2>

            <div className="justify-center items-center mx-5">
              <button
                className="w-auto justify-center items-center text-xl text-bold p-3"
                onClick={() => setActivar('musicas')}
              >
                Artistas
                {activar === 'musicas' ? (
                  <div className="justify-center mx-auto mt-2 w-10 rounded-lg border-b-4 border-[#d17734]" />
                ) : (
                  ''
                )}
              </button>
              <button
                className="text-xl text-bold p-3"
                onClick={() => setActivar('albuns')}
              >
                Jurados
                {activar === 'albuns' ? (
                  <div className="justify-center mx-auto mt-2 w-10 rounded-lg border-b-4 border-[#d17734]" />
                ) : (
                  ''
                )}
              </button>
              <button
                className="text-xl text-bold p-3"
                onClick={() => setActivar('artistas')}
              >
                Usuários
                {activar === 'artistas' ? (
                  <div
                    className={`justify-center mx-auto mt-2 w-10 rounded-lg border-b-4 border-[#d17734]`}
                  />
                ) : (
                  ''
                )}
              </button>
            </div>

            <div className="w-auto">
              <SelectGenre className="" />
            </div>
          </div>

          <div className="w-full flex flex-row  ">
            <div className="w-1/3 h-screen overflow-y-auto mr-5 ">
              {/**Área de previsualização de conversas e notificações */}
              <div className="w-full  flex flex-row justify-between p-1">
                <h1 className="text-3xl font-bold">Conversas</h1>
                <div className="flex flex-row">
                  <button className="text-2xl mr-2 border">
                    <BsPencilSquare />
                  </button>
                  <button className="text-2xl ml-2 border">
                    <BiDotsHorizontal />
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col">
                <div className="mt-4 flex flex-col gap-1">
                  {chats_notifications?.map(chatItem => (
                    
                    <ChatItem chatItem={chatItem} key={chatItem.id} />
                  ))}
                </div>
              </div>
            </div>

            {/**Área de leitura de mensagens */}
            <div className="w-2/3 h-screen overflow-y-auto ">
              <div className="w-full border p-5 flex flex-row justify-between items-center">
                <div className="w-full flex flex-row items-center">
                  <img
                    src={chats_notifications[0]?.picture_profile}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="ml-5"> {chats_notifications[0]?.user} </span>
                </div>
                <div className="flex flex-row">
                  <button className="text-3xl">
                    {' '}
                    <BsCameraVideo />{' '}
                  </button>
                  <button className="ml-5 text-3xl ">
                    {' '}
                    <MdCall />{' '}
                  </button>
                  <button className="mx-5 text-3xl border-r-2 border-gray-200 mr-5"></button>
                  <button className="text-3xl ">
                    <BiSearch />
                  </button>
                </div>
              </div>

              <div className="w-full">
                {messages.map(mensagem => (
                  <div className="py-5">
                    <p className="w-full ml-5 mr-10 border bg-green-50">
                      {mensagem.message}
                      <br />
                      <span className="justify-end right-5">
                        {' '}
                        {mensagem.time}{' '}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}



const ChatItem = ({ chatItem }) => {
  return (
    <div className="flex flex-row items-center hover:rounded-lg hover:bg-[#0b494d] hover:text-white py-2 p-4  cursor-pointer mb-2">
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          src={chatItem?.picture_profile}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <div className="w-full flex justify-between">
            <Link href={`song-details/${chatItem.id}`} className="">
              <p className="text-xl font-bold "> {chatItem.user} </p>
            </Link>
            <span> {chatItem?.messages?.time} </span>
          </div>
          <Link href={`song-details/${chatItem.id}`} className="">
            <p className="text-base text-"> {chatItem?.type} </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contactos
