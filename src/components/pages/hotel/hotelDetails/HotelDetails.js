import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchHotelSearchPrice,
  getSingleHotelData,
  getHotelSearched,
  fetchSingleHotelData,
  hotelSearchAsync,
  getLoading,
} from "../../../../features/bookings/hotelSlice";
import Loader from "../../../../helpers/Loader";
import Title from "./title/Title";
import TabWrapper from "./TabWrapper";
import Location from "./location/Location";
import AllAminities from "./AllAminities";
import SelectRoom from "./rooms/SelectRoom";

const HotelDetails = () => {
  const dispatch = useDispatch();
  const hotelSearched = useSelector(getHotelSearched);
  const singleData = useSelector(getSingleHotelData);
  const loading = useSelector(getLoading);

  const [searchParams] = useSearchParams();

  const [queryData, setQueryData] = useState(
    Object.fromEntries([...searchParams])
  );
  const [val, setVal] = useState([]);

  useEffect(() => {
    if (singleData !== "") {
      setVal(singleData);
      sessionStorage.setItem("hotelDetails", JSON.stringify(singleData));
      sessionStorage.setItem("hotelForm", JSON.stringify(queryData));
    }
  }, [singleData]);

  useEffect(() => {
    dispatch(fetchSingleHotelData(queryData));
  }, [queryData, hotelSearched]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="hotel-detail">
        <div className="container my-4">
          <div className="row">
            <Title vals={val} />
            {/*  */}
            <TabWrapper vals={val} />
            {/*  */}
            <Location vals={val} />
            {val?.pricedata !== undefined && (
              <SelectRoom rooms={val?.pricedata[0]?.Rooms} />
            )}
            <AllAminities vals={val} />
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelDetails;
