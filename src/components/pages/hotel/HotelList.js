import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Lin,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  getCounts,
  getPriceLoading,
} from "../../../features/bookings/hotelSlice";
import { changeDateFormatter, diffDate } from "../../../helpers/helper";
import CancelPolicies from "../../UI/CancelPolicies";
import Ratings from "../../UI/Ratings";
import HotelListImages from "./HotelListImages";

const HotelList = ({ vals, priced ,hotelPrice}) => {
  const { name, rating, Hotel_Images, code,map, id ,address,TripAdvisorRating ,priceDatas} = vals;
  const [hotelData, setHotelData] = useState([]);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [queryData, setQueryData] = useState(
    Object.fromEntries([...searchParams])
  );

  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");

  const priceLoading = useSelector(getPriceLoading);
  const { adultsCount } = useSelector(getCounts);

  const getPrice = (code) => {
    let val = priced.filter((ele) => {
      return parseInt(ele.HotelCode) === parseInt(code);
    });
    val[0] !== undefined && setHotelData([...hotelData, val[0]]);
    val[0] !== undefined && setRooms([...rooms, val[0].Rooms[0]]);
  };

  React.useEffect(() => {
    setD1(queryData.checkIn);
    setD2(queryData.checkOut);
  }, [queryData]);

  React.useEffect(() => {
    getPrice(code);
  }, [code]);

  const handleNavigate = (id) => {
    queryData.hotelId = id;
    navigate({
      pathname: "/hotel-details",
      search: `${createSearchParams(queryData)}`,
    });
  };

  const mapHandler = (cor) => {
    var lat = cor.split("|")[0];
    var long = cor.split("|")[1];
    console.log("lat long" , lat , long);
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${long}&z=15`, '_blank');
  }


  return (
    <>
      <div className="hotel-listing-wrap">
        <div className="main ">
          <HotelListImages images={Hotel_Images} />
        </div>
   
        <div className="hotel-detail-lists">
          <h4>{name}</h4>
          <Ratings num={rating} />
          <p>{address}. <span onClick={()=>mapHandler(map)}> see on map</span></p>
         
          <div className="excellent d-flex align-items-center">
                                <div className="total-rating">{TripAdvisorRating} </div> 
                                <h6> Trip Advisor Rating </h6>
                            </div>
          {
          //   rooms[0] !== undefined && (
          //   <CancelPolicies vals={rooms[0].CancelPolicies} />
          // )
        }

        </div>
        {priceLoading ? (
          <div className="loader1 mt-5">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <div className="total-availabity ">

          {hotelData.length > 0 && rooms.length > 0 ? (

              <>
                <p className="g-text">
                  {diffDate(d2, d1)} nights, {adultsCount} adults
                </p>
                <h2>
                  <i className="fas fa-dollar-sign"></i>
                  {parseFloat(priceDatas).toFixed(2)}
                </h2>
                <p className="g-text">${rooms[0].TotalTax} taxes and charges</p>
                <button
                  onClick={() => handleNavigate(id)}
                  className="cmn-btn text-decoration-none"
                >
                  See Availabity
                </button>
              </>
            ) : (
              <button onClick={() => handleNavigate(id)} className="cmn-btn">
                No Rooms Availible
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HotelList;
