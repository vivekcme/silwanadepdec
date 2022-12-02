import React from "react";
import {
  changeDateFormatter,
  diff_hours,
  timeConvert,
} from "../../../../helpers/helper";

const Price = () => {
  const selectedCar = JSON.parse(sessionStorage.getItem("selectedCar"));

  const timings = JSON.parse(sessionStorage.getItem("timings"));
  const location = JSON.parse(sessionStorage.getItem("location"));

  return (
    <>
      <div className="col-lg-4">
        <div className="price-summary-wrap pick-up">
          <ul>
            <h5 className="b-b-20">Pick-up and drop-off</h5>
            <li className="d-block">
              <p className="r-b-16">{location.pickUp}</p>
              <p className="g-text">
                {" "}
                {changeDateFormatter(timings.pickupDate)}·{" "}
                {timeConvert(timings.pickupTime)}
              </p>
            </li>
            <li className="d-block">
              <p className="r-b-16">{location.pickUp}</p>
              <p className="g-text">
                {" "}
                {changeDateFormatter(timings.dropDate)} ·{" "}
                {timeConvert(timings.dropTime)}
              </p>
            </li>
          </ul>
        </div>
        <div className="price-summary-wrap">
          <ul>
            <li>
              <p className="blue-b-20">Total Amount </p>
              <p className="blue-b-20">
                <i className="fa fa-dollar-sign"> </i>
                {/* {timeDiffrence(
                  timings.pickupDate + " " + timings.pickupTime,
                  timings.dropDate + " " + timings.dropTime
                )} */}
                {parseFloat(
                  selectedCar.hourly_rate *
                    diff_hours(
                      new Date(timings.pickupDate + " " + timings.pickupTime),
                      new Date(timings.dropDate + " " + timings.dropTime)
                    )
                ).toFixed(2)}{" "}
              </p>
            </li>
            <li>
              <p className="medium16">
                Price For{" "}
                {diff_hours(
                  new Date(timings.pickupDate + " " + timings.pickupTime),
                  new Date(timings.dropDate + " " + timings.dropTime)
                )}{" "}
                Hours
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Price;
