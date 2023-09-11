import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { coreApi } from './services/coreApi'
import playerReducer from './features/playerSlice';

const store = configureStore({
  reducer: {
    [coreApi.reducerPath]: coreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coreApi.middleware),
});

export default store;