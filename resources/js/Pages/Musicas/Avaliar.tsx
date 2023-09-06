import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as Swiper22 } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

//import './stylesGalery.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import PrimaryButton from '@/Components/PrimaryButton';
import { BiDislike, BiLibrary, BiLike, BiShare, BiSmile } from 'react-icons/bi';
import { MdOutlineMessage } from 'react-icons/md';
import InteracoesMusical from '@/Components/InteracoesMusical';
import { songs } from '../../../data/dummy';
import PlayPause from '@/Components/PlayPause';
import { Link } from '@inertiajs/react';
import AvaliarMusicas from '@/Components/AvaliarMusicas';

export default function Avaliar() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="">
      <div className="w-full h-[100vh] flex flex-col justify-start rounded-lg p-2">
        <AvaliarMusicas song={{}} index={4} />
      </div>
    </div>
  );
}
