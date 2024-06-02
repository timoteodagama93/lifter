import React from 'react';
import { mainLinks as links } from '../assets/constants';
import useTypedPage from '@/Hooks/useTypedPage';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { Link } from '@inertiajs/react';
import { Logo, smalLogo } from '../../img';
import route from 'ziggy-js';

interface Props {}

function SmalSidebar({}) {
  const { openMobileMenu, setOpenMobileMenu } = useStateContext();
  const page = useTypedPage();

  return (
    <>
      {/**sidebar telefones */}
      <div
        style={{ transition: '1s' }}
        className={` flex h-full  rounded md:w-[${
          openMobileMenu ? '240px' : '50px'
        }]   bg-gradient-to-tl from-[#245575] to-[#f6cc33] backdrop-blur z-10 p-3  smooth-transition ${
          openMobileMenu ? 'left-0' : '-left-full '
        }  `}
      >
        <Link
          href="/"
          className="w-full object-contain flex hidden justify-center"
        >
          {openMobileMenu ? (
            <>
              <img
                className="w-auto h-24 object-contain"
                src={Logo}
                alt="logo"
              />
            </>
          ) : (
            <>
              <img
                className="w-auto h-10 object-contain"
                src={smalLogo}
                alt="logo"
              />
            </>
          )}
        </Link>

        <div className="flex md:flex-row ">
          <Links
            links={links}
            setOpenMobileMenu={setOpenMobileMenu}
            openMobileMenu={openMobileMenu}
          />
        </div>
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

function Links({ links, setOpenMobileMenu, openMobileMenu }) {
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
              ? 'border-l-4 border-[#4c88c4]  bg-[#2e2e2e] text-cyan-400 rounded'
              : ' text-white'
          }   items-center
          `}
              onClick={() => {
                setOpenMobileMenu(false);
              }}
            >
              <item.icon
                className={`w-8 h-8 ${openMobileMenu ? 'mr-2' : ''}`}
              />
              {openMobileMenu ? item.name : ''}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SmalSidebar;
