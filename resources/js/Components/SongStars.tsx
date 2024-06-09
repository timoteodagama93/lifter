import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';

function SongStars({ song }) {
  const [totalStars, setTotalStars] = useState(0);
  let a =
    (song?.stars +
      song?.plays +
      song?.likes +
      song?.reprodution_time +
      song?.downloads +
      song?.shares) /
    (5 * 1000);
  const score = Math.floor(a);
  const [mediaStars, setMediaStars] = useState(score);
  let stars = [];
  let stars1 = [0, 1, 2, 3, 4];
  const [ss, setSs] = useState(
    <>
      {stars1?.map((s, i) => (
        <>
          <span className="text-2xl ">
            <BsStar className="" />
          </span>
        </>
      ))}
    </>,
  );

  function getClassifications() {
    const data = new FormData();
    data.append('collection_id', song.id);
    data.append('collection_type', 'song');
    axios
      .post('song-valuations', data)
      .then(response => {
        setTotalStars(response.data);
      })
      .catch(error => {});
  }

  useEffect(() => {
    for (let i = 0; i < mediaStars; i++) {
      stars.push(i);
      console.log(mediaStars);
    }

    if (mediaStars > 0) {
      setSs(
        <>
          {stars?.map((s, i) => (
            <>
              <span className="text-2xl ">
                <BsStarFill className="text-[#f6cc33]" />
              </span>
            </>
          ))}
        </>,
      );
    }

    console.log(stars);
  }, []);

  return <div className="flex flex-row gap-1 ">{ss}</div>;
}

export default SongStars;
