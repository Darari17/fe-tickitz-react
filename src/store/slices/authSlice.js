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
      return response.data;
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
      localStorage.removeItem("user");
    },
    setUserFromStorage: (state, { payload }) => {
      const token = payload?.token || localStorage.getItem("token");
      const user =
        payload?.user || JSON.parse(localStorage.getItem("user") || "null");

      if (token && user) {
        state.isLogin = true;
        state.token = token;
        state.user = user;
      }
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

        const userData = payload?.data || {};

        state.user = {
          id: userData.user_id || null,
          email: userData.email || null,
          role: userData.role || null,
        };
        state.token = userData.token || null;

        if (state.token) {
          localStorage.setItem("token", state.token);
        }
        if (state.user) {
          localStorage.setItem("user", JSON.stringify(state.user));
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
        state.isLogin = false;
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
