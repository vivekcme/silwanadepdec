import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const HotelListImages = ({ images }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  const Image = ({ img, classNames }) => {
    const [imageError, setImageError] = useState(false);
    return (
      <img
        className={classNames + " slick-slide-image"}
        src={
          img === "" || img === undefined
            ? "assets/images/hotelStatic.png"
            : imageError
            ? "assets/images/hotelStatic.png"
            : img
        }
        onError={(e) => setImageError(true)}
      />
    );
  };

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settingsThumbs = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: true,
    centerMode: false,
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          margin: 20,
          className: "  ",
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="slider-wrapper" style={{ opactiy: "1" }}>
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
        >
          {images.length === 0 ? (
            <div className="slick-slide">
              <div className="slick-main-img-wrap">
                <Image
                  classNames="noImg"
                  img={"assets/images/hotelStatic.png"}
                />
              </div>
            </div>
          ) : (
            images.map((slide, ind) => (
              <div className="slick-slide" key={ind}>
                <div className="slick-main-img-wrap">
                  <Image img={slide.image} />
                </div>
              </div>
            ))
          )}
        </Slider>
        <div className="thumbnail-slider-wrap">
          <Slider
            {...settingsThumbs}
            asNavFor={nav1}
            ref={(slider) => setSlider2(slider)}
          >
            {images.length < 0 ? (
              <></>
            ) : (
              images.map((slide, ind) => (
                <div className="slick-slide" key={ind}>
                  <div className="slick-thumb-img-wrap">
                    <Image img={slide.image} />
                  </div>
                </div>
              ))
            )}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default HotelListImages;
