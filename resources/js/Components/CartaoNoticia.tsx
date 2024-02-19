import React, { useState } from 'react';
import './PostCard.css';
import { BiCalendar, BiLike, BiDislike, BiShare, BiChat } from 'react-icons/bi';
import { BsSearchHeart, BsThreeDotsVertical } from 'react-icons/bs';
import SecondaryButton from './SecondaryButton';
import axios from 'axios';
import { FaComments } from 'react-icons/fa';
import CommentsSection from './CommentsSection';


const CartaoNoticia = ({ post, setPostToComment }) => {
  function Like(postId) {
    axios
      .post(`/post-like/${postId}`)
      .then(response => {
        if (response.status === 200) {
        }
      })
      .catch(error => {});
  }

  return (
    <>
      <div className={`post-card`}>
        <img src={post.file_url} alt={post.title} />
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
                setPostToComment(post);
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
     
    </>
  );
};

export default CartaoNoticia;
