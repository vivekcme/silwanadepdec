import React, { useState } from "react";
import Images from "../../UI/Images";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLogin } from "../../../features/userSlice";

const CarsList = ({ carDetail, Book, setShow, show, setModal }) => {
  const navigate = useNavigate();
  const login = useSelector(getLogin);

  const [isBook, setIsBook] = useState(false);

  React.useEffect(() => {
    if (Object.keys(login).length > 0 && isBook === true) {
      navigate({
        pathname: "/carrent-details",
      });
    }
  }, [login, isBook]);

  const handleCarBooking = (val) => {
    setIsBook(true);
    sessionStorage.setItem("selectedCar", JSON.stringify(val));

    if (login.length > 0) {
      navigate({
        pathname: "/carrent-details",
      });
    } else {
      setModal("login");
    }
    setShow(true);
  };

  return (
    <>
      <div className="transfer-wrap">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <div className="car-rental-image-wrap">
              <Images
                img={carDetail.image}
                alter={"FlashLinks"}
                dummy={"assets/images/dummyCar.png"}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-6">
            <div className="transfer-inner">
              <h4 className="bold20">{carDetail.name}</h4>
              <ul className="transfer-lists">
                <li>
                  <div className="transfer-icon-wrap">
                    <img
                      src="assets/images/car-rental/icon4.svg"
                      alt="transfer"
                    />
                  </div>
                  <p className="semib14">
                    {carDetail.seat_capacity} Passenger Allowed
                  </p>
                </li>

                {!Book && (
                  <>
                    <li>
                      <div className="transfer-icon-wrap">
                        <img
                          src="assets/images/car-rental/icon4.svg"
                          alt="transfer"
                        />
                      </div>
                      <p className="semib14">{carDetail.cars_type.name} </p>
                    </li>
                    <li>
                      <div className="transfer-icon-wrap">
                        <img
                          src="assets/images/car-rental/luggage.svg"
                          alt="transfer"
                        />
                      </div>
                      <p className="semib14">{carDetail.luggage_capacity} </p>
                    </li>
                    <li>
                      <div className="transfer-icon-wrap">
                        <img
                          src="assets/images/car-rental/petrol.svg"
                          alt="petrol"
                        />
                      </div>
                      <p className="semib14">{carDetail.fual_type} </p>
                    </li>

                    <li>
                      <div className="transfer-icon-wrap">
                        <img
                          src="assets/images/car-rental/vehicle.svg"
                          alt="vehicle"
                        />
                      </div>
                      <p className="semib14">{carDetail.gear_type} </p>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="transfer-inner car-rental-wrap">
              <div className="total-availabity text-start position-static">
                <p className="g-text">Price for Hour</p>
                <h2>
                  <i className="fa fa-dollar-sign"></i> {carDetail.hourly_rate}
                </h2>
                {Book && (
                  <span
                    className="cmn-btn d-inline-block"
                    onClick={() => {
                      //   BookingHandler();
                      handleCarBooking(carDetail);
                      //   setselectedtype("carRental");
                      //   setSelectedCar(carDetail);
                    }}
                  >
                    Booking
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarsList;
