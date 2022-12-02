import React, { useEffect, useState } from "react";
import { TranferDateFormatter } from "../../../helpers/helper";
import Images from "../../UI/Images";
import { useSelector } from "react-redux";
import { getLogin } from "../../../features/userSlice";
import { useNavigate } from "react-router-dom";
import {
  getSearchedTransfers,
  getSignatureData,
} from "../../../features/bookings/transferSlice";
import SelectedVehicle from "./SelectedVehicle";

const TransferList = ({
  val,
  setShow,
  show,
  setModal,
  methods,
  returnTransfer,
}) => {
  const roundTrip = JSON.parse(sessionStorage.getItem("roundTrip"));
  const login = useSelector(getLogin);
  const navigate = useNavigate();

  const [isBook, setIsBook] = React.useState(false);

  const searchedTransfers = useSelector(getSearchedTransfers);

  const { setPickupVehicle, setviewRoundTrip } = methods;

  // const [pickupVehicle, setPickupVehicle] = useState("");
  // const [viewRoundTrip, setviewRoundTrip] = useState(false);
  // const [returnSearched, setReturnSearched] = useState([]);

  useEffect(() => {
    if (Object.keys(login).length > 0 && isBook === true) {
      navigate({
        pathname: "/transfer-details",
      });
    }
  }, [login, isBook]);

  // useEffect(() => {
  //   if (!show) {
  //     setIsBook(false);
  //   }
  // }, [show]);

  const bookTransfer = (val) => {
    setIsBook(true);
    // returnTransfer
    if (roundTrip !== null && roundTrip === true) {
      sessionStorage.setItem("returnSelected", JSON.stringify(val));
    } else {
      sessionStorage.setItem("transferSelected", JSON.stringify(val));
    }

    sessionStorage.setItem(
      "trackingId",
      JSON.stringify(searchedTransfers.TrackingId)
    );

    setShow(!show);

    if (login.length > 0) {
      navigate({
        pathname: "/transfer-details",
      });
    } else {
      setModal("login");
    }
    setShow(true);
  };

  const handlePickUp = (val) => {
    sessionStorage.setItem("transferSelected", JSON.stringify(val));
    setPickupVehicle(val);
    setviewRoundTrip(true);
  };
  return (
    <>
      {/* {!viewRoundTrip && ( */}
      <div className="transfer-wrap ">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <div className="car-rental-image-wrap">
              <Images
                img={val.Vehicles[0].FlashLinks}
                alter={"FlashLinks"}
                dummy={"assets/images/dummyCar.png"}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-6">
            <div className="transfer-inner">
              <h4 className="bold20">{val.Vehicles[0].Name}</h4>
              <div className="d-flex passengers-text">
                <p className="medium14 mb-0">
                  {val.Vehicles[0].PaxCapacity} passengers allowed
                </p>
                <p className="medium14 mb-0">{val.Vehicles[0].Type}</p>
              </div>
              <ul className="transfer-lists">
                <li>
                  <div className="transfer-icon-wrap">
                    <img
                      src="assets/images/transfer/icon1.svg"
                      alt="transfer"
                    />
                  </div>
                  <p className="semib14">
                    {val.Vehicles[0].LuggageCapacity} Luggage
                  </p>
                </li>
                <li>
                  <div className="transfer-icon-wrap">
                    <img
                      src="assets/images/car-rental/icon4.svg"
                      alt="transfer"
                    />
                  </div>
                  <p className="semib14">{val.Vehicles[0].PaxCapacity} Seats</p>
                </li>
                {/* <li>
                        <div className="transfer-icon-wrap">
                          <img
                            src="assets/images/transfer/icon2.svg"
                            alt="transfer"
                          />
                        </div>
                        <p className="semib14">{val.Vehicles[0].Type}</p>
                      </li> */}
                {val.Vehicles[0].CancellationPolicy.map((val, i) => (
                  <li key={i}>
                    <div className="transfer-icon-wrap">
                      <img
                        src="assets/images/transfer/icon3.svg"
                        alt="transfer"
                      />
                    </div>
                    <p className="semib14">
                      From {TranferDateFormatter(val.FromDate.split("T")[0])} To{" "}
                      {TranferDateFormatter(val.ToDate.split("T")[0])} charges
                      will be <i className="fa fa-dollar-sign"></i> {val.Charge}{" "}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/*  */}
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="transfer-inner car-rental-wrap">
              <div className="total-availabity text-start position-static">
                <h2>
                  <i className="fa fa-dollar-sign"></i>{" "}
                  {parseFloat(val.Vehicles[0].Price.TotalPrice).toFixed(2)}
                </h2>
                <span
                  className="cmn-btn d-inline-block"
                  onClick={() =>
                    returnTransfer ? handlePickUp(val) : bookTransfer(val)
                  }
                >
                  {returnTransfer ? "Select" : "Book"}
                </span>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
      {/* )} */}

      {/* part */}

      {/* new */}
    </>
  );
};

export default TransferList;
