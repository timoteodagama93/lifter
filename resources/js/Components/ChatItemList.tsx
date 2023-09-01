import { Link } from '@inertiajs/react';
import React from 'react';

function ChatItemList({ chatItem }) {
  return (
    <div className="flex flex-row items-center hover:rounded-md hover:bg-[#2e2c2e] hover:text-white p-0 md:p-1 cursor-pointer mb-2">
      <div className="flex-1 flex flex-row justify-start space-x-2 items-center">
        <img
          src={chatItem?.picture_profile}
          alt=""
          className="w-5 md:w-10 h-5 md:h-10 rounded-full"
        />
        <div className="w-full md:flex flex-col justify-start items-center">
          <div className="w-full flex flex-col justify-between">
            <Link href={`song-details/${chatItem.id}`} className="">
              <p className="text-base md:text-base lg:text-xl font-bold ">
                {' '}
                {chatItem.user}{' '}
              </p>
            </Link>
            <span className="text-xs"> {chatItem?.messages?.time} </span>
          </div>
          <span className="w-full flex justify-start text-xs md:text-base">
            {' '}
            {chatItem?.type}{' '}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatItemList;
