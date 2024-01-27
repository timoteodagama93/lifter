import React from 'react';
import { BiSad } from 'react-icons/bi';
import { HiEmojiSad } from 'react-icons/hi';

function Error() {
  return (
    <div className="justify-center items-center w-full h-full flex flex-col">
      <BiSad className="w-24 h-24" />
      <h1 className="text-2xl">Alguma coisa correu mal...</h1>
      <p className="text-xl">Recarregue a página!</p>
    </div>
  );
}

export default Error;
