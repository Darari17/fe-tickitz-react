import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { createOrder } from "./orderSlice";

export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders/history");
      return res.data.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch history"
      );
    }
  }
);

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addOrderToHistory: (state, action) => {
      if (action.payload) {
        state.orders.unshift(action.payload);
      }
    },
    resetHistory: () => initialState,
  },
  extraReducers: (builder) => {
    builder

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

      .addCase(createOrder.fulfilled, (state, action) => {
        if (action.payload) {
          state.orders.unshift(action.payload);
        }
        state.status = "idle";
      });
  },
});

export const { addOrderToHistory, resetHistory } = historySlice.actions;
export default historySlice.reducer;
