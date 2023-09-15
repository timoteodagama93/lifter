import React, { useState } from 'react';

import UserAvatar from '@/Components/UserAvatar';
import { Link } from '@inertiajs/react';
import {
  BiEdit,
  BiInfoCircle,
  BiLibrary,
  BiMusic,
  BiStats,
  BiUpload,
} from 'react-icons/bi';
import { TiMessages } from 'react-icons/ti';
import useTypedPage from '@/Hooks/useTypedPage';
import AppLayout from '@/Layouts/AppLayout';
import { MdPhoto } from 'react-icons/md';
import DetailsArtist from './Artista/Info/DetailsArtist';
import { FaCoins } from 'react-icons/fa';
import { RiContactsBook2Fill } from 'react-icons/ri';

function Perfil() {
  const page = useTypedPage();
  return (
    <AppLayout title="Perfil">
      <div className="w-full flex flex-col">
        <div
          className="relative w-full flex flex-col rounded-lg shadow-lg shadow-black p-5 justify-center items-center"
          style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: `url(${page.props.auth.user?.profile_photo_url_})`,
          }}
        >
          <button className="absolute top-0 right-0 p-2 md:p-5 rounded-full bg-[#2e2c2e] text-sm md:text-2xl  ">
            <MdPhoto />
          </button>
          <div className="w-20 m-2">
            <img
              src={page.props.auth.user?.profile_photo_url}
              className=" rounded-full w-20 border border-black"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <h2 className="text-xl md:text-2xl text-bold">{page.props.auth.user?.name}</h2>
            <div className="w-full flex flex-row justify-center items-center">
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2 justify-center items-center mr-2 flex"> <BiLibrary/> 0 </span>
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2 justify-center items-center mr-2 flex"> <FaCoins/> 0 </span>
              <span className='p-1 shadow-sm shadow-white gap-1 mb-2 justify-center items-center flex'> <RiContactsBook2Fill/> 0 </span>
            </div>
          </div>
          <div className="w-full flex ">
            <button className="border border-b-4 hover:bg-[#2e2c2e] border-[#4c88c4] rounded text-xs items-center justify-center flex flex-col md:flex-row p-1">
              <BiInfoCircle className="text-xl mr-1" />
              Informações
            </button>
            <button className="border border-b-4 hover:bg-[#2e2c2e] border-[#4c88c4] rounded text-xs items-center justify-center flex flex-col md:flex-row p-1">
              <BiInfoCircle className="text-xl mr-1" />
              Definições
            </button>
            <button className="border border-b-4 hover:bg-[#2e2c2e] border-[#4c88c4] rounded text-xs items-center justify-center flex flex-col md:flex-row p-1">
              <BiInfoCircle className="text-xl mr-1" />
              Informações
            </button>
          </div>
        </div>
        <div className="w-full ">
          <p className="w-full mt-2 p-2 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            obcaecati cumque at amet eum modi hic unde. Quos, corporis
            perferendis? Necessitatibus ex iste, voluptatibus magni cum culpa
            repellendus illo dolor! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Eum earum nam rem, numquam exercitationem fuga
            possimus quas neque suscipit! Culpa labore quos veritatis at vel
            obcaecati quisquam? Quasi, atque nulla.
          </p>
        </div>

        <div className=" w-full flex flex-col p-5 bg-gray-50 rounded-lg shadow-lg">
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
    </AppLayout>
  );
}

export default Perfil;
