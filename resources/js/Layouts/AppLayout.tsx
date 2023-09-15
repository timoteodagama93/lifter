import { Link, Head } from '@inertiajs/react';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import Banner from '@/Components/Banner';
import { Sidebar } from '../Components';
import MusicPlayer from '@/Components/MusicPlayer';
import { useSelector } from 'react-redux';
import { BiHome, BiSearch } from 'react-icons/bi';
import { HiHome, HiOutlineMenu } from 'react-icons/hi';
import { MdClose, MdNotifications } from 'react-icons/md';
import { useStateContext } from '@/contexts/PaginaActualContext';

//Style for swiper
import './style.css';
import { FaMusic } from 'react-icons/fa';
import { BsTrophy } from 'react-icons/bs';
import { Logo } from '../../img';
import { Destaques } from '@/Pages/Home';
import { Avaliar } from '@/Pages/Musicas';
import { Sobre } from '@/Pages/Ascensao';
import { Notificacoes } from '@/Pages/Comunicar/Index';
import UserAvatar from '@/Components/UserAvatar';
import TopPlay from '@/Components/TopPlay';
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

  const { activeSong, isPlaying } = useSelector(state => state.player);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(route().current());

  const { openMobileMenu, setOpenMobileMenu } = useStateContext();
  const [openSearch, setOpenSearch] = useState(false);
  const [openSongRandom, setOpenSongRandom] = useState(false);

  const { setCurrentPage } = useStateContext();

  if (localStorage.getItem('prefix_storage') === null)
    localStorage.setItem('prefix_storage', 'http://127.0.0.1:8000/storage/');

  return (
    <>
      <div className="w-screen h-screen flex bg-gradient-to-br from-black to-[#121286] __dark:from-[#282728] __dark:to-[#2e2525w] fixed top-0 left-0 right-0 p-1 __bg-white text-white">
        {openSearch && <Search close={setOpenSearch} />}
        {openSongRandom && <SongRandom close={setOpenSongRandom} />}
        <Head title={title} />
        <Banner />
        <Sidebar />

        <div className="relative w-full md:w-11/12 h-full flex flex-col">
          <header className="md:hidden relative w-full h-10 flex flex-col justify-center items-center  shadow-sm  rounded shadow-black mb-1 pb-1">
            <div className="w-full h-16 flex justify-between ">
              {/**LOGO */}
              <Link href="/">
                <img
                  className="w-full h-10 object-contain"
                  src={Logo}
                  alt="logo"
                />
              </Link>

             

              <div className="flex justify-center items-center cursor-pointer">
                  {openMobileMenu ? (
                    <MdClose
                      className="w-6 h-6 text-[#4c88c4] "
                      onClick={() => setOpenMobileMenu(false)}
                    />
                  ) : (
                    <HiOutlineMenu
                      className="w-8 h-8 text-[#4c88c4] "
                      onClick={() => setOpenMobileMenu(true)}
                    />
                  )}
                </div>


              <div className="hidden w-10/12 gap-1 h-16 justify-end  items-center   flex-row  rounded-lg">
                {}
                <div className="mx-auto mb-1 sm:px-1 lg:px-2 object-contain hidden flex-row b-[#997f2362]">
                  <div className="w-full h-16 hidden md:flex flex-row justify-center items-center p-0 ">
                    <div
                      className={`${
                        route().current() == '/home'
                          ? 'border-b-2  border-[#4c88c4] dark:bg-[#2e2c2e] text-[#4c88c4]'
                          : ''
                      }  p-2 mx-1 cursor-pointer shadow-sm b-[#4c88c4] hover:bg-[#2e2c2e]  text-gray-400`}
                    >
                      <Link
                        onClick={() => setCurrentPage(<Destaques />)}
                        href={route('/home')}
                        className="flex flex-col lg:flex-row justify-center items-center gap-1"
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
                      className={`${
                        route().current()?.includes('musicas')
                          ? 'border-b-2 border-[#4c88c4]  shadow-lg rounded shadow-black'
                          : ''
                      } shadow-sm rounded 
                    p-2 mx-1 cursor-pointer hover:bg-[#f6cc33   b-[#4c88c4] text-gray-400 `}
                    >
                      <Link
                        onClick={() => setCurrentPage(<Avaliar />)}
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
                      className={`${
                        route().current()?.includes('ascensao')
                          ? 'border-b-2 border-[#4c88c4]  shadow-lg rounded shadow-black'
                          : ' '
                      } bg-[#] shadow-sm rounded p-2 mx-1 cursor-pointer hover:bg-[#f6cc33  b-[#4c88c4] dark:text-white dark:hover:bg-[#2e2c2e] hover:bg-[#eaeaea]`}
                    >
                      <Link
                        onClick={() => setCurrentPage(<Sobre />)}
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
               
                <div className="hidden  cursor-pointer items-center justify-center hover:bg-[#f6cc33 shadow-2xl ">
                  <div className="w-full object-contain p-2 m-1 rounded-lg bg-[#2e2c2e] shadow shadow-black"></div>
                </div>{' '}
              </div>
            </div>
            {/**MENU PARA TELEFONES */
            /*}
            <div className="flex  w-full h-16 md:hidden flex-row justify-center items-center px-1 ">
              <div
                className={` ${
                  route().current()?.includes('/home')
                    ? 'border-b-2 border-[#4c88c4]  shadow-lg rounded shadow-black'
                    : ' '
                } bg-[#] shadow-sm rounded p-2 mx-1 cursor-pointer hover:bg-[#f6cc33  b-[#4c88c4] dark:text-white dark:hover:bg-[#2e2c2e] hover:bg-[#eaeaea]`}
              >
                <Link
                  onClick={() => setCurrentPage(<Destaques />)}
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
                className={`${
                  route().current()?.includes('musicas')
                    ? 'border-b-2 border-[#4c88c4]  shadow-lg rounded shadow-black'
                    : ' '
                } bg-[#] shadow-sm rounded p-2 mx-1 cursor-pointer hover:bg-[#f6cc33  b-[#4c88c4] dark:text-white dark:hover:bg-[#2e2c2e] hover:bg-[#eaeaea]`}
              >
                <Link
                  onClick={() => setCurrentPage(<Avaliar />)}
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
                className={`${
                  route().current()?.includes('ascensao')
                    ? 'border-b-2 border-[#4c88c4]  shadow-lg rounded shadow-black'
                    : ' '
                } bg-[#] shadow-sm rounded p-2 mx-1 cursor-pointer hover:bg-[#f6cc33  b-[#4c88c4] dark:text-white dark:hover:bg-[#2e2c2e] hover:bg-[#eaeaea]`}
              >
                <Link
                  onClick={() => setCurrentPage(<Sobre />)}
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
            {*/}
          </header>
          {/* <!-- Page Content --> */}
          <main className="relative h-full w-full  flex mx-auto justify-start items-start  p-1 rounded overflow-y-auto ">
            {children}
          </main>
        </div>
      </div>
      {activeSong?.title && isPlaying && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </>
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
