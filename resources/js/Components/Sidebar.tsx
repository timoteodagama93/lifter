import React from 'react';
import { links } from '../assets/constants';
import useTypedPage from '@/Hooks/useTypedPage';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { Link } from '@inertiajs/react';
import { Logo } from '../../img';
import SectionBorder from './SectionBorder';
import { BiHome, BiMessage, BiMusic } from 'react-icons/bi';
import { BsTrophy } from 'react-icons/bs';
import { FaPray } from 'react-icons/fa';
import UserAvatar from './UserAvatar';
import { MdNotifications } from 'react-icons/md';

interface Props {
  renderSidebarList?(): JSX.Element;
}

function Sidebar({ renderSidebarList }: Props) {
  const { openMobileMenu, setOpenMobileMenu } = useStateContext();

  const page = useTypedPage();

  return (
    <>
      {/*}
      <div
        className={`hidden md:flex flex-col
         opacity-95 bg-[#191624] w-[240px] `}
      >
        <Link href="/">
          <img className="w-full h-24 object-contain" src={Logo} alt="logo" />
        </Link>
        <Search />

        {/*** Search buttom, Messages Link and Notification Link /}
        <div className="flex flex-row ">
          <div className="flex md:flex flex-row items-center mr-2">
            <div className="flex flex-row space-x-1  items-center justify-center">
              <span></span>
              <button
                className="hidden rounded-sm p-2 m-0 md:m-4 cursor-pointer hover:bg-[#f6cc33 shadow-xl shadow-black bg-[#2e2c2e] text-white flex flex-row justify-center items-center"
                onClick={() => setOpenSearch(true)}
              >
                <BiSearch />
                <span className="hidden">Músicas</span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-2 w-[98%] h-[70%]  overflow-y-auto">
          {renderSidebarList ? renderSidebarList() : null}
        </div>
        <Footer />
      </div>

      {*/}

      {/**sidebar telefones */}
      <div
        style={{ transition: '1s' }}
        className={`absolute top-0 h-screen w-2/3 md:w-[240px] bg-gradient-to-tl from-white/10 to-[#483d8b backdrop-blur z-10 p-6  smooth-transition ${
          openMobileMenu ? 'left-0' : '-left-full '
        }  `}
      >
        <Link href="/">
          <img className="w-full h-24 object-contain" src={Logo} alt="logo" />
        </Link>
        <div className="w-full flex flex-row gap-1 justify-between items-center">
          <div className="w-full h full justify-center items-center flex">
            {/** USER AVATAR */}
            <UserAvatar />
          </div>
          <Link
            href="/notificacoes"
            className="h-full flex flex-col justify-center items-center hover:"
          >
            <MdNotifications className='w-7 h-7' />
            
          </Link>
          <Link
            href="/mensagens"
            className="h-full flex flex-col justify-center items-center hover:"
          >
            <BiMessage  className='w-7 h-7' />
            
          </Link>
        </div>

        <div className="flex flex-row ">
          <Links links={links} setOpenMobileMenu={setOpenMobileMenu} />
        </div>
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
  const { activeMenuItem, setActiveMenuItem } = useStateContext();

  return (
    <>
      <div className="mt-0">
        <ul className="flex flex-col gap-1  justify-start my-5 text-sm font-medium ">
          {links.map(item => (
            <Link
              href={item.href}
              key={item.name}
              className={`flex flex-row justify-start my-2 text-sm  hover:text-cyan-400
          ${
            activeMenuItem === item.name
              ? 'border-l-4 border-[#4c88c4]  bg-[#2e2e2e] text-cyan-400 '
              : ' text-gray-400'
          }   items-center
          `}
              onClick={() => {
                setOpenMobileMenu(false);
                setActiveMenuItem(item.name);
              }}
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

function Search() {
  return (
    <div className="">
      <form>
        <input
          className="rounded-sm"
          type="search"
          placeholder="Descobrir"
          name="search"
          id="search"
        />
      </form>
    </div>
  );
}

export default Sidebar;
