import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IBook {
  dateRange: number;
  genre: string;
  id: string | undefined;
}

const initialState: IBook = {
  dateRange: 2023,
  genre: '',
  id:'',
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
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    // removeBook: (state, action: PayloadAction<string>) => {
    //   const bookId = action.payload;
    // },
  },
});

export const {  setDateRange, setGenre, setId  } = bookSlice.actions;

export default bookSlice.reducer;
