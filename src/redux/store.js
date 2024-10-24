import { configureStore } from '@reduxjs/toolkit';
import {
  profileReducer,
  subscriptionReducer,
  userReducer,
} from './reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';
import { otherReducer } from './reducers/otherReducer';

// Create the store with all the reducers
const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
    other: otherReducer,
  },
  // Optional: You can add middleware or dev tools configuration here if needed
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;

// Define server URL as an environment variable or fallback to local/production URL
export const server =
  process.env.REACT_APP_API_URL || 'https://coursebundler-backend-xaie.onrender.com/api/v1';
