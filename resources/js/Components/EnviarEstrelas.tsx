import React, { useState, useEffect } from 'react';
import { BiSave, BiStar } from 'react-icons/bi';

import { BsStar, BsStarFill } from 'react-icons/bs';
import { FaRandom } from 'react-icons/fa';
import { TiMessages } from 'react-icons/ti';
import Modal from './Modal';
import axios from 'axios';
import { useForm } from '@inertiajs/react';
//import ReactStars from 'react-rating-stars-component';

import { useGetSongsQuery } from '@/redux/services/coreApi';
import { useDispatch } from 'react-redux';
import { playPause } from '@/redux/features/playerSlice';

function EnviarEstrelas({ collection, wich_flex, collectionType }) {
  const stars = [1, 2, 3, 4, 5];
  const [selectedStar, setSelectedStar] = useState(0);

  function submitValuation(stars) {
    setSelectedStar(stars);
    const data = new FormData();
    data.append('collection_id', collection?.id);
    data.append('collection_type', collectionType);
    data.append('stars', stars);
    axios
      .post('/stars-to-collection', data)
      .then(response => {
        console.log(response);
        setSelectedStar(response.data.stars);
      })
      .catch(errors => {
        console.log(errors);
      });
  }

  /**GET USER VALUATION TO SELECTED SONG */
  function getUserValuation() {
    const data = new FormData();
    data.append('collection_id', collection?.id);
    data.append('collection_type', collectionType);
    axios
      .post('/get-my-valluation', data)
      .then(response => {
        console.log(response);
        setSelectedStar(response.data);
      })
      .catch(errors => {
        console.log(errors);
      });
  }
  useEffect(getUserValuation, []);

  return (
    <div className=" text-black justify-start items-center flex flex-col relative">
      <span className="text-xs animate-bounce">Avalie</span>
      <div className={`w-full justify-center items-center flex ${wich_flex}`}>
        {stars.map(stars => (
          <span key={stars} className="text-2xl ">
            <button key={stars} onClick={() => submitValuation(stars)}>
              {selectedStar >= stars ? (
                //                    || (isHovering == false && hoverStar >= stars)
                <BsStarFill className="text-[#f6cc33]" />
              ) : (
                <BsStar />
              )}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default EnviarEstrelas;
