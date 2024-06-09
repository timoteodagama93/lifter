import AppLayout from '@/Layouts/AppLayout';
import React, { useEffect, useRef, useState } from 'react';

import { Error, Loader, SongCard } from '@/Components';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetTopChartsQuery,
  useGetSongsQuery,
} from '@/redux/services/coreApi';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';

import axios from 'axios';
import { generos } from '@/assets/constants';
import Container from '@/Layouts/Container';
import { filter } from 'lodash';
import Modal from '@/Components/Modal';
import TopChartCard from '@/Components/TopChartCard';
import { Link } from '@inertiajs/react';

import { FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { smalLogo } from '../../img';

function EmAlta() {
  //const { data, isFetching, error } = useGetTopChartsQuery('');
  const { data, isFetching, error } = useGetSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const [results, setResults] = useState();
  const [query, setQuery] = useState('Angola Top Artists Video Songs');

  useEffect(() => {
    const apiKey = 'AIzaSyA45maJSYR-JSsZfNFroy-NZ2ozmsaGiiw';
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=10&q=${query}`,
      )
      .then(response => {
        setResults(response.data.items);
        console.log(results);

        // Faça algo com os resultados, como renderizá-los em seu site.
      })
      .catch(error => {
        console.error('Erro na pesquisa do YouTube:', error);
      });
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    const apiKey = 'AIzaSyA45maJSYR-JSsZfNFroy-NZ2ozmsaGiiw';
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=10&q=${query}`,
      )
      .then(response => {
        setResults(response.data.items);
        console.log(results);

        // Faça algo com os resultados, como renderizá-los em seu site.
      })
      .catch(error => {
        console.error('Erro na pesquisa do YouTube:', error);
      });
  };

  if (isFetching) return <Loader title="" />;
  if (error) return <Error />;
  return (
    <AppLayout title="Em Alta">
      <Container>
        <>
          <div className="w-full h-full flex  flex-col dark:text-gray-400 ">
            <div className="w-full flex hidden  flex-col rounded-lg">
              <div className="w-full flex justify-between items-center flex-row shadow-lg mb-5 pb-1">
                <h2 className="flex font-bold text-3xl  text-left ">Em ALta</h2>
                <form onSubmit={handleSearch} className="w-full flex ">
                  <input
                    onChange={e => setQuery(e.target.value)}
                    className="w-3/4 mx-5 rounded-lg text-black"
                    type="search"
                    value={query}
                    placeholder="Descobrir música"
                  />
                  <button type="submit">
                    {' '}
                    <BiSearch />{' '}
                  </button>
                </form>
                <button className="md:hidden flex text-bold text-2xl  justify-center items-center bg-gray-400 p-1 rounded-lg text-black">
                  <BiSearch className="mr-2 text-3xl text-center" />
                </button>
                <select
                  onChange={e => setQuery(e.target.value)}
                  className="p-1 text-sm rounded-lg outline-none text-black "
                >
                  {generos.map(genero => (
                    <option key={genero.value} value={genero.value}>
                      {genero.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full xl:stick relative h-fit">
              <TopPlay />
            </div>
          </div>
          <Modal isOpen={false} onClose={() => {}}>
            <div className="w-full h-fit  bg-green-400 flex flex-col relative mx-auto  dark:bg-gray-800 shadow-xl sm:rounded-lg flex-wrap justify-start">
              <div className="w-full h-full p-1 border flex flex-row flex-wrap">
                {data.map((song, i) => (
                  <SongCard
                    w="w-full md:w-1/2  xl:w-1/3 "
                    song={song}
                    i={i}
                    key={i}
                    activeSong={activeSong}
                    isPlaying={isPlaying}
                    songs={data}
                  />
                ))}

                {results?.map((result, i) => (
                  <div className=" w-full md:w-1/2 xl:w-1/3 h-auto shadow rounded object-contain">
                    <img
                      className="object-cover w-full h-auto p-5"
                      src={result.snippet.thumbnails.default.url}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        </>
      </Container>
    </AppLayout>
  );
}

export default EmAlta;

const TopPlay = ({}) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(state => state.player);
  const { data } = useGetSongsQuery('/get-songs');
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="relative xl:ml-6 ml-1 xl:mb-0 mb-6 flex-1 w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-white text-2xl">Top charts</h1>
          <Link href="/top-charts">
            <p className="text-gray-300 text-base">Vê mais</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              song={song}
              i={i}
              key={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              songs={topPlays}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-1">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-white font-bold text-2xl">Top Artists</h1>
          <Link href="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">Vê mais</p>
          </Link>
        </div>
        <Swiper
          loop={true}
          spaceBetween={15}
          navigation={true}
          modules={[FreeMode, Navigation]}
          slidesPerView="auto"
          centeredSlides
          centeredSlidesBounds
          height={15}
          className="w-full h-[10rem] flex items-start justify-start "
        >
          <SwiperSlide className="w-24 h-[10rem] shadow-lg rounded-full animate-sliderrigth">
            <div className="w-full h-24  flex flex-row">
              {topPlays?.map((song, i) => (
                <div className="w-24 h-24  flex flex-row">
                  <Link
                    href={`/artists/${song?.artist_id}`}
                    className=" w-full h-full shadow-lg rounded-full animate-sliderrigth"
                  >
                    <div className=" w-full h-full shadow-lg rounded-full animate-sliderrigth">
                      {song.cover ? (
                        <img
                          src={song.cover}
                          alt="name"
                          className="rounded-full w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={smalLogo}
                          alt="name"
                          className="rounded-full w-full object-cover"
                        />
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
