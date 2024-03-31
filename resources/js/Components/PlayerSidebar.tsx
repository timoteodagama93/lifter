import React from 'react';
import { links } from '../assets/constants';
import useTypedPage from '@/Hooks/useTypedPage';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { Link } from '@inertiajs/react';
import { Logo, smalLogo } from '../../img';
import SectionBorder from './SectionBorder';
import { BiHome, BiMessage, BiMusic } from 'react-icons/bi';
import { BsTrophy } from 'react-icons/bs';
import { FaPray } from 'react-icons/fa';
import UserAvatar from './UserAvatar';
import { MdNotifications } from 'react-icons/md';
import route from 'ziggy-js';

interface Props {}

function PlayerSidebar({}) {
  const { openMobileMenu, setOpenMobileMenu } = useStateContext();
  const page = useTypedPage();

  return (
    <>
     
      {/**sidebar telefones */}
      <div
        style={{ transition: '1s' }}
        className={`absolute top-0 h-screen w-2/3 md:w-[240px] bg-gradient-to-tl from-[#245575] to-[#f6cc33] backdrop-blur z-10 p-3  smooth-transition ${
          openMobileMenu ? 'left-0' : '-left-full '
        }  `}
      >
        <Link href="/" className="w-full object-contain flex justify-center">
          <img
            className="w-auto h-24 object-contain"
            src={smalLogo}
            alt="logo"
          />
          
        </Link>
        <div className="w-full flex flex-row gap-1 justify-between items-center">
          <div className="w-full h full justify-center items-center flex">
            {/** USER AVATAR */}
            <UserAvatar />
          </div>
          <Link
            href="/comunicar"
            className="h-full flex flex-col justify-center items-center hover:"
          >
            <MdNotifications className="w-7 h-7" />
          </Link>
          <Link
            href="/comunicar"
            className="h-full flex flex-col justify-center items-center hover:"
          >
            <BiMessage className="w-7 h-7" />
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
        <ul className="flex flex-col gap-1  justify-start text-sm font-medium ">
          {links.map(item => (
            <Link
              href={item.href}
              key={item.name}
              className={`flex flex-row justify-start my-1 text-sm  hover:text-cyan-400
          ${
            route().current()?.includes(item.href)
              ? 'border-l-4 border-[#4c88c4]  bg-[#2e2e2e] text-cyan-400 '
              : ' text-white'
          }   items-center
          `}
              onClick={() => {
                setOpenMobileMenu(false);
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

export default PlayerSidebar;
