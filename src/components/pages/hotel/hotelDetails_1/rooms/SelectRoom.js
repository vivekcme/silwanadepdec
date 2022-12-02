import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { selectHotelRoomAsync } from "../../../../../features/bookings/hotelSlice";
import { getLogin } from "../../../../../features/userSlice";
import MainModal from "../../../../modals/MainModal";
import CancelPolicies from "../../../../UI/CancelPolicies";

const SelectRoom = ({ rooms }) => {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState("dailyRates");
  const [code, setCode] = useState("");
  // const [loginRedire,]
  const [isBook, setIsBook] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let login = useSelector(getLogin);

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    let Obj = JSON.parse(sessionStorage.getItem("hotelForm"));
    Obj.BookingCode = code;
    if (code !== "" && isBook === true) {
      navigate({
        pathname: "/hotel-review",
        search: `${createSearchParams(Obj)}`,
      });
    }
  }, [login]);

  const handleSelectRoom = (code) => {
    setCode(code);
    setIsBook(true);
    if (Object.keys(login).length > 0) {
      let Obj = JSON.parse(sessionStorage.getItem("hotelForm"));
      Obj.BookingCode = code;
      navigate({
        pathname: "/hotel-review",
        search: `${createSearchParams(Obj)}`,
      });
    } else {
      setModal("login");
    }
    setShow(true);
  };

  if (rooms !== undefined) {
    return (
      <>
        <section className="select-room mt-5 ">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="select-room-main">
                  <h5 className="title mb-0">Select Room</h5>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="wrapper">
                  <table className="c-table">
                    <thead className="c-table__header">
                      <tr>
                        <th className="c-table__col-label">Room Type</th>
                        <th className="c-table__col-label">Room Option</th>
                        <th className="c-table__col-label">Inclusion</th>
                        <th className="c-table__col-label">Price</th>
                      </tr>
                    </thead>

                    <tbody className="c-table__body">
                      {rooms !== undefined && rooms.length > 0
                        ? rooms.map((val, i) => (
                            <tr key={i}>
                              <td className="c-table__cell">
                                <div className="table-detail">
                                  <div className="room-select-img">
                                    {/* <img
                                  src="assets/images/img-6.png"
                                  alt="img-6"
                                /> */}
                                    <h5>{val.Name[0]}</h5>
                                  </div>
                                </div>
                              </td>
                              <td className="c-table__cell">
                                <div className="table-detail">
                                  <h4>{val.Name[0]} </h4>
                                  <CancelPolicies vals={val.CancelPolicies} />
                                </div>
                              </td>
                              <td className="c-table__cell">
                                <div className="table-detail">
                                  {val.Inclusion.split(",").map((ele, ind) => {
                                    return (
                                      <p
                                        className="g-text semi-13 mt-0"
                                        key={ind}
                                      >
                                        <img
                                          src="assets/images/hotel/gray-check.svg"
                                          className="green-check"
                                          alt="green-check"
                                        />
                                        {ele}
                                      </p>
                                    );
                                  })}
                                  {val.IsRefundable && (
                                    <p className="g-text semi-13 mt-0">
                                      <img
                                        src="assets/images/hotel/gray-check.svg"
                                        className="green-check"
                                        alt="green-check"
                                      />
                                      Refundable
                                    </p>
                                  )}
                                  {val.withTransfers && (
                                    <p className="g-text semi-13 mt-0">
                                      <img
                                        src="assets/images/hotel/gray-check.svg"
                                        className="green-check"
                                        alt="green-check"
                                      />
                                      Transfarable
                                    </p>
                                  )}
                                </div>
                              </td>
                              <td className="c-table__cell">
                                <div className="">
                                  <p className="g-text">
                                    Total Fare{" "}
                                    <span
                                      onClick={() => {
                                        setModal("dailyRates");
                                        setShow(true);
                                      }}
                                    >
                                      <i className="fas fa-info-circle"></i>
                                    </span>
                                  </p>
                                  <h2>
                                    {/* {currentCurrency(props.rooms[0].Currency)} */}
                                    <i className="fas fa-dollar-sign"></i>{" "}
                                    {val.TotalFare}
                                  </h2>
                                  {/* {val.TotalTax !== 0} */}
                                  <p>
                                    Including{" "}
                                    <i className="fas fa-dollar-sign"></i>{" "}
                                    {/* {currentCurrency(props.rooms[0].Currency)}{" "} */}
                                    {val.TotalTax} &amp; fees
                                  </p>
                                  <span
                                    className="cmn-btn"
                                    onClick={() =>
                                      handleSelectRoom(val.BookingCode)
                                    }
                                  >
                                    Select Room
                                  </span>
                                </div>
                                {show ? (
                                  <MainModal
                                    modal={modal}
                                    setShow={setShow}
                                    show={show}
                                    setModal={setModal}
                                    extraData={val.DayRates[0]}
                                  />
                                ) : null}
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default SelectRoom;
