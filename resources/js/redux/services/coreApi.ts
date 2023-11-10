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
        baseUrl: 'http://127.0.0.1:8000'
    }),
    endpoints: (builder) => ({
        getSongs: builder.query({ query: (query) => '/get-songs' }),
        getVideos: builder.query({ query: (query) => '/get-videos' }),
        getDestaqueSongs: builder.query({ query: (query) => '/get-songs-destaques' }),
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
    }),
});

export const {
    useGetSongsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistStatsQuery,
    useGetDestaqueSongsQuery,
    useGetDestaqueVideosQuery,


    useGetVideosQuery,

    useGetActiveVoiceSongsQuery,
    useGetActiveVoiceVideosQuery,
    useGetActiveVoiceImagesQuery,
    useGetActiveVoiceQuery,

    useGetContestImagesQuery,
    useGetContestVideoQuery,

    useGetArtistDetailsQuery,
    useGetArtistSongsQuery,
    useGetArtistRelatedSongsQuery
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