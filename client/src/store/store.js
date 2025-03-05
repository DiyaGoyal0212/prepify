import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import your slice(s)

const store = configureStore({
  reducer: {
    user: userReducer, // Add your reducers here
  },
});

export default store;