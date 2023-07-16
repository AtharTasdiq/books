import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IBook {
  status: boolean;
  dateRange: number;
  genre:string;
}

const initialState: IBook = {
  status: false,
  dateRange: 2023,
  genre: '',
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },

    setDateRange: (state, action: PayloadAction<number>) => {
      state.dateRange = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },

  },
});

export const { toggleState, setDateRange, setGenre } = bookSlice.actions;

export default bookSlice.reducer;
