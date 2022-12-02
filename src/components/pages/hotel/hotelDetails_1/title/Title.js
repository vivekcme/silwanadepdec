import React from "react";
import Ratings from "../../../../UI/Ratings";
import AminitiesService from "./AminitiesService";
import ImageSlider from "./ImageSlider";

const Title = ({ vals }) => {
  const { name, address, rating, Hotel_Images, Hotel_Facilities } = vals;
  return (
    <>
      <div className="col-lg-12">
        <div className="hotel-detail-main-wrap">{/* bread cumb here */}</div>

        <div className="hotel-detail-title">
          <div className="hotel-detail-lists m-0 w-100">
            <div>
              <div className="detail-main-title">
                <h4 className="me-3">{name}</h4>
                <Ratings num={rating} />
              </div>
              <p className="text1">
                {" "}
                <img
                  src="assets/images/marker.svg"
                  className="marker-icon"
                  alt="marker"
                />{" "}
                {address}{" "}
              </p>
            </div>
            <div className="excellent text-center">
              <div className="total-rating verified-ratings">{rating} / 5</div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <ImageSlider images={Hotel_Images} />
      {/*  */}
      <AminitiesService vals={Hotel_Facilities} />
    </>
  );
};

export default Title;
