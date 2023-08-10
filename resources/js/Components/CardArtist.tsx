import React, { useState } from 'react';
import PlayPause from './PlayPause';
import DotsMenu from './DotsMenu';
import Modal from './Modal';
import { BsEye } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { AiOutlineClose } from 'react-icons/ai';
import { TiMessages } from 'react-icons/ti';
import { BiMusic, BiStats, BiUpload } from 'react-icons/bi';

function CardArtist({ artist }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="w-full h-full p-1 flex flex-col items-center justify-center m-0">
        <div className="w-full h-4/5 rounded-lg">
          <img
            onClick={() => {
              setIsOpen(true);
            }}
            className="w-full h-full rounded-lg cursor-pointer"
            src={artist.images?.artistImage}
          />
        </div>
        <div className="w-full h-1/5  mx-5 justify-start">
          <p className="w-full h-full bg-gray-50 flex flex-col">
            <span className="text-bold text-center text-2xl m-0 p-0">
              {artist.name}
            </span>
            <span className=" text-center m-0 p-0">{artist.style}</span>
          </p>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className="w-full ">
          <h1 className="text-2xl m-8">Detalhes do Artista</h1>
          <AiOutlineClose
            onClick={() => {
              setIsOpen(false);
            }}
            className="cursor-pointer m-8 text-3xl absolute top-0 right-0"
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col py-5 my-2 bg-gray-50 rounded-lg shadow-lg">
            <div className="w-full flex">
              <div className="w-20 m-2">
                <img
                  src={artist.images?.artistImage}
                  className=" rounded-full w-20 border border-black"
                />
              </div>
              <div className="w-2/3 flex flex-col">
                <h2 className="text-4xl text-bold">
                  Artístico: {artist.name}{' '}
                </h2>
                <div className="w-full flex flex-row">
                  <span className="mr-2"> Albuns: 5 </span>
                  <span> Músicas: 59 </span>
                </div>
                <h2 className="text-2xl">
                  Estilo.{' '}
                  {artist.style ? artist.style : 'Gênero Desconhecido'}{' '}
                </h2>
              </div>
            </div>
            <div className="w-full flex ">
              <button
                className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded-lg items-center flex p-1"
                onClick={() => {}}
              >
                <BiMusic className="mr-3" />
                Criar perfil artístico
              </button>
              <button
                className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded-lg items-center flex p-1"
                onClick={() => {}}
              >
                <BiUpload className="mr-3" />
                Carregar música
              </button>
              <button className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded-lg items-center flex p-1">
                <BiStats className="mr-3" />
                Relatórios
              </button>
              <button className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded-lg items-center flex p-1">
                <TiMessages className="mr-3" />
                Feedbacks nas músicas
              </button>
            </div>
            <div className="w-full">
              <p className="w-full mt-2 p-5 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                obcaecati cumque at amet eum modi hic unde. Quos, corporis
                perferendis? Necessitatibus ex iste, voluptatibus magni cum
                culpa repellendus illo dolor! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Eum earum nam rem, numquam
                exercitationem fuga possimus quas neque suscipit! Culpa labore
                quos veritatis at vel obcaecati quisquam? Quasi, atque nulla.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CardArtist;
