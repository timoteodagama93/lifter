import { router } from '@inertiajs/core';
import { Link, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React, { Children, PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import ApplicationMark from '@/Components/ApplicationMark';
import Banner from '@/Components/Banner';
import Dropdown from '@/Components/Dropdown';
import DropdownLink from '@/Components/DropdownLink';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Team } from '@/types';
import { Sidebar } from '../Components';
import TopPlay from '@/Components/TopPlay';
import Player from '@/Components/Player/Player';
import MusicPlayer from '@/Components/MusicPlayer';
import { useSelector } from 'react-redux';
import IconSidebar from '@/Components/IconSidebar';
import { artists, generos } from '../../data/dummy';
import {
  BiHome,
  BiLike,
  BiMessage,
  BiSearch,
  BiSmile,
  BiUser,
  BiUserCircle,
  BiUserPlus,
} from 'react-icons/bi';
import { GrNotification } from 'react-icons/gr';
import { HiEmojiHappy, HiHome, HiOutlineMenu } from 'react-icons/hi';
import { user_links } from '../../assets/constants';
import { MdClose, MdNotifications } from 'react-icons/md';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useStateContext } from '@/contexts/PaginaActualContext';

//Style for swiper
import './style.css';
import { FaMusic, FaVoteYea } from 'react-icons/fa';
import { BsEmojiSmile, BsFillCameraVideoFill, BsTrophy } from 'react-icons/bs';
import { Logo, Musica } from '../../img';
import { current } from '@reduxjs/toolkit';
import UserAvatar from '@/Components/UserAvatar';
import { Destaques } from '@/Pages/Home';
import { Avaliar } from '@/Pages/Musicas';
import { Sobre } from '@/Pages/Ascensao';
import { Notificacoes } from '@/Pages/Comunicar/Index';
interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  children,
}: PropsWithChildren<Props>) {
  const page = useTypedPage();
  const route = useRoute();
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  //#d936d6
  //377377

  //f0f0f0
  //f8f8f8

  const { activeSong } = useSelector(state => state.player);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(route().current());

  const { hideSider, setHideSider } = useStateContext();
  const [openSearch, setOpenSearch] = useState(false);
  const [openSongRandom, setOpenSongRandom] = useState(false);

  const { setCurrentPage } = useStateContext();

  return (
    <div className="w-screen flex bg-gradient-to-br _from-[#e8e8e8] _to-[#e3e3e3] dark:from-[#282728] dark:to-[#2e2525w] fixed top-0 left-0 right-0 p-1 bg-white ">
      {openSearch && <Search close={setOpenSearch} />}
      {openSongRandom && <SongRandom close={setOpenSongRandom} />}
      <Head title={title} />
      <Banner />
      <div className="w-full flex flex-col">
        <header className="w-full h-32 md:h-16 flex flex-col justify-center items-center  shadow-xl  rounded shadow-black mb-5 pb-1">
          <div className="w-full h-16 flex p-0 m-0">
            <Link href="/" className="md:w-2/12 object-contain ">
              <img className="w-full h-full " src={Logo} />
            </Link>
            <div className="w-10/12 gap-1 h-16 justify-end  items-center  flex flex-row  rounded-lg">
              {}
              <div className="mx-auto mb-1 sm:px-1 lg:px-2 object-contain hidden md:flex flex-row b-[#997f2362]">
                <div className="w-full h-16 hidden md:flex flex-row justify-center items-center p-0 ">
                  <div
                    onClick={() => setCurrentPage(<Destaques />)}
                    className={`${
                      route().current() == '/home'
                        ? 'border-b-2  border-[#4c88c4] dark:bg-[#2e2c2e] text-[#4c88c4]'
                        : ''
                    }  p-2 mx-1 cursor-pointer shadow-sm b-[#4c88c4] hover:bg-[#eaeaea] dark:bg-[#2e2c2e]  text-black dark:text-white hover:bg-[#fcfcf] dark:hover:bg-[#2e2c2e]`}
                  >
                    <Link
                      href={route('/home')}
                      className="flex flex-col lg:flex-row justify-center items-center gap-1 text-[#1a1a1a]"
                    >
                      <BiHome className="text-3xl" />

                      <div className="flex flex-col text-start">
                        <span className="text-base">Início</span>
                        <span className="text-xs dark:text-gray-400 hidden xl:flex">
                          Comece a explorar
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div
                    onClick={() => setCurrentPage(<Avaliar />)}
                    className={`${
                      route().current()?.includes('musicas')
                        ? 'border-b-2 border-[#4c88c4]  shadow-lg rounded shadow-black'
                        : ''
                    } shadow-sm rounded 
                       p-2 mx-1 cursor-pointer hover:bg-[#f6cc33   b-[#4c88c4] text-black dark:text-white hover:bg-[#eaeaea] dark:hover:bg-[#2e2c2e] `}
                  >
                    <Link
                      href={route('musicas')}
                      className="flex flex-col lg:flex-row justify-center items-center gap-1"
                    >
                      <FaMusic className="text-3xl" />
                      <div className="flex flex-col text-start">
                        <span className="text-base">Músicas</span>
                        <span className="text-xs text-gray-400 hidden xl:flex">
                          Biblioteca musical
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div
                    onClick={() => setCurrentPage(<Sobre />)}
                    className={`${
                      route().current()?.includes('ascensao')
                        ? 'border-b-2 border-[#4c88c4]  shadow-lg rounded shadow-black'
                        : ' '
                    } bg-[#] shadow-sm rounded p-2 mx-1 cursor-pointer hover:bg-[#f6cc33  b-[#4c88c4] dark:text-white dark:hover:bg-[#2e2c2e] hover:bg-[#eaeaea]`}
                  >
                    <Link
                      href={route('ascensao')}
                      className="flex flex-col lg:flex-row justify-center items-center gap-1"
                    >
                      <BsTrophy className="text-3xl" />
                      <div className="flex flex-col text-start">
                        <span className="text-base">Ascensão</span>
                        <span className="text-xs text-gray-400 hidden xl:flex">
                          Concurso musical
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
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
              <div className="md:hidden flex cursor-pointer items-center justify-center hover:bg-[#f6cc33 shadow-2xl ">
                <div className="w-full object-contain p-2 m-1 rounded-lg bg-[#eaeaea] dark:bg-[#2e2c2e]">
                  <div className=" justify-center items-center cursor-pointer">
                    {hideSider ? (
                      <MdClose
                        className="w-8 h-8 text-[#4c88c4] "
                        onClick={() => setHideSider(false)}
                      />
                    ) : (
                      <HiOutlineMenu
                        className="w-8 h-8 text-[#4c88c4] "
                        onClick={() => setHideSider(true)}
                      />
                    )}
                  </div>
                </div>
              </div>{' '}
            </div>
          </div>
          {/**MENU PARA TELEFONES */}
          <div className="flex  w-full h-16 md:hidden flex-row justify-center items-center px-1 ">
            <div
              onClick={() => setCurrentPage(<Destaques />)}
              className={` ${
                route().current()?.includes('/home')
                  ? 'border-b-2 border-[#4c88c4]  shadow-lg rounded shadow-black'
                  : ' '
              } bg-[#] shadow-sm rounded p-2 mx-1 cursor-pointer hover:bg-[#f6cc33  b-[#4c88c4] dark:text-white dark:hover:bg-[#2e2c2e] hover:bg-[#eaeaea]`}
            >
              <Link
                href={route('/home')}
                className="flex flex-col lg:flex-row justify-center items-center gap-1"
              >
                <HiHome className="text-3xl" />
                <div className="mt-0 flex flex-col text-start">
                  <span className="text-base">Início</span>
                  <span className="text-xs text-gray-400 hidden xl:flex">
                    Comece a explorar
                  </span>
                </div>
              </Link>
            </div>
            <div
              onClick={() => setCurrentPage(<Avaliar />)}
              className={`${
                route().current()?.includes('musicas')
                  ? 'border-b-2 border-[#4c88c4]  shadow-lg rounded shadow-black'
                  : ' '
              } bg-[#] shadow-sm rounded p-2 mx-1 cursor-pointer hover:bg-[#f6cc33  b-[#4c88c4] dark:text-white dark:hover:bg-[#2e2c2e] hover:bg-[#eaeaea]`}
            >
              <Link
                href={route('musicas')}
                className="flex flex-col lg:flex-row justify-center items-center gap-1"
              >
                <FaMusic className="text-3xl" />
                <div className="flex flex-col text-start">
                  <span className="text-base">Músicas</span>
                  <span className="text-xs text-gray-400 hidden xl:flex">
                    Biblioteca musical
                  </span>
                </div>
              </Link>
            </div>
            <div
              onClick={() => setCurrentPage(<Sobre />)}
              className={`${
                route().current()?.includes('ascensao')
                  ? 'border-b-2 border-[#4c88c4]  shadow-lg rounded shadow-black'
                  : ' '
              } bg-[#] shadow-sm rounded p-2 mx-1 cursor-pointer hover:bg-[#f6cc33  b-[#4c88c4] dark:text-white dark:hover:bg-[#2e2c2e] hover:bg-[#eaeaea]`}
            >
              <Link
                href={route('ascensao')}
                className="flex flex-col lg:flex-row justify-center items-center gap-1"
              >
                <BsTrophy className="text-3xl" />
                <div className="flex flex-col text-start">
                  <span className="text-base">Ascensão</span>
                  <span className="text-xs text-gray-400 hidden xl:flex">
                    Concurso musical
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </header>
        <div className="w-full flex flex-row bg-[#f2f3f3] shadow-lg shadow-black dark:bg-[#2e2c2e] px-2">
          <Sidebar classNames="w-2/12 lg:w-3/12 rounded" />

          {/* <!-- Page Content --> */}
          <main className="w-full md:w-10/12 flex mx-auto justify-center items-center dark:bg-[#2e2c2e] p-1 rounded ">
            {children}
          </main>
        </div>
      </div>

      {activeSong?.title && (
        <div className="relative h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}

function Search({ close }) {
  return (
    <div className="z-50 absolute flex flex-col justify-center items-center w-screen h-full bg-[#000000a2]">
      <div className="w-10/12 p-1 bg-white rounded">
        <button
          onClick={() => close(false)}
          className="justify-center items-center float-right bg-red-500 p-5 flex flex-col"
        >
          <MdClose />
        </button>
        <div className="w-full h-full ">
          <div className="w-full h-full ">
            <form className="w-full justify-center items-center px-40">
              <input
                type="search"
                className="border-b-4 w-full focus:border-[#6ba976] mt-1 border-[#d17734] rounded-lg"
                placeholder="Pesquisar"
              />
            </form>
          </div>
          <div className="w-full h-96 "></div>
        </div>
      </div>
    </div>
  );
}
function SongRandom({ close }) {
  return (
    <div className="z-50 absolute flex flex-col justify-center items-center w-screen h-full bg-[#000000a2]">
      <div className="w-11/12 p-2 flex flex-col bg-white rounded justify-center items-center">
        <div className="w-full mb-1 flex flex-row justify-center items-center bg-white rounded">
          <div className="w-full h-full ">
            <form className="w-full justify-center items-center px-8 md:px-40">
              <input
                type="search"
                className="text-center border-b-4 w-full focus:border-[#6ba976] border-[#2e2c2e] rounded-lg"
                placeholder="Buscar músicas..."
              />
            </form>
          </div>
          <button
            onClick={() => close(false)}
            className="justify-center items-center float-right bg-red-500 p-3 flex rounded flex-col"
          >
            <MdClose />
          </button>
        </div>
        <div className="w-full xl:w-10/12 h-56 md:h-96 lg:h-[85vh] xl:h-[85vh] bg-black">
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}
