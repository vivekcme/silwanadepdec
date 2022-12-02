import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CategoryForm from "../../forms/CategoryForm";
import HotelForm from "../../forms/HotelForm";
import MainModal from "../../modals/MainModal";
import Main from "./Main";

const Banner = ({ setShow, show, isClicked, setIsClicked }) => {
  const [category, setCategory] = useState("");
  const location = useLocation();

  const [modal, setModal] = useState("login");

  useEffect(() => {
    setCategory(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <>
      <section className="banner position-relative">
        <video id="myVideo" autoPlay loop muted>
          <source src="assets/video/banner.mp4" />
        </video>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-categories position-relative">
                <Main
                  setShow={setShow}
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                  setModal={setModal}
                />

                <CategoryForm category={category} setIsClicked={setIsClicked} />
              </div>
            </div>
          </div>
        </div>
        {/* {show ? (
          <MainModal
            modal={modal}
            setShow={setShow}
            show={show}
            setModal={setModal}
            extraData={setIsClicked}
            // extraData={val.DayRates[0]}
          />
        ) : null} */}
      </section>
    </>
  );
};

export default Banner;
