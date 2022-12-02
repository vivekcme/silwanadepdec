import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../features/bookings/hotelSlice";
import flightReducer from "../features/bookings/flightSlice";
import transferReducer from "../features/bookings/transferSlice";
import carrentReducer from "../features/bookings/carrentSlice";
import visaReducer from "../features/bookings/visaSlice";
import insuranceReducer from "../features/bookings/insuranceSlice";
import sightReducer from "../features/bookings/sightSlice";
import allBookingReducer from "../features/allBookingSlice";
//
import userReducer from "../features/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    hotel: hotelReducer,
    flight: flightReducer,
    transfer: transferReducer,
    carrent: carrentReducer,
    visa: visaReducer,
    insurance: insuranceReducer,
    sight: sightReducer,
    allBookings: allBookingReducer,
  },
});
