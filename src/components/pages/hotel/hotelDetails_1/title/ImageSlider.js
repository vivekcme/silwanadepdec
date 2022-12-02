import React from "react";
import Slider from "react-slick";

const ImageSlider = ({ images }) => {
  const detailSlider = {
    autoplay: true,
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
  };

  return (
    <>
      <div className="col-lg-6 col-md-12 ">
        <div className="hotel-detail-img-slider position-relative">
          <Slider {...detailSlider}>
            {images?.length < 1 && (
              <img src={"assets/images/hotelStatic.png"} alt={"image"} />
            )}
            {images?.map((val, i) => (
              <div key={i} className="hotel-detail-img-inner">
                <img
                  src={
                    val.image == ""
                      ? "assets/images/hotelStatic.png"
                      : val.image
                  }
                  alt={"image"}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/*  */}

      <div className="col-lg-3 col-md-6 mt-lg-0 mt-5">
        <div className="hotel-detail-img-inner hotel-detail-img-inner-1">
          <img
            src={
              images?.length > 0
                ? images[0].image
                : "assets/images/hotelStatic.png"
            }
            alt="err"
          />
        </div>
        <div className="hotel-detail-img-inner hotel-detail-img-inner-1">
          <img
            src={
              images?.length > 0
                ? images[1].image
                : "assets/images/hotelStatic.png"
            }
            alt="err"
          />
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
