import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',

  currentVideos: [],
  currentVideoIndex: 0,
  isVideoActive: false,
  isPlayingVideo: false,
  activeVideo: {},

  isFullScreenPlayer: false,
};


const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {


    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.songs) {
        state.currentSongs = action.payload.songs;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload.songs;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;

    },
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

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
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

    prevVideo: (state, action) => {
      if (state.currentVideos[action.payload]?.track) {
        state.activeVideo = state.currentVideos[action.payload]?.track;
      } else {
        state.activeVideo = state.currentVideos[action.payload];
      }

      state.currentVideoIndex = action.payload;
      state.isVideoActive = true;
    },

    playPause: (state, action) => {
      if (state.isPlayingVideo) state.isPlayingVideo = false;
      state.isPlaying = action.payload;
    },

    playPauseVideo: (state, action) => {
      if (state.isPlaying) state.isPlaying = false;
      state.isPlayingVideo = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },

    setFullScreenPlayer: (state, action) => {
      state.isFullScreenPlayer = action.payload;
    },

  },
});

export const { setActiveSong, setActiveVideo, nextSong, nextVideo, prevSong, prevVideo, playPause, playPauseVideo, selectGenreListId, setFullScreenPlayer } = playerSlice.actions;

export default playerSlice.reducer;
