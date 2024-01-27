import React, { useEffect, useState } from 'react';
import User from './User';
import axios from 'axios';

const Feedback = ({ feedback }) => {
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
    <div className="comment transform-effect p-5">
      {/*}
      <div className="users ">
        <User key={user_id} user={user} />
      </div>
  {*/}
      <p className="text">{feedback}</p>
    </div>
  );
};

export default Feedback;
