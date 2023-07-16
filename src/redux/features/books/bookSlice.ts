import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IBook {
  dateRange: number;
  genre:string;
}

const initialState: IBook = {
  dateRange: 2023,
  genre: '',
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {

    setDateRange: (state, action: PayloadAction<number>) => {
      state.dateRange = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },

  },
});

export const {  setDateRange, setGenre } = bookSlice.actions;

export default bookSlice.reducer;
