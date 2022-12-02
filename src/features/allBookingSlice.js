import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mainAxios } from "../app/api";
import service from "../config.json";
const {
  getHotelBookings,
  getCarrentBookings,
  getTransferBookings,
  getSignature,
  singleTransferDetail,
  cancelHotelBooking,
  cancelTransferBooking,
  cancelCarrentBooking,
} = service;

const initialState = {
  hotelBookings: [],
  transferBookings: [],
  carrentBookings: [],
  singleBookingDetail: {},
  cancelStatus: false,
  signatureData: {},
};

export const fetchAllMyBookings = createAsyncThunk(
  "user/fetchAllMyBookings",
  async (Authorization) => {
    try {
      const res = await Promise.all([
        mainAxios.get(getHotelBookings, {
          headers: {
            Authorization,
          },
        }),
        mainAxios.get(getCarrentBookings, {
          headers: {
            Authorization,
          },
        }),
        mainAxios.get(getTransferBookings, {
          headers: {
            Authorization,
          },
        }),
        mainAxios.get(getSignature),
      ]);

      let obj = {
        hotelBookings: res[0].data.data,
        transferBookings: res[2].data.data,
        carrentBookings: res[1].data.data,
        signatureData: res[3].data.data,
      };

      return obj;
    } catch (err) {
      const { response } = err;
      return response.data;
    }
  }
);

export const getBookingDetail = createAsyncThunk(
  "transfer/getBookingDetail",
  async (state) => {
    const { ConfirmationNo, Authorization, timestamp, token } = state;
    try {
      const res = await mainAxios.get(
        singleTransferDetail.concat(`/${ConfirmationNo}`),
        {
          headers: {
            Timestamp: timestamp,
            signature: token,
            Authorization,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const hotelBookingCancelAsync = createAsyncThunk(
  "transfer/hotelBookingCancelAsync",
  async (state) => {
    const { Authorization, id } = state;

    try {
      const res = await mainAxios.post(
        cancelHotelBooking,
        { BookingCode: id },
        {
          headers: {
            Authorization,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
// transferBookingCancelAsync
export const transferBookingCancelAsync = createAsyncThunk(
  "transfer/transferBookingCancelAsync",
  async (state) => {
    try {
      const { timestamp, token, id, Authorization } = state;

      const res = await mainAxios.get(cancelTransferBooking.concat(`/${id}`), {
        headers: {
          Timestamp: timestamp,
          signature: token,
          Authorization,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// carrentBookingCancelAsync
export const carrentBookingCancelAsync = createAsyncThunk(
  "transfer/carrentBookingCancelAsync",
  async (state) => {
    const { id, Authorization } = state;
    try {
      const res = await mainAxios.get(cancelCarrentBooking.concat(`/${id}`), {
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

export const allBookingSlice = createSlice({
  name: "allBookings",
  initialState,
  reducers: {
    resetCancelStatus: (state) => {
      state.cancelStatus = false;
    },
  },
  extraReducers: {
    [fetchAllMyBookings.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchAllMyBookings.fulfilled]: (state, { payload }) => {
      const {
        hotelBookings,
        carrentBookings,
        transferBookings,
        signatureData,
      } = payload;
      sessionStorage.setItem("signatureData", JSON.stringify(signatureData));
      return {
        ...state,
        loading: false,
        hotelBookings,
        carrentBookings,
        transferBookings,
      };
    },
    [getBookingDetail.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, singleBookingDetail: payload.data[0] };
    },
    [hotelBookingCancelAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [hotelBookingCancelAsync.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, cancelStatus: payload.success };
    },
    [transferBookingCancelAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [transferBookingCancelAsync.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, cancelStatus: payload.success };
    },
    [carrentBookingCancelAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [carrentBookingCancelAsync.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, cancelStatus: payload.success };
    },
  },
});

export const getTripLoading = (state) => {
  return state.allBookings.loading;
};

export const hotelBookingList = (state) => {
  return state.allBookings.hotelBookings;
};

export const transferBookingList = (state) => {
  return state.allBookings.transferBookings;
};

export const carrentBookingList = (state) => {
  return state.allBookings.carrentBookings;
};

export const getSingleTransferDetails = (state) => {
  return state.allBookings.singleBookingDetail;
};

export const getCancelStatus = (state) => {
  return state.allBookings.cancelStatus;
};

// Action creators are generated for each case reducer function
export const { resetCancelStatus } = allBookingSlice.actions;

export default allBookingSlice.reducer;
