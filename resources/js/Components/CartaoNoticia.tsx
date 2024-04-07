import React, { useState } from 'react';
import './PostCard.css';
import { BiCalendar, BiLike, BiDislike, BiShare, BiChat } from 'react-icons/bi';
import { BsSearchHeart, BsThreeDotsVertical } from 'react-icons/bs';
import SecondaryButton from './SecondaryButton';
import axios from 'axios';
import { FaComments } from 'react-icons/fa';
import CommentsSection from './CommentsSection';
import Modal from './Modal';
import { Link } from '@inertiajs/react';
import { MdCloseFullscreen } from 'react-icons/md';

const CartaoNoticia = ({ post }) => {
  function Like(postId) {
    axios
      .post(`/post-like/${postId}`)
      .then(response => {
        if (response.status === 200) {
        }
      })
      .catch(error => {});
  }

  const [seeComments, setSeeComments] = useState(false);

  return (
    <>
      <div className={`w-full h-full post-card`}>
        <img className="w-full h-full" src={post.file_url} alt={post.title} />
        <div className="post-details">
          <h3>{post.title}</h3>
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
            <button
              onClick={() => Like(post?.id)}
              className=" mt-1 p-2 flex gap-1 items-center transform-effect"
            >
              {' '}
              <BiLike /> {post?.likes}{' '}
            </button>
            <button
              onClick={() => Like(post?.id)}
              className=" mt-1 p-2 flex gap-1 items-center transform-effect"
            >
              {' '}
              <BiDislike /> {post?.dislikes}{' '}
            </button>
            <button
              onClick={() => {
                setSeeComments(true);
              }}
              className=" mt-1 p-2 flex gap-1 items-center transform-effect"
            >
              {' '}
              <FaComments /> {}{' '}
            </button>
            <button
              onClick={() => {}}
              className=" mt-1 p-2 flex gap-1 items-center transform-effect"
            >
              {' '}
              <BiShare /> {}{' '}
            </button>
          </div>
          <p className="p-2 flex-wrap flex">{post.post_text}</p>
        </div>
      </div>
      <Modal
        maxWidth="w-full"
        isOpen={seeComments}
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
                  <CartaoNoticia key={post?.id} post={post} />
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
                  key={post?.id}
                  collection={post}
                  collectionType="feed"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CartaoNoticia;
