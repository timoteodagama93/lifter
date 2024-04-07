import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';

function OwnerCard({
  ownerId,
  collectionId,
  collectionType,
  collectionScore = 0,
  title,
  category_or_style,
}) {
  const [owner, setOwner] = useState(Object);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (collectionType == 'normal') {
      axios.post('get-user', { user_id: ownerId }).then(response => {
        console.log(response.data);
        setOwner(response.data);
        setLoading(false);
      });
    } else {
      axios.post('get-artist', { artist_id: ownerId }).then(response => {
        console.log(response.data);
        setOwner(response.data);
        setLoading(false);
      });
    }
  }, []);

  if (loading) return <Loader title="Loading..." />;
  return (
    <div className="w-full h-full rounded-lg sahdow-lg p-1 flex flex-row justify-center items-center gap-1">
      <div className="h-12 w-12   rounded-lg">
        <img
          className="object-center object-cover h-full w-full rounded-lg"
          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
          alt="photo"
        />
      </div>
      <div className="w-full h-full text-start truncate">
        <p className="text-xl text-white font-bold -my-1"> {title} </p>
        <p className="text-base text-gray-400 font-normal -my-1">
          {owner.name} | {collectionScore} lifts{' '}
        </p>
      </div>
    </div>
  );
}

export default OwnerCard;
