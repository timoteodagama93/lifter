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
import { BiMessage } from 'react-icons/bi';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineMenu } from 'react-icons/hi';
import { user_links } from '../../assets/constants';
import { MdClose } from 'react-icons/md';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useStateContext } from '@/contexts/PaginaActualContext';
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

  return (
    <div className=" bg-gradient-to-br from-[#f6cc33] to-[#f6cc33] w-screen h-auto fixed top-0 left-0 right-0 ">
      <div className="w-screen h-screen flex">
        <Head title={title} />
        <Banner />
        <IconSidebar
          setActiveItem={setActiveItem}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <div className="px-1 mt-0 h-screen w-full flex flex-col ">
          <header className="w-full flex flex-row justify-between items-center h-16">
            <div className="w-2/12 h-16 object-contain ">
              <ApplicationLogo className="w-full" />
            </div>
            <div className="w-10/12 mx-1 h-12 justify-between items-center flex flex-row  rounded-lg">
              <div className="mx-auto mb-1 sm:px-1 lg:px-2 object-contain md:block hidden bg-[#997f2362]">
                <form className="w-full">
                  <input
                    type="search"
                    className="border-b-4 w-full focus:border-[#6ba976] mt-1 border-[#d17734] rounded-lg"
                    placeholder="Pesquisar"
                  />
                </form>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex flex-row">
                  <div className="border rounded p-2 m-2 cursor-pointer hover:bg-[#f6cc33 shadow-2xl bg-[#4c88c4] text-white">
                    <Link href="chats">
                      <span className="absolute shadow-lg bg-slate-100 w-5 h-5 flex justify-center items-center rounded-full text-red-500 top-2">
                        2
                      </span>
                      <GrNotification />
                    </Link>
                  </div>
                  <div className="border rounded p-2 m-2 cursor-pointer hover:bg-[#f6cc33 shadow-2xl bg-[#4c88c4] text-white">
                    <Link href="chats">
                      <span className="absolute shadow-lg bg-slate-100 w-5 h-5 flex justify-center items-center rounded-full text-red-500 top-2">
                        5
                      </span>
                      <BiMessage />
                    </Link>
                  </div>
                  <div className="border rounded p-2 m-2 cursor-pointer bg-[#4c88c4] text-white hover:bg-[#f6cc33 shadow-2xl">
                    <UserNavLinks />
                  </div>
                </div>
              </div>
              <div className="md:hidden flex cursor-pointer items-center justify-center hover:bg-[#f6cc33 shadow-2xl ">
                <div className="w-full object-contain p-2">
                  <div className=" right-3 cursor-pointer">
                    {hideSider ? (
                      <HiOutlineMenu
                        className="w-8 h-8 text-white mt-2 bg-[#4c88c4] "
                        onClick={() => setHideSider(false)}
                      />
                    ) : (
                      <MdClose
                        className="w-8 h-8 text-white mt-2 bg-[#4c88c4] "
                        onClick={() => setHideSider(true)}
                      />
                    )}
                  </div>
                </div>
              </div>{' '}
            </div>
          </header>
          {/* <!-- Page Content --> */}
          <main className="w-full flex flex-row">
            {}
            <Sidebar
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              activeLink={activeLink}
              setActiveItem={setActiveItem}
              hideSider={hideSider}
              setHideSider={setHideSider}
              classNames="w-[300px]"
            />
            <div className="max-w-full h-full mx-auto overflow-y-auto px-2 shadow-lg ">
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

const UserNavLinks = () => (
  <div className="mt-0">
    <ul className="flex flex-col  justify-start text-sm font-medium ">
      {user_links.map(item => (
        <Link className={`flex`} href={item.href}>
          <item.icon className="w-5 h-5" />
        </Link>
      ))}
    </ul>
  </div>
);
