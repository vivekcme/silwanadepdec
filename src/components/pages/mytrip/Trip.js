import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  carrentBookingList,
  fetchAllMyBookings,
  getTripLoading,
  hotelBookingList,
  transferBookingList,
} from "../../../features/allBookingSlice";
import Loader from "../../../helpers/Loader";
import HotelItem from "./withDetailItems/HotelItem";
import TransferItem from "./withDetailItems/TransferItem";
import DetailModal from "./DetailModal";
import NoData from "./NoData";
import CarrentItem from "./withDetailItems/CarrentItem";
import CarrentCancelled from "./cancelledItems/CarrentCancelled";
import TransferCancelled from "./cancelledItems/TransferCancelled";
import HotelCancelled from "./cancelledItems/HotelCancelled";
import { scrollFunc } from "../../../helpers/helper";

const Trip = () => {
  const dispatch = useDispatch();
  const checkref = React.useRef(true);

  const [tripType, setTripType] = useState("all");
  //   const [allConfirmed, setAllConfirmed] = useState([]);
  const [hotelConfirmed, setHotelConfirmed] = useState([]);
  const [transferConfirmed, setTransferConfirmed] = useState([]);
  const [carrentConfirmed, setCarrentConfirmed] = useState([]);

  const [hotelPending, setHotelPending] = useState([]);
  const [transferPending, setTransferPending] = useState([]);
  const [carrentPending, setCarrentPending] = useState([]);
  //
  const [carrentCancelled, setCarrentCancelled] = useState([]);
  const [transferCancelled, setTransferCancelled] = useState([]);
  const [hotelCancelled, setHotelCancelled] = useState([]);

  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState("");
  const [change, setChange] = useState(false);

  const [modalData, setModalData] = useState([]);
  const [detailType, setDetailType] = useState("");

  const loading = useSelector(getTripLoading);
  const hotelList = useSelector(hotelBookingList);
  const transferList = useSelector(transferBookingList);
  const carrentList = useSelector(carrentBookingList);

  const { Authorization } = JSON.parse(sessionStorage.getItem("userData"));

  const checkRef = React.useRef(true);

  useEffect(() => {
    if (checkref.current === true) {
      dispatch(fetchAllMyBookings(Authorization));
    }
    return () => {
      checkref.current = false;
    };
  }, []);

  useEffect(() => {
    hotelList?.map((ele) => {
      switch (ele.status) {
        case "1":
          hotelConfirmed.push(ele);
        case "0":
          hotelPending.push(ele);
        case "2":
          hotelCancelled.push(ele);
      }
    });

    if (Object?.keys(transferList)?.length !== 0) {
      transferList?.map((ele) => {
        switch (ele.status) {
          case "1":
            transferConfirmed.push(ele);
          case "0":
            transferPending.push(ele);
          case "2":
            transferCancelled.push(ele);
        }
      });
    }

    carrentList?.map((ele) => {
      switch (ele.status) {
        case "1":
          carrentConfirmed.push(ele);
        case "0":
          carrentPending.push(ele);
        case "2":
          carrentCancelled.push(ele);
      }
    });

    setChange(!change);

    // setHotelConfirmed(hotelList.filter((ele) => ele.status === "1"));
    // setTransferConfirmed(transferList.filter((ele) => ele.status === "1"));
    // setCarrentConfirmed(carrentList.filter((ele) => ele.status === "1"));

    // // setHotelPending(hotelList.filter((ele) => ele.status === "0"));
    // setTransferPending(transferList.filter((ele) => ele.status === "0"));
    // setCarrentPending(carrentList.filter((ele) => ele.status === "0"));
    // //
    // // setCarrentCancelled(carrentList.filter((ele) => ele.status === "2"));
    // setTransferCancelled(transferList.filter((ele) => ele.status === "2"));
    // setHotelCancelled(hotelList.filter((ele) => ele.status === "2"));

    // setAllConfirmed(arr);
  }, [hotelList, carrentList, transferList]);

  const handleSelectChange = (e) => {
    setTripType(e.target.value);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="booking">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-tab-wrapper">
                <div className="tabs-wrapper">
                  <ul className="nav nav-tabs border-0" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#upcoming-bookings"
                      >
                        {" "}
                        <div className="tab-icon-img">
                          <img src="assets/images/my-trip/icon1.svg" alt="" />
                        </div>{" "}
                        Not Confirmed Bookings
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#cancelled-booking"
                      >
                        {" "}
                        <div className="tab-icon-img">
                          <img src="assets/images/my-trip/icon2.svg" alt="" />
                        </div>{" "}
                        Cancelled Booking
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-bs-toggle="tab"
                        href="#completed-booking"
                      >
                        {" "}
                        <div className="tab-icon-img">
                          <img src="assets/images/my-trip/icon3.svg" alt="" />
                        </div>{" "}
                        Completed Bookings
                      </a>
                    </li>

                    <div className="booking-detail-select">
                      <div className="dropdown notification-dropdown">
                        <select onChange={handleSelectChange}>
                          <option value="all">All</option>
                          <option value="hotel">Hotel</option>
                          <option value="transfer">Transfer</option>
                          <option value="carrent">Car Rental</option>
                        </select>
                      </div>
                    </div>
                  </ul>
                </div>

                <div className="tab-content">
                  <div id="upcoming-bookings" className="tab-pane">
                    {hotelPending.length === 0 && tripType === "hotel" ? (
                      <NoData />
                    ) : (
                      hotelPending.map((ele, ind) => {
                        if (tripType === "hotel" || tripType === "all") {
                          return (
                            <HotelItem
                              val={ele}
                              key={ind}
                              setShow={setShow}
                              setModalData={setModalData}
                              setDetailType={setDetailType}
                              setDeleting={setDeleting}
                            />
                          );
                        }
                      })
                    )}

                    {transferPending.length === 0 && tripType === "transfer" ? (
                      <NoData />
                    ) : (
                      transferPending.map((ele, ind) => {
                        if (tripType === "transfer" || tripType === "all") {
                          return (
                            <TransferItem
                              val={ele}
                              key={ind}
                              setShow={setShow}
                              setModalData={setModalData}
                              setDetailType={setDetailType}
                              setDeleting={setDeleting}
                            />
                          );
                        }
                      })
                    )}

                    {carrentPending.length === 0 && tripType === "carrent" ? (
                      <NoData />
                    ) : (
                      carrentPending.map((ele, ind) => {
                        if (tripType === "carrent" || tripType === "all") {
                          return (
                            <CarrentItem
                              val={ele}
                              key={ind}
                              setShow={setShow}
                              setModalData={setModalData}
                              setDetailType={setDetailType}
                              setDeleting={setDeleting}
                            />
                          );
                        }
                      })
                    )}
                  </div>
                  <div id="cancelled-booking" className="tab-pane fade">
                    {hotelCancelled.length === 0 && tripType === "hotel" ? (
                      <NoData />
                    ) : (
                      hotelCancelled.map((ele, ind) => {
                        if (tripType === "hotel" || tripType === "all") {
                          return <HotelCancelled val={ele} key={ind} />;
                        }
                      })
                    )}

                    {transferCancelled.length === 0 &&
                    tripType === "transfer" ? (
                      <NoData />
                    ) : (
                      transferCancelled.map((ele, ind) => {
                        if (tripType === "transfer" || tripType === "all") {
                          return <TransferCancelled val={ele} key={ind} />;
                        }
                      })
                    )}

                    {carrentCancelled.length === 0 && tripType === "carrent" ? (
                      <NoData />
                    ) : (
                      carrentCancelled.map((ele, ind) => {
                        if (tripType === "carrent" || tripType === "all") {
                          return <CarrentCancelled val={ele} key={ind} />;
                        }
                      })
                    )}
                  </div>
                  <div
                    id="completed-booking"
                    className="tab-pane fade active show"
                  >
                    <div className="row">
                      {hotelConfirmed.length === 0 && tripType === "hotel" ? (
                        <NoData />
                      ) : (
                        hotelConfirmed.map((ele, ind) => {
                          if (tripType === "hotel" || tripType === "all") {
                            return (
                              <HotelItem
                                val={ele}
                                key={ind}
                                setShow={setShow}
                                setModalData={setModalData}
                                setDetailType={setDetailType}
                                setDeleting={setDeleting}
                              />
                            );
                          }
                        })
                      )}
                      {transferConfirmed.length === 0 &&
                      tripType === "transfer" ? (
                        <NoData />
                      ) : (
                        transferConfirmed.map((ele, ind) => {
                          if (tripType === "transfer" || tripType === "all") {
                            return (
                              <TransferItem
                                val={ele}
                                key={ind}
                                setShow={setShow}
                                setModalData={setModalData}
                                setDetailType={setDetailType}
                                setDeleting={setDeleting}
                              />
                            );
                          }
                        })
                      )}

                      {carrentConfirmed.length === 0 &&
                      tripType === "carrent" ? (
                        <NoData />
                      ) : (
                        carrentConfirmed.map((ele, ind) => {
                          if (tripType === "carrent" || tripType === "all") {
                            return (
                              <CarrentItem
                                val={ele}
                                key={ind}
                                setShow={setShow}
                                setModalData={setModalData}
                                setDetailType={setDetailType}
                                setDeleting={setDeleting}
                              />
                            );
                          }
                        })
                      )}
                    </div>
                    {/*  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {show ? (
        <DetailModal
          show={show}
          setShow={setShow}
          detailType={detailType}
          modalData={modalData}
          checkRef={checkRef}
          deleting={deleting}
          setDeleting={setDeleting}
        />
      ) : null}
    </>
  );
};

export default Trip;
