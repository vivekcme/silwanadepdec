import React, { useState } from "react";
import { useSelector } from "react-redux";
import Fliter from "../../common/filter/Fliter";
import {
  getCarsList,
  getLoading,
} from "../../../features/bookings/carrentSlice";
import CarsList from "./CarsList";
import MainModal from "../../modals/MainModal";
import Loader from "../../../helpers/Loader";
import { scrollFunc } from "../../../helpers/helper";

const Carrent = () => {
  const carsList = useSelector(getCarsList);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState("login");

  // scrollFunc();

  const loading = useSelector(getLoading);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="transfer">
        <div className="container position-relative">
          <div className="row">
            <div className="col-xl-3 for-desktop-screen">
              <Fliter />
            </div>

            <div className="col-xl-9">
              {carsList.length > 0 &&
                carsList.map((ele, i) => {
                  return (
                    <CarsList
                      carDetail={ele}
                      show={show}
                      setShow={setShow}
                      setModal={setModal}
                      Book={true}
                      key={i}
                    />
                  );
                })}
            </div>
          </div>
        </div>

        {show ? (
          <MainModal
            modal={modal}
            setShow={setShow}
            show={show}
            setModal={setModal}
            // extraData={val.DayRates[0]}
          />
        ) : null}
      </section>
    </>
  );
};

export default Carrent;
