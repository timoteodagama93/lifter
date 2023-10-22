import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentVideos: [],
  currentVideoIndex: 0,
  isVideoActive: false,
  isPlayingVideo: false,
  activeVideo: {},
  genreListId: '',
};


const playerVideoSlice = createSlice({
  name: 'playerVideo',
  initialState,
  reducers: {
    setActiveVideo: (state, action) => {
      state.activeVideo = action.payload.video;
      if (action.payload?.videos) {
        state.currentVideos = action.payload.videos;
      } else if (action.payload?.data?.properties) {
        state.currentVideos = action.payload?.data?.tracks;
      } else {
        state.currentVideos = action.payload.videos;
      }

      state.currentVideoIndex = action.payload.i;
      state.isVideoActive = true;

    },

    nextVideo: (state, action) => {
      if (state.currentVideos[action.payload]?.track) {
        state.activeVideo = state.currentVideos[action.payload]?.track;
      } else {
        state.activeVideo = state.currentVideos[action.payload];
      }

      state.currentVideoIndex = action.payload;
      state.isVideoActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentVideos[action.payload]?.track) {
        state.activeVideo = state.currentVideos[action.payload]?.track;
      } else {
        state.activeVideo = state.currentVideos[action.payload];
      }

      state.currentVideoIndex = action.payload;
      state.isVideoActive = true;
    },


    playPauseVideo: (state, action) => {
      state.isPlayingVideo = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveVideo, nextVideo: nextSong, prevSong, playPauseVideo, selectGenreListId } = playerVideoSlice.actions;

export default playerVideoSlice.reducer;
