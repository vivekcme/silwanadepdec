import React from "react";

const HotelCancelled = ({ val }) => {
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
            <h5 className="b-b-20">{val.Hotel_Master.name}</h5>
            <h6 className="b-medium-16">
              {val.from_date === null ? "No Dates" : val.from_date} -{" "}
              {val.to_date === null ? "No dates" : val.to_date}
            </h6>
          </div>
        </div>
        <div className="cancelled-detail">
          <img src="assets/images/my-trip/cancelled.svg" alt="cancelled" />
        </div>
      </div>
    </>
  );
};

export default HotelCancelled;
