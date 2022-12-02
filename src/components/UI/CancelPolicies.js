import React from "react";
import { changeDateFormatter } from "../../helpers/helper";

const CancelPolicies = ({ vals }) => {
  const PercenTage = ({ val }) => {
    return (
      <p className="g-color">
        <img
          src="assets/images/green-check.svg"
          className="green-check"
          alt="green-check"
        />
        {val.CancellationCharge} % Deduction From
        {changeDateFormatter(val.FromDate.split(" ")[0])}
      </p>
    );
  };

  const Fixed = ({ val }) => {
    return (
      <p className="g-color">
        <img
          src="assets/images/green-check.svg"
          className="green-check"
          alt="green-check"
        />
        <i className="fas fa-dollar-sign"></i> {val.CancellationCharge}{" "}
        Cancellation Charge Applied Till{" "}
        {changeDateFormatter(val.FromDate.split(" ")[0])}
      </p>
    );
  };
  let prev = "";
  return (
    <>
      {vals?.map((ele, ind) => {
        if (ele?.Index !== undefined) {
          if (prev !== ele.Index) {
            prev = ele.Index;
            console.log(ele, "ele");
            if (ele.ChargeType === "Percentage") {
              return <PercenTage val={ele} key={ind} />;
            }
            if (ele.ChargeType === "Fixed") {
              return <Fixed val={ele} key={ind} />;
            }
            prev = ele.Index;
          }
          {
            /* ele.filter(
            (v, i, a) => a.findIndex((v2) => v2.Index === v.Index) === i
          );
          ele.forEach((ele) => {
            if (ele.ChargeType === "Percentage") {
              return <PercenTage val={ele} key={ind} />;
            }
            if (ele.ChargeType === "Fixed") {
              return <Fixed val={ele} key={ind} />;
            }
          }); */
          }
        } else {
          if (ele.ChargeType === "Percentage") {
            return <PercenTage val={ele} key={ind} />;
          }
          if (ele.ChargeType === "Fixed") {
            return <Fixed val={ele} key={ind} />;
          }
        }
      })}
    </>
  );
};

export default CancelPolicies;
