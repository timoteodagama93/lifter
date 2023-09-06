import React, { useState } from 'react';
import ApplicationLogo from './ApplicationLogo';
import {
  account_links,
  account_pages,
  ascensao_links,
  comunicaoes_links,
  home_pages,
  music_pages,
} from '../../assets/constants';
import route from 'ziggy-js';
import useTypedPage from '@/Hooks/useTypedPage';
import UserAvatar from './UserAvatar';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { GrClose } from 'react-icons/gr';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

function Sidebar({ classNames }) {
  var innerLinks = home_pages;

  const { setCurrentPage, hideSider, setHideSider } = useStateContext();
  const [hideNames, setHideNames] = useState(false);
  const [routeName, setRouteName] = useState(route().current());
  const [activeItem, setactiveItem] = useState('');

  if (route().current() === '/home') {
    innerLinks = home_pages;
  } else if (route().current()?.includes('ascensao')) {
    innerLinks = ascensao_links;
  } else if (route().current()?.includes('musicas')) {
    innerLinks = music_pages;
  } else if (route().current()?.includes('perfil')) {
    innerLinks = account_pages;
  } else if (route().current()?.includes('comunicar')) {
    innerLinks = comunicaoes_links;
  } else if (route().current()?.includes('uploads')) {
  }

  const page = useTypedPage();

  return (
    <>
      <div
        className={`rounded hidden md:flex
         opacity-95  h-screen sticky flex-col ${classNames} py-2 px-2 bg-gradient-to-br dark:from-[#282728] dark:to-[#282728] mx-2 backdrop-blur-lg  bg-[#f2f3f3] shadow-lg shadow-black`}
      >
        <div
          className={`w-full flex justify-between flex-row-reverse items-center dark:text-white bold`}
        >
          {hideNames == true ? (
            <button onClick={() => setHideNames(false)}>
              <BsArrowRight className="text-xl" />
            </button>
          ) : (
            <button className="text-xl" onClick={() => setHideNames(true)}>
              <BsArrowLeft />
            </button>
          )}
          <h1 className="text-xl capitalize"> {routeName} </h1>
        </div>
        {/**USER INFO */}
        <div className="flex flex-row justify-start items-center m-0 dark:text-white">
          <UserAvatar />
          <span>{page.props.auth.user?.name} </span>
        </div>{' '}
        <div className="w-full border-b-2 py-4 border-gray-400" />
        <InnerLinks
          innerLinks={innerLinks}
          setActiveItem={setactiveItem}
          setCurrentPage={setCurrentPage}
          setHideSidebar={setHideSider}
        />
      </div>
      {/**sidebar telefones */}
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl backdrop-blur-lg z-10 p-1 md:hidden smooth-transition ${
          hideSider ? 'left-0' : '-left-full'
        } dark:from-[#282728] dark:to-[#282728] mx-2 backdrop-blur-lg  bg-[#f2f3f3] shadow-lg shadow-black `}
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
        <div className="w-full mt-1 flex flex-row  dark:text-white justify-center items-center">
          <UserAvatar />
          <span>{page.props.auth.user?.name} </span>
        </div>
        <div className="w-full border-b-2 py-4 border-gray-400" />
        <InnerLinks
          innerLinks={innerLinks}
          setActiveItem={setactiveItem}
          setCurrentPage={setCurrentPage}
          setHideSidebar={setHideSider}
        />
      </div>
    </>
  );
}
function InnerLinks({
  innerLinks,
  setActiveItem,
  setCurrentPage,
  setHideSidebar,
}) {
  const [activo, setActivo] = useState(innerLinks[0].href);
  var hasLinks = false;
  if (innerLinks[0].name == '') {
    hasLinks = true;
  }
  return (
    <>
      {hasLinks ? (
        ''
      ) : (
        <div className="mt-0">
          <ul className="flex flex-col gap-1  justify-start my-5 text-sm font-medium dark:text-white">
            {innerLinks.map(item => (
              <button
                className={`flex 
          ${
            item.href === activo
              ? 'border-l-4 border-[#4c88c4]  bg-[#eaeaea] '
              : ''
          } dark:hover:bg-[#2e2c2e] hover:bg-[#eaeaea]
          `}
                key={item.name}
                onClick={() => {
                  setActivo(item.href);
                  setCurrentPage(item.pagina);
                  setHideSidebar(false);
                }}
              >
                <item.icon className="w-5 h-6 mx-2" />
                {item.name}
              </button>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Sidebar;
