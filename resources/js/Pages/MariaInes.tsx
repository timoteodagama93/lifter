import NavLink from '@/Components/NavLink';
import MariaInesLayout from '@/Layouts/MariaInesLayout';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { BiLeftDownArrowCircle, BiMenuAltLeft } from 'react-icons/bi';
import { BsMenuButton } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { IoIosFolderOpen } from 'react-icons/io';
import {
  MdDashboard,
  MdMenuOpen,
  MdOutlineClass,
  MdPayments,
} from 'react-icons/md';

function MariaInes() {
  const [expanded, setExpanded] = useState('closed');
  function expande(menu: string) {
    setExpanded(menu);
  }
  return (
    <MariaInesLayout>
      <div className="w-1/5  h-auto bg-slate-400 ">
        <div className="md:flex hidden h-screen flex-col w-[240px] py-10 px-4 ">
          <div className="mt-5 ">
            <ul className="w-full flex flex-col gap-4  justify-start my-8 text-sm font-medium ">
              <div
                className="btn-toggle flex text-xl w-full justify-start items-center 
              "
                onClick={() => {
                  expande('relatorios');
                }}
                aria-expanded={expanded === 'relatorios' ? true : false}
              >
                <button
                  className="flex text-xl w-full justify-start items-center 
              "
                >
                  <MdDashboard className="text-2xl mr-2" />
                  Relatórios
                </button>
              </div>
              <div
                className={` mt-0 w-full flex flex-col ${
                  expanded === 'relatorios' ? ' block' : 'hidden'
                }`}
              >
                <button>Imprimir</button>
                <button>Bacup</button>
                <button>Gerar</button>
              </div>

              <button
                aria-expanded={expanded === 'turmas' ? true : false}
                onClick={() => {
                  expande('turmas');
                }}
                className="btn-toggle collapsed flex text-xl w-full m-1 justify-start items-center 
                hover:bg-orange-300 hover:text-red-700"
              >
                <MdOutlineClass className="text-2xl mr-5" />
                Turmas
              </button>
              <button
                aria-expanded={expanded === 'alunos' ? true : false}
                onClick={() => {
                  expande('alunos');
                }}
                className="btn-toggle collapsed flex text-xl w-full justify-start m-1 items-center 
                hover:bg-orange-300"
              >
                <FiUser className="text-2xl mr-5" />
                Alunos
              </button>
              <button
                aria-expanded={expanded === 'pagamentos' ? true : false}
                onClick={() => {
                  expande('pagamentos');
                }}
                className="btn-toggle collapsed flex text-xl w-full justify-start m-1 items-center 
              hover:bg-orange-300"
              >
                <MdPayments className="text-2xl mr-5" />
                Pagamentos
              </button>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-4/5 h-auto ">
        <div className="text w-full justify-center items-center ">
          <h1 className="text-5xl text-center border-b-2 ml-[20%] mr-[20%] ">
            Main content
          </h1>
        </div>
      </div>
    </MariaInesLayout>
  );
}

export default MariaInes;
