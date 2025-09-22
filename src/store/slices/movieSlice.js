import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page = 1, search = "", genre = 0 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/movies", {
        params: { page, search, genre },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchGenres = createAsyncThunk(
  "movies/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/movies/genres");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/movies/upcoming", {
        params: { page },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/movies/popular", {
        params: { page },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/movies/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    meta: { page: 1, limit: 12, total: 0, total_pages: 0 },
    genres: [],
    upcoming: [],
    popular: [],
    movieDetails: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.movies = payload.movies;
        state.meta = payload.meta;
      })
      .addCase(fetchMovies.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(fetchGenres.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, { payload }) => {
        state.genres = payload;
      })
      .addCase(fetchGenres.rejected, (state, { payload }) => {
        state.error = payload;
      })

      .addCase(fetchUpcomingMovies.fulfilled, (state, { payload }) => {
        state.upcoming = payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, { payload }) => {
        state.error = payload;
      })

      .addCase(fetchPopularMovies.fulfilled, (state, { payload }) => {
        state.popular = payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, { payload }) => {
        state.error = payload;
      })

      .addCase(fetchMovieDetails.fulfilled, (state, { payload }) => {
        state.movieDetails = payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default moviesSlice.reducer;
