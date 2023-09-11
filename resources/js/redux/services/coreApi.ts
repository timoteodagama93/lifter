import axios from "axios";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const options = {
    method: 'POST'
};

axios.post('get-songs')
    .then((response) => {
        console.log(response)
    })
    .catch(e => { console.error(e) })

export const coreApi = createApi({
    reducerPath: 'coreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000'
    }),
    endpoints: (builder) => ({
        getValuateSongs: builder.query({ query: (query) => query }),
    }),
});

export const { useGetValuateSongsQuery} = coreApi;