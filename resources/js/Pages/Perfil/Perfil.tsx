import React, { useEffect, useState } from 'react';

import {
  BiEdit,
  BiInfoCircle,
  BiLibrary,
  BiTrophy,
} from 'react-icons/bi';
import useTypedPage from '@/Hooks/useTypedPage';
import AppLayout from '@/Layouts/AppLayout';
import { MdPhoto } from 'react-icons/md';
import { FaCoins } from 'react-icons/fa';
import { RiContactsBook2Fill } from 'react-icons/ri';
import axios from 'axios';
import NewContest from '@/Components/Contest/Index';
import { BsEye } from 'react-icons/bs';
import EditContest from '@/Components/EditContest/Index';

function Perfil({}) {
  const page = useTypedPage();
  const [pagina, setPagina] = useState(<></>);

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
            <h2 className="text-xl md:text-2xl text-bold">
              {page.props.auth.user?.name}
            </h2>
            <div className="w-full flex flex-row justify-center items-center">
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2 justify-center items-center mr-2 flex">
                {' '}
                <BiLibrary /> 0{' '}
              </span>
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2 justify-center items-center mr-2 flex">
                {' '}
                <FaCoins /> 0{' '}
              </span>
              <span className="p-1 shadow-sm shadow-white gap-1 mb-2 justify-center items-center flex">
                {' '}
                <RiContactsBook2Fill /> 0{' '}
              </span>
            </div>
          </div>
          <div className="w-full flex justify-center items-center ">
            <button className="border border-b-4 hover:bg-[#2e2c2e] border-[#4c88c4] rounded text-xs items-center justify-center flex flex-col md:flex-row p-1">
              <BiInfoCircle className="text-xl mr-1" />
              Informações
            </button>
            <button
              onClick={() => setPagina(<NewContest />)}
              className=" shadow-lg shadow-black border flex flex-col text-4xl  justify-start items-center p-1 rounded "
            >
              <BiTrophy className="animate-bounce" />
              <span className="text-xs">Criar concurso</span>
            </button>
            <button
              onClick={() =>
                setPagina(
                  <MyContests
                    setPagina={setPagina}
                    userId={page.props.auth.user?.id}
                  />,
                )
              }
              className="border border-b-4 hover:bg-[#2e2c2e] border-[#4c88c4] rounded text-xs items-center justify-center flex flex-col md:flex-row p-1"
            >
              <BiInfoCircle className="text-xl mr-1" />
              Concursos
            </button>
            <button className="border border-b-4 hover:bg-[#2e2c2e] border-[#4c88c4] rounded text-xs items-center justify-center flex flex-col md:flex-row p-1">
              <BiInfoCircle className="text-xl mr-1" />
              Contactos
            </button>
          </div>
        </div>

        <div className=" w-full relative flex flex-col p-5  rounded-lg ">
          {pagina}
        </div>
      </div>
    </AppLayout>
  );
}

export default Perfil;

function MyContests({ userId, setPagina }) {
  const [contests, setContests] = useState(null);
  const loadMyContests = () => {
    axios
      .post('get-my-contests', userId)
      .then(response => {
        setContests(response.data);
      })
      .catch(error => {
        return (
          <h1 className="p-5 text-xl text-center w-full">
            Alguma coisa correu mal, não foi possível carregar seu concursos.
            Tente novamente dentro de instantes.
          </h1>
        );
      });
  };

  useEffect(loadMyContests, []);
  return (
    <div className="w-full flex flex-row flex-wrap">
      <h1 className="flex w-full text-center text-4xl  ">Meus concursos</h1>
      <>
        <table className="w-full table">
          <thead className="thead-dark">
            <tr className="">
              <th aria-sort="ascending" className="">
                Designação do concurso
              </th>
              <th aria-sort="ascending" className="">
                Início das votações
              </th>
              <th aria-sort="ascending" className="">
                Termino das votações
              </th>
              <th aria-sort="ascending" className="">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {contests?.map(concurso => (
              <tr className="odd:bg-white p-1 odd:text-gray-900 even:bg-slate-500">
                <td>{concurso.designacao}</td>
                <td>{concurso.inicio_votacoes}</td>
                <td>{concurso.termino_votacoes}</td>
                <td>
                  <div className="flex flex-row gap-1">
                    {' '}
                    <button className="px-2 shadow-black shadow-lg gap-1 flex flex-col text-xs">
                      <BsEye className="text-xl" /> Ver
                    </button>
                    <button
                      onClick={() =>
                        setPagina(<EditContest contest={concurso} />)
                      }
                      className="px-2 shadow-black shadow-lg gap- flex flex-col text-xs"
                    >
                      <BiEdit className="text-xl" /> Editar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
}
