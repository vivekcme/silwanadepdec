import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  flightSearchAsync,
  getFlightSearched,
  getLoading,
} from "../../../features/bookings/flightSlice";
import Loader from "../../../helpers/Loader";
import StarRating from "../../common/filter/StarRating";
import Fliter from "../../common/filter/Fliter";
import FlightList from "./FlightList";

const Flight = () => {
  const loading = useSelector(getLoading);
  const flightSearched = useSelector(getFlightSearched);

  const dispatch = useDispatch();

  useEffect(() => {
    const flightForm = JSON.parse(sessionStorage.getItem("flightForm"));
    const {
      state,
      adultsCount,
      childsCount,
      infantsCount,
      travelClass,
      tripType,
    } = flightForm || {};

    flightSearched.length === 0 &&
      dispatch(
        flightSearchAsync({
          state,
          adultsCount,
          childsCount,
          infantsCount,
          travelClass,
          tripType,
        })
      );
  }, [flightSearched]);

  useEffect(() => {
    sessionStorage.setItem(
      "flightTrackingToken",
      JSON.stringify({
        flightTokenId: flightSearched.TokenId,
        flightTrackingId: flightSearched.TrackingId,
      })
    );
  }, [flightSearched]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <section className="hotel-listing-main">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <Fliter />
                <StarRating />
              </div>
              <div className="col-lg-9 mt-4">
                {flightSearched?.Results?.length > 0 &&
                  flightSearched?.Results[0].map((ele, ind) => {
                    return <FlightList val={ele} ind={ind} key={ind} />;
                  })}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default Flight;
