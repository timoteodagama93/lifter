import React, { useEffect, useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head, Link, useForm } from '@inertiajs/react';

// import Swiper core and required modules

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './style.css';
import Destaques from './Destaques';
import AppLayout from '@/Layouts/AppLayout';
import { useStateContext } from '@/contexts/PaginaActualContext';
import Avaliar from './Avaliar';
import { Lifter } from './';
import {
  BiBookOpen,
  BiBrush,
  BiHistory,
  BiHome,
  BiMicrophone,
  BiSend,
  BiShare,
  BiVideo,
} from 'react-icons/bi';
import {
  BsBag,
  BsCameraVideo,
  BsNewspaper,
  BsPostage,
  BsTrophy,
} from 'react-icons/bs';
import { FaMusic, FaUserFriends } from 'react-icons/fa';
import Sobre from '../Concursos/Sobre';
import {
  useGetDestaqueSongsQuery,
  useGetDestaqueVideosQuery,
  useGetExpositionItemsQuery,
  useGetExpositionsQuery,
  useGetVideosQuery,
} from '@/redux/services/coreApi';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, History, Navigation } from 'swiper/modules';
import { SongCard } from '@/Components';
import VideoCardGrelha from '@/Components/VideoCardGrelha';
import Container from '@/Layouts/Container';
import Player from '@/Components/MusicPlayer/Player';

import { GiCrimeSceneTape, GiTribunalJury } from 'react-icons/gi';
import {
  MdEvent,
  MdEventAvailable,
  MdExplore,
  MdFeed,
  MdMusicNote,
  MdOutlineMotionPhotosOn,
  MdWork,
} from 'react-icons/md';
import ArtesMistas from '../Arts/ArtesMistas';
import BibliotecaLiteraria from '../Arts/BibliotecaLiteraria';
import Dance from '../Arts/Dance';
import Exposicoes from '../Arts/Exposicoes';
import {
  RiCommunityFill,
  RiCommunityLine,
  RiOrganizationChart,
} from 'react-icons/ri';
import { HiUserGroup } from 'react-icons/hi';
import { GrNetwork } from 'react-icons/gr';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import axios from 'axios';
import Noticias from '../Noticias';

interface Props {
  pagina: string;
  songs: Array<Object>;
  posts2: Array<Object>;
  APP_URL: String;
}

export default function Home({ posts2 }: Props) {
  const route = useRoute();
  const page = useTypedPage();

  /*
  const { data, isFetching, error } = useGetValuateSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  */

  const { currentPage, setCurrentPage } = useStateContext();
  const [createPost, setCreatePost] = useState(false);

  function setDefaultPage() {
    setCurrentPage(<Avaliar />);
  }

  const [sidebarList, setSidebarList] = useState(<></>);

  useEffect(setDefaultPage, []);
  const { data: songs, isFetching, error } = useGetDestaqueSongsQuery('');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: videos,
    isFetching: fetchV,
    error: errorV,
  } = useGetVideosQuery('all');

  const {
    data: videosDestaques,
    isFetching: isGetingDes,
    error: errorDest,
  } = useGetDestaqueVideosQuery('all');

  const {
    data: rooms,
    isFetching: fetchR,
    error: errorR,
  } = useGetExpositionsQuery('');

  const [posts, setPosts] = useState([]);

  function loadPosts() {
    axios
      .post('/posts')
      .then(response => {
        if (response.status === 200) {
          setPosts(response.data);
        }
      })
      .catch(error => {});
  }

  return (
    <AppLayout title="Home" renderSidebarList={() => sidebarList}>
      <Head title="Home" />
      <Container>
        <>
          <div className="w-full relative sm:flex flex-col sm:justify-center sm:items-center  bg-dots-darker bg-center dark:bg-dots-lighter  selection:bg-red-500 selection:text-white">
            <div className="w-full h-full  flex flex-col gap-1 justify-cebter items-center rounded-lg">
              <div className="w-full flex justify-between items-center p-1 md:px-5 border-b">
                <div className="w-4/5 mx-auto md:mx-6">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Pesquisar"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="p-2.5 ml-2 text-sm font-medium text-white bg-[#0094f8] rounded-lg border border-[#0094f8] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>

                <div className="w-1/5 flex flex-row justify-center items-center">
                  <button
                    onClick={() => setCreatePost(true)}
                    className="transform-effect p-1 justify-center items-center w-full flex flex-col"
                  >
                    {' '}
                    <BiShare className="w-10 h-auto font-bold" />{' '}
                    <span className="flex">
                      Publicar{' '}
                      <span className="hidden md:flex ml-2">actualização</span>
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-full">
                <Noticias />
              </div>
            </div>
          </div>

          <NewPost
            isOpen={createPost}
            onClose={setCreatePost}
            loadPosts={loadPosts}
          />
        </>
      </Container>
    </AppLayout>
  );
}

function NewPost({ isOpen, onClose, loadPosts }) {
  const page = useTypedPage();
  const route = useRoute();
  const { data, setData, progress, post, errors } = useForm({
    text: '',
    community: 'musica',
    file: null as File | null,
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  function saveNewPost(e) {
    e.preventDefault();
    post('/post', {
      onSuccess: () => {
        loadPosts();
        setData('text', '');
        clearPhotoFileInput();
      },
      onFinish: () => {},
    });
  }
  function selectNewPhoto() {
    photoRef.current?.click();
  }

  function updatePhotoPreview() {
    const photo = photoRef.current?.files?.[0];

    if (!photo) {
      return;
    }

    setData('file', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }
  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      setData('file', null);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full h-full flex flex-col text-xs justify-center bg-white border-[#2e2c2e] border shadow-lg shadow-black p-5 rounded-lg items-center">
        <form
          method="Post"
          onSubmit={e => saveNewPost(e)}
          className="w-full h-full justify-center items-center flex flex-col"
          encType="multipart/form-data"
        >
          {photoPreview ? (
            // <!-- New Profile Photo Preview -->
            <div className="">
              <span
                className="block rounded-lg w-36 h-36 "
                style={{
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundImage: `url('${photoPreview}')`,
                }}
              ></span>
            </div>
          ) : (
            ''
          )}

          {progress && (
            <progress value={progress.percentage} max={100}>
              {progress.percentage}%
            </progress>
          )}

          <div className="col-span-6 sm:col-span-4">
            {/* <!-- Profile Photo File Input --> */}
            <input
              type="file"
              className="hidden"
              ref={photoRef}
              onChange={updatePhotoPreview}
            />

            <InputLabel htmlFor="file" value="Ficheiro" />

            <SecondaryButton
              className="m-2"
              type="button"
              onClick={selectNewPhoto}
            >
              Selecionar Ficheiro
            </SecondaryButton>

            <InputError message={errors.file} className="mt-2" />
          </div>
          <div>
            <label>Escolha uma categoria</label>
            <select
              required
              value={data.community}
              onChange={e => setData('community', e.target.value)}
              className="rounded"
            >
              <option value="musica">Universo musical</option>
              <option value="gospel">Comunidade de Gospel</option>
              <option value="figuras">Figuras públicas</option>
              <option value="cinema">Universo Cinematográfico</option>
              <option value="moda">Comunidade de Moda</option>
              <option value="artes">Comunidade de Artes plásticas</option>
            </select>
            <InputError message={errors.community} className="mt-2" />
          </div>

          <textarea
            value={data.text}
            onChange={e => {
              setData('text', e.currentTarget.value);
            }}
            required
            maxLength={500}
            minLength={5}
            placeholder="Conte a história..."
            className="w-full p-2 border border-[#2e2c2e] rounded shadow-sm"
          ></textarea>
          <InputError message={errors.text} className="mt-2" />
          <button className="h-full text-2xl flex justify-center items-center gap-1 shadow-lg shadow-black rounded p-1  ">
            <BiSend />
            <span className="text-base">Partilhar poste</span>
          </button>
        </form>
      </div>
    </Modal>
  );
}
