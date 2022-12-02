import React from "react";

const TransferItem = ({
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
              <img src="assets/images/my-trip/flight.svg" alt="err" />
            </div>
          </div>
          <div className="booking-lists">
            <h5 className="b-b-20">{val.ConfirmationNo}</h5>
            <h6 className="b-medium-16">{val.booking_date}</h6>
          </div>
        </div>
        <div className="buttons-wrap">
          <span
            className="cancel-btn"
            onClick={() => {
              setShow(true);
              setModalData(val.ConfirmationNo);
              setDetailType("transfer");
            }}
          >
            detail
          </span>
          <span
            className="cancel-btn"
            onClick={() => {
              setShow(true);
              setModalData(val.ConfirmationNo);
              //   setDetailType("cancel");
              setDeleting("transfer");
            }}
          >
            Cancel Booking
          </span>
        </div>
      </div>
    </>
  );
};

export default TransferItem;
