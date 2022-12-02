import React from "react";
import { Link } from "react-router-dom";

const NoData = () => {
  return (
    <>
      <div className="col-lg-12">
        <div className="my-trip-wrap">
          <div className="my-trip-img-wrap">
            <img src="assets/images/my-trip/bag-boy.svg" alt="bag-boy" />
          </div>
          <div className="my-trip-text">
            <h4 className="b-b-24">
              Looks empty, you've no upcoming bookings.
            </h4>
            <p className="medium16">
              When you book a trip, you will see your itinerary here.
            </p>
            <Link to={"/"} className="cmn-btn">
              Start Booking Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoData;
