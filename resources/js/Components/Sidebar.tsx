import React, { useContext, useState } from 'react';
import ApplicationLogo from './ApplicationLogo';
import {
  account_links,
  ascensao_links,
  bibliotecas_links,
  explore_links,
  home_links,
  links,
  music_links,
  news_links,
  user_links,
} from '../../assets/constants';
import route from 'ziggy-js';
import { HiOutlineMenu, HiOutlineUpload, HiOutlineUser } from 'react-icons/hi';
import { Link } from '@inertiajs/react';
import useTypedPage from '@/Hooks/useTypedPage';
import useRoute from '@/Hooks/useRoute';
import UserAvatar from './UserAvatar';
import { BiArrowBack, BiMessage, BiUser } from 'react-icons/bi';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { GrClose, GrNotification } from 'react-icons/gr';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FaCog, FaCogs } from 'react-icons/fa';

function Sidebar({
  mobileMenuOpen,
  setMobileMenuOpen,
  activeLink,
  setActiveItem,
  classNames,
}) {
  var innerLinks = home_links;

  if (route().current()?.includes('ascensao')) {
    innerLinks = ascensao_links;
  } else if (route().current()?.includes('musicas')) {
    innerLinks = music_links;
  } else if (route().current()?.includes('bibliotecas')) {
    innerLinks = bibliotecas_links;
  } else if (route().current()?.includes('noticias')) {
    innerLinks = news_links;
  } else if (route().current()?.includes('explorar')) {
    innerLinks = explore_links;
  } else if (route().current()?.includes('conta')) {
    innerLinks = account_links;
  }
  const { setCurrentPage, hideSider, setHideSider } = useStateContext();
  const [hideNames, setHideNames] = useState(false);
  const routa = route().current();

  return (
    <>
      <div
        className={` hidden md:flex
         opacity-95  h-screen sticky flex-col ${classNames} py-2 px-2 bg-gradient-to-br from-[#231e21] to-[#241e20] backdrop-blur-lg  `}
      >
        <div
          className={`w-full flex flex-row px-5 justify-between items-center text-white bold`}
        >
          {hideNames == true ? (
            <button onClick={() => setHideNames(false)}>
              <BsArrowRight className="text-2xl" />
            </button>
          ) : (
            <button className="text-2xl" onClick={() => setHideNames(true)}>
              <BsArrowLeft />
            </button>
          )}

          <h1 className="text-xl uppercase"> {routa} </h1>
        </div>
        <InnerLinks
          innerLinks={innerLinks}
          setActiveItem={setActiveItem}
          setCurrentPage={setCurrentPage}
        />
        <div className="w-full border-b-2 border-gray-400" />
        <BottomLinks hideNames={hideNames} classNames="hidden md:flex" />
      </div>
      {}
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          hideSider ? 'left-0' : '-left-full'
        }`}
      >
        <div className="w-full h-14 object-contain">
          <ApplicationLogo />
          <button
            className=" absolute top-0 right-0 p-2 border m-1 justify-center items-center"
            onClick={() => setHideSider(false)}
          >
            <GrClose />
          </button>
        </div>

        {/**ICONES DE MENSAGENS, Notificações e usuário */}
        <div className="flex flex-row items-center">
          <div className="flex flex-row space-x-2">
            <div className="border rounded p-2 m-4 cursor-pointer hover:bg-[#f6cc33 shadow-2xl b-[#4c88c4] text-white">
              <Link href="notificacoes">
                <span className="relative shadow-lg bg-slate-100 w-5 h-5 flex justify-center items-center rounded-full text-red-500 top-1">
                  2
                </span>
                <GrNotification />
              </Link>
            </div>
            <div className="border rounded p-2 m-4 cursor-pointer hover:bg-[#f6cc33 shadow-2xl b-[#4c88c4] text-white">
              <Link href="chats">
                <span className="relative shadow-lg bg-slate-100 w-5 h-5 flex justify-center items-center rounded-full text-red-500 top-1">
                  5
                </span>
                <BiMessage />
              </Link>
            </div>
          </div>
        </div>

        <InnerLinks
          innerLinks={innerLinks}
          setActiveItem={setActiveItem}
          setCurrentPage={setCurrentPage}
        />
        <BottomLinks hideNames={hideNames} classNames="flex md:hidden" />
      </div>

      {}
    </>
  );
}
function InnerLinks({ innerLinks, setActiveItem, setCurrentPage }) {
  const [activo, setActivo] = useState(innerLinks[0].href);
  return (
    <div className="mt-0">
      <ul className="flex flex-col gap-1  justify-start my-5 text-sm font-medium text-white">
        {innerLinks.map(item => (
          <button
            className={`flex 
          ${
            item.href === activo
              ? 'border-l-4 border-[#4c88c4]  bg-[#2e2c2e] '
              : ''
          } hover:bg-gray-200
          `}
            key={item.name}
            onClick={() => {
              setActivo(item.href);
              setCurrentPage(item.href);
            }}
          >
            <item.icon className="w-5 h-6 mx-2" />
            {item.name}
          </button>
        ))}
      </ul>
    </div>
  );
}

function BottomLinks(hideNames, classNames) {
  return (
    <div
      className={`fixed bottom-0 left-0 flex-col
     text-white mb-5 w-full`}
    >
      {user_links.map(link => (
        <Link
          href={link.href}
          className={` w-full flex flex-row justify-start items2e2c2e-center gap-1 p-1 ${
            route().current().includes(link.href) ? 'border-l-4 border-[#4c88c4]  bg-[#]' : ''
          } ${classNames}`}
        >
          <link.icon className="w-7 h-7" />
          <span
            className={` ${hideNames === true ? 'hidden' : 'w-full flex'} `}
          >
            {link.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
