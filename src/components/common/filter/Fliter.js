import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearFilterHandler,
  getHotelFilters,
  getHotelPriceFilters,
  removeHotelFilter,
  removeHotelPriceFilter,
} from "../../../features/bookings/hotelSlice";

const Fliter = ({ cityname}) => {
  const filters = useSelector(getHotelFilters);
  const Hotelfilters = useSelector(getHotelPriceFilters);
  const dispatch = useDispatch();
  return (
    <>
      <div aria-label="breadcrumb">
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Hotels in {cityname}
          </li>
        </ol>
      </div>

      <div className={`filter-wrap`}>
        <div className="filter-title">
          <h4>Applied Filters</h4>
          <span onClick={() => {
            dispatch(clearFilterHandler(true))
            }}>Clear</span>
        </div>

        <div className="filter-inner-wrap">
          <div className="applied-filter-wrap">
            {filters?.map((ele, ind) => {
              return (
                <span key={ind}>
                  {ele} Star
                  <img
                    src="assets/images/hotel/close.svg"
                    onClick={() => dispatch(removeHotelFilter(ele))}
                    alt="close"
                  />
                </span>
              );
            })}
            {Hotelfilters?.map((ele, ind) => {
              return (
                <span key={ind}>
                  {ele} 
                  <img
                    src="assets/images/hotel/close.svg"
                    onClick={() => dispatch(removeHotelPriceFilter(ele))}
                    alt="close"
                  />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Fliter;
