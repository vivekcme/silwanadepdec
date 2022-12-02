import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getListData,
  resetListData,
} from "../../../features/bookings/transferSlice";
import { getLogin } from "../../../features/userSlice";
import { scrollFunc } from "../../../helpers/helper";

const Main = ({ setShow, isClicked, setIsClicked, setModal }) => {
  const [path, setPath] = useState("");
  const [myPath, setMypath] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listdata = useSelector(getListData);
  const login = useSelector(getLogin);

  useEffect(() => {
    // if (login.length > 0) {
    //   setIsClicked(true);
    // } else

    if (Object.keys(login).length > 0 && isClicked === true) {
      navigate({
        pathname: myPath,
      });
      // navigate(window.location.pathname, {
      //   state: { success: true, logout: false },
      //   replace: true,
      // });
    } else if (isClicked) {
      setShow(true);
      setModal("login");
    } else {
      setIsClicked(false);
    }
  }, [login, isClicked]);

  useEffect(() => {
    setPath(window.location.pathname);
    // if (window.location.pathname.includes("-")) {
    //   scrollFunc();
    // }
    if (listdata.length > 0) {
      dispatch(resetListData());
    }
  }, [window.location.pathname, listdata]);

  const checkLogin = (val) => {
    setMypath(val);
    setIsClicked(true);
  };

  return (
    <>
      <div className="">
        <div className="categories-list">
          <div
            className={`categories-list-title ${
              path === "/" || path.includes("/hotel") ? "active" : null
            } d-flex align-items-center justify-content-center`}
            onClick={() => navigate("hotel")}
          >
            <div className="categories-icon-main">
              <img src="assets/images/hotel.svg" alt="hotel-icon" />
            </div>
            <p>Hotel</p>
          </div>
          <div
            className={`categories-list-title ${
              path === "/flight" || path.includes("/flight") ? "active" : ""
            } d-flex align-items-center justify-content-center`}
            onClick={() => navigate("/flight")}
          >
            <div className="categories-icon-main">
              <img src="assets/images/flight.svg" alt="flight-icon" />
            </div>
            <p>Flight</p>
          </div>
          <div
            className={`categories-list-title ${
              path === "/transfer" || path.includes("/transfer") ? "active" : ""
            } d-flex align-items-center justify-content-center`}
            onClick={() => navigate("/transfer")}
          >
            <div className="categories-icon-main">
              <img src="assets/images/bus.svg" alt="bus-icon" />
            </div>
            <p>Transfer</p>
          </div>
          <div
            className={`categories-list-title ${
              path === "/carrent" || path.includes("/carrent") ? "active" : ""
            } d-flex align-items-center justify-content-center`}
            onClick={() => navigate("/carrent")}
          >
            <div className="categories-icon-main">
              <img src="assets/images/car.svg" alt="car-icon" />
            </div>
            <p>Car Rental</p>
          </div>
          <div
            className={`categories-list-title ${
              path === "/sight" ? "active" : ""
            } d-flex align-items-center justify-content-center`}
            onClick={() => navigate("/sight")}
          >
            <div className="categories-icon-main">
              <img src="assets/images/camero.svg" alt="camero-icon" />
            </div>
            <p>Sight seeing</p>
          </div>
          <div
            className={`categories-list-title ${
              path === "/visa" || path.includes("/visa") ? "active" : ""
            } d-flex align-items-center justify-content-center`}
            onClick={() => checkLogin("/visa")}
          >
            <div className="categories-icon-main">
              <img src="assets/images/dubai.svg" alt="dubai-icon" />
            </div>
            <p>Dubai Visa</p>
          </div>
          <div
            className={`categories-list-title ${
              path === "/insurance" || path.includes("/insurance")
                ? "active"
                : ""
            } d-flex align-items-center justify-content-center`}
            onClick={() => checkLogin("/insurance")}
          >
            <div className="categories-icon-main">
              <img src="assets/images/insurance.svg" alt="insurance-icon" />
            </div>
            <p>Insurance</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
