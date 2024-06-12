import React, { useEffect, useState } from 'react';
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

import SongsDetailsOneByOne from '@/Components/SongsDetailsOneByOne';
import { generos } from '@/assets/constants';
import { useGetDestaquesQuery } from '@/redux/services/coreApi';
import axios from 'axios';

const Avaliacoes = ({}) => {
  let genrePosition = Math.floor(Math.random() * generos?.length - 1);

  const [category, setCategory] = useState(generos[genrePosition]?.value);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get(`/get-destaques/${category}`)
      .then(response => {
        setSongs(response.data);
      })
      .catch();
  }, [category]);

  return (
    <AppLayout title="Avaliações">
      <Container>
        <>
          <SongsDetailsOneByOne
            songs={songs}
            category={category}
            setCategory={setCategory}
          />
        </>
      </Container>
    </AppLayout>
  );
};

export default Avaliacoes;
