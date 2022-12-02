import moment from "moment";
import React from "react";

const Layover = ({ time, city, code }) => {
  return (
    <h5 className="text-center mt-3 bg-success text-white w-100">
      {" "}
      ({code}) {city} {time.split(":")[0]}h : {time.split(":")[1]}m Layover
    </h5>
  );
};
const Segment = ({ val, ind }) => {
  const {
    Origin,
    Destination,
    AirlineDetails,
    CabinClass,
    Airline,
    FlightNumber,
    Craft,
    DepartureTime,
    ArrivalTime,
    IncludedBaggage,
    CabinBaggage,
    Duration,
    GroundTime,
  } = val || {};

  return (
    <>
      {ind > 0 && (
        <Layover
          time={GroundTime}
          code={Origin?.CityCode}
          city={Origin?.CityName}
        />
      )}

      <div className="row align-items-center">
        <div className="col-lg-12">
          <div className="ticket-details-main-title">
            <h4 className="bold20">
              {Origin?.CityName} - {Destination?.CityName}
            </h4>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <div className="flight-listing-inner">
            <img
              src={`assets/AirlineLogo/${AirlineDetails.AirlineCode}.gif`}
              style={{ height: "30px", width: "30px" }}
              alt="err"
            />
            <h4 className="bold20">{AirlineDetails?.AirlineName}</h4>
            <p className="medium16">{CabinClass}</p>
            <p className="medium16">
              {Airline} - {FlightNumber}
            </p>
            <p className="medium16">(Aircraft: {Craft})</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <div className="flight-listing-inner">
            <p className="medium16">
              {moment(DepartureTime).format("ddd MMM DD YYYY")}{" "}
            </p>
            <h4 className="bold20">
              {Origin?.AirportCode}{" "}
              <span className="medium20">
                {moment(DepartureTime).format("HH:MM")}
              </span>
            </h4>
            <p className="medium12">
              {Origin?.AirportName},{Origin?.CityName}, {Origin?.CountryName}{" "}
              (Terminal
              {" " + Origin?.Terminal})
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <div className="flight-listing-inner">
            <h5 className="bold20">
              {Duration.split(":")[0]}h {Duration.split(":")[1]}m
            </h5>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <div className="flight-listing-inner">
            <p className="medium16">
              {moment(ArrivalTime).format("ddd MMM DD YYYY")}{" "}
            </p>
            <h4 className="bold20">
              {Destination?.AirportCode}{" "}
              <span className="medium20">
                {moment(ArrivalTime).format("HH:MM")}
              </span>
            </h4>
            <p className="medium12">
              {Destination?.AirportName},{Destination?.CityName},{" "}
              {Destination?.CountryName} (Terminal
              {" " + Destination?.Terminal})
            </p>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="flight-listing-main-details">
            <div>
              <p className="medium14">
                {IncludedBaggage} Check-In{" "}
                {CabinBaggage !== "Included" && CabinBaggage + ", Cabin"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TicketDetails = ({ Result }) => {
  const { Segments } = Result?.[0] || {};
  return (
    <>
      <div className="review-booking-wrapper ticket-details-two-lists">
        {Segments?.[0]?.map((ele, ind) => {
          return <Segment key={ind} val={ele} ind={ind} />;
        })}
      </div>
    </>
  );
};

export default TicketDetails;
