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
  const [roomdailyRate , SetRoomdailyRate] = useState([])
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
      setShow(true);
    }
    
  };


  useEffect(() => {
    console.log("roomdailyRate",roomdailyRate.length)
    if (roomdailyRate.length > 0) {
    setModal("dailyRates");
    setShow(true);
  }
  }, [roomdailyRate])
  
  const dailyRoomHandler = (val) =>{
    SetRoomdailyRate([])
    setTimeout(() => {
    SetRoomdailyRate(val.DayRates[0])
    }, 100);
  }

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
                                    <ul className="my-auto">
                                      {val.Name.map((ele, ind) => {
                                        return (
                                          <li key={ind}>
                                            <h5>
                                              {ind + 1}. {ele}
                                            </h5>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                </div>
                              </td>
                              <td className="c-table__cell">
                                <div className="table-detail">
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
                                  <p className="g-text pointer">
                                    Total Fare{" "}
                                    <span
                                      onClick={() => {dailyRoomHandler(val)}}
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

        <section>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="wrapper">
                        <table class="c-table">
                            <thead class="c-table__header">
                                <tr>
                                    <th class="c-table__col-label">Room Type</th>
                                    <th class="c-table__col-label">Room Option</th>
                                    <th class="c-table__col-label">Inclusion</th>
                                    <th class="c-table__col-label">Price</th>
                                </tr>
                            </thead>
                            <tbody class="c-table__body">
                                <tr>
                                    <td class="c-table__cell" rowspan="4">
                                        <div class="table-detail">
                                            <div class="room-select-img">
                                                <img src="assets/images/img-6.png" alt="img-6" />
                                            </div>
                                            <h5>Deluxe Twin Room</h5>
                                            <p class="g-text semi-13"> <img src="assets/images/m2.svg" alt=""/> 474 sq.ft</p>
                                            <p class="g-text semi-13"> <img src="assets/images/bed.svg" alt=""/> Extra - large Double bed (Super-king size)</p>
                                            <ul>
                                                <li class="g-text semi-13">Work Desk</li>
                                                <li class="g-text semi-13">BathTub</li>
                                            </ul>
                                            <a href="#" class="view-more-text semi-blue-14">View More Details</a>
                                        </div>
                                    </td>
                                    <td class="c-table__cell">
                                        <div class="table-detail">
                                            <h4>1. Delux Room, 1 King Bed, Non Smoking </h4>
                                            <p class="g-color"> <img src="assets/images/green-check.svg" class="green-check" alt="green-check" /> Free Cancellation till 26 Jun'22</p>
                                            <a href="#" class="cancellation">Cancellation Policy</a>
                                        </div>
                                    </td>
                                    <td class="c-table__cell">
                                    asdsad
                                    </td>
                                    <td class="c-table__cell">
                                        <div class="total-availabity" >
                                            <p class="g-text">Per Night</p>
                                            <h2> <i class="fas fa-rupee-sign"></i> 11,464</h2>
                                            <p>+ ₹ 1795 taxes & fees</p>
                                            <a href="#" class="cancellation d-block">EMI Starts at ₹9776/month</a>
                                            <a href="hotel-payment.php" class="cmn-btn">Select Room</a>
                                        </div>
                                    </td>
                                </tr>
                             
                               

                                
                            </tbody>
                        </table>
                    </div>  
                </div>
            </div>
        </div>
    </section>                             


        {show ? (
          <MainModal
            modal={modal}
            setShow={setShow}
            show={show}
            setModal={setModal}
            extraData={roomdailyRate}
          />
        ) : null}
      </>
    );
  }
};

export default SelectRoom;
