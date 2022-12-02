import React, { useEffect, useRef, useState } from "react";
import {
  incCount,
  decCount,
  getTravellers,
  setSignature,
  fetchAirHotelData,
  getListData,
  getSearchedTransfers,
  transferSearchAsync,
  setTravellersCount,
  transferSearchReturnAsync,
} from "../../features/bookings/transferSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Counter from "../UI/Counter";
// import  from "react-date-picker";
import DatePicker from "react-datepicker";
// import TimePicker from "rc-time-picker";
import { TimePicker } from "antd";
import "antd/dist/antd.min.css";
import "rc-time-picker/assets/index.css";
import SearchButton from "../UI/SearchButton";
import moment from "moment/moment";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getTwentyFourHourTime } from "../../helpers/helper";

const TransferForm = () => {
  const [tripType, setTripType] = useState("oneway");
  const [locationType, setLocationType] = useState(0);
  const [currentInput, setCurrentInput] = useState("");

  const [pickUpInput, setPickUpInput] = useState("");
  const [pickUpType, setPickUpType] = useState("Airport");
  const [pickUpList, setPickUpList] = useState([]);

  const [dropInput, setDropInput] = useState("");
  const [dropType, setDropType] = useState("Hotel");
  const [dropList, setDropList] = useState([]);

  const [depature, setDepature] = useState({});
  const [returnJourney, setReturnJourney] = useState({});

  const [startPickup, setStartPickup] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );
  const endDateAll = new Date().setFullYear(new Date().getFullYear() + 1);

  const [pickUpDate, setPickUpDate] = useState("");
  const [pickupTime, setPickUpTime] = useState("");

  const [returnDate, setReturnDate] = useState("");

  const [returnTime, setReturnTime] = useState("");
  const [minReturn, setMinReturn] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [returnInput, setReturnInput] = useState("");

  const pickupRef = useRef();
  const dropRef = useRef();
  const navigate = useNavigate();
  // const [state, setState] = useState({
  //   Airport: "",
  // });

  const [returnPopup, setReturnPopup] = useState("d-none");

  const dispatch = useDispatch();
  const travellersCount = useSelector(getTravellers);
  const listData = useSelector(getListData);
  const searchedTransfers = useSelector(getSearchedTransfers);

  // const signature = useSelector(
  //   (state) => state.transfer.signature,
  //   shallowEqual
  // );

  useEffect(() => {
    dispatch(setSignature());
  }, []);

  const signatureData = JSON.parse(sessionStorage.getItem("signatureData"));

  // const signatureData =
  useEffect(() => {
    if (listData.length > 0) {
      if (pickUpType === currentInput) {
        setPickUpList(listData);
      } else {
        setDropList(listData);
      }
    }
  }, [listData]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      depature.tcount = travellersCount;
      sessionStorage.setItem("departure", JSON.stringify(depature));

      if (tripType === "roundtrip") {
        sessionStorage.setItem("roundTrip", true);
        sessionStorage.setItem(
          "return",
          JSON.stringify({ returnDate, returnJourney })
        );
        dispatch(
          transferSearchReturnAsync({ depature, returnJourney, signatureData })
        );
      } else {
        sessionStorage.setItem("roundTrip", false);

        dispatch(transferSearchAsync({ depature, signatureData }));
      }

      navigate({
        pathname: "/transfer-listing",
      });
      depature.tcount = travellersCount;
    }
  }, [formErrors]);

  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("departure"));
    let roundTrip = JSON.parse(sessionStorage.getItem("roundTrip"));
    if (roundTrip !== null) {
      roundTrip ? setTripType("roundtrip") : setTripType("oneway");
    }
    if (data !== null) {
      setDepature(data);

      data.PickUp.LocationType === "TransferAccomodationDetail"
        ? setLocationType(1)
        : setLocationType(0);

      setPickUpInput(data.PickUp.locationName);
      setDropInput(data.DropOff.locationName);

      let dt = data.TransferDate.split("T")[0];
      setPickUpDate(
        new Date(dt).getTime() - new Date(dt).getTimezoneOffset() * 60000
      );

      let tm = moment(data.TransferDate).add(1, "days")._d;
      setMinReturn(tm.getTime() - tm.getTimezoneOffset() * 60000);

      let rt = JSON.parse(sessionStorage.getItem("return"));
      if (rt !== null) {
        setReturnDate(rt.returnDate);
        setReturnTime(moment(rt.returnJourney.TransferTime, "HH:mm"));

        const { returnJourney } = rt;

        returnJourney.TransferDate !== undefined &&
          returnJourney.TransferTime !== undefined &&
          setReturnInput(
            returnJourney?.TransferDate?.split("T")[0].concat(
              ` ${returnJourney.TransferTime}`
            )
          );
        setReturnJourney(returnJourney);
      }

      dispatch(setTravellersCount(data.tcount));
      setPickUpTime(moment(data.TransferTime, "HH:mm"));
    }
  }, []);

  useEffect(() => {
    if (locationType === 0) {
      setPickUpType("Airport");
      setDropType("Hotel");
    } else {
      setPickUpType("Hotel");
      setDropType("Airport");
    }
  }, [locationType]);

  const handleCheckBox = (e) => {
    setTripType(e.target.value);
  };

  const handleReturnTransfer = (state) => {
    if (state === "open") {
      setReturnPopup("d-block");
    } else {
      setReturnPopup("d-none");

      returnJourney.TransferDate !== undefined &&
        returnJourney.TransferTime !== undefined &&
        setReturnInput(
          returnJourney?.TransferDate?.split("T")[0].concat(
            ` ${returnJourney.TransferTime}`
          )
        );
    }
  };

  const handlePickupTime = (time, timeString) => {
    setPickUpTime(time);
    setDepature({ ...depature, TransferTime: timeString });
  };

  const handlePickupdate = (e) => {
    if (e !== null) {
      setPickUpDate(e.getTime() - e.getTimezoneOffset() * 60000);
      setDepature({
        ...depature,
        TransferDate: new Date(e.getTime() - e.getTimezoneOffset() * 60000)
          .toISOString()
          .split(".")[0],
      });
      let d = moment(e);
      let tm = moment(e).add(1, "days")._d;
      setMinReturn(tm.getTime() - tm.getTimezoneOffset() * 60000);

      if (new Date(d) >= new Date(returnDate)) {
        setReturnDate(tm.getTime() - tm.getTimezoneOffset() * 60000);

        setReturnJourney({
          ...returnJourney,
          TransferDate: new Date(tm).toISOString().split(".")[0],
        });

        setReturnInput(
          `${moment(tm).format("YYYY-MM-DD")} ${returnInput.split(" ")[1]}`
        );
      }
    }
  };

  const handleReturnDate = (e) => {
    setReturnDate(e.getTime() - e.getTimezoneOffset() * 60000);
    setReturnJourney({
      ...returnJourney,
      PickUp: depature.DropOff,
      DropOff: depature.PickUp,
      TransferDate: new Date(e.getTime() - e.getTimezoneOffset() * 60000)
        .toISOString()
        .split(".")[0],
    });
  };

  const handleReturnTime = (time, timeString) => {
    setReturnTime(time);
    setReturnJourney({
      PickUp: depature.DropOff,
      DropOff: depature.PickUp,
      ...returnJourney,
      TransferTime: timeString,
    });
  };

  const handleSwipeLocation = () => {
    if (locationType === 0) {
      setLocationType(1);
    } else {
      setLocationType(0);
    }
    setPickUpInput("");
    setDropInput("");
  };

  const handleInputChange = (e, type) => {
    if (type === "pickup") {
      setDepature({ ...depature, PickUp: undefined });
    } else {
      setDepature({ ...depature, DropOff: undefined });
    }

    setCurrentInput(e.target.name);
    if (type === "pickup") {
      setPickUpInput(e.target.value);
    } else {
      setDropInput(e.target.value);
    }

    let data;
    if (e.target.name === "Hotel") {
      data = {
        type: "TransferAccomodationDetail",
        name: e.target.value,
      };
    } else {
      data = {
        type: "TransferAirportDetail",
        name: e.target.value,
      };
    }

    if (e.target.value.length > 2) {
      dispatch(fetchAirHotelData(data));
    } else {
      setDropList([]);
      setPickUpList([]);
    }
  };

  const handleListInput = (val, type) => {
    if (type === "pickup") {
      setPickUpList([]);
      setPickUpInput(val.name);
      let Pickup = {
        LocationType:
          pickUpType === "Hotel"
            ? "TransferAccomodationDetail"
            : "TransferAirportDetail",
        cityId: val.cityId,
        cityName: val.cityName,
        countryCode: val.countryCode,
        locationName: val.name,
        code: val.code,
      };
      setDepature({ ...depature, PickUp: Pickup });
      setReturnJourney({ ...returnJourney, DropOff: Pickup });
    } else {
      setDropList([]);
      setDropInput(val.name);

      let drop = {
        LocationType:
          dropType === "Hotel"
            ? "TransferAccomodationDetail"
            : "TransferAirportDetail",
        cityId: val.cityId,
        cityName: val.cityName,
        countryCode: val.countryCode,
        locationName: val.name,
        code: val.code,
      };
      setDepature({ ...depature, DropOff: drop });
      setReturnJourney({ ...returnJourney, PickUp: drop });
    }
  };

  const validate = () => {
    let errors = {};
    if (pickupRef.current.value === "") {
      errors.pickup = "Enter Name of Pickup Location!";
    } else if (
      pickupRef.current.value !== "" &&
      depature.PickUp === undefined
    ) {
      errors.pickup = "Select a Valid Pickup Location!";
    }

    if (dropRef.current.value === "") {
      errors.drop = "Enter Name of Drop off Location";
    } else if (dropRef.current.value !== "" && depature.DropOff === undefined) {
      errors.drop = "Select a Valid Drop Location!";
    }

    if (depature.TransferDate === undefined) {
      errors.transferDate = "Please Select Date of Transfer!";
    }

    if (pickupTime === "") {
      errors.pickupTime = "Please Select Pickup Time!";
    }

    if (tripType === "roundtrip") {
      if (returnDate === "" || returnTime === "") {
        errors.return = "Please Select Return Date And Time!";
      }
    }

    return errors;
  };

  const checkErrors = (name) => {
    let check = validate();

    if (name in check) {
      setFormErrors({ ...formErrors, [name]: check[name] });
    } else {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  };

  return (
    <>
      <div className="catgories-detail position-relative">
        <div className="select-type">
          <label>
            <input
              type="radio"
              value="oneway"
              checked={tripType === "oneway"}
              onChange={handleCheckBox}
            />
            <span> One Way</span>
          </label>
          <label>
            <input
              type="radio"
              value="roundtrip"
              checked={tripType === "roundtrip"}
              onChange={handleCheckBox}
            />
            <span> Round Trip</span>
          </label>
        </div>
        <form action="">
          <div className="form-group position-relative">
            <span
              className="left-right-arrow position-absolute cursor-pointer transfer-left-right-arrow"
              onClick={handleSwipeLocation}
            >
              <img
                src="assets/images/flight/left-right.svg"
                alt="left-right-arrow"
              />
            </span>
            <div className="categories-icon">
              {locationType === 0 ? (
                <img
                  src="assets/images/transfer/fromAirport.png"
                  alt="location"
                />
              ) : (
                <img src="assets/images/location.svg" alt="location" />
              )}
            </div>
            <div className="categories-detail-list">
              <label htmlFor="">
                {locationType === 0 ? "From Airtport" : "From Hotel"}{" "}
              </label>
              <input
                type="text"
                placeholder="Dubai, United Arab..."
                autoComplete="off"
                name={pickUpType}
                value={pickUpInput}
                onChange={(e) => handleInputChange(e, "pickup")}
                onBlur={(e) => {
                  setPickUpList([]);
                  checkErrors("pickup");
                }}
                ref={pickupRef}
                className="form-control"
              />
              <span className="text-danger">{formErrors?.pickup}</span>
            </div>
            <ul
              className={
                pickUpList.length > 0
                  ? "d-block transferss-detail-list"
                  : "d-none"
              }
            >
              {pickUpList.length > 0 &&
                pickUpList.map((val, i) => (
                  <li
                    onMouseDown={() => handleListInput(val, "pickup")}
                    key={i}
                  >
                    {val.name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="form-group">
            <div className="categories-icon">
              {/* <img src="assets/images/location.svg" alt="location" /> */}
              {locationType === 0 ? (
                <img src="assets/images/location.svg" alt="location" />
              ) : (
                <img
                  src="assets/images/transfer/toAirport.png"
                  alt="location"
                />
              )}
            </div>

            <div className="categories-detail-list">
              <label htmlFor="">
                {locationType === 1 ? "To Airport" : "To Hotel"}{" "}
              </label>
              <input
                type="text"
                placeholder="Dubai, United Arab..."
                name={dropType}
                value={dropInput}
                autoComplete="off"
                onChange={(e) => handleInputChange(e, "drop")}
                onBlur={() => {
                  setDropList([]);
                  checkErrors("drop");
                }}
                ref={dropRef}
                className="form-control"
              />
              <span className="text-danger">{formErrors?.drop}</span>
            </div>
            <ul
              className={
                dropList.length > 0
                  ? "d-block transferss-detail-list"
                  : "d-none"
              }
            >
              {dropList.length > 0 &&
                dropList.map((val, i) => (
                  <li onMouseDown={() => handleListInput(val, "drop")} key={i}>
                    {val.name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="form-group">
            <div className="categories-icon">
              <img src="assets/images/calendar.svg" alt="flight" />
            </div>
            <div className="categories-detail-list">
              <div className="categories-detail-list">
                <label htmlFor="">Pickup Date</label>
                <div className="btn-group">
                  <DatePicker
                    placeholderText="YYYY/MM/DD"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="yyyy-MM-dd"
                    name="pickupdate"
                    autoComplete="off"
                    minDate={startPickup}
                    maxDate={endDateAll}
                    selected={pickUpDate}
                    onBlur={() => checkErrors("transferDate")}
                    className="form-control"
                    onChange={handlePickupdate}
                  />
                </div>
                <span className="text-danger">{formErrors?.transferDate}</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="categories-icon">
              <img src="assets/images/clock.svg" alt="return" />
            </div>
            <div className="categories-detail-list">
              <div className="categories-detail-list">
                <label htmlFor="">Pickup Time</label>
                <TimePicker
                  bordered={false}
                  format={"HH:mm"}
                  use12Hours
                  onChange={handlePickupTime}
                  onBlur={() => checkErrors("pickupTime")}
                  value={pickupTime}
                />
                <span className="text-danger">{formErrors?.pickupTime}</span>
              </div>
            </div>
          </div>
          {/*  */}
          {tripType === "roundtrip" && (
            <div className="form-group">
              <div className="categories-icon">
                <img src="assets/images/flight/flight.svg" alt="flight" />
              </div>
              <div className="categories-detail-list">
                <div className="categories-detail-list">
                  <label htmlFor="">Add Return</label>
                  <div className="btn-group d-flex flex-column">
                    {/* <span
                    // onClick={() => handleReturnTransfer("open")}
                    > */}
                    {/* Add Return */}
                    <input
                      type="text"
                      onClick={() => handleReturnTransfer("open")}
                      placeholder="Return Time and Date"
                      value={returnInput}
                      readOnly
                      autoComplete="off"
                      // onChange={()=>}
                    />
                    {/* </span> */}
                  </div>
                  <div className={`return-popup ${returnPopup}`}>
                    <div className="return-calender">
                      <img src="assets/images/calendar.svg" />
                      <DatePicker
                        placeholderText="YYYY/MM/DD"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy-MM-dd"
                        name="returnDate"
                        autoComplete="off"
                        minDate={minReturn}
                        maxDate={endDateAll}
                        selected={returnDate}
                        className="form-control"
                        onChange={handleReturnDate}
                      />
                    </div>
                    <div className="return-time">
                      <img src="assets/images/clock.svg" />
                      <TimePicker
                        bordered={false}
                        format={"HH:mm"}
                        use12Hours
                        onChange={handleReturnTime}
                        value={returnTime}
                      />
                    </div>
                    <span
                      className="cmn-btn"
                      onClick={() => handleReturnTransfer("close")}
                    >
                      Confirm
                    </span>
                  </div>
                </div>
                <span className="text-danger">{formErrors?.return}</span>
              </div>
            </div>
          )}

          <div className="form-group">
            <div className="categories-icon">
              <img src="assets/images/flight/travel.svg" alt="travel" />
            </div>
            <div className="categories-detail-list">
              <label htmlFor="">Travellers</label>
              <div className="people-counter">
                <Counter
                  count={travellersCount}
                  inc={incCount}
                  dec={decCount}
                  max={7}
                  min={1}
                />
              </div>
            </div>
          </div>

          <SearchButton func={handleFormSubmit} />
        </form>
      </div>
    </>
  );
};

export default TransferForm;
