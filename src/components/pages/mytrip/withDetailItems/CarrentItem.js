import React from "react";

const CarrentItem = ({
  val,
  setModalData,
  setDetailType,
  setShow,
  setDeleting,
}) => {
  return (
    <>
      <div className="booking-main-wrap">
        <div className="booking-wrap">
          <div>
            <div className="booking-icon-wrap">
              <img src="assets/images/car-icon.svg" alt="" />
            </div>
          </div>
          <div className="booking-lists">
            <h5>{val.carRent_master.name}</h5>
            <h5 className="b-b-20">{val.driver_name}</h5>
          </div>
        </div>
        <div className="buttons-wrap">
          <span
            className="cancel-btn"
            onClick={() => {
              setShow(true);
              setModalData(val);
              setDetailType("carrent");
            }}
          >
            Detail
          </span>
          <span
            className="cancel-btn"
            onClick={() => {
              setShow(true);
              setModalData(val.id);
              setDeleting("carrent");
            }}
            // onClick={
            //   () => cancelBookingModal("carrental", val.id)
            //   //cancelCarRental(val.id)
            // }
          >
            Cancel Booking
          </span>
        </div>
      </div>
    </>
  );
};

export default CarrentItem;
