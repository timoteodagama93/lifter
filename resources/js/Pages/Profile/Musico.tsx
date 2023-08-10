import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';
import { songs } from '../../../data/dummy';
import { BiMusic, BiStats, BiUpload } from 'react-icons/bi';
import { TiMessages } from 'react-icons/ti';
import Modal from '@/Components/Modal';
import { MdClose } from 'react-icons/md';
import UserAvatar from '@/Components/UserAvatar';

function Musico() {
  const [registroArtistico, setRegistroArtistico] = useState(false);
  const [upLoadingSong, setUpLoadingSong] = useState(false);
  return (
    <AppLayout title="Perfil">
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col py-5 my-2 bg-gray-50 rounded-lg shadow-lg">
          <div className="w-full flex">
            <div className="w-20 m-2">
              <img
                src={songs[0].images?.artistImage}
                className=" rounded-full w-20 border border-black"
              />
            </div>
            <div className="w-2/3 flex flex-col">
              <h2 className="text-4xl text-bold">
                Artístico: {songs[1].subtitle}{' '}
              </h2>
              <div className="w-full flex flex-row">
                <span className="mr-2"> Albuns: 5 </span>
                <span> Músicas: 59 </span>
              </div>
              <h2 className="text-2xl">
                Artista.{' '}
                {songs[0].genero ? songs[0].genero : 'Gênero Desconhecido'}{' '}
              </h2>
            </div>
            <UserAvatar />
          </div>
          <div className="w-full flex ">
            <button
              className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded-lg items-center flex p-1"
              onClick={() => {
                setRegistroArtistico(true);
              }}
            >
              <BiMusic className="mr-3" />
              Criar perfil artístico
            </button>
            <button className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded-lg items-center flex p-1"
            onClick={ ()=> setUpLoadingSong(true)}
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
              perferendis? Necessitatibus ex iste, voluptatibus magni cum culpa
              repellendus illo dolor! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Eum earum nam rem, numquam exercitationem fuga
              possimus quas neque suscipit! Culpa labore quos veritatis at vel
              obcaecati quisquam? Quasi, atque nulla.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col p-5 bg-gray-50 rounded-lg shadow-lg">
          <div className="w-full">
            <p className="w-full mt-2 p-5 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              obcaecati cumque at amet eum modi hic unde. Quos, corporis
              perferendis? Necessitatibus ex iste, voluptatibus magni cum culpa
              repellendus illo dolor! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Eum earum nam rem, numquam exercitationem fuga
              possimus quas neque suscipit! Culpa labore quos veritatis at vel
              obcaecati quisquam? Quasi, atque nulla.
            </p>
          </div>
        </div>
      </div>
      <Modal isOpen={upLoadingSong} onClose={() => {}}>
        <div className="w-full m-0">
          <div className="justify-center">
            <h1 className="text-center text-3xl">Enviar Música</h1>
            <span
              onClick={() => setUpLoadingSong(false)}
              className="text-3xl absolute top-0 right-0 m-2 cursor-pointer text-red-600 text-bold bg-gray-300"
            >
              <MdClose />
            </span>
            <form className="m-0">
              <div className="border m-0 p-5 w-full flex flex-row mx-5 justify-start items-center">
                <label htmlFor="artistico" className=" mr-5 justify-end">
                  Título
                </label>
                <input
                  className="w-full border-1 rounded-sm border-orange-600 shadow-xl"
                  id="artistico"
                  type="text"
                />
              </div>
              <div className="border shadow-sm m-5 p-5 w-full flex flex-row mx-5 justify-start items-center">
                <label htmlFor="artistico" className=" mr-5 justify-end">
                  Estilo
                </label>
                <input
                  className="w-full border-1 rounded-sm border-orange-600 shadow-xl"
                  id="artistico"
                  type="text"
                />
              </div>
              <div className="border shadow-sm m-5 p-5 w-full flex flex-row mx-5 justify-start items-center">
                <label htmlFor="artistico" className=" mr-5 justify-end">
                  Detalhes
                </label>
                <input
                  className="w-full border-1 rounded-sm border-orange-600 shadow-xl"
                  id="artistico"
                  type="text"
                />
              </div>
              <div className="border shadow-sm m-5 p-5 w-full flex flex-row mx-5 justify-start items-center">
                <label htmlFor="artistico" className=" mr-5 justify-end">
                  Letra
                </label>
                <textarea
                  className="w-full border-1 rounded-sm border-orange-600 shadow-xl"
                  id="artistico"
                 
                ></textarea>
              </div>
              <div className="border m-5 p-5 w-full flex flex-row mx-5 justify-start items-center">
                <label htmlFor="artistico" className=" mr-5 justify-end">
                  Musica
                </label>
                <input
                  className="w-full border-1 rounded-sm  shadow-sm"
                  id="artistico"
                  type="file"
                />
              </div>
              <div className="w-full m-5 flex justify-center items-center">
                <button type='button' className="w-auto border bg-orange-200 shadow-lg rounded m-1 p-5">
                 Enviar música
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <Modal isOpen={registroArtistico} onClose={() => {}}>
        <div className="w-full m-0">
          <div className="justify-center">
            <h1 className="text-center text-3xl">Activar conta artística</h1>
            <span
              onClick={() => setRegistroArtistico(false)}
              className="text-3xl absolute top-0 right-0 m-2 cursor-pointer text-red-600 text-bold bg-gray-300"
            >
              <MdClose />
            </span>
            <form className="m-0">
              <div className="border m-0 p-5 w-full flex flex-row mx-5 justify-start items-center">
                <label htmlFor="artistico" className=" mr-5 justify-end">
                  Nome Completo
                </label>
                <input
                  className="w-full border-1 rounded-sm border-orange-600 shadow-xl"
                  id="artistico"
                  type="text"
                />
              </div>
              <div className="border shadow-sm m-5 p-5 w-full flex flex-row mx-5 justify-start items-center">
                <label htmlFor="artistico" className=" mr-5 justify-end">
                  Nome artístico
                </label>
                <input
                  className="w-full border-1 rounded-sm border-orange-600 shadow-xl"
                  id="artistico"
                  type="text"
                />
              </div>
              <div className="border m-5 p-5 w-full flex flex-row mx-5 justify-start items-center">
                <label htmlFor="artistico" className=" mr-5 justify-end">
                  Estilo Musical
                </label>
                <input
                  className="w-full border-1 rounded-sm  shadow-sm"
                  id="artistico"
                  type="text"
                />
              </div>
              <div className="w-full m-5 flex justify-center items-center">
                <button type='button' className="w-auto border bg-orange-200 shadow-lg rounded m-1 p-5">
                  Activar conta
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </AppLayout>
  );
}

export default Musico;
