import React, { useState } from 'react';
import PostCard from '../Components/PostCard';
import Comment from '../Components/Comment';
import { artists } from '../../data/dummy';
import CommentsSection from '../Components/CommentsSection';
import { MdCloseFullscreen } from 'react-icons/md';
import AppLayout from '@/Layouts/AppLayout';

const CommunityDiscussion = () => {
  const [posts, setPosts] = useState([
    {
      title: 'First Post',
      content:
        'This is the first post. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi, beatae enim itaque sint cum nihil ea reprehenderit expedita, laborum modi! Praesentium, laborum ex magnam commodi minima quas ducimus unde. ',
      imageUrl: artists[0].images.artistImage,
      created_at: 20 / 10 / 2023,
    },
    {
      title: 'Second Post',
      content: 'Another post for discussion.',
      imageUrl: artists[1].images.artistImage,
      created_at: 20 / 10 / 2023,
    },
    {
      title: ' Post',
      content: 'Another post for discussion.',
      imageUrl: artists[2].images.artistImage,
      created_at: 20 / 10 / 2023,
    },
    {
      title: 'Other Post',
      content: 'Another post for discussion.',
      imageUrl: artists[3].images.artistImage,
      created_at: 20 / 10 / 2023,
    },
  ]);

  const [comments, setComments] = useState([
    { text: 'Great post!' },
    { text: 'I have a question about the second post.' },
  ]);

  const [seeComments, setSeeComments] = useState(false);
  const [postToComment, setPostToComment] = useState(null);

  return (
    <AppLayout title="Comunidade">
      <div className="w-full h-full flex flex-col">
        {postToComment && seeComments && (
          <div
            style={{ transition: '1.5s' }}
            className={`w-full h-full  z-20 justify-center items-center absolute top-0 left-0 bg-[#4c88c4] ${
              seeComments ? 'flex ' : 'hidden'
            }`}
          >
            <div
              className={`w-full md:w-[70%] h-full flex flex-col justify-center items-center`}
            >
              <div className="w-full flex float-right justify-end">
                <button
                  onClick={() => setSeeComments(false)}
                  className="p-5 transform-effect w-fit right-1 text-black"
                >
                  <MdCloseFullscreen className="w-5 h-5 font-bold text-4xl" />
                </button>
              </div>
              <div
                className={`w-full md:w-[70%] h-full flex flex-col justify-center items-center`}
              >
                <div className="w-full flex justify-center">
                  <PostCard
                    key={postToComment.id}
                    post={postToComment}
                    setSeeComments={setSeeComments}
                    setPostToComment={setPostToComment}
                  />
                </div>
                <CommentsSection
                  key={postToComment?.id}
                  item={postToComment}
                  itemType="discussion"
                />
                <div className="comments">
                  <h2>Comments</h2>
                  {comments.map((comment, index) => (
                    <Comment
                      key={index}
                      comment={comment.text}
                      user={''}
                      text={comment.text}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-full md:w-[50%] ">
          <div className="community-discussion">
            <div className="posts">
              {posts.map((post, index) => (
                <PostCard
                  key={post.title}
                  post={post}
                  setSeeComments={setSeeComments}
                  setPostToComment={setPostToComment}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CommunityDiscussion;
