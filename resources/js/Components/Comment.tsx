import React, { useEffect, useState } from 'react';
import User from './User';
import axios from 'axios';
import OwnerCard from './OwnerCard';

const Comment = ({ comment }) => {
  const [user, setUser] = useState();
  function getUser() {
    axios
      .post('get-user')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {});
  }

  useEffect(() => getUser, [user]);
  return (
    <div className="comment dark:shadow  dark:shadow-white transform-effect p-5">
      <div className="users ">
        <OwnerCard
          collectionId={comment.collection_id}
          collectionType={comment.collection_type}
          ownerId={comment.user_id}
        />
      </div>

      <p className="text">{comment.comment}</p>
    </div>
  );
};

export default Comment;
