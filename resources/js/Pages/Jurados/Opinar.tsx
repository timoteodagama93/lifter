import useTypedPage from '@/Hooks/useTypedPage';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { artists } from '../../../data/dummy';
import { MdMessage, MdOutlineMessage } from 'react-icons/md';
import { BiDislike, BiLibrary, BiLike, BiSend, BiShare } from 'react-icons/bi';
import {
  BsEmojiExpressionless,
  BsEmojiHeartEyes,
  BsEmojiLaughing,
  BsEmojiSmile,
} from 'react-icons/bs';
import { size } from 'lodash';

function Opinar() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="w-full flex h-full flex-col md:flex-row md:justify-between">
      <div
        style={{ height: '75vh', overflowY: 'auto' }}
        className="w-full md:w-10/12 flex flex-col-reverse justify-center items-center"
      >
        <div className="w-full md:w-1/3 flex flex-row justify-start items-start text-white space-x-1">
          <div className="w-full flex flex-col space-x-2 text-2xl justify-center">
            <div className="w-full shadow-xl">
              <form>
                <div className="w-full flex flex-col ">
                  <div className="w-full flex">
                    <textarea
                      name=""
                      id=""
                      cols={1}
                      placeholder="Deixe o seu comentário aqui..."
                      className="w-full rounded"
                    ></textarea>
                    <button className="text-white">
                      <BiSend />
                    </button>
                  </div>
                  <div className="flex space-x-2 mt-1 justify-center items-center">
                    <button className="md:hidden flex flex-row justify-center items-center text-white p-1 rounded text-xs space-x-1 border shadow-lg">
                      <MdMessage />
                      <span className="">Ver comentários</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="w-full hidden md:flex flex-col  ">
              <div className="w-full flex justify-center items-center space-x-1">
                <img
                  className="w-12 h-12 rounded-full"
                  src={artists[2].images.artistImage}
                />
                <h1 style={{ lineHeight: 1 }} className="text-xl ">
                  Sebastião Mendonça
                </h1>
              </div>
              <div className="w-full px-0">
                <span
                  style={{ lineHeight: 0.01, fontSize: '.7rem' }}
                  className="text-base "
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus, dolores? Adipisci eligendi consequuntur
                  laudantium excepturi earum perspiciatis molestias, accusamus
                  fugit deleniti modi a aut atque temporibus architecto labore
                  placeat facere.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3 ">
          <img className="w-full rounded-lg" src={artists[2].images.artistImage} />
        </div>
      </div>
      <div
        style={{ height: ' 75vh', overflowY: 'auto', marginBottom: '100px' }}
        className="w-full md:w-2/12 flex flex-col justify-start"
      >
        <div className="w-full h-1/6 md: p-2 border">
          <img className="w-full " src={artists[0].images.artistImage} />
        </div>
        <div className="w-full h-1/6 md: p-2 border">
          <img className="w-full " src={artists[0].images.artistImage} />
        </div>
        <div className="w-full h-1/6 md: p-2 border">
          <img className="w-full " src={artists[0].images.artistImage} />
        </div>
        <div className="w-full h-1/6 md: p-2 border">
          <img className="w-full " src={artists[1].images.artistImage} />
        </div>
        <div className="w-full  p-2 border">
          <img className="w-full " src={artists[2].images.artistImage} />
        </div>
        <div className="w-full  p-2 border">
          <img className="w-full " src={artists[3].images.artistImage} />
        </div>
        <div className="w-full  p-2 border">
          <img className="w-full " src={artists[3].images.artistImage} />
        </div>
        <div className="w-full  p-2 border">
          <img className="w-full " src={artists[3].images.artistImage} />
        </div>
        <div className="w-full  p-2 border">
          <img className="w-full " src={artists[3].images.artistImage} />
        </div>
      </div>
    </div>
  );
}

export default Opinar;
