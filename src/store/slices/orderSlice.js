import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

// =========================
// Thunks
// =========================

// Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/orders", orderData);
      // backend balikin { code, success, data: { order_id, qr_code, seats } }
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal membuat order"
      );
    }
  }
);

// Fetch Schedules
export const fetchSchedules = createAsyncThunk(
  "order/fetchSchedules",
  async (movieId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders/schedules", {
        params: { movie_id: movieId },
      });
      return res.data.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch schedules"
      );
    }
  }
);

// Fetch Locations
export const fetchLocations = createAsyncThunk(
  "order/fetchLocations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders/locations");
      return res.data.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch locations"
      );
    }
  }
);

// Fetch Times
export const fetchTimes = createAsyncThunk(
  "order/fetchTimes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders/times");
      return res.data.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch times"
      );
    }
  }
);

// Fetch Payments
export const fetchPayments = createAsyncThunk(
  "order/fetchPayments",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders/payments");
      return res.data.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch payments"
      );
    }
  }
);

// Fetch Cinemas
export const fetchCinemas = createAsyncThunk(
  "order/fetchCinemas",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/orders/cinemas");
      return res.data.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch cinemas"
      );
    }
  }
);

// =========================
// Initial State
// =========================
const initialState = {
  selectedMovie: null,
  schedules: [],
  locations: [],
  times: [],
  payments: [],
  cinemas: [],
  selectedSeats: [],
  date: "",
  timeId: null,
  locationId: null,
  cinema: null,
  scheduleId: null,
  lastOrder: null,
  loading: false,
  error: null,
};

// =========================
// Slice
// =========================
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setTime: (state, action) => {
      state.timeId = action.payload;
    },
    setLocation: (state, action) => {
      state.locationId = action.payload;
    },
    setCinema: (state, action) => {
      state.cinema = action.payload;
    },
    setSelectedSeats: (state, action) => {
      state.selectedSeats = action.payload;
    },
    setScheduleId: (state, action) => {
      state.scheduleId = action.payload;
    },
    resetOrder: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.lastOrder = action.payload; // langsung ambil { order_id, qr_code, seats }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchSchedules
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.schedules = action.payload;
      })
      // fetchLocations
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
      })
      // fetchTimes
      .addCase(fetchTimes.fulfilled, (state, action) => {
        state.times = action.payload;
      })
      // fetchPayments
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.payments = action.payload;
      })
      // fetchCinemas
      .addCase(fetchCinemas.fulfilled, (state, action) => {
        state.cinemas = action.payload;
      });
  },
});

// =========================
// Exports
// =========================
export const {
  setSelectedMovie,
  setDate,
  setTime,
  setLocation,
  setCinema,
  setSelectedSeats,
  setScheduleId,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
