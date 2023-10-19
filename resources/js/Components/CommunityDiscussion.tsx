import React, { useState } from 'react';
import PostCard from './PostCard';
import Comment from './Comment';

const CommunityDiscussion = ({setPostsList}) => {
  const [posts, setPosts] = useState([
    { title: 'First Post', content: 'This is the first post.' },
    { title: 'Second Post', content: 'Another post for discussion.' },
  ]);

  const [comments, setComments] = useState([
    { text: 'Great post!' },
    { text: 'I have a question about the second post.' },
  ]);

  return (
    <div className="community-discussion">
      <div className="posts">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} title={post.title} description={post.content} />
        ))}
      </div>
      <div className="comments">
        <h2>Comments</h2>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment.text} user={''} text={comment.text} />
        ))}
      </div>
    </div>
  );
};

export default CommunityDiscussion;
