import { Link } from '@inertiajs/react';
import React from 'react';
import { BiSad } from 'react-icons/bi';
import { FaSadCry } from 'react-icons/fa';
import { HiEmojiSad } from 'react-icons/hi';
import SecondaryButton from './SecondaryButton';

function Error() {
  return (
    <div className="justify-center items-center w-full h-full flex flex-col">
      <FaSadCry className="w-24 h-24" />
      <h1 className="text-4xl">Alguma coisa correu mal...</h1>
      <div className="w-full justify-center items-center flex flex-col gap-1">
        <Link rel="stylesheet" href="/">
          <SecondaryButton>
            <p className="text-xl">Voltar ao ínicio!</p>
          </SecondaryButton>
        </Link>
        <SecondaryButton onClick={() => window.location.reload()}>
          <p className="text-xl">Recarregar página!</p>
        </SecondaryButton>
      </div>
    </div>
  );
}

export default Error;
