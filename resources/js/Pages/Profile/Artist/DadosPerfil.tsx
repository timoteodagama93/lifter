import UserAvatar from '@/Components/UserAvatar';
import React from 'react';
import { songs } from '../../../../data/dummy';
import { BiMusic, BiUpload } from 'react-icons/bi';
import { Link } from '@inertiajs/react';

function DadosPerfil({ page }) {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col rounded-lg shadow-lg shadow-black p-5">
        <div className="w-full flex">
          <div className="w-20 m-2">
            <img
              src={page.props.auth.user?.profile_photo_url}
              className=" rounded-full w-20 border border-black"
            />
          </div>
          <div className="w-2/3 flex flex-col">
            <h2 className="text-4xl text-bold">
              Artístico: {page.props.auth.user?.name}
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
          <Link
            href="/upload"
            className="m-1 border border-b-4 hover:bg-gray-200 border-orange-500 rounded-lg items-center flex p-1"
            onClick={() => setUpLoadingSong(true)}
          >
            <BiUpload className="mr-3" />
            Carregar Vídeo
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
      <div className="w-full">
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
  );
}

export default DadosPerfil;
