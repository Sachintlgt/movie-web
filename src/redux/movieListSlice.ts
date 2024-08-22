import { IMovie } from "@/interfaces/movie";
import { createSlice } from "@reduxjs/toolkit";
const initialState: IMovie[] = [];
const movieListSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {
    setMovieList: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMovieList } = movieListSlice.actions;

export default movieListSlice.reducer;
