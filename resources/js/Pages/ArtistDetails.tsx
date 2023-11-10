import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import route from 'ziggy-js';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '@/Components';
import {
  useGetArtistDetailsQuery,
  useGetArtistRelatedSongsQuery,
  useGetSongRelatedQuery,
} from '@/redux/services/coreApi';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';

function ArtistDetails({ artistId }) {
  const dispatch = useDispatch();
  const {
    data: artistData,
    isFetching,
    error,
  } = useGetArtistDetailsQuery(artistId);
  const { data: relatedSongs, isFetching: isFetchingRelatedSongs } =
    useGetArtistRelatedSongsQuery(artistId);

  const { activeSong, isPlaying } = useSelector(state => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(playPause(true));
  };

  return (
    <AppLayout title="Detalhes artista">
      <div className="w-full flex flex-col">
        <DetailsHeader artistId={{}} songData={artistData} artistData={{}} />
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
                    {artistData.letra != '' ? (
                      <p className="text-gray-400 text-base my-1">
                        {artistData.letra}
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
            data={relatedSongs}
            isPlaying={isPlaying}
            activeSong={activeSong}
            songId={artistData.id}
            handlePlay={handlePlayClick}
            handlePause={handlePauseClick}
          />
        )}
      </div>
    </AppLayout>
  );
}

export default ArtistDetails;
