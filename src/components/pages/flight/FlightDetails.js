import moment from "moment";
import React from "react";

const FlightDetails = ({ val, ind }) => {
  const Layover = ({ time }) => {
    return (
      <div className="col-lg-12">
        <div className="text-center layover">
          <p className="bold16">
            {time.split(":")[0]}h : {time.split(":")[1]}m Layover
          </p>
        </div>
      </div>
    );
  };

  const Segment = ({ val, ind }) => {
    const {
      AirlineDetails,
      Origin,
      DepartureTime,
      Destination,
      ArrivalTime,
      Duration,
      IncludedBaggage,
    } = val || {};
    return (
      <>
        {ind > 0 && <Layover time={val.GroundTime} />}
        <div className="col-lg-3 col-md-3">
          <div className="flight-ticket-details">
            <img
              src={`assets/AirlineLogo/${AirlineDetails.AirlineCode}.gif`}
              style={{ height: "30px", width: "30px" }}
              alt="err"
            />
            <h4 className="bold20">{AirlineDetails.AirlineName}</h4>
            <h5 className="semi16">
              {AirlineDetails.AirlineCode} - {AirlineDetails.FlightNumber}
            </h5>
          </div>
        </div>
        <div className="col-lg-4 col-md-3">
          <div className="flight-ticket-details">
            <p className="bold16">
              {Origin.AirportCode}
              <br />
              {"  "}
              <span className="medium16">
                {/* {DepartureTime.split("T")[0]}{" "}
                {DepartureTime.split("T")[1].split(":")[0]}:
                {DepartureTime.split("T")[1].split(":")[1]} */}
                {moment(DepartureTime).format(`MMMM Do YYYY,HH:MM`)}
              </span>{" "}
            </p>

            <p className="medium12">
              {Origin.AirportName},{Origin.CityName},{Origin.CountryName}{" "}
            </p>
          </div>
        </div>
        <div className="col-lg-2 col-md-3">
          <div className="flight-ticket-details">
            <p className="bold16">
              {Duration.split(":")[0]}h {Duration.split(":")[1]}m
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-3">
          <div className="flight-ticket-details">
            <p className="bold16">
              {Destination.AirportCode} <br />
              <span className="medium16">
                {moment(ArrivalTime).format("MMMM Do YYYY, HH:MM")}
              </span>{" "}
            </p>
            <p className="medium12">
              {Destination.AirportName},{Destination.CityName},
              {Destination.CountryName}{" "}
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="flight-details-accordion">
          <div
            id={`flight-detail${ind}`}
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body p-0">
              <div className="row align-items-center">
                {val.map((ele, ind) => {
                  return (
                    <div key={ind}>
                      <Segment key={ind} val={ele} ind={ind} />
                    </div>
                  );
                })}
                {/*  */}
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightDetails;
