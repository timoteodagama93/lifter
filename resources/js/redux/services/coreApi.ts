import axios from "axios";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const options = {
    method: 'POST'
};
/*
axios.post('get-songs')
    .then((response) => {
        console.log(response)
    })
    .catch(e => { console.error(e) })*/

export const coreApi = createApi({
    reducerPath: 'coreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://lifter.ao/'
    }),
    endpoints: (builder) => ({

        /**SONGS */
        getSongs: builder.query({ query: (query) => '/get-songs' }),
        getSongsAudios: builder.query({ query: (query) => `/get-songs-audios/${query}` }),
        getSongsVideos: builder.query({ query: (query) => `/get-songs-videos/${query}` }),
        getVideos: builder.query({ query: (category) => `/get-videos/${category}` }),
        getDestaqueSongs: builder.query({ query: (category) => `/get-songs-destaques/${category}` }),
        getDestaqueVideos: builder.query({ query: (query) => '/get-videos-destaques' }),

        getSongDetails: builder.query({ query: (songId) => `/tracks/details/${songId}` }),
        getSongRelated: builder.query({ query: (songId) => `/tracks/related/${songId}` }),


        /**ACTIVE VOICE */
        getActiveVoice: builder.query({ query: (artistId) => artistId }),
        getActiveVoiceSongs: builder.query({ query: (artistId) => `get-activevoice-songs/${artistId}` }),
        getActiveVoiceVideos: builder.query({ query: (artistId) => `get-activevoice-videos/${artistId}` }),
        getActiveVoiceImages: builder.query({ query: (artistId) => `get-activevoice-images/${artistId}` }),

        /**CONTEST */
        getContestVideo: builder.query({ query: (contestId) => `get-contest-videos/${contestId}` }),
        getContestImages: builder.query({ query: (contestId) => `get-contest-images/${contestId}` }),


        /** ARTIST */
        getArtistStats: builder.query({ query: (artistId) => `/artist-stats/${artistId}` }),
        getArtistDetails: builder.query({ query: (artistId) => `/artists/details/${artistId}` }),
        getArtistSongs: builder.query({ query: (artistId) => `/get-artist-songs/${artistId}` }),
        getArtistRelatedSongs: builder.query({ query: (artistId) => `/artists/related/${artistId}` }),

        /** PROFISSIONALS AND VALUATIONS */
        getValuationsRequests: builder.query({ query: (category) => `/get-valuations-requests` }),


        /** EXPOSITIONS */
        getExpositions: builder.query({ query: () => `/get-expositions-rooms` }),
        getExpositionItems: builder.query({ query: (roomId) => `/get-room-items/${roomId}` }),

        /** ESTANTES */
        getEstantes: builder.query({ query: () => `/get-estantes` }),
        getEstanteBooks: builder.query({ query: (estanteId) => `/get-estante-books/${estanteId}` }),
    }),
});

export const {
    useGetSongsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistStatsQuery,
    useGetDestaqueSongsQuery,
    useGetDestaqueVideosQuery,
    useGetSongsAudiosQuery,
    useGetSongsVideosQuery,


    useGetVideosQuery,

    useGetActiveVoiceSongsQuery,
    useGetActiveVoiceVideosQuery,
    useGetActiveVoiceImagesQuery,
    useGetActiveVoiceQuery,

    useGetContestImagesQuery,
    useGetContestVideoQuery,

    useGetArtistDetailsQuery,
    useGetArtistSongsQuery,
    useGetArtistRelatedSongsQuery,

    useGetValuationsRequestsQuery,

    useGetExpositionsQuery,
    useGetExpositionItemsQuery,

    useGetEstantesQuery,
    useGetEstanteBooksQuery,
} = coreApi;


export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapid.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vkjsnK4bkzuUzVLzA');
            //headers.set('X-RapidAPI-Host', 'shazam-api-new1.p.rapidapi.com');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: (query) => '/charts/world' }),
        getTopPops: builder.query({ query: (query) => `/charts/world` }),
    }),
});

export const { useGetTopChartsQuery, useGetTopPopsQuery } = shazamCoreApi;