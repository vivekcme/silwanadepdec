import React from "react";
import {
  calculateTranferTime,
  TranferDateFormatter,
} from "../../../../helpers/helper";

const JourneyDetails = () => {
  // const [returnJourney, setReturnJourney] = React.useState({});
  const roundTrip = JSON.parse(sessionStorage.getItem("roundTrip"));

  const Departure = JSON.parse(sessionStorage.getItem("departure"));

  const returnVal = JSON.parse(sessionStorage.getItem("return"));

  // React.useEffect(() => {
  //   if (returnVal !== null) {
  //     console.log("now", returnVal);
  //     // setReturnJourney(returnVal.returnJourney);
  //   }
  // }, [returnVal]);

  const transferDetail = JSON.parse(sessionStorage.getItem("transferSelected"));

  const returnDetail = JSON.parse(sessionStorage.getItem("returnSelected"));

  function addAmt(p1, p2) {
    return parseFloat(p1 + p2).toFixed(2);
  }

  return (
    <>
      <div className="price-summary-wrap pick-up">
        <ul className="mb-0">
          <h5 className="b-b-20">
            {roundTrip ? "Onward Journey" : "Pick-up and drop-off"}{" "}
          </h5>
          <li className="d-block">
            <img src="assets/images/airport.svg" />
            <div>
              <p className="g-text">
                {" "}
                {TranferDateFormatter(
                  Departure.TransferDate.split("T")[0]
                )} · {Departure.TransferTime}
              </p>
              <p className="r-b-16">{Departure.PickUp.locationName}</p>
            </div>
          </li>
          <li className="d-block">
            <img src="assets/images/hotel-location.svg" />
            <div>
              <p className="g-text">
                {TranferDateFormatter(Departure.TransferDate.split("T")[0])} ·
                {calculateTranferTime(
                  Departure.TransferTime,
                  transferDetail.JourneyDetail.ApproximateTransferTime
                )}
              </p>
              <p className="r-b-16">{Departure.DropOff.locationName}</p>
            </div>
          </li>
        </ul>
      </div>
      {roundTrip === true && (
        <div className="price-summary-wrap pick-up">
          <ul>
            <h5 className="b-b-20">Return Journey</h5>
            <li className="d-block">
              <p className="g-text">
                {" "}
                {TranferDateFormatter(
                  returnVal.returnJourney.TransferDate.split("T")[0]
                )}{" "}
                · {returnVal.returnJourney.TransferTime}
              </p>
              <p className="r-b-16">
                {returnVal.returnJourney.PickUp.locationName}
              </p>
            </li>
            <li className="d-block">
              <p className="g-text">
                {TranferDateFormatter(
                  returnVal.returnJourney.TransferDate.split("T")[0]
                )}{" "}
                ·
                {calculateTranferTime(
                  returnVal.returnJourney.TransferTime,
                  returnDetail.JourneyDetail.ApproximateTransferTime
                )}
              </p>
              <p className="r-b-16">
                {returnVal.returnJourney.DropOff.locationName}
              </p>
            </li>
          </ul>
        </div>
      )}
      <div className="price-summary-wrap">
        <ul className="p-0 mb-0">
          <li>
            <p>Onward Journey</p>
            <p>
              <i className="fa fa-dollar-sign"></i>
              {parseFloat(transferDetail.Vehicles[0].Price.TotalPrice).toFixed(
                2
              )}
            </p>
          </li>
          {roundTrip && (
            <li>
              <p>Return Journey</p>
              <p>
                <i className="fa fa-dollar-sign"></i>
                {parseFloat(returnDetail.Vehicles[0].Price.TotalPrice).toFixed(
                  2
                )}
              </p>
            </li>
          )}

          {!roundTrip && (
            <li>
              <p className="blue-b-20">Total Amount</p>
              <p className="blue-b-20">
                <i className="fa fa-dollar-sign"></i>
                {parseFloat(
                  transferDetail.Vehicles[0].Price.TotalPrice
                ).toFixed(2)}{" "}
              </p>
            </li>
          )}
          {roundTrip && (
            <li>
              <p className="blue-b-20">Total Amount</p>
              <p className="blue-b-20">
                <i className="fa fa-dollar-sign"></i>
                {addAmt(
                  transferDetail.Vehicles[0].Price.TotalPrice,
                  returnDetail.Vehicles[0].Price.TotalPrice
                )}{" "}
              </p>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default JourneyDetails;
