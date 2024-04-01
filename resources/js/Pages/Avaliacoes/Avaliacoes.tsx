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

import { useSelector } from 'react-redux';
import {
  useGetSongsAudiosQuery,
  useGetSongsQuery,
} from '@/redux/services/coreApi';

import ValuationReader from './ValuationReader';
import ValuatedsSongs from './ValuatedsSongs';
import PlayerLayout from '@/Layouts/PlayerLayout';
import PlayerContainer from '@/Layouts/PlayerContainer';
import { SongCard } from '@/Components';
import TopChartCard from '@/Components/TopChartCard';

const Avaliacoes = ({}) => {
  const { data: songs, isFetching, error } = useGetSongsAudiosQuery('destaque');

  const { activeSong, isPlaying } = useSelector(state => state.player);
  const [selectedValuation, setSelectedValuation] = useState(
    isPlaying ? activeSong : null,
  );

  useEffect(() => {
    if (!isPlaying) setSelectedValuation(null);
  }, [isPlaying]);

  return (
    <PlayerLayout title="Avaliações">
      <PlayerContainer>
        <>
          {songs?.length > 0 && (
            <>
              {' '}
              {songs?.map((song, i) => (
                <div className="w-full relative flex flex-col ">
                  <>
                    {window.screen.width >= 768 ? (
                      <TopChartCard
                        songs={songs}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        i={i}
                        key={song.id}
                      />
                    ) : (
                      <SongCard
                        songs={songs}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        i={i}
                        key={song.id}
                      />
                    )}
                  </>
                </div>
              ))}
            </>
          )}
        </>
      </PlayerContainer>
    </PlayerLayout>
  );
};

export default Avaliacoes;
