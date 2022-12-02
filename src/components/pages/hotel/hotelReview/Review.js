import React from "react";
import {
  changeDateFormatter,
  diffDate,
  getTwelveHourFormatTime,
} from "../../../../helpers/helper";
import CancelPolicies from "../../../UI/CancelPolicies";

const Review = ({ detail, formData, match }) => {
  const { Hotel_Images, name, address, checkintime, checkouttime } = detail;
  const { checkIn, checkOut, adults, childs, rooms } = formData;

  return (
    <>
      <div className="review-booking-wrapper">
        <div className="review-booking-rating hotel-detail-lists w-100">
          <div className="review-booking-img-wrap">
            {Hotel_Images?.length > 0 ? (
              <img src={Hotel_Images[0].image} alt="err" />
            ) : (
              <img src="assets/images/img-1.png" alt="err" />
            )}
          </div>
          <div>
            <div className="rating-box"></div>
            <div className="detail-main-title">
              <h4 className="me-3">{name}</h4>
            </div>
            <p className="text1">
              <img
                src="assets/images/marker.svg"
                className="marker-icon"
                alt="marker"
              />
              {address}
            </p>
          </div>
        </div>
        <div className="review-booking-rating light-bg booking-list d-block hotel-info-wrap">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="check-in-out-list">
                <ul>
                  <li>
                    <p className="medium14">Check In</p>
                  </li>
                  <li>
                    <p className="semi16">
                      {checkIn !== undefined && changeDateFormatter(checkIn)}{" "}
                    </p>
                  </li>
                  <li>
                    <p className="medium14">
                      {getTwelveHourFormatTime(checkintime)}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="check-in-out-list">
                <ul>
                  <li>
                    <p className="medium14">Check Out</p>
                  </li>
                  <li>
                    <p className="semi16">
                      {checkOut !== undefined && changeDateFormatter(checkOut)}
                    </p>
                  </li>
                  <li>
                    <p className="medium14">
                      {getTwelveHourFormatTime(checkouttime)}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="check-in-out-list">
                <ul>
                  <li>
                    <p className="medium14">Guests</p>
                  </li>
                  <li>
                    <p className="semi16">
                      {parseInt(adults) + parseInt(childs)} Guest | {rooms} Room
                    </p>
                  </li>
                  <li>
                    <p className="medium14">
                      {diffDate(checkOut, checkIn)} Nights
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="review-booking-rating booking-list d-block room-inclusions mb-0 p-0">
          <div className="room-inclusions-title">
            <div className="row light-bg">
              <div className="col-lg-8">
                <div className="check-in-out-list">
                  <ul>
                    <li>
                      <p className="semi16">
                        {rooms} Room, {match?.Name}
                      </p>
                    </li>
                    <li>
                      <p className="medium14">{adults} Adults</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="check-in-out-list"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="check-in-out-list">
                <ul>
                  <li>
                    <p className="semi16">Price Includes</p>
                  </li>
                  <li>
                    <p className="medium14">Rooms Only</p>
                  </li>

                  {match.CancelPolicies !== undefined && (
                    <CancelPolicies vals={match?.CancelPolicies} />
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
