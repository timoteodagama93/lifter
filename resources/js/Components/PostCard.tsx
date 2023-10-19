import React from 'react';
import './PostCard.css';

const PostCard = ({ imageUrl, title, description }) => {
  return (
    <div className="post-card">
      <img src={imageUrl} alt={title} />
      <div className="post-details">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PostCard;
