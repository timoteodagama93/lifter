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
import { HiOutlineMenu } from 'react-icons/hi';
import { Link } from '@inertiajs/react';
import useTypedPage from '@/Hooks/useTypedPage';
import useRoute from '@/Hooks/useRoute';
import UserAvatar from './UserAvatar';
import { BiArrowBack } from 'react-icons/bi';
import { useStateContext } from '@/contexts/PaginaActualContext';

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
  const routa = route().current();

  return (
    <>
      <div
        className={`flex ${
          hideSider ? 'hidden' : ''
        } opacity-95  h-screen sticky flex-col ${classNames} py-2 px-2 bg-gradient-to-br from-[#f6cc33] to-[#f6cc33]  `}
      >
        <h1 className="w-full text-xl uppercase"> {routa} </h1>
        <InnerLinks
          innerLinks={innerLinks}
          setActiveItem={setActiveItem}
          setPageName={setCurrentPage}
        />
        <div className="w-full border-b-2 border-gray-400" />
        <div className="left-0 bottom mt-1">
          {' '}
          <UserAvatar />{' '}
        </div>
      </div>
      {/*}
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <div className="w-full h-14 object-contain">
          <ApplicationLogo />
        </div>
        <InnerLinks innerLinks={innerLinks} setActiveItem={setActiveItem} />
      </div>

      {*/}
    </>
  );
}
function InnerLinks({ innerLinks, setActiveItem, setPageName }) {
  const [activo, setActivo] = useState(innerLinks[0].href);
  return (
    <div className="mt-0">
      <ul className="flex flex-col gap-1  justify-start my-5 text-sm font-medium ">
        {innerLinks.map(item => (
          <button
            className={`flex 
          ${
            item.href === activo
              ? 'border-l-4 border-[#4c88c4]  bg-gray-300'
              : ''
          } hover:bg-gray-200
          `}
            key={item.name}
            onClick={() => {
              setActivo(item.href);
              setPageName(item.href);
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

export default Sidebar;
