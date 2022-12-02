import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mainAxios } from "../../app/api";
import service from "../../config.json";
import { diff_hours } from "../../helpers/helper";
const { getAllCars, carBook } = service;

const initialState = {
  carsList: [],
  loading: false,
  carBookingStatus: {},
};

export const fetchAllCarsAsync = createAsyncThunk(
  "carrent/fetchAllCarsAsync",
  async () => {
    try {
      const res = await mainAxios.post(getAllCars);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const carBookAsync = createAsyncThunk(
  "carrent/carBookAsync",
  async (state) => {
    let Token = JSON.parse(sessionStorage.getItem("userData"));

    let selectedCar = JSON.parse(sessionStorage.getItem("selectedCar"));
    let location = JSON.parse(sessionStorage.getItem("location"));
    let timings = JSON.parse(sessionStorage.getItem("timings"));

    const { Authorization } = state;

    let driver = state.state;
    let formData = new FormData();
    formData.append("driver_image", state.fileData, state.fileData.name);
    formData.append("car_id", selectedCar.id);
    formData.append("driver_name", driver.FirstName + " " + driver.LastName);
    formData.append("driver_contact", driver.MobileNo);
    formData.append("pickup_from", location.pickUp);
    formData.append("pickup_lattitude", location.latitude);
    formData.append("pickup_longtitude", location.longitude);
    formData.append("book_date", timings.pickupDate);
    formData.append("book_time", timings.pickupTime);
    formData.append("drop_date", timings.dropDate);
    formData.append("drop_time", timings.dropTime);
    formData.append(
      "total_payment",
      parseFloat(
        selectedCar.hourly_rate *
          diff_hours(
            new Date(timings.pickupDate + " " + timings.pickupTime),
            new Date(timings.dropDate + " " + timings.dropTime)
          )
      ).toFixed(2)
    );
    formData.append("payment", "d");

    try {
      const res = await mainAxios.post(carBook, formData, {
        headers: {
          Authorization,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const carrentSlice = createSlice({
  name: "carrent",
  initialState,
  reducers: {
    resetCarrentBooked: (state) => {
      state.carBookingStatus = {};
    },
  },
  extraReducers: {
    [fetchAllCarsAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchAllCarsAsync.fulfilled]: (state, { payload }) => {
      return { ...state, carsList: payload.data, loading: false };
    },
    [carBookAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [carBookAsync.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, carBookingStatus: payload.data };
    },
  },
});

export const getCarsList = (state) => {
  return state.carrent.carsList;
};

export const getLoading = (state) => {
  return state.carrent.loading;
};

export const getCarBookingStatus = (state) => {
  return state.carrent.carBookingStatus;
};

// Action creators are generated for each case reducer function
export const { resetCarrentBooked } = carrentSlice.actions;

export default carrentSlice.reducer;
