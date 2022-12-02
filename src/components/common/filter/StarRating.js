import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHotelFilters,
  resetLoading,
  setHotelFilters,
  setPriceLoading,
} from "../../../features/bookings/hotelSlice";
import Loader from "../../../helpers/Loader";

const StarRating = () => {
  // const state = [];
  const vals = useSelector(getHotelFilters);
  const [changing, setChanging] = React.useState(false);
  const [state, setState] = React.useState(vals);
  const dispatch = useDispatch();

  const handleCheckBoxChange = (e) => {
   
    setChanging(true);
    // dispatch(setPriceLoading(true));
    const value = parseInt(e.target.value);
    setTimeout(() => {
      if (state.includes(value)) {
        setState(state.filter((ele) => ele !== value));
        dispatch(setHotelFilters(state.filter((ele) => ele !== value)));
      } else {
        setState([...state, value]);
        dispatch(setHotelFilters([...state, value]));
      }
    }, 500);

  };

  React.useEffect(() => {
    setChanging(false);
    // dispatch(setPriceLoading(false));
    sessionStorage.setItem("hotelFilters", JSON.stringify(state));
  }, [state]);

  React.useEffect(() => {
    setState(vals);
  }, [vals]);


  return (
    <>
    {changing && <Loader />}
      <div className="filter-wrap categories-wrap-main mt-4">
        <div className="filter-title">
          <h4>Star Rating</h4>
        </div>

        <div className="filter-inner-wrap">
          <div className="filter-inner-main">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="5"
                name="5"
                value="5"
                onChange={handleCheckBoxChange}
                checked={state.includes(5)}
              />
              <label className="form-check-label" htmlFor="5">
                5 Star
              </label>
            </div>
            <span>(40)</span>
          </div>
          <div className="filter-inner-main">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="4"
                name="4"
                value="4"
                onChange={handleCheckBoxChange}
                checked={state.includes(4)}
              />
              <label className="form-check-label" htmlFor="4">
                4 Star
              </label>
            </div>
            <span>(40)</span>
          </div>
          <div className="filter-inner-main">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="3"
                name="3"
                value="3"
                onChange={handleCheckBoxChange}
                checked={state.includes(3)}
              />
              <label className="form-check-label" htmlFor="3">
                3 Star
              </label>
            </div>
            <span>(40)</span>
          </div>

          {/* 0 */}
          <div className="filter-inner-main">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="2"
                name="2"
                value="2"
                onChange={handleCheckBoxChange}
                checked={state.includes(2)}
              />
              <label className="form-check-label" htmlFor="2">
                2 Star
              </label>
            </div>
            <span>(40)</span>
          </div>

          <div className="filter-inner-main">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="1"
                name="1"
                value="1"
                onChange={handleCheckBoxChange}
                checked={state.includes(1)}
              />
              <label className="form-check-label" htmlFor="1">
                1 Star
              </label>
            </div>
            <span>(40)</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StarRating;
