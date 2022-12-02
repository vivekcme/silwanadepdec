import React from "react";

const Ratings = ({ num }) => {
  return (
    <>
      <div className="rating-box">
        <div className="rating-container">
          {new Array(num).fill(parseInt(num)).map((ele, ind) => (
            <i key={ind} className="fas fa-star"></i>
          ))}
        </div>
      </div>
    </>
  );
};

export default Ratings;
