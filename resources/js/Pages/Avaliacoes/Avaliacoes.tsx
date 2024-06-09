import React, { useState, useEffect } from 'react';
// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

//import './stylesGalery.css';

// import required modules
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Layouts/Container';

import { useSelector } from 'react-redux';
import {
  useGetSongsAudiosQuery,
} from '@/redux/services/coreApi';

import SongsDetaiOneByOne from '@/Components/SongsDetaiOneByOne';

const Avaliacoes = ({}) => {
  const { data: songs, isFetching, error } = useGetSongsAudiosQuery('destaque');

  const { activeSong, isPlaying } = useSelector(state => state.player);
  const [x, setX] = useState(0);

  const [selectedValuation, setSelectedValuation] = useState(
    isPlaying ? activeSong : null,
  );

  useEffect(() => {
    if (!isPlaying) setSelectedValuation(null);
  }, [isPlaying]);

  useEffect(() => {
    if (songs?.length > 0) setSelectedValuation(songs[x]);
  }, [songs]);

  const handlePrevious = () => {
    if (x < 0) {
      setX(0);
    } else {
      setX(x - 1);
    }
    setSelectedValuation(songs[x]);
  };

  const handleNext = () => {
    if (x == songs.length) {
      setX(0);
    } else {
      setX(x + 1);
    }
    setSelectedValuation(songs[x]);
  };

  return (
    <AppLayout title="Avaliações">
      <Container>
        <>
          {songs?.length > 0 && (
            <>
              <SongsDetaiOneByOne songs={songs} />
            </>
          )}
        </>
      </Container>
    </AppLayout>
  );
};

export default Avaliacoes;
