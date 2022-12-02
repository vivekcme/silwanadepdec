import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mainAxios } from "../../app/api";
import service from "../../config.json";
import { errorToast } from "../../helpers/toaster";
const {
  getCities,
  hotelSearch,
  hotelSearchPrice,
  hotelDetails,
  hotelBook,
  selectRoom,
  getCountries,
} = service;
// console.log(getCities);

const initialState = {
  hotelCities: [],
  searchedHotels: [],
  hotelsPrice: [],
  singleHotelData: {},
  loading: false,
  adultsCount: 1,
  roomsCount: 1,
  childsCount: 0,
  childAge: "0",
  priceLoading: false,
  noRooms: false,
  bookingStatus: "",
  hotelFilters: [],
  hotelPriceFilter:[],
  
};

export const fetchCitiesAsync = createAsyncThunk(
  "hotel/fetchCitiesAsync",
  async (state) => {
    try {
      const res = await mainAxios.get(getCities.concat(`/${state}`));
      return res?.data;
    } catch (err) {
      console.log(err);
    }
  }
);

// hotelSearchAsync
export const hotelSearchAsync = createAsyncThunk(
  "hotel/hotelSearchAsync",
  async (state) => {
    const {
      adults,
      childs,
      city,
      checkIn,
      checkOut,
      rooms,
      childAge,
      Nationality,
    } = state;
    try {
      const res = await mainAxios.post(hotelSearch, {
        childAge,
        adults,
        childs,
        cityCode: city,
        checkIn,
        checkOut,
        nationality: Nationality,
        rooms,
      });
      return res?.data;
    } catch (err) {
      errorToast(err.errors[0]["msg"]);
      console.log(err);
    }
  }
);

//fetchHotelSearchPrice;
export const fetchHotelSearchPrice = createAsyncThunk(
  "hotel/fetchHotelSearchPrice",
  async (state) => {
    const {
      adults,
      childs,
      city,
      checkIn,
      checkOut,
      rooms,
      childAge,
      Nationality,
    } = state;
    try {
      const res = await mainAxios.post(hotelSearchPrice, {
        childAge,
        adults,
        childs,
        cityCode: city,
        checkIn,
        checkOut,
        rooms,
        nationality: Nationality,
      });
      return res.data;
    } catch (err) {
      return err?.response?.data;
    }
  }
);

// fetchSingleHotelData
export const fetchSingleHotelData = createAsyncThunk(
  "hotel/fetchSingleHotelData",
  async (state) => {
    const {
      adults,
      childs,
      city,
      checkIn,
      checkOut,
      rooms,
      childAge,
      hotelId,
      Nationality,
    } = state;
    try {
      const res = await mainAxios.post(hotelDetails, {
        childAge,
        adults,
        childs,
        cityCode: city,
        checkIn,
        checkOut,
        rooms: rooms,
        hotelId,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      // return err.response.data;
    }
  }
);

// state, customers
export const hotelBookAsync = createAsyncThunk(
  "hotel/hotelBookAsync",
  async (val) => {
    const { Authorization, Obj, rooms, adults, childs  } = val;

    const { state, customers } = Obj;

    const { BookingCode, TotalFare, hotelId, CountryCode, MobileNo, Email } =
      state;

    customers.forEach((ele) => {
      delete ele.FirstNameErr;
      delete ele.LastNameErr;
      delete ele.TitleErr;
    });

    const PhoneNumber = CountryCode.concat(MobileNo);

    try {
      const res = await mainAxios.post(
        hotelBook,
        {
          BookingCode,
          CustomerDetails: [{ CustomerNames: customers }],
          TotalFare,
          EmailId: Email,
          PhoneNumber,
          hotelId,
          rooms,
          adults,
          childs,
        },
        {
          headers: {
            Authorization,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  }
);

export const getCountriesAsync = createAsyncThunk(
  "hotel/getCountriesAsync",
  async () => {
    try {
      const res = await mainAxios.get(getCountries);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

// selectHotelRoomAsync
export const selectHotelRoomAsync = createAsyncThunk(
  "hotel/selectHotelRoomAsync",
  async (state) => {
    const { code, Authorization } = state;
    // const Token = JSON.parse(localStorage.getItem("userData"));
    try {
      const res = await mainAxios.post(
        selectRoom,
        {
          BookingCode: code,
        },
        {
          headers: {
            Authorization,
          },
        }
      );
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    adultInc: (state) => {
      state.adultsCount = state.adultsCount + 1;
    },
    roomInc: (state) => {
      state.roomsCount = state.roomsCount + 1;
    },
    childInc: (state) => {
      state.childsCount = state.childsCount + 1;
    },
    adultDec: (state) => {
      state.adultsCount = state.adultsCount - 1;
    },
    roomDec: (state) => {
      state.roomsCount = state.roomsCount - 1;
    },
    childDec: (state) => {
      state.childsCount = state.childsCount - 1;
    },
    resetBooked: (state) => {
      state.bookingStatus = "";
    },
    resetCounts: (state) => {
      state.adultsCount = 1;
      state.childsCount = 0;
      state.roomsCount = 1;
    },
    setCounts: (state, { payload }) => {
      const { adults, childs, rooms, childAge } = payload;
      state.adultsCount = parseInt(adults);
      state.childsCount = parseInt(childs);
      state.roomsCount = parseInt(rooms);

      state.childAge = childAge;
    },
    resetPriceLoading: (state) => {
      state.priceLoading = false;
      state.noRooms = true;
    },
    setPriceLoading: (state, { payload }) => {
      state.priceLoading = payload;
    },
    setHotelFilters: (state, { payload }) => {
      state.hotelFilters = payload;
    },
    setHotelPriceFilter:(state,{payload})=>{
      state.hotelPriceFilter = payload
    },
    removeHotelFilter: (state, { payload }) => {
      if (payload === "all") {
        state.hotelFilters = [];
      } else {
        state.hotelFilters = state.hotelFilters.filter(
          (ele) => ele !== payload
        );
      }
    },
    removeHotelPriceFilter: (state, { payload }) => {
      if (payload === "all") {
        state.hotelPriceFilter = [];
      } else {
        state.hotelPriceFilter = state.hotelPriceFilter.filter(
          (ele) => ele !== payload
        );
      }
    },

    clearFilterHandler: (state, { payload }) => {
      state.hotelPriceFilter = [];
      state.hotelFilters = [];
      state.clearFilter = payload;     
    },
  },
  extraReducers: {
    [fetchCitiesAsync.fulfilled]: (state, { payload }) => {
      return { ...state, hotelCities: payload.data, loading: false };
    },
    [hotelSearchAsync.pending]: (state) => {
      return { ...state, loading: true };
    },

    [hotelSearchAsync.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        return { ...state, searchedHotels: payload?.data };
      } else {
        errorToast(payload.message);
        return { ...state, loading: false };
      }
    },
    // [hotelSearchAsync.fulfilled]: (state, { payload }) => {
    //   if (payload?.data !== undefined) {
    //     return { ...state, searchedHotels: payload?.data };
    //   }
    // },
    [fetchHotelSearchPrice.pending]: (state) => {
      return {
        ...state,
        priceLoading: true,
        hotelsPrice: [],
        noRooms: false,
      };
    },
    [fetchHotelSearchPrice.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        return {
          ...state,
          priceLoading: false,
          hotelsPrice: payload.data,
          loading: false,
        };
      } else {
        return {
          ...state,
          noRooms: true,
          priceLoading: false,
          hotelsPrice: [],
          loading: false,
        };
      }
    },
    [fetchSingleHotelData.pending]: (state) => {
      return { ...state, loading: true };
    },

    [fetchSingleHotelData.fulfilled]: (state, { payload }) => {
      if (payload?.success) {
        return { ...state, loading: false, singleHotelData: payload.data };
      } else {
        errorToast(payload.message);
        return { ...state, loading: false };
      }
    },


    // [fetchSingleHotelData.fulfilled]: (state, { payload }) => {
    //   return { ...state, loading: false, singleHotelData: payload.data };
    // },
    [hotelBookAsync.pending]: (state) => {
      return { ...state, loading: true, bookingStatus: "" };
    },
    [hotelBookAsync.fulfilled]: (state, { payload }) => {
      if (payload?.success) {
        return { ...state, loading: false, bookingStatus: "Booked" };
      } else {
        errorToast(payload.message);
        return {
          ...state,
          loading: false,
          bookingStatus: "Not Booked",
        };
      }
    },
    [selectHotelRoomAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [selectHotelRoomAsync.fulfilled]: (state, { payload }) => {
      if (payload?.success) {
        return { ...state, loading: false };
      } else {
        errorToast(payload.message);
        return { ...state, loading: false };
      }
      // return { ...state, loading: false };
    },
    [getCountriesAsync.pending]: (state) => {
      return { ...state };
    },
    [getCountriesAsync.fulfilled]: (state, { payload }) => {
      return { ...state, countryList: payload.data };
    },
  },
});

export const getLoading = (state) => {
  return state.hotel.loading;
};

export const getNoRooms = (state) => {
  return state.hotel.noRooms;
};

export const getHotelCities = (state) => {
  return state.hotel.hotelCities;
};

export const getCounts = (state) => {
  const { adultsCount, roomsCount, childsCount, childAge } = state.hotel;
  return { adultsCount, roomsCount, childsCount, childAge };
};

export const getHotelSearched = (state) => {
  return state.hotel.searchedHotels;
};

export const getPriceLoading = (state) => {
  return state.hotel.priceLoading;
};

export const getSingleHotelData = (state) => {
  return state.hotel.singleHotelData;
};

export const getRoomBooked = (state) => {
  return state.hotel.bookingStatus;
};

export const getHotelFilters = (state) => {
  return state.hotel.hotelFilters;
};


export const getHotelPriceFilters = (state) => {
  return state.hotel.hotelPriceFilter;
};

export const getClearFilters = (state) => {
  return state.hotel.clearFilter;
};

export const getCountryList = (state) => {
  return state.hotel.countryList;
};



// Action creators are generated for each case reducer function
export const {
  adultInc,
  roomInc,
  childInc,
  adultDec,
  roomDec,
  childDec,
  setCounts,
  setHotelFilters,
  resetBooked,
  resetCounts,
  removeHotelFilter,
  removeHotelPriceFilter,
  resetPriceLoading,
  clearFilterHandler,
  setPriceLoading,
  setHotelPriceFilter,

} = hotelSlice.actions;

export default hotelSlice.reducer;
