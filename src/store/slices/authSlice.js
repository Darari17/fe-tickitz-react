// src/store/slices/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios.js";

const initialState = {
  isLogin: false,
  loading: false,
  error: null,
  user: null, // { id, email, role }
  token: null,
};

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data; // backend balikin { code, success, message, data: {...} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login gagal"
      );
    }
  }
);

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Register gagal"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      state.isLogin = payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      localStorage.removeItem("token");
    },
    setUserFromStorage: (state, { payload }) => {
      state.isLogin = true;
      if (payload.user) {
        state.user = payload.user;
      }
      state.token = payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLogin = true;

        const data = payload?.data || {};

        // mapping sesuai response backend (snake_case)
        state.user = {
          id: data.user_id || null,
          email: data.email || null,
          role: data.role || null,
        };
        state.token = data.token || null;

        if (data.token) {
          localStorage.setItem("token", data.token);
        } else {
          console.warn("⚠️ Token tidak ditemukan di response:", data);
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.isLogin = false; // setelah register, user tetap harus login manual
        state.user = null;
        state.token = null;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setLogin, logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
