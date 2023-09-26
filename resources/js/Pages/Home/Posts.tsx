import React, { useState, useRef, useEffect } from 'react';
import { BiCalendar, BiComment, BiDislike, BiLike, BiMusic, BiSend } from 'react-icons/bi';
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
import OffOnCheckBox from '@/Components/OffOnCheckBox';

function Posts() {
  const [openNewImagePost, setOpenNewImagePost] = useState(false);
  const page = useTypedPage();
  const [posts, setPosts] = useState([]);

  function loadPosts() {
    axios.post('/posts').then(response => {
      if (response.status === 200) {
        setPosts(response.data);
      }
    });
  }

  useEffect(loadPosts, []);

  function Like(postId){

  }
  return (
    <>
      <div className="w-full md:px-2 flex flex-col">
        <div className="flex flex-col-reverse md:flex-row  justify-center items-center gap-5 pb-1">
          <div className="-mb-2 gap-5 md:mb-2 w-full h-full flex flex-row justify-start mt-0">
            <button className=" shadow shadow-white border flex flex-col text-4xl  justify-start items-center p-1 rounded ">
              <BiMusic className="animate-bounce" />
              <span className="text-xs">Música</span>
            </button>
            <button
              onClick={() => setOpenNewImagePost(true)}
              className=" shadow shadow-white border flex flex-col text-4xl  justify-start items-center p-1 rounded "
            >
              <BsImage />
              <span className="text-xs">Imagem</span>
            </button>
            <button className=" shadow shadow-white border flex flex-col text-4xl  justify-start items-center p-1 rounded ">
              <BsCameraVideo />
              <span className="text-xs">Vídeo</span>
            </button>
            <OffOnCheckBox />
          </div>
        </div>
        <NewPost isOpen={openNewImagePost} onClose={setOpenNewImagePost} />
        <div className="flex flex-col md:flex-row flex-wrap p-1 ">
          {posts?.map(post => (
            <>
              <div className="relative w-full md:w-1/2 lg:w-1/3 h-[400px]  overflow-hidden   rounded p-1">
                <div className="w-full h-1/2 backdrop-blur-lg justify-center items-center flex rounded shadow ">
                  <img
                    src={post.file_url}
                    alt=""
                    className="object-cover h-full w-full rounded-t shadow"
                  />
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
                        new Date(post?.created_at).getFullYear()+
                        ' ' +
                        new Date(post?.created_at).getUTCHours()+
                        ':' +
                        new Date(post?.created_at).getUTCMinutes()
                        }
                    </p>
                    <SecondaryButton 
                    onClick={()=>Like(post?.id)}
                    className=" mt-1 p-1 flex gap-1 items-center">
                      {' '}
                      <BiLike /> {post?.likes}{' '}
                    </SecondaryButton>
                    <SecondaryButton 
                    onClick={()=>Like(post?.id)}
                    className=" flex gap-1 items-center">
                      {' '}
                      <BiDislike /> {post?.dislikes}{' '}
                    </SecondaryButton>
                    <p className="flex gap-1 items-center text-[#ff0000]">
                      <BsSearchHeart className="text-[#ff0000] " /> 
                      Lifter
                    </p>
                  </div>
                  <div className="w-full  overflow-y-hidden flex flex-row text-gray-300 gap-5">
                    <p className="text-black bold flex gap-1 items-center">
                      {post?.post_text}
                    </p>
                  </div>
                  <div className="w-full absolute p-1 bottom-0 left-0   flex flex-row text-gray-300 gap-5">
                    <button className="w-full h-12 justify-center items-center flex bg-[#1422b1] rounded-t ">
                      Ler mais
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Posts;

function NewPost({ isOpen, onClose }) {
  const page = useTypedPage();
  const route = useRoute();
  const { data, setData, progress, post } = useForm({
    text: '',
    erros: [],
    file: null as File | null,
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  function saveNewPost(e) {
    e.preventDefault();
    const newData = {
      text: data.text,
      file: data.file,
      errors: data.erros,
    };
    post('/post', {
      onSuccess: () => {
        setData('text', '');
        clearPhotoFileInput();
      },
      onFinish: onClose(false),
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
              Selecionar Imagem
            </SecondaryButton>

            <InputError message={data.erros} className="mt-2" />
          </div>

          <textarea
            value={data.text}
            onChange={e => {
              setData('text', e.currentTarget.value);
            }}
            maxLength={500}
            minLength={5}
            placeholder="Conte a história..."
            className="w-full p-2 border border-[#2e2c2e] rounded shadow-sm"
          ></textarea>
          <button className="h-full text-2xl flex justify-center items-center gap-1 shadow-lg shadow-black rounded p-1  ">
            <BiSend />
            <span className="text-base">Partilhar poste</span>
          </button>
        </form>
      </div>
    </Modal>
  );
}
