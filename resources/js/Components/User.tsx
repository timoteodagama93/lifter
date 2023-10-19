import React from 'react';

const User = ({ user }) => {
    alert(user)
  return (
    <div className="user">
      <img src={user?.avatar} alt={`${user?.name} avatar`} />
      <p className="user">{user?.name}</p>
    </div>
  );
};

export default User;
