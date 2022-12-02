import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "./components/common/header/Header";
import Hotel from "./components/pages/hotel/Hotel";
import { getLogin, setUser } from "./features/userSlice";
import Intro from "./components/pages/Intro";
import More from "./components/pages/More";
import Footer from "./components/common/footer/Footer";
import HomePage from "./components/common/HomePage";
import HotelDetails from "./components/pages/hotel/hotelDetails/HotelDetails";
import { getLoading } from "./features/bookings/hotelSlice";
import HotelReview from "./components/pages/hotel/hotelReview/HotelReview";
import Transfer from "./components/pages/transfer/Transfer";
import TransferDetails from "./components/pages/transfer/transferDetails/TransferDetails";
import Carrent from "./components/pages/carrent/Carrent";
import CarrentDetails from "./components/pages/carrent/carrentDetails/CarrentDetails";
import Insurance from "./components/pages/insurance/Insurance";
import Visa from "./components/pages/visa/Visa";
import UploadDocument from "./components/pages/visa/UploadDocument";
import Trip from "./components/pages/mytrip/Trip";
import Loader from "./helpers/Loader";
import Flight from "./components/pages/flight/Flight";
import FLightPayment from "./components/pages/flight/flightDetails/FLightPayment";

const App = () => {
  const dispatch = useDispatch();

  let login = JSON.parse(sessionStorage.getItem("userData"));
  // useSelector(getLogin);
  let loading = useSelector(getLoading);

  const [hide, setHide] = useState(true);
  const [path, setPath] = useState("");

  useEffect(() => {
    const data = sessionStorage.getItem("userData");
    if (data) {
      dispatch(setUser(JSON.parse(data)));
    }
  }, []);

  useEffect(() => {
    if (login !== null) {
      if (Object.keys(login).length !== 0) {
        setHide(false);
      } else {
        setHide(true);
      }
    }
  }, [login]);

  // login = ["abc

  // useEffect(() => {
  //   // setPath(window.location.pathname);
  // }, [window.location.pathname]);

  if (loading) {
    <Loader />;
  }

  return (
    <>
      <Router>
        {/* {hide ? null : <Header />} */}
        <Header />
        <Routes>
          {/* {login?.length === 0 ? (
            <>
              <Route exact path="/" element={<HomePage />} /> */}
          {/* <Route exact path="/login" element={<Login />} />
              <Route path="/" element={<Login />} /> //login poge for no user */}
          {/* </> */}
          {/* ) : ( */}
          <>
            {/* <Route exact path="/hotel-listing" element={<Hotel />} /> */}
            <Route path="/hotel-listing" element={<Hotel />} />
            <Route path="/hotel-details" element={<HotelDetails />} />
            <Route path="/hotel-review" element={<HotelReview />} />
            {/*  */}
            <Route path="/flight-listing" element={<Flight />} />
            <Route path="/flight-details" element={<FLightPayment />} />
            {/* <Route path="/login" element={<Hotel />} /> homepage for / path */}
            <Route path="/transfer-listing" element={<Transfer />} />
            <Route path="/transfer-details" element={<TransferDetails />} />
            {/* <Route path="/loader" element={<Loader />} /> */}
            <Route path="/carrent-listing" element={<Carrent />} />
            <Route path="/carrent-details" element={<CarrentDetails />} />
            {/*  */}
            <Route path="/insurance" element={<Insurance />} />

            {/* {console.log("here")} */}
            <Route path="/visa" element={<Visa />} />
            <Route path="/visa-document" element={<UploadDocument />} />
            {/*  */}
            <Route path="/mytrip" element={<Trip />} />
            {[
              "/",
              "/hotel",
              "/visa",
              "/insurance",
              "/flight",
              "/transfer",
              "/carrent",
              "/sight",
            ].map((ele, ind) => {
              return (
                <Route key={ind} path={ele} exact element={<HomePage />} />
              );
            })}
          </>
          {/* )} */}
        </Routes>
        {!loading && <Footer />}

        {/* {hide ? null : <Footer />} */}
      </Router>
    </>
  );
};

export default App;
