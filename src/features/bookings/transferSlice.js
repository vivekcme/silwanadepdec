import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mainAxios } from "../../app/api";
import service from "../../config.json";
const {
  getSignature,
  getAirHotelData,
  transferSearch,
  transferSearchReturn,
  transferBook,
  transferReturnBook,
} = service;

const initialState = {
  transferBookings: [],
  travellersCount: 1,
  loading: false,
  signature: "",
  listData: "",
  searchedTransfers: [],
  bookingStatus: {},
};

export const setSignature = createAsyncThunk(
  "transfer/setSignature",
  async () => {
    try {
      const res = await mainAxios.get(getSignature);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchAirHotelData = createAsyncThunk(
  "transfer/fetchAirHotelData",
  async (state) => {
    try {
      const res = await mainAxios.post(getAirHotelData, state);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// transferSearchAsync
export const transferSearchAsync = createAsyncThunk(
  "transfer/transferSearchAsync",
  async (state) => {
    try {
      const { signatureData, depature } = state;
      const { timestamp, token } = signatureData;

      const res = await mainAxios.post(
        transferSearch,
        {
          Departure: depature,
        },
        {
          headers: {
            Timestamp: timestamp,
            signature: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// transferSearchReturnAsync
export const transferSearchReturnAsync = createAsyncThunk(
  "transfer/transferSearchReturnAsync",
  async (state) => {
    const { depature, returnJourney, signatureData } = state;

    const { timestamp, token } = signatureData;

    try {
      const res = await mainAxios.post(
        transferSearchReturn,
        {
          Departure: depature,
          Return: returnJourney,
        },
        {
          headers: {
            Timestamp: timestamp,
            signature: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// transferSearchReturnAsync
export const transferBookAsync = createAsyncThunk(
  "transfer/transferBookAsync",
  async (state) => {
    let Transfer = {};
    const { Vehicles, JourneyDetail } = state.BookingData;
    let { Title, FirstName, LastName, Email, MobileNo, CountryCode } =
      state.state;
    MobileNo = MobileNo.concat(CountryCode);

    const { timestamp, token } = state.signatureData;
    const { Authorization } = state;
    Transfer.Vehicle = Vehicles[0];
    Transfer.Vehicle.VehicleCount = 1;
    Transfer.JourneyDetail = JourneyDetail;

    Transfer.JourneyDetail.PickupDescription = state.state.AirlineCode;
    Transfer.JourneyDetail.DropoffDescription = `${state.state.HotelAddress} - ${state.state.HotelCode}`;

    const PassengerDetails = { Title, FirstName, LastName, Email, MobileNo };

    const TrackingId = state.TrackingId;

    try {
      const res = await mainAxios.post(
        transferBook,
        {
          Transfer,
          PassengerDetails,
          TrackingId,
        },
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

// transferReturnBookAsync
export const transferReturnBookAsync = createAsyncThunk(
  "transfer/transferReturnBookAsync",
  async (state) => {
    let Transfer = {};
    const { Vehicles, JourneyDetail } = state.BookingData;
    const { Title, FirstName, LastName, Email, MobileNo } = state.state;

    const { timestamp, token } = state.signatureData;
    const { Authorization } = state;

    //Transfer
    Transfer.Vehicle = Vehicles[0];
    Transfer.Vehicle.VehicleCount = 1;
    Transfer.JourneyDetail = JourneyDetail;

    Transfer.JourneyDetail.PickupDescription = state.state.AirlineCode;
    Transfer.JourneyDetail.DropoffDescription = `${state.state.HotelAddress} - ${state.state.HotelCode}`;

    //return transfer
    let ReturnTransfer = {};
    ReturnTransfer.Vehicle = state.returnData.Vehicles[0];
    ReturnTransfer.Vehicle.VehicleCount = 1;
    ReturnTransfer.JourneyDetail = state.returnData.JourneyDetail;

    //remaining
    ReturnTransfer.JourneyDetail.PickupDescription = `${state.state.HotelAddress} - ${state.state.HotelCode}`;
    ReturnTransfer.JourneyDetail.DropoffDescription = "AL-123";
    // state.state.AirlineCode;

    const PassengerDetails = { Title, FirstName, LastName, Email, MobileNo };

    const TrackingId = state.TrackingId;

    console.log("here");

    try {
      const res = await mainAxios.post(
        transferReturnBook,
        {
          Transfer,
          PassengerDetails,
          TrackingId,
          ReturnTransfer,
        },
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

export const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    incCount: (state) => {
      state.travellersCount = state.travellersCount + 1;
    },
    decCount: (state) => {
      state.travellersCount = state.travellersCount - 1;
    },
    setTravellersCount: (state, { payload }) => {
      state.travellersCount = parseInt(payload);
    },
    resetTransferBooked: (state) => {
      state.bookingStatus = {};
    },
    resetListData: (state) => {
      state.listData = [];
    },
  },
  extraReducers: {
    [setSignature.fulfilled]: (state, { payload }) => {
      sessionStorage.setItem("signatureData", JSON.stringify(payload.data));
      return { ...state, signature: payload.data };
    },
    [fetchAirHotelData.fulfilled]: (state, { payload }) => {
      return { ...state, listData: payload.data };
    },
    [transferSearchAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [transferSearchAsync.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, searchedTransfers: payload.data };
    },
    [transferSearchReturnAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [transferSearchReturnAsync.fulfilled]: (state, { payload }) => {
      if (payload !== undefined) {
        return { ...state, loading: false, searchedTransfers: payload.data };
      }
    },
    [transferBookAsync.pending]: (state) => {
      return { ...state, loading: true, bookingStatus: {} };
    },
    [transferBookAsync.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, bookingStatus: payload.data };
    },
    [transferReturnBookAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [transferReturnBookAsync.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, bookingStatus: payload.data };
    },
  },
});

export const getTravellers = (state) => {
  return state.transfer.travellersCount;
};

export const getListData = (state) => {
  return state.transfer.listData;
};

export const getSearchedTransfers = (state) => {
  return state.transfer.searchedTransfers;
};

export const getLoading = (state) => {
  return state.transfer.loading;
};

export const getSignatureData = (state) => {
  return state.transfer.signature;
};

export const getBookingStatus = (state) => {
  return state.transfer.bookingStatus;
};

// Action creators are generated for each case reducer function
export const {
  incCount,
  decCount,
  setTravellersCount,
  resetTransferBooked,
  resetListData,
} = transferSlice.actions;

export default transferSlice.reducer;
