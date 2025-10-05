// features/adminMovies/adminMoviesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios.js";

// CREATE movie
export const createMovie = createAsyncThunk(
  "adminMovies/createMovie",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/admin/movies", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// GET all movies
export const getMovies = createAsyncThunk(
  "adminMovies/getMovies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/admin/movies");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// GET movie by ID
export const getMovieById = createAsyncThunk(
  "adminMovies/getMovieById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/admin/movies/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// UPDATE movie
export const updateMovie = createAsyncThunk(
  "adminMovies/updateMovie",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/admin/movies/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// DELETE movie
export const deleteMovie = createAsyncThunk(
  "adminMovies/deleteMovie",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/admin/movies/${id}`);
      return { id, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const adminMoviesSlice = createSlice({
  name: "adminMovies",
  initialState: {
    movies: [],
    movieDetail: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies.push(action.payload.data);
        state.message = action.payload.message;
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.data;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMovieById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetail = action.payload.data;
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data;
        state.movies = state.movies.map((m) =>
          m.id === updated.id ? updated : m
        );
        state.message = action.payload.message;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = state.movies.filter((m) => m.id !== action.payload.id);
        state.message = action.payload.message;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = adminMoviesSlice.actions;
export default adminMoviesSlice.reducer;
