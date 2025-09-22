import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance, uploadInstance } from "../../lib/axios";

const initialState = {
  loading: false,
  error: null,
  profile: null,
};

export const getUser = createAsyncThunk(
  "profile/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Gagal mengambil profil"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (data.firstName) formData.append("firstname", data.firstName);
      if (data.lastName) formData.append("lastname", data.lastName);
      if (data.phoneNumber) formData.append("phone_number", data.phoneNumber);
      if (data.avatar) formData.append("avatar", data.avatar);

      const response = await uploadInstance.patch("/profile", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Gagal update profil"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("old_password", data.oldPassword);
      formData.append("new_password", data.newPassword);
      formData.append("confirm_password", data.confirmPassword);

      const response = await uploadInstance.patch(
        "/profile/change-password",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Gagal ganti password"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = { ...state.profile, ...action.payload.data };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
