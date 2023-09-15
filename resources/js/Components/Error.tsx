import React from 'react';
import { HiEmojiSad } from 'react-icons/hi';

function Error() {
  return (
    <div className="justify-center items-center w-full h-full flex flex-col">
      <h1 className="text-xl">
        Alguma coisa correu mal...
      </h1>
      <p className="text-base">Recarregue a página!</p>
    </div>
  );
}

export default Error;
