import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  flightFareQuoteAsync,
  flightFareRuleAsync,
  getFareQuote,
  getFareRules,
  getLoading,
} from "../../../../features/bookings/flightSlice";
import Loader from "../../../../helpers/Loader";
import FlightGuestForm from "./FlightGuestForm";
import PriceData from "./PriceData";
import TicketDetails from "./TicketDetails";

const FLightPayment = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const flightTrackingToken = JSON.parse(
    sessionStorage.getItem("flightTrackingToken")
  );

  const flightResultId = JSON.parse(sessionStorage.getItem("flightResultId"));

  const fareRules = useSelector(getFareRules);

  useEffect(() => {
    dispatch(
      flightFareRuleAsync({
        ResultId: flightResultId,
        TokenId: flightTrackingToken.flightTokenId,
        TrackingId: flightTrackingToken.flightTrackingId,
      })
    );
    dispatch(
      flightFareQuoteAsync({
        ResultId: flightResultId,
        TrackingId: flightTrackingToken.flightTrackingId,
      })
    );
  }, []);

  const fareQuote = useSelector(getFareQuote);

  const { Result } = fareQuote || {};

  const { Fare } = Result?.[0] || {};

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="review-booking ticket-details-main-section">
      <div className="container">
        <div className="row">
          <div>
            <h3 className="title">Ticket Details</h3>
          </div>
          <div className="col-lg-8">
            <TicketDetails Result={Result} />

            <div className="">
              <div className="room-inclusions-title">
                <div className="row l-pink-bg">
                  <div className="col-lg-12">
                    <div className="title-1">
                      <h5 className="b-b-16">Important Information</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="check-in-out-list">
                    {fareRules !== undefined && (
                      <div
                        dangerouslySetInnerHTML={{ __html: fareRules }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="title">Guest Details</h3>
            </div>

            <FlightGuestForm />
          </div>

          <div className="col-lg-4">
            <PriceData Fare={Fare} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FLightPayment;
