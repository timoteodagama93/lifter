import React, { useState } from 'react';
import PlayPause from './PlayPause';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import { BiDownload, BiPlay } from 'react-icons/bi';
import { FaDownload } from 'react-icons/fa';

function CardMusica({ song }) {
  const [isOpen, setIsOpen] = useState(false);
  const [estaAberto, setEstaAberto] = useState(false);
  return (
    <>
      <div className="w-full flex flex-row justify-start items-center border hover:cursor-pointer hover:bg-[#6ba976] rounded-lg shadow-lg m-1 sm:mx-6 md:mx-8 p-5 ">
        <div className="w-1/12 ">
          <PlayPause classNames=" hover:text-orange-500" />
        </div>
        <span className=" mx-1 overflow-x-hidden">
          {song.title ? song.title : 'Titulo Desconhecido'}
        </span>
        <button
          onClick={() => setIsOpen(true)}
          className=" mx-2 overflow-x-hidden border border-gray-200 hover:bg-gray-300 hover:text-orange-600 p-1 rounded-lg"
        >
          {song.subtitle ? song.subtitle : 'Artista Desconhecido'}
        </button>
        <button
          onClick={() => setEstaAberto(true)}
          className=" mx-2 overflow-x-hidden border flex border-gray-200 hover:bg-gray-300 hover:text-orange-600 p-1 rounded-lg justify-between items-center"
        >
          <FaDownload className="mx-2" />
          {song.albun ? song.albun : 'Albun Desconhecido'}
        </button>
        <span className=" mx-1 overflow-x-hidden">
          {song.genero ? song.genero : 'Genero Desconhecido'}
        </span>
        <span className=" mx-1 overflow-x-hidden">03:45</span>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full h-screen flex flex-col p-5 bg-gray-100 rounded-lg shadow-lg">
          <div className="w-full flex">
            <div className="w-1/3">
              <img
                src={song.images?.artistImage}
                className="w-full rounded-full border border-black"
              />
            </div>
            <div className="w-2/3 flex flex-col">
              <h2 className="text-2xl"> {song.title} </h2>
              <div className="w-full flex flex-row">
                <span className="mr-2"> Albuns: 5 </span>
                <span> Músicas: 59 </span>
              </div>
              <h2 className="text-2xl">
                Artista. {song.genero ? song.genero : 'Gênero Desconhecido'}{' '}
              </h2>
            </div>
          </div>
          <div className="w-full">
            <p className="w-full mt-2 p-5 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
              cum atque fugit blanditiis dolore alias excepturi illo doloribus,
              distinctio numquam tempore nobis ducimus officiis delectus
              deleniti consequuntur culpa laborum quasi!
            </p>
          </div>
        </div>
      </Modal>
      <Modal isOpen={estaAberto} onClose={() => setEstaAberto(false)}>
        <div className="w-full h-screen flex flex-col bg-gray-100 rounded-lg shadow-lg p-5">
          <div className="w-full flex flex-row ">
            <div className="w-1/3">
              <img
                src={song.images?.coverart}
                className="w-full rounded-lg border border-black"
              />
            </div>
            <div className="w-2/3 flex flex-col">
              <h2 className="text-2xl"> {song.title} </h2>
              <div className="w-full flex flex-row">
                <span className="mr-2"> Albuns: 5 </span>
                <span> Músicas: 59 </span>
              </div>
              <h2 className="text-2xl">
                Artista. {song.genero ? song.genero : 'Gênero Desconhecido'}{' '}
              </h2>
            </div>
          </div>
          <div className="w-full flex flex-row mt-5">
            <button className="flex justify-center items-center border-2 mx-2 rounded-lg text-xl bg-orange-500 text-white p-1">
              <BiPlay /> Reproduzir tudo
            </button>
            <button className="flex justify-center items-center border-2 mx-2 rounded-lg text-xl bg-orange-500 text-white p-1">
              <BiDownload /> Baixar ALbum
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CardMusica;
