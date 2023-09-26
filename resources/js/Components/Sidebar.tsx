import React, { useState } from 'react';
import ApplicationLogo from './ApplicationLogo';
import {
  links,
  account_pages,
  ascensao_links,
  comunicaoes_links,
  home_pages,
  music_pages,
} from '../assets/constants';
import route from 'ziggy-js';
import useTypedPage from '@/Hooks/useTypedPage';
import UserAvatar from './UserAvatar';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { GrClose } from 'react-icons/gr';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { Link } from '@inertiajs/react';
import { Logo } from '../../img';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';
import { MdNotifications } from 'react-icons/md';
import Notificacoes from '@/Pages/Comunicar/Notificacoes';
import { BiSearch } from 'react-icons/bi';
import { FaMusic } from 'react-icons/fa';
import SectionBorder from './SectionBorder';

function Sidebar({}) {
  const { setCurrentPage, openMobileMenu, setOpenMobileMenu } =
    useStateContext();

  const page = useTypedPage();

  return (
    <>
      <div
        className={`hidden md:flex flex-col
         opacity-95 bg-[#191624] w-[240px] `}
      >
        <Link href="/">
          <img className="w-full h-16 object-contain" src={Logo} alt="logo" />
        </Link>
        <SectionBorder />

        <div className="flex flex-row ">
          <UserAvatar />
          {/*** Search buttom, Messages Link and Notification Link */}
          <div className="flex md:flex flex-row items-center mr-2">
            <div className="flex flex-row space-x-1  items-center justify-center">
              <span></span>
              <button
                className="rounded-sm p-2 m-0 md:m-4 cursor-pointer hover:bg-[#f6cc33 shadow-xl shadow-black bg-[#2e2c2e] text-white flex flex-row justify-center items-center"
                onClick={() => setOpenSearch(true)}
              >
                <BiSearch />
                <span className="hidden">Músicas</span>
              </button>
              <button
                className="rounded-sm p-2 m-0 md:m-4 cursor-pointer hover:bg-[#f6cc33 shadow-xl shadow-black bg-[#2e2c2e] text-white flex flex-row justify-center items-center"
                onClick={() => setOpenSongRandom(true)}
              >
                <FaMusic />
                <span className="hidden">Músicas</span>
              </button>

              <div
                /**Setup para carregar a pagina padrão do endereço actual: /comunicar */
                onClick={() => setCurrentPage(<Notificacoes />)}
                className="md:flex rounded-sm md:rounded-sm p-1 px-2 md:px-2 m-4 cursor-pointer hover:bg-[#f6cc33 shadow-xl shadow-black bg-[#2e2c2e] text-white"
              >
                <Link href={route('comunicar')}>
                  <span className="sticky top-1 p-2  shadow-lg bg-[#000] w-4 h-4 flex justify-center items-center rounded-full text-red-500 text-xs">
                    2
                  </span>
                  <MdNotifications />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <SectionBorder />
        <Links links={links} setOpenMobileMenu={setOpenMobileMenu} />
        <Footer />
      </div>
      {/**sidebar telefones */}

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          openMobileMenu ? 'left-0' : '-left-full'
        }  `}
      >
        <Link href="/">
          <img className="w-full h-16 object-contain" src={Logo} alt="logo" />
        </Link>
        <SectionBorder />

        <div className="flex flex-row ">
          <UserAvatar />
          {/*** Search buttom, Messages Link and Notification Link */}
          <div className="flex md:flex flex-row items-center mr-2">
            <div className="flex flex-row space-x-1  items-center justify-center">
              <span></span>
              <button
                className="rounded-sm p-2 m-0 md:m-4 cursor-pointer hover:bg-[#f6cc33 shadow-xl shadow-black bg-[#2e2c2e] text-white flex flex-row justify-center items-center"
                onClick={() => setOpenSearch(true)}
              >
                <BiSearch />
                <span className="hidden">Músicas</span>
              </button>
              <button
                className="rounded-sm p-2 m-0 md:m-4 cursor-pointer hover:bg-[#f6cc33 shadow-xl shadow-black bg-[#2e2c2e] text-white flex flex-row justify-center items-center"
                onClick={() => setOpenSongRandom(true)}
              >
                <FaMusic />
                <span className="hidden">Músicas</span>
              </button>

              <div
                /**Setup para carregar a pagina padrão do endereço actual: /comunicar */
                onClick={() => setCurrentPage(<Notificacoes />)}
                className="md:flex rounded-sm md:rounded-sm p-1 px-2 md:px-2 m-4 cursor-pointer hover:bg-[#f6cc33 shadow-xl shadow-black bg-[#2e2c2e] text-white"
              >
                <Link href={route('comunicar')}>
                  <span className="sticky top-1 p-2  shadow-lg bg-[#000] w-4 h-4 flex justify-center items-center rounded-full text-red-500 text-xs">
                    2
                  </span>
                  <MdNotifications />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <SectionBorder />
        <Links setOpenMobileMenu={setOpenMobileMenu} links={links} />
        <Footer />
      </div>
    </>
  );
}
const Footer = () => {
  return (
    <div className="w-full my-2 opacity-95 absolute bottom-0 left-10 justify-center items-center">
      {' '}
      Lifter @ {new Date().getFullYear()}{' '}
    </div>
  );
};

function Links({ links, setOpenMobileMenu }) {
  return (
    <>
      <div className="mt-0">
        <ul className="flex flex-col gap-1  justify-start my-5 text-sm font-medium ">
          {links.map(item => (
            <Link
              href={item.href}
              key={item.name}
              className={`flex flex-row justify-start my-2 text-sm text-gray-400 hover:text-cyan-400
          ${
            route().current()?.includes(item.href)
              ? 'border-l-4 border-[#4c88c4]  bg-[#2e2e2e] '
              : ''
          }   items-center
          `}
              onClick={() => setOpenMobileMenu(false)}
            >
              <item.icon className="w-6 h-6 mr-2" />
              {item.name}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
