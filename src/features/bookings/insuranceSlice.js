import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mainAxios } from "../../app/api";
import service from "../../config.json";
const { addInsurance, getInsurance } = service;

const initialState = {
  insuranceStatus: "",
  passengersCount: 1,
  insuranceList: [],
  loading: false,
};

export const addInsuranceAsync = createAsyncThunk(
  "insurance/addInsuranceAsync",
  async (state) => {
    const {
      Title,
      FirstName,
      LastName,
      Country,
      StartDate,
      EndDate,
      MobileNo,
      CountryCode,
    } = state.state;
    const { passengers, Authorization } = state;
    let arr = [];

    passengers.map((ele) => {
      arr.push({ age: ele.Age, pre_disease: ele.Disease });
    });

    let Token = JSON.parse(sessionStorage.getItem("userData"));
    try {
      const res = await mainAxios.post(
        addInsurance,
        {
          nameTitle: Title,
          firstName: FirstName,
          lastName: LastName,
          travel_country: Country,
          start_date: StartDate,
          end_date: EndDate,
          totalPerson: state.passengers.length,
          country_code: CountryCode,
          mobile: MobileNo,
          passangers: arr,
        },
        {
          headers: {
            Authorization,
          },
        }
      ); //the api name later
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// fetchMyInsurance;
export const fetchMyInsurance = createAsyncThunk(
  "insurance/fetchMyInsurance",
  async (Authorization) => {
    try {
      const res = await mainAxios.get(getInsurance, {
        headers: {
          Authorization,
        },
      }); //the api name later
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const insuranceSlice = createSlice({
  name: "insurance",
  initialState,
  reducers: {
    increment: (state) => {
      state.passengersCount += 1;
    },
    decrement: (state) => {
      state.passengersCount -= 1;
    },
    resetInsuranceStaus: (state) => {
      state.insuranceStatus = "";
    },
    setPassengerCount: (state, { payload }) => {
      state.passengersCount = parseInt(payload);
    },
  },
  extraReducers: {
    [addInsuranceAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [addInsuranceAsync.fulfilled]: (state, { payload }) => {
      return { ...state, insuranceStatus: payload.success, loading: false };
    },
    [fetchMyInsurance.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchMyInsurance.fulfilled]: (state, { payload }) => {
      return { ...state, insuranceList: payload.data, loading: false };
    },
  },
});

export const getPassengersCount = (state) => {
  return state.insurance.passengersCount;
};

export const getInsuranceList = (state) => {
  return state.insurance.insuranceList;
};

// Action creators are generated for each case reducer function
export const { increment, decrement, resetInsuranceStaus, setPassengerCount } =
  insuranceSlice.actions;

export default insuranceSlice.reducer;
