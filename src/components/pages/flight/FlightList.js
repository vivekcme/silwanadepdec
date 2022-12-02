import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FlightDetails from "./FlightDetails";
import LockPriceModal from "./LockPriceModal";

const FlightList = ({ val, ind }) => {
  const navigate = useNavigate();
  const [layovers, setLayovers] = React.useState([]);

  const { Segments, Fare, IsLcc } = val || {};

  const { AirlineDetails } = Segments[0][0] || {};

  const { pickUp, dropOff, tripType } =
    JSON.parse(sessionStorage.getItem("flightForm"))?.state || {};

  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (Segments[0].length > 1) {
      let arr = Segments[0].filter((ele, ind) => {
        return ind < Segments[0].length - 1;
      });
      setLayovers(arr);
    }
  }, [Segments[0]]);

  const handleFlightBooking = (e) => {
    sessionStorage.setItem("flightResultId", JSON.stringify(val.ResultId));
    navigate("/flight-details");
  };

  return (
    <>
      <div className="flight-listing-wrap">
        <div className="row align-items-center">
          {!IsLcc && (
            <span onClick={() => setShow(true)}>
              <i className="fa fa-lock px-2"></i>
              Lock The Price
            </span>
          )}

          <div className="col-lg-4 col-md-3 col-sm-12">
            <div className="flight-listing-inner">
              <div className="d-flex align-items-center gap-2">
                <img
                  src={`assets/AirlineLogo/${AirlineDetails.AirlineCode}.gif`}
                  style={{ height: "30px", width: "30px" }}
                  alt="err"
                />
                <h4 className="bold20">
                  {AirlineDetails.AirlineName} - {AirlineDetails?.FlightNumber}
                </h4>
              </div>

              <p className="medium14">
                {pickUp?.citycode} {pickUp?.cityname}, {pickUp?.countryname}
              </p>
              <h5 className="bold24">
                {Segments[0][0].DepartureTime.split("T")[1].split(":")[0]}:
                {Segments[0][0].DepartureTime.split("T")[1].split(":")[1]}
              </h5>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12">
            <div className="flight-listing-inner">
              <div className="">
                {layovers.map((ele, ind) => {
                  return (
                    <p key={ind} className="medium14">
                      {" "}
                      - {ele.Destination.AirportCode}{" "}
                      {ind === layovers.length - 1 && "-"}{" "}
                    </p>
                  );
                })}
              </div>
              <h5 className="semi16 ml-4">
                {}
                {Segments[0][Segments.length - 1]?.Duration.split(":")[0]}h{" "}
                {Segments[0][Segments.length - 1]?.Duration.split(":")[1]}m
              </h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12">
            <div className="flight-listing-inner">
              <p className="medium14">
                {dropOff?.citycode} {dropOff?.cityname}, {dropOff?.countryname}
              </p>
              <h5 className="bold24">
                {
                  Segments[0][Segments.length - 1]?.ArrivalTime.split(
                    "T"
                  )[1].split(":")[0]
                }
                :
                {
                  Segments[0][Segments.length - 1]?.ArrivalTime.split(
                    "T"
                  )[1].split(":")[1]
                }
              </h5>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12">
            <div className="flight-listing-inner">
              <div className="total-availabity" style={{ top: "0" }}>
                <h2>
                  <i className="fas fa-dollar-sign"></i>{" "}
                  {parseFloat(Fare.TotalFare).toFixed(2)}
                </h2>
                <button onClick={handleFlightBooking} className="cmn-btn">
                  Booking
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="flight-listing-main-details">
              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flight-detail${ind}`}
                    aria-expanded="true"
                    aria-controls="flight-detail1"
                  >
                    Flight Details
                  </button>
                </h2>
              </div>
            </div>
          </div>

          <LockPriceModal show={show} setShow={setShow} />
          {/*  */}

          <FlightDetails val={Segments[0]} ind={ind} layovers={layovers} />
        </div>
      </div>
    </>
  );
};

export default FlightList;
