// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../lib/axios";

// // Ambil order history user dari backend
// export const fetchHistory = createAsyncThunk(
//   "history/fetchHistory",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get("/orders/history");
//       return res.data.data; // backend return array of orders
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to fetch history"
//       );
//     }
//   }
// );

// const initialState = {
//   orders: [],
//   status: "idle", // idle | loading | succeeded | failed
//   error: null,
// };

// const historySlice = createSlice({
//   name: "history",
//   initialState,
//   reducers: {
//     // kalau mau tambahin manual tanpa fetch ulang
//     addOrderToHistory: (state, action) => {
//       state.orders.push(action.payload);
//     },
//     resetHistory: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchHistory.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchHistory.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.orders = action.payload || [];
//       })
//       .addCase(fetchHistory.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { addOrderToHistory, resetHistory } = historySlice.actions;
// export default historySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { createOrder } from "./orderSlice"; // sinkron dengan orderSlice

// =========================
// Thunks
// =========================

// Ambil riwayat order user
export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders/history");
      return res.data.data; // backend return array of orders
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch history"
      );
    }
  }
);

// =========================
// Initial State
// =========================
const initialState = {
  orders: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

// =========================
// Slice
// =========================
const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    // Tambah manual tanpa fetch ulang
    addOrderToHistory: (state, action) => {
      // masukkan ke posisi pertama agar order terbaru tampil di atas
      state.orders.unshift(action.payload);
    },
    resetHistory: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // fetchHistory
      .addCase(fetchHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload || [];
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // otomatis tambahkan order baru setelah createOrder sukses
      .addCase(createOrder.fulfilled, (state, action) => {
        if (action.payload) {
          state.orders.unshift(action.payload);
        }
      });
  },
});

export const { addOrderToHistory, resetHistory } = historySlice.actions;
export default historySlice.reducer;
