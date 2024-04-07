import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';

function OwnerCard({
  ownerId,
  collectionId,
  collectionType,
  collectionScore = 0,
  title = '',
  category_or_style = '',
}) {
  const [owner, setOwner] = useState(Object);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (collectionType == 'normal') {
      axios.post('get-user', { user_id: ownerId }).then(response => {
        setOwner(response.data);
        setLoading(false);
      });
    } else {
      axios.post('get-artist', { artist_id: ownerId }).then(response => {
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
          src={`/users/${owner?.profile_photo_path}`}
          alt={owner.name}
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
