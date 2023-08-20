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
  BiLike,
  BiMessage,
  BiSearch,
  BiSmile,
  BiUser,
  BiUserCircle,
  BiUserPlus,
} from 'react-icons/bi';
import { GrNotification } from 'react-icons/gr';
import { HiEmojiHappy, HiOutlineMenu } from 'react-icons/hi';
import { user_links } from '../../assets/constants';
import { MdClose } from 'react-icons/md';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useStateContext } from '@/contexts/PaginaActualContext';

//Style for swiper
import './style.css';
import { FaMusic, FaVoteYea } from 'react-icons/fa';
import { BsEmojiSmile, BsFillCameraVideoFill, BsTrophy } from 'react-icons/bs';
import { Logo } from '../../img';
import { current } from '@reduxjs/toolkit';
interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  renderHeader,
  mudarPagina,
  children,
}: PropsWithChildren<Props>) {
  const page = useTypedPage();
  const route = useRoute();
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  function switchToTeam(e: React.FormEvent, team: Team) {
    e.preventDefault();
    router.put(
      route('current-team.update'),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      },
    );
  }

  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }
  //#d936d6
  //377377

  //f0f0f0
  //f8f8f8
  const { activeSong } = useSelector(state => state.player);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(route().current());
  const [activeItem, setActiveItem] = useState('');

  const [pageName, setPageName] = useState('index');
  const { hideSider, setHideSider } = useStateContext();
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <div className=" bg-gradient-to-br from-[#282728] to-[#2e2525] w-screen h-screen fixed top-0 left-0 right-0 ">
      {openSearch && <Search close={setOpenSearch} />}
      <div className="w-screen h-screen flex">
        <Head title={title} />
        <Banner />
        {/*} 
       <IconSidebar
          setActiveItem={setActiveItem}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
{*/}
        <Sidebar 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          activeLink={activeLink}
          setActiveItem={setActiveItem}
          classNames="w-2/12"
        />
        <div className="p-1 mt-0 h-screen w-screen md:w-10/12 flex flex-col">
          <header className="w-full h-32 flex flex-col justify-center items-center  shadow-2xl mb-4 pb-2">
            <div className="w-full h-16 flex p-0 m-0">
              <div className="md:w-2/12 object-contain ">
                <img className="w-full h-full " src={Logo} />
              </div>
              <div className="w-10/12 mx-1 h-16 justify-end  items-center  flex flex-row  rounded-lg">
                {}
                <div className="mx-auto mb-1 sm:px-1 lg:px-2 object-contain hidden md:flex flex-row b-[#997f2362]">
                  <div className="w-full h-16 hidden md:flex flex-row justify-center items-center p-0 ">
                    <div
                      className={`${
                        route().current()?.includes('avaliar')
                          ? 'border-b-2'
                          : ''
                      }  rounded p-2 m-2 cursor-pointer hover:bg-[#f6cc33 shadow-2xl shadow-[#2e2c2e] b-[#4c88c4] text-white`}
                    >
                      <Link
                        href="avaliar"
                        className="flex flex-col justify-center items-center"
                      >
                        <HiEmojiHappy className="text-xl" />
                        <span className="text-xs">Avaliar</span>
                      </Link>
                    </div>
                    <div
                      className={`${
                        route().current()?.includes('musicas')
                          ? 'border-b-2'
                          : ''
                      }  rounded p-2 m-2 cursor-pointer hover:bg-[#f6cc33 shadow-2xl shadow-[#2e2c2e] b-[#4c88c4] text-white`}
                    >
                      <Link
                        href="musicas"
                        className="flex flex-col justify-center items-center"
                      >
                        <FaMusic className="text-xl" />
                        <span className="text-xs">Músicas</span>
                      </Link>
                    </div>
                    <div
                      className={`${
                        route().current()?.includes('videos')
                          ? 'border-b-2'
                          : ''
                      }  rounded p-2 m-2 cursor-pointer hover:bg-[#f6cc33 shadow-2xl shadow-[#2e2c2e] b-[#4c88c4] text-white`}
                    >
                      <Link
                        href="videos"
                        className="flex flex-col justify-center items-center"
                      >
                        <BsFillCameraVideoFill className="text-xl" />
                        <span className="text-xs">Vídeos</span>
                      </Link>
                    </div>
                    <div
                      className={`${
                        route().current()?.includes('ascensao')
                          ? 'border-b-2 border-[#4c88c4] bg-[#000] text-[#4c88c4]  '
                          : ''
                      }  rounded p-2 m-2 cursor-pointer hover:bg-[#f6cc33 shadow-2xl shadow-[#2e2c2e] b-[#4c88c4] text-white`}
                    >
                      <Link
                        href="ascensao"
                        className="flex flex-col justify-center items-center"
                      >
                        <BsTrophy className="text-xl" />
                        <span className="text-xs  ">Ascensão</span>
                      </Link>
                    </div>
                  </div>
                </div>
                {}
                <div className="hidden md:flex flex-row items-center ">
                  <div className="flex flex-row">
                    <div className="flex flex-row space-x-1  items-center justify-center">
                      <button
                        className="border rounded p-2 m-4 cursor-pointer hover:bg-[#f6cc33 shadow-2xl bg-[#4c88c4] text-white"
                        onClick={() => setOpenSearch(true)}
                      >
                        <BiSearch />
                      </button>

                      <div className="border rounded p-2 m-4 cursor-pointer hover:bg-[#f6cc33 shadow-2xl bg-[#4c88c4] text-white">
                        <Link href="notificacoes">
                          <span className="absolute shadow-lg bg-slate-100 w-5 h-5 flex justify-center items-center rounded-full text-red-500 top-1">
                            2
                          </span>
                          <GrNotification />
                        </Link>
                      </div>
                      <div className="border rounded p-2 m-4 cursor-pointer hover:bg-[#f6cc33 shadow-2xl bg-[#4c88c4] text-white">
                        <Link href="chats">
                          <span className="absolute shadow-lg bg-slate-100 w-5 h-5 flex justify-center items-center rounded-full text-red-500 top-1">
                            5
                          </span>
                          <BiMessage />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:hidden flex cursor-pointer items-center justify-center hover:bg-[#f6cc33 shadow-2xl ">
                  <div className="w-full object-contain p-2 m-1 border  bg-[#997f2362]">
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
            <div className="flex  w-full h-16 md:hidden flex-row justify-center items-center p-0 ">
              <div
                className={`${
                  route().current()?.includes('avaliar') ? 'border-b-2' : ''
                }  rounded p-2 m-2 cursor-pointer hover:bg-[#f6cc33 shadow-2xl shadow-[#2e2c2e] b-[#4c88c4] text-white`}
              >
                <Link
                  href="avaliar"
                  className="flex flex-col justify-center items-center"
                >
                  <HiEmojiHappy className="text-xl" />
                  <span className="text-xs">Avaliar</span>
                </Link>
              </div>
              <div
                className={`${
                  route().current()?.includes('musicas') ? 'border-b-2' : ''
                }  rounded p-2 m-2 cursor-pointer hover:bg-[#f6cc33 shadow-2xl shadow-[#2e2c2e] b-[#4c88c4] text-white`}
              >
                <Link
                  href="musicas"
                  className="flex flex-col justify-center items-center"
                >
                  <FaMusic className="text-xl" />
                  <span className="text-xs">Músicas</span>
                </Link>
              </div>
              <div
                className={`${
                  route().current()?.includes('videos') ? 'border-b-2' : ''
                }  rounded p-2 m-2 cursor-pointer hover:bg-[#f6cc33 shadow-2xl shadow-[#2e2c2e] b-[#4c88c4] text-white`}
              >
                <Link
                  href="videos"
                  className="flex flex-col justify-center items-center"
                >
                  <BsFillCameraVideoFill className="text-xl" />
                  <span className="text-xs">Vídeos</span>
                </Link>
              </div>
              <div
                className={`${
                  route().current()?.includes('ascensao')
                    ? 'border-b-2 border-[#4c88c4] bg-[#000] text-[#4c88c4]  '
                    : ''
                }  rounded p-2 m-2 cursor-pointer hover:bg-[#f6cc33 shadow-2xl shadow-[#2e2c2e] b-[#4c88c4] text-white`}
              >
                <Link
                  href="ascensao"
                  className="flex flex-col justify-center items-center"
                >
                  <BsTrophy className="text-xl" />
                  <span className="text-xs  ">Ascensão</span>
                </Link>
              </div>
            </div>
          </header>
          {/* <!-- Page Content --> */}
          <main className="w-full flex flex-row">
            {}

            <div className="max-w-full h-full mx-auto overflow-y-auto px-0 shadow-lg ">
              {children}
            </div>
          </main>
        </div>

        {activeSong?.title && (
          <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
            <MusicPlayer />
          </div>
        )}
      </div>
    </div>
  );
}

function Search({ close }) {
  return (
    <div className="z-50 absolute flex flex-col justify-center items-center w-screen h-screen bg-[#000000a2]">
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
