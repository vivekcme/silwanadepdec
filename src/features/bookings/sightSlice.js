import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mainAxios } from "../../app/api";

const initialState = {
  sightBookings: [],
  loading: false,
};

export const fetchDataAsync = createAsyncThunk(
  "sight/fetchDataAsync",
  async () => {
    try {
      const res = await mainAxios.get("later"); //the api name later
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const sightSlice = createSlice({
  name: "sight",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDataAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchDataAsync.fulfilled]: (state, { payload }) => {
      return { ...state, sightBookings: payload, loading: false };
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = sightSlice.actions;

export default sightSlice.reducer;
