import React from "react";
import { diffDate } from "../../../../helpers/helper";

const PaymentDetail = ({ formData, val, match }) => {
  const { checkOut, checkIn } = formData;

  return (
    <>
      <div className="price-summary-wrap">
        <ul>
          <h5 className="b-b-20">Price Summary</h5>
          <li>
            <p className="medium16">
              Room Charges ({diffDate(checkOut, checkIn)} Nights)
            </p>
            <p className="medium16">
              $ {parseFloat(match.TotalFare - match.TotalTax).toFixed(2)}
            </p>
          </li>
        </ul>
        <ul>
          <h5 className="b-b-16">+Taxes & Fees</h5>
          <li>
            <p className="medium16">Hotel Taxes</p>
            <p className="medium16">$ {match.TotalTax}</p>
          </li>
          <li>
            <p className="medium16">Service Fee</p>
            <p className="medium16">FREE</p>
          </li>
          <li>
            <p className="r-b-16">Total Amount to be Paid</p>
            <p className="r-b-16">$ {match.TotalFare}</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PaymentDetail;
