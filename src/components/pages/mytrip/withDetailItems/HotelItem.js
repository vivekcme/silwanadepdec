import React from "react";

const HotelItem = ({
  val,
  setShow,
  setModalData,
  setDetailType,
  setDeleting,
}) => {
  return (
    <>
      <div className="booking-main-wrap">
        <div className="booking-wrap">
          <div>
            <div className="booking-icon-wrap">
              <img src="assets/images/my-trip/location.svg" alt="" />
            </div>
          </div>
          <div className="booking-lists">
            <h5 className="b-b-20"> {val.Hotel_Master.name}</h5>
            <h6 className="b-medium-16">
              {val.from_date === null ? "No Dates" : val.from_date} -{" "}
              {val.to_date === null ? "No dates" : val.to_date}
            </h6>
          </div>
        </div>
        <div className="buttons-wrap">
          <span
            className="cancel-btn"
            onClick={() => {
              setShow(true);
              setModalData(val);
              setDetailType("hotel");
            }}
          >
            detail
          </span>
          <span
            className="cancel-btn"
            onClick={() => {
              setShow(true);
              setModalData(val.booking_number);
              // setDetailType("cancel");
              setDeleting("hotel");
            }}
          >
            Cancel Booking
          </span>
        </div>
      </div>
    </>
  );
};

export default HotelItem;
