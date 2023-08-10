import React, { useState } from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

function Votar({ song }) {
  return (
    <div className='flex flex-row'>
      <div className="flex flex-col justify-center items-center bg-[#4c88c4] green-500 mr-2 p-1">
        <BsArrowUp size={35} className="text-gray-300 hover:text-[#6ba976] " />
        <span className="">Votar</span>
      
      </div>
      <div className="flex flex-col justify-center items-center bg-[#c43f3f]  ml-2 p-1">
        <BsArrowDown size={35} className="text-gray-300 hover:text-[#d17734] " />
        <span className="">Votar</span>
      
      </div>
    </div>
  );
}

export default Votar;
