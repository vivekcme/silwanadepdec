import React from "react";

const CarrentCancelled = ({ val }) => {
  return (
    <>
      <div className="booking-main-wrap">
        <div className="booking-wrap">
          <div>
            <div className="booking-icon-wrap">
              <img src="assets/images/car-icon.svg" alt="location" />
            </div>
          </div>
          <div className="booking-lists">
            <h5 className="b-b-20">{val.driver_name}</h5>
            <h6 className="b-medium-16">Booking Date : {val.book_date}</h6>
          </div>
        </div>
        <div className="cancelled-detail">
          <img src="assets/images/my-trip/cancelled.svg" alt="cancelled" />
        </div>
      </div>
    </>
  );
};

export default CarrentCancelled;
