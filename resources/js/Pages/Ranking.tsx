import React, {  } from 'react';
import { Link } from '@inertiajs/react';
import { useSelector } from 'react-redux';
import { useGetSongsQuery } from '@/redux/services/coreApi';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import TopChartCard from '../Components/TopChartCard';
import AppLayout from '@/Layouts/AppLayout';

function Ranking({ }) {
  const { data, isFetching, error } = useGetSongsQuery('/get-songs');
  const { activeSong, isPlaying } = useSelector(state => state.player);
  if (isFetching) return <Loader title="Carregando músicas..." />;
  if (error) return <Error />;

  
  return (
    <AppLayout title='Ranking'>
      <div className="w-full relative flex flex-row rounded">
        <div className="w-full flex flex-col px-4 rounded-lg">
          <div
            className="w-full flex flex-row justify-between
             items-center"
          >
            <h2 className=" font-bold text-base md:text-4xl">Top 100 </h2>
            <Link href="top-charts">
              <p className="text-sm md:text-base cursor-pointer">Ver mais</p>
            </Link>
          </div>
          <div className="w-full relative flex flex-col ">
            {data?.map((song, id) => (
              <TopChartCard
                songs={data}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={id}
                key={song.id}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Ranking;
