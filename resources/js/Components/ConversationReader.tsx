import React from 'react';
import { messages } from '../../data/dummy';
import { BiSearch } from 'react-icons/bi';
import { MdCall } from 'react-icons/md';
import { BsCameraVideo } from 'react-icons/bs';

function ConversationReader({ conversation }) {
  return (
    <div className="w-full h-[82vh] overflow-x-auto">
      <div className="w-full border p-5 flex flex-row justify-between items-center">
        <div className="w-full flex flex-row items-center">
          <img
            src={conversation?.picture_profile}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-5"> {conversation?.user} </span>
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
              <span className="justify-end right-5"> {mensagem.time} </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConversationReader;
