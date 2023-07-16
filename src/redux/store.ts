import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import bookReducer from './features/books/bookSlice';
import { api } from './api/apiSlice';
import userReducer from './features/user/userSlice';
import searchReducer from './features/books/searchSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    book: bookReducer,
    search: searchReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
