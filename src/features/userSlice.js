import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import service from "../config.json";
import { mainAxios } from "../app/api";
import { errorToast, successToast } from "../helpers/toaster";

const {
  userLogin,
  userRegister,
  resendOtp,
  varifyEmail,
  forgotPassword,
  varifyAndChange,
} = service;

const initialState = {
  userData: [],
  loading: false,
  errors: [],
  secret_key: "",
  resend: false,
  loginStatus: "",
  varified: "",
  forgotApproved: false,
  updatePassword: "",
};

const updateLocalStorage = (vals) => {
  vals.length > 0
    ? sessionStorage.setItem("userData", JSON.stringify(vals[0].data))
    : sessionStorage.setItem("userData", JSON.stringify(vals));
};

export const userLoginAsync = createAsyncThunk(
  "user/userLoginAsync",
  async ({ email, password }) => {
    try {
      const res = await mainAxios.post(userLogin, {
        email,
        password,
      });
      return res.data;
    } catch (err) {
      const { response } = err;
      return response.data;
    }
  }
);

export const resendOtpAsync = createAsyncThunk(
  "user/resendOtpAsync",
  async (state) => {
    try {
      const res = await mainAxios.post(resendOtp, { secret_key: state });
      return res.data;
    } catch (err) {
      console.log(err);
      const { response } = err;
      return response.data;
    }
  }
);

export const forgotPasswordAsync = createAsyncThunk(
  "user/forgotPasswordAsync",
  async (state) => {
    try {
      const res = await mainAxios.post(forgotPassword, { email: state });
      return res.data;
    } catch (err) {
      console.log(err);
      const { response } = err;
      return response.data;
    }
  }
);

export const varifyAndChangeAsync = createAsyncThunk(
  "user/varifyAndChangeAsync",
  async (state) => {
    const { password, otp, key } = state;
    try {
      const res = await mainAxios.post(varifyAndChange, {
        varify_code: otp,
        password: password,
        secret_key: key,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      const { response } = err;
      return response.data;
    }
  }
);

export const varifyEmailAsync = createAsyncThunk(
  "user/varifyEmailAsync",
  async ({ OTP, key }) => {
    try {
      const res = await mainAxios.post(varifyEmail, {
        varify_code: OTP,
        secret_key: key,
      });
      return res.data;
    } catch (err) {
      const { response } = err;
      return response.data;
    }
  }
);

export const userRegisterAsync = createAsyncThunk(
  "user/userRegisterAsync",
  async (state) => {
    const {
      firstName,
      lastName,
      dob,
      gender,
      email,
      mobile,
      nationality,
      countryCode,
      password,
    } = state;
    try {
      const res = await mainAxios.post(userRegister, {
        firstName,
        lastName,
        dob,
        gender,
        email,
        mobile,
        nationality,
        countryCode,
        password,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      const { response } = err;
      return response.data;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = [];
      state.errors = [];
      state.loginStatus = false;
      successToast("Logged Out Successfully!");
      updateLocalStorage([]);
    },
    setUser: (state, { payload }) => {
      state.userData = payload;
    },
    resetKey: (state) => {
      state.secret_key = "";
    },
    resetUpdatePassword: (state) => {
      state.updatePassword = "";
    },
    resetResend: (state) => {
      state.resend = false;
    },
    resetForgot: (state) => {
      state.forgotApproved = false;
    },
    resetVarified: (state) => {
      state.varified = false;
    },
    resetErrors: (state) => {
      state.errors = {};
    },
  },
  extraReducers: {
    [userLoginAsync.pending]: (state) => {
      return {
        ...state,
        loading: true,
        loginStatus: "",
        errors: [],
        varified: "",
      };
    },
    [userLoginAsync.fulfilled]: (state, { payload }) => {
      console.log(payload, "payload");
      if (payload.success === true) {
        updateLocalStorage([payload]);
        successToast(payload.message);
        return {
          ...state,
          userData: [payload],
          loginStatus: true,
          secret_key: "",
          loading: false,
        };
      } else {
        if (Object.keys(payload.data).length === 0) {
          errorToast(payload.message);
        }
        // else{
        return {
          ...state,
          errors: [payload],
          secret_key: payload.data,
          loginStatus: false,
          loading: false,
          varified: false,
        };
        // }
      }
    },
    [userRegisterAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [userRegisterAsync.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        successToast("User Registered Successfully!");
        return {
          ...state,
          secret_key: payload.data.secret_key,
          varified: false,
          loading: false,
        };
      } else {
        return { ...state, errors: payload, loading: false };
      }
    },
    [resendOtpAsync.pending]: (state) => {
      return { ...state, loading: true, resend: false };
    },
    [resendOtpAsync.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        successToast(payload.message);
        return {
          ...state,
          resend: true,
          loading: false,
        };
      } else {
        return { ...state, errors: payload, loading: false };
      }
    },
    [varifyEmailAsync.pending]: (state) => {
      return { ...state, loading: true };
    },
    [varifyEmailAsync.fulfilled]: (state, { payload }) => {
      console.log(payload);
      if (payload.success) {
        successToast("Logged In Successfully!");
        return {
          ...state,
          userData: [payload],
          loginStatus: true,
          secret_key: "",
          varified: true,
          loading: false,
        };
        // return {
        //   ...state,
        //   varified: true,
        //   secret_key: payload.data.secret_key,
        //   loading: false,
        // };
      } else {
        errorToast(payload.message);
        return {
          ...state,
          varified: false,
          errors: [payload],
          secret_key: payload.data.secret_key,
          loading: false,
        };
      }
    },
    [forgotPasswordAsync.pending]: (state) => {
      return { ...state, loading: true, forgotApproved: false };
    },
    [forgotPasswordAsync.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        return {
          ...state,
          forgotApproved: true,
          secret_key: payload.data.secret_key,
          loading: false,
        };
      } else {
        errorToast(payload.errors[0].msg);
        return {
          ...state,
          forgotApproved: false,
          errors: payload,
          loading: false,
        };
      }
    },
    [varifyAndChangeAsync.pending]: (state) => {
      return { ...state, loading: true, updatePassword: "" };
    },
    [varifyAndChangeAsync.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        return {
          ...state,
          updatePassword: true,
        };
      } else {
        errorToast(payload.message);
        return { ...state, updatePassword: false };
      }
    },
  },
});

export const getLogin = (state) => {
  if (state.user.userData !== undefined) {
    return state.user.userData;
  }
};

export const getUpdatePassword = (state) => {
  return state.user.updatePassword;
};

export const getKey = (state) => {
  return state.user.secret_key;
};

export const getRegisterErrors = (state) => {
  return state.user.errors;
};
// Action creators are generated for each case reducer function
export const {
  setUser,
  logout,
  resetKey,
  resetResend,
  resetUpdatePassword,
  resetForgot,
  resetVarified,
  resetErrors,
} = userSlice.actions;

export default userSlice.reducer;
