import React, { useState } from 'react';

import UserAvatar from '@/Components/UserAvatar';
import { Link } from '@inertiajs/react';
import { BiMusic, BiStats, BiUpload } from 'react-icons/bi';
import { TiMessages } from 'react-icons/ti';
import { songs } from '../../../data/dummy';
import useTypedPage from '@/Hooks/useTypedPage';

function Perfil() {
  const page = useTypedPage();
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col rounded-lg shadow-lg shadow-black p-5">
        <div className="w-full flex justify-center items-center">
          <div className="w-20 m-2">
            <img
              src={page.props.auth.user?.profile_photo_url}
              className=" rounded-full w-20 border border-black"
            />
          </div>
          <div className="w-2/3 flex flex-col">
            <h2 className="text-4xl text-bold">{page.props.auth.user?.name}</h2>
            <div className="w-full flex flex-row">
              <span className="mr-2"> Coleções: 0 </span>
              <span className="mr-2"> Pontos: 0 </span>
              <span> Contactos: 0 </span>
            </div>
          </div>
        </div>
        <div className="w-full hidden ">
          <button
            className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded-lg items-center flex p-1"
            onClick={() => {
              setRegistroArtistico(true);
            }}
          >
            <BiMusic className="mr-3" />
            Criar perfil artístico
          </button>
          <Link
            href="/upload.song"
            className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded-lg items-center flex p-1"
          >
            <BiUpload className="mr-3" />
            Carregar música
          </Link>
          <Link
            href="/upload.new"
            className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded-lg items-center flex p-1"
          >
            <BiUpload className="mr-3" />
            Carregar música nova
          </Link>
          <button className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded-lg items-center flex p-1">
            <BiStats className="mr-3" />
            Relatórios
          </button>
          <button className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded-lg items-center flex p-1">
            <TiMessages className="mr-3" />
            Feedbacks nas músicas
          </button>
        </div>
      </div>
      <div className="w-full hidden">
        <p className="w-full mt-2 p-2 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum obcaecati
          cumque at amet eum modi hic unde. Quos, corporis perferendis?
          Necessitatibus ex iste, voluptatibus magni cum culpa repellendus illo
          dolor! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
          earum nam rem, numquam exercitationem fuga possimus quas neque
          suscipit! Culpa labore quos veritatis at vel obcaecati quisquam?
          Quasi, atque nulla.
        </p>
      </div>

      <div className="hidden w-full flex flex-col p-5 bg-gray-50 rounded-lg shadow-lg">
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
  );
}

export default Perfil;
