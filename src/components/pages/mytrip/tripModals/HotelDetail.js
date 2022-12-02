import React from "react";
import { TranferDateFormatter } from "../../../../helpers/helper";

const HotelDetail = ({ hotel }) => {
  return (
    <>
      <form className=" hotel-booking-details-modal">
        <div className="form-title">
          <h2>Hotel Booking Details</h2>
        </div>

        <div className="hotel-details-modal-inner">
          <h6>Hotel Details</h6>

          <div>
            <p>{hotel.Hotel_Master.name}</p>
          </div>
        </div>

        <div className="hotel-details-modal-inner">
          <h6>Traveller Detail</h6>

          <div>
            <div className="hotel-booking-number">
              <h5>Booking Number:</h5>
              <h6>{hotel.booking_number}</h6>
            </div>

            <div>
              <h5>Date</h5>
              <h6>
                {hotel.from_date !== null &&
                  TranferDateFormatter(hotel.from_date)}{" "}
                to{" "}
                {hotel.from_date !== null &&
                  TranferDateFormatter(hotel.to_date)}
              </h6>
            </div>

            <div>
              <h5>Phone Number</h5>
              <h6>{hotel.phonenumber}</h6>
            </div>

            <div>
              <h5>Email</h5>
              <h6>{hotel.email}</h6>
            </div>

            <div>
              <h5>Total Travellers</h5>
              <h6>{hotel.total_rooms}</h6>
            </div>

            <div>
              <h5>Total Price</h5>
              <h6>
                <i className="fa fa-dollar-sign"></i> {hotel.total_fare}
              </h6>
            </div>
          </div>
        </div>

        <div></div>
      </form>
    </>
  );
};

export default HotelDetail;
