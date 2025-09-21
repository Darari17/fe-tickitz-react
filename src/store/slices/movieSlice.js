import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios"; // sesuaikan dengan path axiosInstance Anda

// =================== Thunks ===================

// Ambil semua movies (support page, search, genre)
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page = 1, search = "", genre = 0 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/movies", {
        params: { page, search, genre },
      });
      // BE format: { movies: [...], meta: {...} }
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Ambil semua genre dari MovieRepository endpoint: /movies/genres
export const fetchGenres = createAsyncThunk(
  "movies/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/movies/genres");
      return res.data.data; // array genre [{id, name}, ...]
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Upcoming movies
export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/movies/upcoming", {
        params: { page },
      });
      return res.data.data; // array movie
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Popular movies
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/movies/popular", {
        params: { page },
      });
      return res.data.data; // array movie
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Detail movie
export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/movies/${id}`);
      return res.data.data; // single movie detail
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =================== Slice ===================
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [], // daftar film (list page/search/filter)
    meta: { page: 1, limit: 12, total: 0, total_pages: 0 }, // info pagination
    genres: [], // semua genre
    upcoming: [], // upcoming movies
    popular: [], // popular movies
    movieDetails: null, // detail movie
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Movies
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

      // Fetch Genres
      .addCase(fetchGenres.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, { payload }) => {
        state.genres = payload;
      })
      .addCase(fetchGenres.rejected, (state, { payload }) => {
        state.error = payload;
      })

      // Upcoming
      .addCase(fetchUpcomingMovies.fulfilled, (state, { payload }) => {
        state.upcoming = payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, { payload }) => {
        state.error = payload;
      })

      // Popular
      .addCase(fetchPopularMovies.fulfilled, (state, { payload }) => {
        state.popular = payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, { payload }) => {
        state.error = payload;
      })

      // Detail
      .addCase(fetchMovieDetails.fulfilled, (state, { payload }) => {
        state.movieDetails = payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default moviesSlice.reducer;
