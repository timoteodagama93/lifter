import React, { useState } from 'react';
import { BiComment } from 'react-icons/bi';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import Modal from './Modal';
import { MdClose } from 'react-icons/md';
import PrimaryButton from './PrimaryButton';

function FeedbackOnSong({ song }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex flex-row ">
        <div
          className="rounded-lg flex flex-row justify-center items-center bg-slate-100 shadow-xl mr-2 p-2"
          onClick={() => setIsOpen(true)}
        >
          <BiComment size={35} className="text-gray-300 shadow-2xl" />
          <span className="ml-2">Comentar</span>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full p-5 bg-gradient-to-tl from-[#0b494d] to-[#879d9e] ">
          <div className="">
            <h1 className="text-4xl text-center">
              Deixar Feedback ao Artista
            </h1>
              <span className="text-2xl text-start mr-2">Artista:</span>
              <span className="text-2xl text-start text-bold">{song.subtitle} </span>
            <MdClose
              onClick={() => setIsOpen(false)}
              className="text-2xl bg-slate-400 cursor-pointer absolute top-2 right-2 bg-transparent "
            />
            <p className="text-base">
              Deixe um feedback ou opinião sobre a música
            </p>
          </div>
          <div>
            <form>
              <textarea
                className="w-full rounded-lg shadow-lg"
                placeholder="Escrever comentário"
              ></textarea>
            </form>
          </div>
          <div className="w-full ">
            <PrimaryButton className=''>Enviar Comentário</PrimaryButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default FeedbackOnSong;
