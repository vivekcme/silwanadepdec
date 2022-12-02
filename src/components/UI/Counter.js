import React from "react";
import { useDispatch } from "react-redux";

const Counter = ({ count, inc, dec, max, min }) => {
  const dispatch = useDispatch();

  // count === NaN && String(count);
  // console.log(count, "count");

  const handleChange = () => {
    return;
  };
  return (
    <>
      <div className="d-flex align-items-center ">
        <button
          onClick={() => count > min && dispatch(dec())}
          type="button"
          className="button-minus border rounded-circle  icon-shape icon-sm mx-1"
        >
          <img src="assets/images/minus-icon.svg" />
        </button>
        <input
          className="quantity-field border-0 text-center w-25"
          type="text"
          value={count}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => count < max && dispatch(inc())}
          className="button-plus border rounded-circle  icon-shape icon-sm mx-1"
        >
          <img src="assets/images/plus-icon.svg" />
        </button>
      </div>
    </>
  );
};

export default Counter;
