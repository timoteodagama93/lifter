import React, { useState, useRef, useEffect } from 'react';
import {
  BiCalendar,
  BiComment,
  BiDislike,
  BiLike,
  BiMusic,
  BiNews,
  BiSend,
  BiShare,
} from 'react-icons/bi';
import {
  BsArrowBarRight,
  BsCameraVideo,
  BsImage,
  BsSearchHeart,
} from 'react-icons/bs';
import { useForm } from '@inertiajs/react';
import useTypedPage from '@/Hooks/useTypedPage';
import useRoute from '@/Hooks/useRoute';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import { Error, Loader } from '@/Components';
import { MdOutlinePublish } from 'react-icons/md';
import { GrNew } from 'react-icons/gr';

function Posts() {
  const [openNewImagePost, setOpenNewImagePost] = useState(false);
  const page = useTypedPage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('tudo');
  function loadPosts() {
    axios
      .post('/posts')
      .then(response => {
        if (response.status === 200) {
          setPosts(response.data);
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      });
  }

  useEffect(loadPosts, []);

  return (
    <>
      <div className="w-full md:px-2 flex flex-col">
        <div className="flex flex-col-reverse md:flex-row  justify-center items-center gap-5 pb-1">
          <div className="-mb-2 gap-5 md:mb-2 w-full h-full flex flex-row justify-between mt-0">
            <div className="w-full md:px-2 flex flex-row">
              <button
                onClick={() => setOpenNewImagePost(true)}
                className=" shadow shadow-white border flex flex-col text-4xl  justify-start items-center p-1 rounded "
              >
                <BiNews className="animate-bounce" />
                <span className="text-xs">Noticiar</span>
              </button>
            </div>
            <FiltrarNoticias
              setPosts={setPosts}
              setLoading={setLoading}
              setError={setError}
              setFilter={setFilter}
            />
          </div>
        </div>
        <NewPost
          isOpen={openNewImagePost}
          loadPosts={loadPosts}
          onClose={setOpenNewImagePost}
        />
        {loading && <Loader title="Carregando Posts & Notícias" />}
        {error && <Error />}
        {!loading && !error && (
          <div className="flex flex-col md:flex-row flex-wrap p-1 ">
            {posts?.length > 0 ? (
              posts?.map(post => (
                <PostSingle post={post} loadPosts={loadPosts} />
              ))
            ) : (
              <h1 className="w-full text-center text-xl uppercase">
                Nada publicado recentemente em {filter} ...
              </h1>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function PostSingle({ post, loadPosts }) {
  const [lerMais, setLerMais] = useState(false);
  function Like(postId) {
    axios
      .post(`/post-like/${postId}`)
      .then(response => {
        if (response.status === 200) {
          loadPosts();
        }
      })
      .catch(error => {});
  }

  return (
    <>
      <div className="relative w-full md:w-1/2 lg:w-1/3 h-[400px]  overflow-hidden   rounded p-1">
        <div className="w-full h-1/2 backdrop-blur-lg justify-center items-center flex rounded shadow ">
          {post?.mime_type?.includes('image/') && (
            <img
              src={post.file_url}
              alt=""
              className="object-cover h-full w-full rounded-t shadow"
            />
          )}

          {post?.mime_type?.includes('video/') && (
            <video
              src={post.file_url}
              className="object-cover h-full w-full rounded-t shadow"
              controls
            />
          )}
          {post?.mime_type?.includes('audio/') && (
            <audio
              controls
              src={post.file_url}
              className="object-cover h-full w-full rounded-t shadow"
            />
          )}
        </div>
        <div className="w-full h-1/2 bg-white">
          <div className="w-full  h-1/3n  flex flex-row text-gray-300 gap-1">
            <p className="flex gap-1 items-center">
              {' '}
              <BiCalendar />{' '}
              {new Date(post?.created_at).getDate() +
                '/' +
                (new Date(post?.created_at).getUTCMonth() + 1) +
                '/' +
                new Date(post?.created_at).getFullYear() +
                ' ' +
                new Date(post?.created_at).getUTCHours() +
                ':' +
                new Date(post?.created_at).getUTCMinutes()}
            </p>
            <SecondaryButton
              onClick={() => Like(post?.id)}
              className=" mt-1 p-1 flex gap-1 items-center"
            >
              {' '}
              <BiLike /> {post?.likes}{' '}
            </SecondaryButton>
            <SecondaryButton
              onClick={() => Like(post?.id)}
              className="hidden gap-1 items-center"
            >
              {' '}
              <BiDislike /> {post?.dislikes}{' '}
            </SecondaryButton>
            <p className="flex gap-1 items-center text-[#ff0000] uppercase">
              <BsSearchHeart className="text-[#ff0000] " />
              {post.community}
            </p>
          </div>
          <div className="w-full  overflow-y-hidden flex flex-row text-gray-300 gap-5">
            <p className="text-black bold flex gap-1 items-center">
              {post?.post_text}
            </p>
          </div>
          <div className="w-full absolute p-1 bottom-0 left-0   flex flex-row text-gray-300 gap-5">
            <button
              onClick={() => setLerMais(true)}
              className="w-full h-12 justify-center items-center flex bg-[#1422b1] rounded-t "
            >
              Ler mais
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={lerMais} onClose={() => setLerMais(false)}>
        <div className="relative w-full p-1">
          <div className="w-full h-1/2 backdrop-blur-lg justify-center items-center flex rounded shadow ">
            {post?.mime_type?.includes('image/') && (
              <img
                src={post.file_url}
                alt=""
                className="object-cover h-full w-full rounded-t shadow"
              />
            )}

            {post?.mime_type?.includes('video/') && (
              <video
                src={post.file_url}
                className="object-cover h-full w-full rounded-t shadow"
                controls
              />
            )}
            {post?.mime_type?.includes('audio/') && (
              <audio
                controls
                src={post.file_url}
                className="object-cover h-full w-full rounded-t shadow"
              />
            )}
          </div>
          <div className="w-full h-1/2 bg-white">
            <div className="w-full  h-1/3n  flex flex-row text-gray-300 gap-1">
              <p className="flex gap-1 items-center">
                {' '}
                <BiCalendar />{' '}
                {new Date(post?.created_at).getDate() +
                  '/' +
                  (new Date(post?.created_at).getUTCMonth() + 1) +
                  '/' +
                  new Date(post?.created_at).getFullYear() +
                  ' ' +
                  new Date(post?.created_at).getUTCHours() +
                  ':' +
                  new Date(post?.created_at).getUTCMinutes()}
              </p>
              <SecondaryButton
                onClick={() => Like(post?.id)}
                className=" mt-1 p-1 flex gap-1 items-center"
              >
                {' '}
                <BiLike /> {post?.likes}{' '}
              </SecondaryButton>
              <SecondaryButton
                onClick={() => Like(post?.id)}
                className="hidden gap-1 items-center"
              >
                {' '}
                <BiDislike /> {post?.dislikes}{' '}
              </SecondaryButton>
              <p className="flex gap-1 items-center text-[#ff0000] uppercase">
                <BsSearchHeart className="text-[#ff0000] " />
                {post.community}
              </p>
            </div>
            <div className="w-full h-fit flex flex-row text-gray-300 gap-5">
              <p className="text-black bold flex gap-1 items-center">
                {post?.post_text}
              </p>
            </div>
            <div className="w-full p-1 flex flex-row text-gray-300 gap-5">
              <button
                onClick={() => setLerMais(false)}
                className="w-full h-12 justify-center items-center flex bg-[#1422b1] rounded-t "
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default Posts;

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

function FiltrarNoticias({ setPosts, setLoading, setError, setFilter }) {
  function loadPostsByFilter(e) {
    let filter = e.target.value;
    setLoading(true);
    setFilter(filter);
    axios
      .post(`/posts/${filter}`)
      .then(response => {
        if (response.status === 200) {
          setPosts(response.data);
          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      });
  }
  return (
    <div className="flex justify-end w-full text-black ">
      <label>Filtrar</label>
      <select onChange={e => loadPostsByFilter(e)} className="rounded">
        <option value="tudo">Tudo</option>
        <option value="lifter">Redação Lifter</option>
        <option value="gospel">Comunidade de Gospel</option>
        <option value="figuras">Figuras públicas</option>
        <option value="cinema">Universo Cinematográfico</option>
        <option value="musica">Universo musical</option>
        <option value="moda">Comunidade de Moda</option>
        <option value="artes">Comunidade de Artes plásticas</option>
      </select>
    </div>
  );
}
