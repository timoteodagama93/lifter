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
import { Link, useForm } from '@inertiajs/react';
import useTypedPage from '@/Hooks/useTypedPage';
import useRoute from '@/Hooks/useRoute';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import { Error, Loader } from '@/Components';
import { MdCloseFullscreen, MdOutlinePublish } from 'react-icons/md';
import { GrNew } from 'react-icons/gr';
import { useStateContext } from '@/contexts/PaginaActualContext';
import VideoPlayer from '@/Components/VideoPlayer';
import PulseButton from '@/Components/PulseButton';
import Swal from 'sweetalert2';
import CommentsSection from '@/Components/CommentsSection';
import PostCard from '@/Components/PostCard';
import CartaoNoticia from '@/Components/CartaoNoticia';
import Comment from '@/Components/Comment';
import AppLayout from '@/Layouts/AppLayout';
import CardChakraUI from '@/Components/CardChakraUI';

function Noticias({}) {
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
    <AppLayout title="Notícias">
      <div className="w-full h-full md:px-2 flex flex-col">
        <div className="w-full flex flex-col-reverse md:flex-row  justify-center items-center">
          <FiltrarNoticias
            setPosts={setPosts}
            setLoading={setLoading}
            setError={setError}
            setFilter={setFilter}
          />
        </div>

        {loading && <Loader title="Carregando Posts & Notícias" />}
        {error && <Error />}
        {!loading && !error && posts && (
          <div className="w-full h-[62vh] flex overflow-y-auto justify-center">
            <div className="w-full flex justify-center">
              {posts?.length > 0 ? (
                <DisplayNew posts={posts} />
              ) : (
                <h1 className="w-full text-center text-xl uppercase">
                  Nada publicado recentemente em {filter} ...
                </h1>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function DisplayNew({ posts }) {
  const [seeComments, setSeeComments] = useState(false);
  const [postToComment, setPostToComment] = useState(null);

  const [comments, setComments] = useState([
    { text: 'Great post!' },
    {
      text: 'I have a question about the second post. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident veniam corrupti architecto nostrum nisi iusto, animi ad deserunt sed, accusamus aperiam minima suscipit eum numquam illo dolores inventore ex similique.',
    },
  ]);

  useEffect(() => {
    if (postToComment) {
      setSeeComments(true);
    }
  }, [postToComment]);
  return (
    <div className="w-full h-full flex justify-center">
      <Modal
        isOpen={seeComments && postToComment ? true : false}
        onClose={() => setSeeComments(false)}
      >
        <div className="w-full h-full flex flex-col bg-[#4c88c4] ">
          <div className="w-full flex float-right justify-end">
            <button
              onClick={() => setSeeComments(false)}
              className="p-5 transform-effect w-fit right-1 text-black"
            >
              <MdCloseFullscreen className="w-5 h-5 font-bold text-4xl" />
            </button>
          </div>
          <div className="w-full h-full flex flex-col gap-1 justify-center items-center rounded-lg">
            <div className="w-full  relative p-5">
              <div className="flex w-full h-full flex-col relative">
                <div
                  className="w-full flex flex-row justify-between
             items-center"
                >
                  <h2 className=" font-bold text-base md:text-4xl text-[#]">
                    Preview
                  </h2>
                  <Link href="/videos">
                    <p className="text-sm md:text-base cursor-pointer transform-effect p-2 text-white font-bold ">
                      Ler publicação completa
                    </p>
                  </Link>
                </div>
                <div className="w-full relative flex flex-row px-5">
                  <CartaoNoticia
                    key={postToComment?.id}
                    post={postToComment}
                    setPostToComment={setPostToComment}
                  />
                </div>
              </div>
            </div>
            <div className="w-full p-5">
              <div className="flex w-full h-full flex-col relative  ">
                <div
                  className="w-full h-[10%] flex flex-row justify-between
             items-center"
                >
                  <h2 className=" font-bold text-base md:text-2xl text-[#]">
                    Comentários
                  </h2>
                  <Link href="top-charts">
                    <p className="text-sm md:text-base cursor-pointer">
                      Ver mais
                    </p>
                  </Link>
                </div>
                <CommentsSection
                  key={postToComment?.id}
                  item={postToComment}
                  itemType="news"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="bg-white p-5">

      {posts.map(post => (
        <CardChakraUI
        key={post?.id}
        post={post}
        setPostToComment={setPostToComment}
        />
        ))}
        </div>

      <div className="w-full md:w-[60%] ">
        <div className="community-discussion">
          <div className="posts">
            {posts.map(post => (
              <CartaoNoticia
                key={post.id}
                post={post}
                setPostToComment={setPostToComment}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noticias;

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
    <div className="w-full flex justify-center items-center  text-black ">
      <select
        onChange={e => loadPostsByFilter(e)}
        className="rounded-lg shadow-xl shadow-black"
      >
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
