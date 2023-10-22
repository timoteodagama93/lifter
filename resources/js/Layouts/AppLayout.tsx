import { Link, Head } from '@inertiajs/react';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import Banner from '@/Components/Banner';
import { Sidebar } from '../Components';
import MusicPlayer from '@/Components/MusicPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineMenu } from 'react-icons/hi';
import { MdClose, MdCloseFullscreen } from 'react-icons/md';
import { useStateContext } from '@/contexts/PaginaActualContext';

//Style for swiper
import './style.css';
import { Logo } from '../../img';
import { smalLogo } from '../../img';
import Container from './Container';
import { BiSearch } from 'react-icons/bi';
import Player from '@/Components/VideoPlayer/Player';
import VideoPlayer from '@/Components/VideoPlayer';
import Modal from '@/Components/Modal';
import { playPauseVideo } from '@/redux/features/playerSlice';
interface Props {
  title: string;
  bg?: string;
  renderHeader?(): JSX.Element;
  renderSidebarList?(): JSX.Element;
  renderBottom?(): JSX.Element;
}

export default function AppLayout({
  title,
  bg,
  renderHeader,
  renderSidebarList,
  renderBottom,
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

  const { activeSong, isPlaying, isPlayingVideo, activeVideo } = useSelector(
    state => state.player,
  );

  const { openMobileMenu, setOpenMobileMenu } = useStateContext();
  const [openSearch, setOpenSearch] = useState(false);
  const [openSongRandom, setOpenSongRandom] = useState(false);

  const { setCurrentPage } = useStateContext();
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-screen h-screen flex bg-gradient-to-br from-[#222d84] to-[#543889] __dark:from-[#282728] __dark:to-[#2e2525w] fixed top-0 left-0 right-0 p-1 __bg-white text-white">
        {openSearch && <Search close={setOpenSearch} />}
        {openSongRandom && <SongRandom close={setOpenSongRandom} />}
        <Head title={title} />
        <Banner />
        <Sidebar renderSidebarList={renderSidebarList} />
        <div className="relative w-full h-full flex flex-col">
          <header className=" relative w-full h-[10%] flex flex-col justify-center items-center  shadow-sm  rounded shadow-black pb-1 px-5">
            <div className="w-full h-16 flex justify-between py-1">
              <button className=" flex text-bold text-xl  justify-center items-center bg-[#4c88c4] p-2 rounded-lg">
                <BiSearch className="mx-1 text-3xl text-center" />
              </button>
              {/**LOGO */}
              <Link href="/">
                <img
                  className="w-auto h-16 object-contain"
                  src={Logo}
                  alt="logo"
                />
              </Link>

              <div className="flex justify-center items-center cursor-pointer ">
                {openMobileMenu ? (
                  <MdClose
                    className="w-6 h-6 text-[#4c88c4] transform-effect transition "
                    onClick={() => setOpenMobileMenu(false)}
                  />
                ) : (
                  <HiOutlineMenu
                    className="w-8 h-8 text-[#4c88c4] transform-effect "
                    onClick={() => setOpenMobileMenu(true)}
                  />
                )}
              </div>
              {renderHeader ? renderHeader() : null}
            </div>
          </header>
          {/* <!-- Page Content --> */}
          <main className="relative h-full w-full  flex mx-auto justify-start items-start  p-1 rounded overflow-y-hidden ">
            <Container>{children}</Container>
          </main>
        </div>
      </div>
      {}
      <Modal
        isOpen={isPlayingVideo}
        onClose={() => dispatch(playPauseVideo(false))}
      >
        <div className="flex flex-col animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded gap-1 ">
          <div className="w-full flex float-right justify-end">
            <button
              onClick={() => dispatch(playPauseVideo(false))}
              className="p-4 transform-effect w-fit right-1 text-black"
            >
              <MdCloseFullscreen className="w-5 h-5 font-bold text-4xl" />
            </button>
          </div>
          <VideoPlayer />
        </div>
      </Modal>
      {}
      {activeSong?.title?.after && isPlaying && (
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
