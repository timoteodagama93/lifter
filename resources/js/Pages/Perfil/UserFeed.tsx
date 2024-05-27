import React, { useEffect, useRef, useState } from 'react';

import {
  BiEdit,
  BiInfoCircle,
  BiLibrary,
  BiMusic,
  BiNews,
  BiSend,
  BiTrophy,
  BiVideo,
} from 'react-icons/bi';
import useTypedPage from '@/Hooks/useTypedPage';

import { MdCreate, MdOutlineCloseFullscreen, MdPhoto } from 'react-icons/md';
import { FaArtstation, FaCoins, FaCross } from 'react-icons/fa';
import { RiContactsBook2Fill } from 'react-icons/ri';
import axios from 'axios';
import NewContest from '@/Components/Contest/NewContest';
import { BsEye, BsStars, BsTrophy } from 'react-icons/bs';
import EditContest from '@/Components/EditContest/Index';
import PulseButton from '@/Components/PulseButton';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import useRoute from '@/Hooks/useRoute';
import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Layouts/Container';
import SectionBorder from '@/Components/SectionBorder';
import { GiSoundWaves } from 'react-icons/gi';
import route from 'ziggy-js';
import { useStateContext } from '@/contexts/PaginaActualContext';
import { GrPrevious } from 'react-icons/gr';

function UserFeed({ contest_edition, contest }) {
  const page = useTypedPage();
  const [pagina, setPagina] = useState(
    contest_edition ? <NewContest contest={contest} /> : <></>,
  );
  const [posts, setPosts] = useState([]);
  const [createContest, setCreateContest] = useState(false);

  const [openNewImagePost, setOpenNewImagePost] = useState(false);
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

  const { currentPage, setCurrentPage } = useStateContext();
  useEffect(() => {
    setCurrentPage(<UserHeader />);
  }, []);
  return (
    <AppLayout title="Perfil">
      <Container>
        <div className="w-full h-full py-8">
          {currentPage}
          <SectionBorder />
        </div>
      </Container>
    </AppLayout>
  );
}

function UserHeader({}) {
  const page = useTypedPage();
  const { setCurrentPage } = useStateContext();

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full pt-6">
        <div className="relative flex flex-col items-center rounded-[20px] w-full mx-auto px-4_ bg-[#0094f8] bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 ">
          <div className="relative flex h-auto w-full justify-center rounded-xl bg-cover">
            <img
              src={`/users/${page.props.auth.user?.profile_photo_path}`}
              className="relative flex hidden w-auto justify-center rounded-xl bg-cover"
            />
            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
              <img
                className="h-full w-full rounded-full"
                src={`/users/${page.props.auth.user?.profile_photo_path}`}
                alt=""
              />
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {page.props.auth.user?.name}
            </h4>
            <p className="text-base font-normal text-gray-600">
              {page.props.auth.user?.email}
            </p>
          </div>
          <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-navy-700 dark:text-white">
                17
              </p>
              <p className="text-sm font-normal text-gray-600">Posts</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-navy-700 dark:text-white">
                9.7K
              </p>
              <p className="text-sm font-normal text-gray-600">Seguidores</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-navy-700 dark:text-white">
                434
              </p>
              <p className="text-sm font-normal text-gray-600">Seguindo</p>
            </div>
          </div>
          <div className="w-full h-14 justify-between bg-gradient-to-br from-[#00395f] to-[#005792] ">
            <div className="w-full h-full flex  flex-row justify-center items-center mb-1 text-[#fff] text-xl ">
              <>
                <Link
                  href="/video"
                  className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter: ${
                    route().current('video')
                      ? 'transform-effect text-cyan-400 font-bold icon-link bg-[#00395f]'
                      : ''
                  } `}
                >
                  <BiVideo className="icon w-10 h-10" />
                  <span
                    className={` ${
                      route().current('video')
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Vídeos
                  </span>
                </Link>
                <Link
                  href="/vozactiva"
                  className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
  ${
    route().current('vozactiva')
      ? 'transform-effect text-cyan-400 font-bold icon-link bg-[#00395f]'
      : ''
  }
  `}
                >
                  <GiSoundWaves className="icon w-10 h-10" />
                  <span
                    className={` ${
                      route().current('vozactiva')
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    VozActiva
                  </span>
                </Link>
                <button
                  onClick={() =>
                    setCurrentPage(
                      <MyContests
                        userId={page.props.auth.user?.id}
                        setPagina={setCurrentPage}
                      />,
                    )
                  }
                  className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
  ${
    route().current()?.includes('concursos')
      ? 'transform-effect text-cyan-400 font-bold icon-link bg-[#00395f]'
      : ''
  }
  `}
                >
                  <BsTrophy className="icon w-10 h-10" />
                  <span
                    className={`md:flex ${
                      route().current('concursos')
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    Concursos
                  </span>
                </button>

                <Link
                  href="/arts"
                  className={` flex flex-col w-full h-full justify-center items-center text-xs hover:transform-effect first-letter:
  ${
    route().current('arts')
      ? 'transform-effect text-cyan-400 font-bold icon-link bg-[#00395f]'
      : ''
  }
  `}
                >
                  <FaArtstation className="icon w-10 h-10" />
                  <span
                    className={` ${
                      route().current('arts')
                        ? 'flex text-white font-bold uppercase'
                        : 'hidden'
                    }`}
                  >
                    +Artes
                  </span>
                </Link>
              </>
            </div>
          </div>
        </div>
        <p className="font-normal text-navy-700 mt-20 mx-auto w-max text-black">
          {page.props.auth.user?.about}
        </p>
      </div>
    </>
  );
}

export default UserFeed;

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

function MyContests({ userId, setPagina }) {
  const [contests, setContests] = useState(null);
  const loadMyContests = () => {
    axios
      .post('get-my-contests', userId)
      .then(response => {
        setContests(response.data);
      })
      .catch(error => {
        return (
          <h1 className="p-5 text-xl text-center w-full">
            Alguma coisa correu mal, não foi possível carregar seu concursos.
            Tente novamente dentro de instantes.
          </h1>
        );
      });
  };

  useEffect(loadMyContests, []);
  const [addSong, setAddSong] = useState(false);

  return (
    <>
      <div className="w-full h-full flex flex-row flex-wrap text-black">
        <div className="w-full flex justify-between items-center p-1 md:px-5 border-b">
          <button
            onClick={() => setAddSong(false)}
            className="transform-effect p-1 justify-center items-center flex flex-col"
          >
            {' '}
            <GrPrevious className="w-10 h-auto font-bold" />{' '}
          </button>

          <div className="flex flex-row justify-center items-center">
            <button
              onClick={() => setAddSong(true)}
              className="transform-effect p-1 justify-center items-center w-full flex flex-col"
            >
              {' '}
              <MdCreate className="w-10 h-auto font-bold" />{' '}
              <span className="flex">Novo concurso</span>
            </button>
          </div>
        </div>
        <h1 className="flex w-full text-center text-4xl  ">Meus concursos</h1>

        <table className="w-full table">
          <thead className="thead-dark">
            <tr className="">
              <th aria-sort="ascending" className="">
                Designação do concurso
              </th>
              <th aria-sort="ascending" className="">
                Início das votações
              </th>
              <th aria-sort="ascending" className="">
                Termino das votações
              </th>
              <th aria-sort="ascending" className="">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {contests?.map(concurso => (
              <tr className="odd:bg-white p-1 odd:text-gray-900 even:bg-slate-500">
                <td>{concurso.designacao}</td>
                <td>{concurso.inicio_votacoes}</td>
                <td>{concurso.termino_votacoes}</td>
                <td>
                  <div className="flex flex-row gap-1">
                    {' '}
                    <button className="px-2 shadow-black shadow-lg gap-1 flex flex-col text-xs">
                      <BsEye className="text-xl" /> Ver
                    </button>
                    <button
                      onClick={() =>
                        setPagina(<EditContest contest={concurso} />)
                      }
                      className="px-2 shadow-black shadow-lg gap- flex flex-col text-xs"
                    >
                      <BiEdit className="text-xl" /> Editar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          maxWidth="w-full"
          isOpen={addSong}
          onClose={() => setAddSong(false)}
        >
          <div className="my-1 w-full text-base rounded relative flex flex-col gap-1 p-5 shadow">
            <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4] flex justify-between  ">
              <button
                onClick={() => setAddSong(false)}
                className="transform-effect p-1 justify-center items-center flex flex-col"
              >
                {' '}
                <MdOutlineCloseFullscreen className="w-10 h-auto font-bold" />{' '}
              </button>
              <span>Novo concurso</span>
            </h1>

            <NewContest />
          </div>
        </Modal>
      </div>
    </>
  );
}
