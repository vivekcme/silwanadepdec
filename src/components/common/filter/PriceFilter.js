import stubTrue from 'lodash/stubTrue';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  getHotelPriceFilters, setHotelPriceFilter } from '../../../features/bookings/hotelSlice';
import Loader from '../../../helpers/Loader';

const PriceFilter = () => {

  const vals = useSelector(getHotelPriceFilters);
const [state,setState] = React.useState([])
const dispatch = useDispatch()
const [changing, setChanging] = React.useState(false);

const handleCheckBoxChange = (val) => {
  setChanging(stubTrue);
  // dispatch(setPriceLoading(true));
  const value = val;
  setTimeout(() => {
    if (state.includes(value)) {
      setState(state.filter((ele) => ele !== value));
      dispatch(setHotelPriceFilter(state.filter((ele) => ele !== value)));
    } else {
      setState([...state, value]);
      dispatch(setHotelPriceFilter([...state, value]));
    }
  }, 500);

};


React.useEffect(() => {
  setChanging(false);
  // dispatch(setPriceLoading(false));
  sessionStorage.setItem("hotelPriceFilters", JSON.stringify(state));
}, [state]);

React.useEffect(() => {
  setState(vals);
}, [vals]);

// if (changing) {
//   return <Loader />;
// }



    

  return (
    <>
    {changing && <Loader />}
      <div className="filter-wrap categories-wrap-main mt-4">
        <div className="filter-title">
          <h4>Price </h4>
        </div>

        <div className="filter-inner-wrap">
          <div className="filter-inner-main">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="0-100"
                onChange={() =>handleCheckBoxChange("0-100")}
                checked={state.includes("0-100")}
              />
              <label className="form-check-label" htmlFor="0-100">
              0-100
              </label>
            </div>
          </div>
          <div className="filter-inner-main">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="100-200"
                onChange={() =>handleCheckBoxChange("100-200")}
                checked={state.includes("100-200")}
              />
              <label className="form-check-label" htmlFor="100-200">
              100-200
              </label>
            </div>
          </div>
          <div className="filter-inner-main">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="200-300"
                value="200-300"
                onChange={() =>handleCheckBoxChange("200-300")}
                checked={state.includes("200-300")}
              />
              <label className="form-check-label" htmlFor="200-300">
              200-300
              </label>
            </div>
          </div>

          {/* 0 */}
          <div className="filter-inner-main">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="300-400"
                value="300-400"
                onChange={() =>handleCheckBoxChange("300-400")}
                checked={state.includes("300-400")}
              />
              <label className="form-check-label" htmlFor="300-400">
              300-400
              </label>
            </div>
          </div>


          <div className="filter-inner-main">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="400-500"
                value="400-500"
                onChange={() =>handleCheckBoxChange("400-500")}
                checked={state.includes("400-500")}
              />
              <label className="form-check-label" htmlFor="400-500">
              400-500
              </label>
            </div>

          </div>


          <div className="filter-inner-main">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="400-500"
                onChange={() =>handleCheckBoxChange("500")}
                checked={state.includes("500")}
              />
              <label className="form-check-label" htmlFor="500">
              500+
              </label>
            </div>

          </div>
       


        </div>
      </div>
    </>
  )
}

export default PriceFilter