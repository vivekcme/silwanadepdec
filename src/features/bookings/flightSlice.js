import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpStatusCode from "axios";
import { mainAxios } from "../../app/api";
import service from "../../config.json";
import { errorToast } from "../../helpers/toaster";
const {
  fetchAirports,
  flightSearch,
  flightFareRule,
  flightFareQuote,
  flightBook,
} = service;

const initialState = {
  flightSearched: [],
  loading: false,
  adultsCount: 1,
  childsCount: 0,
  infantsCount: 0,
  airList: [],
  fareRule: [],
  fareQuote: [],
  BookingStatus: [],
};

export const fetchAirportsAsync = createAsyncThunk(
  "flight/fetchAirportsAsync",
  async (name) => {
    try {
      // console.log(mainAxios)
      const res = await mainAxios.get(fetchAirports.concat(`/${name}`));
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const flightSearchAsync = createAsyncThunk(
  "flight/flightSearchAsync",
  async (val) => {
    if (val.state.ReturnDate === "") {
      delete val.state["ReturnDate"];
    }
    const { adultsCount, childsCount, infantsCount, travelClass, tripType } =
      val;
    const { pickUp, dropOff, DepartureDate } = val.state;

    let Segment = [
      {
        Origin: pickUp.airportcode,
        Destination: dropOff.airportcode,
        PreferredDepartureTime: new Date(DepartureDate)
          .toISOString()
          .split(".")[0],
        PreferredArrivalTime: "2022-12-28T00:00:00",
      },
    ];
    if (tripType === "2") {
      Segment.push({
        Origin: dropOff.airportcode,
        Destination: pickUp.airportcode,
        PreferredDepartureTime: new Date(DepartureDate)
          .toISOString()
          .split(".")[0],
        PreferredArrivalTime: "2022-12-28T00:00:00",
      });
    }

    try {
      const res = await mainAxios.post(flightSearch, {
        EndUserBrowserAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36",
        JourneyType: parseInt(tripType),
        AdultCount: adultsCount,
        ChildCount: childsCount,
        InfantCount: infantsCount,
        FlightCabinClass: parseInt(travelClass),
        DirectFlight: false,
        Segment: Segment,
      });
      return res.data;
    } catch (err) {
      console.log(err, "in back");
      return err.data;
    }
  }
);

// flightFareRuleAsync=
export const flightFareRuleAsync = createAsyncThunk(
  "flight/flightFareRuleAsync",
  async (state) => {
    try {
      const { TokenId, TrackingId, ResultId } = state;
      let EndUserBrowserAgent =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36";
      const res = await mainAxios.post(flightFareRule, {
        TokenId,
        TrackingId,
        ResultId,
        EndUserBrowserAgent,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const flightFareQuoteAsync = createAsyncThunk(
  "flight/flightFareQuoteAsync",
  async (state) => {
    try {
      const { TrackingId, ResultId } = state;
      let EndUserBrowserAgent =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36";
      const res = await mainAxios.post(flightFareQuote, {
        TrackingId,
        ResultId,
        EndUserBrowserAgent,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// flightBookAsync
export const flightBookAsync = createAsyncThunk(
  "flight/flightBookAsync",
  async (val) => {
    const { TrackingId, ResultId, TokenId, state, guests } = val;
    let Passenger = [];
    guests.map((ele, ind) => {
      Passenger.push({
        Title: ele.Title,
        FirstName: ele.FirstName,
        LastName: ele.LastName,
        IsLeadPax: ind === 1,
        Type: ele.PassengerType,
        AddressLine1: state.Address,
        AddressLine2: state.Address,
        Email: state.Email,
        Mobile1: state.MobileNo,
        Mobile1CountryCode: state.CountryCode,
        Mobile2: null,
        DateOfBirth: new Date(state.Dob).toISOString().split(".")[0],
        Type: ele.PassengerType,
      });
    });
    try {
      const res = await mainAxios.post(flightBook, {
        //
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    adultInc: (state) => {
      state.adultsCount = state.adultsCount + 1;
    },
    childInc: (state) => {
      state.childsCount = state.childsCount + 1;
    },
    infantInc: (state) => {
      state.infantsCount = state.infantsCount + 1;
    },
    adultDec: (state) => {
      state.adultsCount = state.adultsCount - 1;
    },
    childDec: (state) => {
      state.childsCount = state.childsCount - 1;
    },
    infantDec: (state) => {
      state.infantsCount = state.infantsCount - 1;
    },
    setFlightCounts: (state, { payload }) => {
      const { adultsCount, childsCount, infantsCount } = payload;
      state.adultsCount = adultsCount;
      state.childsCount = childsCount;
      state.infantsCount = infantsCount;
      // state;
    },
  },
  extraReducers: {
    [fetchAirportsAsync.pending]: (state) => {
      return { ...state };
    },
    [fetchAirportsAsync.fulfilled]: (state, { payload }) => {
      return { ...state, airList: payload.data, loading: false };
    },
    [flightSearchAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [flightSearchAsync.fulfilled]: (state, { payload }) => {
      return { ...state, flightSearched: payload.data, loading: false };
    },
    [flightFareRuleAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [flightFareRuleAsync.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, fareRule: payload.data };
    },
    [flightFareQuoteAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [flightFareQuoteAsync.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, fareQuote: payload.data };
    },
    [flightBookAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [flightBookAsync.fulfilled]: (state, { payload }) => {
      if (payload?.success) {
        return { ...state, loading: false, BookingStatus: payload.data };
      } else {
        errorToast(payload?.message);
        return { ...state, loading: false };
      }
    },
  },
});

export const getLoading = (state) => {
  return state.flight.loading;
};

export const getCounts = (state) => {
  const { adultsCount, childsCount, infantsCount } = state.flight;
  return { adultsCount, childsCount, infantsCount };
};

export const getAirportsList = (state) => {
  return state.flight.airList;
};

export const getFlightSearched = (state) => {
  return state.flight.flightSearched;
};

export const getFareRules = (state) => {
  if (state.flight.fareRule?.FareRules !== undefined) {
    return state.flight.fareRule?.FareRules[0][0].FareRuleDetail;
  }
  // return state.flight.fareRule?.FareRules[0][0].FareRuleDetail;
};

export const getFareQuote = (state) => {
  return state.flight.fareQuote;
};

// Action creators are generated for each case reducer function
export const {
  adultInc,
  childDec,
  childInc,
  adultDec,
  infantDec,
  infantInc,
  setFlightCounts,
} = flightSlice.actions;

export default flightSlice.reducer;
