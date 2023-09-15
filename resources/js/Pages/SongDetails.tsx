import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import route from 'ziggy-js';
import { songs } from '../../data/dummy';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '@/Components';
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from '@/redux/services/coreApi';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';

function SongDetails({ songId }) {
  const dispatch = useDispatch();
  const { data: songData, isFetching, error } = useGetSongDetailsQuery(songId);
  const { data: relatedData, isFetching: isFetchingRelatedSongs } =
    useGetSongRelatedQuery(songId);

  const { activeSong, isPlaying } = useSelector(state => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(playPause(true));
  };

  return (
    <AppLayout title="Detalhes música">
      <div className="w-full flex flex-col">
        <DetailsHeader artistId={{}} songData={songData} artistData={{}} />
        {error ? (
          <Error />
        ) : (
          <>
            {isFetching ? (
              <Loader title="Carregando detalhes" />
            ) : (
              <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Letra:</h2>
                <div className="mat-5">
                  <p>
                    {' '}
                    {songData.letra != '' ? (
                      <p className="text-gray-400 text-base my-1">
                        {songData.letra}
                      </p>
                    ) : (
                      <p className="text-gray-400 text-base my-1">
                        Lamentamos, nenhuma letra está disponível!
                      </p>
                    )}{' '}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
        {isFetchingRelatedSongs ? (
          <>Carregando...</>
        ) : (
          <RelatedSongs
            data={relatedData}
            isPlaying={isPlaying}
            activeSong={activeSong}
            songId={songData.id}
            handlePlay={handlePlayClick}
            handlePause={handlePauseClick}
          />
        )}
      </div>
    </AppLayout>
  );
}

export default SongDetails;
