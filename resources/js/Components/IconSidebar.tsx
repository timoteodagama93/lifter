import React, { useState } from 'react';
import NavLink from './NavLink';
import { RiArrowLeftFill, RiArrowLeftLine, RiCloseLine } from 'react-icons/ri';
import ApplicationLogo from './ApplicationLogo';
import {
  inicio_links,
  links,
  upper_links,
  user_links,
} from '../../assets/constants';
import route from 'ziggy-js';
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineMenu,
} from 'react-icons/hi';
import { Link } from '@inertiajs/react';
import UserAvatar from './UserAvatar';
import { BiMenu } from 'react-icons/bi';
import Sidebar from './Sidebar';
import { MdClose } from 'react-icons/md';
import { useStateContext } from '@/contexts/PaginaActualContext';

function IconSidebar({ mobileMenuOpen, setMobileMenuOpen, setActiveItem }) {
  const [activeLink, setActiveLink] = useState(route().current());
  const { hideSider, setHideSider } = useStateContext();

  return (
    <>
      <div className="md:block opacity-95  h-screen sticky flex-col w-[50px] px-2 bg-[#997f2362] text-3xl text-[#4c88c4] ">
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
        <div className="">
          <div className="mt-0">
            <ul className="flex flex-col gap-1  justify-start my-5 text-sm font-medium ">
              {upper_links.map(item => (
                <Link
                  className={`flex 
          ${
            item.href.includes(activeLink)
              ? 'border-l-4 border-[#4c88c4]  bg-gray-300'
              : ''
          } hover:bg-gray-200
          `}
                  href={item.href}
                >
                  <item.icon className="w-5 h-6 mx-2" />
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full border-b-2 border-gray-400" />
        <div className="left-0 bottom-10 mt-1">
          <UserAvatar />
        </div>
        <div className="border rounded p-2 m-2 cursor-pointer bg-[#4c88c4] text-white hover:bg-[#f6cc33 shadow-2xl">
          <UserNavLinks />
        </div>
      </div>
    </>
  );
}

export default IconSidebar;

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
