import React from "react";
import { useSelector } from "react-redux";
import { getLoading } from "../../../../features/bookings/transferSlice";
import Loader from "../../../../helpers/Loader";
import DetailList from "./DetailList";
import JourneyDetails from "./JourneyDetails";
import TravellerDetail from "./TravellerDetail";

const TransferDetails = () => {
  const loading = useSelector(getLoading);
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <DetailList />
            <TravellerDetail />
          </div>
          <div className="col-lg-4">
            <JourneyDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferDetails;
