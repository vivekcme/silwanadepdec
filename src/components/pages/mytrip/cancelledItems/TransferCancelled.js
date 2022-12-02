import React from "react";

const TransferCancelled = ({ val }) => {
  return (
    <>
      <div className="booking-main-wrap">
        <div className="booking-wrap">
          <div>
            <div className="booking-icon-wrap">
              <img src="assets/images/my-trip/location.svg" alt="location" />
            </div>
          </div>
          <div className="booking-lists">
            <h5 className="b-b-20">{val.ConfirmationNo}</h5>
            <h6 className="b-medium-16">Booking Date : {val.booking_date}</h6>
          </div>
        </div>
        <div className="cancelled-detail">
          <img src="assets/images/my-trip/cancelled.svg" alt="cancelled" />
        </div>
      </div>
    </>
  );
};

export default TransferCancelled;
