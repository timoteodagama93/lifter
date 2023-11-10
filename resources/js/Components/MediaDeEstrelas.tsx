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

function MediaDeEstrelas({ song, wich_flex }) {
  const stars = [1, 2, 3, 4, 5];
  const [selectedStar, setSelectedStar] = useState(0);

  /**GET USER VALUATION TO SELECTED SONG */
  console.log(song.stars);
  function calculate() {
    const data = new FormData();
    data.append('song_id', song?.id);
    axios
      .post('/get-valluations', data)
      .then(response => {
        console.log(response);
        setSelectedStar(song.stars / response.data);
      })
      .catch(errors => {
        console.log(errors);
      });
  }
  useEffect(calculate, []);

  return (
    <div className="bg-[#2e2c2e30] text-white justify-center items-center flex flex-col relative">
      <span style={{ fontSize: '0.5rem' }} className=" animate-">
        Média de avaliações
      </span>
      <div className={`w-full justify-center items-center flex ${wich_flex}`}>
        {stars.map(stars => (
          <span key={stars} className="text-base">
            <button key={stars} onClick={() => {} /*submitValuation(stars)*/}>
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

export default MediaDeEstrelas;
