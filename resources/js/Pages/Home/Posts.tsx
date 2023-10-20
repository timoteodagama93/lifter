import React, { useState, useRef, useEffect } from 'react';
import {
  BiCalendar,
  BiComment,
  BiDislike,
  BiLike,
  BiMusic,
  BiNews,
  BiPlay,
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
import { useStateContext } from '@/contexts/PaginaActualContext';
import VideoPlayer from '@/Components/VideoPlayer';
import PulseButton from '@/Components/PulseButton';
import Swal from 'sweetalert2';
import CommentsSection from '@/Components/CommentsSection';

function Posts({}) {
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
          if (displayPost === undefined) setDisplayPost(response.data[0]);

          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      });
  }

  useEffect(loadPosts, []);

  const [displayPost, setDisplayPost] = useState();
  const [detailsPost, setDetailsPost] = useState(false);

  return (
    <>
      <div className="w-full h-full md:px-2 flex flex-col">
        <div className=" flex flex-col-reverse md:flex-row  justify-center items-center gap-1">
          <div className=" md:mb-2 w-full flex flex-row justify-between items-center ">
            <div className="w-full md:px-2 flex flex-row">
              <PulseButton
                onClick={() => setOpenNewImagePost(true)}
                className="pulsating-button  shadow shadow-white border flex flex-col text-4xl  justify-start items-center p- rounded "
              >
                <BiNews className="animate-bounce" />
                <span className="text-xs">Publicar</span>
              </PulseButton>
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
        {posts && (
          <div className="w-full h-[62vh] flex overflow-y-auto justify-center">
          <div className="w-[50%] h-full">
            {posts?.map(post => (
              <>
                <PostSingleItem
                  key={post.id}
                  post={post}
                  setDisplayPost={setDisplayPost}
                />
              </>
            ))}
          </div>
          </div>
        )}
      </div>

      <div
        style={{ transition: '1s' }}
        className={`absolute top-0 h-screen w-2/3 md:w-[240px] bg-gradient-to-tl from-white/10 to-[#483d8b backdrop-blur z-10 p-6  smooth-transition ${
          detailsPost ? 'left-0' : '-left-full '
        }  `}
      >
        {!loading && !error && (
          <div className="flex flex-col md:flex-row flex-wrap p-1  ">
            {posts?.length > 0 ? (
              <PostSingle
                key={displayPost?.id}
                post={displayPost}
                loadPosts={loadPosts}
                setDetailsPost={setDetailsPost}
              />
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

function PostSingle({ post, loadPosts, setDetailsPost }) {
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
      <div className="relative w-full h-full  overflow-hidden   rounded p-1">
        <div className="w-full backdrop-blur-lg justify-center items-center flex rounded shadow ">
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
        <div className="w-full h-full bg-white">
          <div className="w-full  flex flex-row text-gray-300 gap-1">
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
          <div className="w-full  flex my-5 text-gray-300 gap-5">
            <p className="text-black bold flex gap-1 items-center">
              {post?.post_text}
            </p>
          </div>
          <CommentsSection key={post.id} item={post} itemType="noticia" />
        </div>
      </div>
    </>
  );
}

function PostSingleItem({ post, setDisplayPost }) {
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  function play() {
    if (ref.current) {
      ref.current?.play();
    }
  }
  function pause() {
    if (ref.current) {
      ref.current?.pause();
    }
  }
  return (
    <>
      <div
        onClick={() => setDisplayPost(post)}
        className="relative w-full h-auto  overflow-hidden   rounded p-1 my-1 hover:cursor-pointer "
      >
        {post?.mime_type?.includes('image/') ||
        post?.mime_type?.includes('video/') ? (
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
                onMouseEnter={play}
                onMouseLeave={pause}
                ref={ref}
                loop={false}
                //        onEnded={onEnded}
                onTimeUpdate={() => {}}
                onLoadedData={() => {}}
                muted
                controls
              >
                <source type={post.mime_type} src={post?.file_url} />
              </video>
            )}
          </div>
        ) : (
          <p className="flex gap-1 items-center w-full bg-white text-[#ff0000]">
            {post.post_text}
          </p>
        )}
        <p className="w-full bg-white  flex flex-row text-gray-300  gap-1 items-center">
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

        <PulseButton
          className="w-full p-1 text-gray-300  justify-center bg-[#1422b1] rounded-t "
          onClick={() => setDisplayPost(post)}
        >
          Ler matéria
        </PulseButton>
      </div>
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
    <div className="flex justify-end w-full items-center gap-1 text-black ">
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
