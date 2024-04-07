import React, { useEffect, useState } from 'react';
import PostCard from '../Components/PostCard';
import Comment from '../Components/Comment';
import CommentsSection from '../Components/CommentsSection';
import { MdCloseFullscreen } from 'react-icons/md';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Container from '@/Layouts/Container';

const CommunityDiscussion = ({ posts }) => {
  const [comments, setComments] = useState([
    { text: 'Great post!' },
    { text: 'I have a question about the second post.' },
  ]);

  const [seeComments, setSeeComments] = useState(false);
  const [postToComment, setPostToComment] = useState(null);
  useEffect(() => {
    if (postToComment) {
      setSeeComments(true);
    }
  }, [postToComment]);
  return (
    <AppLayout title="Comunidade">
      <Container>
        <div className="w-full h-full flex flex-col">
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
                          Publicar discussão
                        </p>
                      </Link>
                    </div>
                    <div className="w-full relative flex flex-row">
                      <PostCard
                        className="w-full h-full"
                        imgClassName="w-full h-full"
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
                      itemType="discussion"
                    />
                    <div className="w-full h-[90%] overflow-y-auto relative flex flex-col gap-5 p-5">
                      <p className="text-justify p-5  transform-effect">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Libero, pariatur? Facilis et, incidunt culpa
                        minima fuga dolores, aspernatur nobis accusantium beatae
                        debitis officiis repellendus placeat earum ipsam
                        repellat sunt labore?
                      </p>
                      <p className="text-justify p-2 transform-effect">
                        Lorem ipsum dolor sit amet consectetur?
                      </p>

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
              </div>
            </div>
          </Modal>
          <div className="w-full md:w-[50%] ">
            <div className="community-discussion">
              <div className="posts">
                {posts?.map(post => (
                  <PostCard
                    key={post.title}
                    post={post}
                    setPostToComment={setPostToComment}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </AppLayout>
  );
};

export default CommunityDiscussion;
