import React from "react";
import { useSelector } from "react-redux";
import {
  getCounts,
  getFareQuote,
} from "../../../../features/bookings/flightSlice";

const PriceData = ({ Fare }) => {
  const { adultsCount, infantsCount, childsCount } = useSelector(getCounts);

  return (
    <div className="price-summary-wrap">
      <ul>
        <h5 className="b-b-20 mb-2">Price Summary</h5>
        <li>
          <p className="medium16">
            Travelers :{" "}
            {adultsCount > 1 ? `${adultsCount} Adults` : `${adultsCount} Adult`}{" "}
            {childsCount > 0 && `, ${childsCount} Childs`}{" "}
            {infantsCount > 0 && `, ${infantsCount} Infants`}
          </p>
        </li>
      </ul>
      <ul className="mt-4">
        <li>
          <p className="medium16">Base Fare</p>
          <p className="medium16">
            <i className="fa fa-dollar-sign"></i>{" "}
            {parseFloat(Fare?.BaseFare).toFixed(2)}
          </p>
        </li>
        <li>
          <p className="medium16">Fee & Surcharge </p>
          <p className="medium16">
            <i className="fa fa-dollar-sign"></i>{" "}
            {parseFloat(
              Fare?.Tax + Fare?.ServiceFee + Fare?.AgentMarkup
            ).toFixed(2)}
          </p>
        </li>
        <li>
          <p className="blue-b-16">Total Amount to be Paid</p>

          <p className="blue-b-16">
            <i className="fa fa-dollar-sign"></i>{" "}
            {parseFloat(
              Fare?.BaseFare + Fare?.Tax + Fare?.ServiceFee + Fare?.AgentMarkup
            ).toFixed(2)}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default PriceData;
