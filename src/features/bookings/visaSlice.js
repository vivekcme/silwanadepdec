import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mainAxios } from "../../app/api";
import service from "../../config.json";
const { getVisa, applyVisa, myVisaBookings, addVisaDocument } = service;

const initialState = {
  visaTypes: [],
  loading: false,
  visaCount: 1,
  visaBookings: [],
  applyStatus: "",
  documentStatus: false,
};

export const fetchVisaAsync = createAsyncThunk(
  "visa/fetchVisaAsync",
  async () => {
    try {
      const res = await mainAxios.get(getVisa);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
// fetchMyVisaBookings
export const fetchMyVisaBookings = createAsyncThunk(
  "visa/fetchMyVisaBookings",
  async (Authorization) => {
    try {
      const res = await mainAxios.get(myVisaBookings, {
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

// applyVisaAsync
export const applyVisaAsync = createAsyncThunk(
  "visa/applyVisaAsync",
  async (state) => {
    // let User = JSON.parse(sessionStorage.getItem("userData"));
    const { travellers, total, selectedVisaType, User } = state;
    const { Authorization } = User;

    let visitors = [];
    travellers.forEach((ele) => {
      let Obj = {
        name: ele.FirstName,
        surname: ele.LastName,
        age: parseInt(ele.Age),
        gender: ele.Gender,
      };
      visitors.push(Obj);
    });
    try {
      const res = await mainAxios.post(
        applyVisa,
        {
          visa_masters_id: parseInt(selectedVisaType),
          paid_amount: total,
          visitors,
          name: User.firstName,
          contact_number: User.mobile,
          email: User.email,
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
    }
  }
);

// addVisaDocumentAsync
export const addVisaDocumentAsync = createAsyncThunk(
  "visa/addVisaDocumentAsync",
  async (state) => {
    const { Authorization } = state;
    const { photograph, passportFront, passportBack } = state.state;

    const { id } = state.state;

    let test = {
      passport_front: passportFront,
      passport_back: passportBack,
      photograph: photograph,
    };

    let formData = new FormData();

    Object.keys(test).map((key) => {
      if (test[key] !== undefined) {
        console.log("typeof", test[key]);
        formData.append(key, test[key], `${test[key]}.jpg`);
      }
    });

    formData.append("visa_booking_detail_id", id);
    try {
      const res = await mainAxios.post(addVisaDocument, formData, {
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

export const visaSlice = createSlice({
  name: "visa",
  initialState,
  reducers: {
    appendVisa: (state) => {
      state.visaCount += 1;
    },
    resetVisaStatus: (state) => {
      state.applyStatus = "";
    },
    resetUploadStatus: (state) => {
      state.documentStatus = false;
    },
    resetVisaBookings: (state) => {
      state.visaBookings = [];
    },
  },
  extraReducers: {
    [fetchVisaAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchVisaAsync.fulfilled]: (state, { payload }) => {
      return { ...state, visaTypes: payload.data, loading: false };
    },
    [applyVisaAsync.pending]: (state) => {
      return { ...state, loading: true, applyStatus: false };
    },
    [applyVisaAsync.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, applyStatus: payload.data };
    },
    [fetchMyVisaBookings.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchMyVisaBookings.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, visaBookings: payload.data };
    },
    [addVisaDocumentAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [addVisaDocumentAsync.fulfilled]: (state, { payload }) => {
      return { ...state, loading: false, documentStatus: payload.data };
    },
  },
});

export const getVisaTypes = (state) => {
  return state.visa.visaTypes;
};

export const getVisaCounts = (state) => {
  return state.visa.visaCount;
};

export const getApplyStatus = (state) => {
  return state.visa.applyStatus;
};

export const getVisaBookings = (state) => {
  return state.visa.visaBookings;
};

// Action creators are generated for each case reducer function
export const {
  appendVisa,
  resetVisaStatus,
  resetUploadStatus,
  resetVisaBookings,
} = visaSlice.actions;

export default visaSlice.reducer;
