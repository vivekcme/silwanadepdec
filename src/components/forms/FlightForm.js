import React, { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  getCounts,
  adultInc,
  adultDec,
  childInc,
  childDec,
  infantInc,
  infantDec,
  fetchAirportsAsync,
  getAirportsList,
  flightSearchAsync,
  getLoading,
  setFlightCounts,
} from "../../features/bookings/flightSlice";
import Counter from "../UI/Counter";
import { useForm } from "../../hooks/useForm";
import SearchButton from "../UI/SearchButton";
import moment from "moment";
import Loader from "../../helpers/Loader";
import { useNavigate } from "react-router-dom";

const FlightForm = () => {
  // const [state, setState] = useState({
  //   departureDate: "",
  // });

  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropoff] = useState("");

  const [tripType, setTripType] = useState("1");

  const customValidate = (errors) => {
    if (pickUp.trim() !== "" && state["pickUp"] === "") {
      errors.pickUp = "Please Select A Valid Airport!";
    }
    if (dropOff.trim() !== "" && state["dropOff"] === "") {
      errors.dropOff = "Please Select A Valid Airport!";
    }

    if (state["DepartureDate"].trim() === "") {
      errors.DepartureDate = "Please Select Date!";
    }

    if (tripType === "2") {
      if (state["ReturnDate"]?.trim() === "") {
        errors.ReturnDate = "Select Return Date!";
      }
    } else {
      delete errors["ReturnDate"];
    }

    return errors;
  };

  const {
    state,
    setState,
    handleFormSubmit,
    formErrors,
    checkErrors,
    isSubmit,
  } = useForm({
    val: { pickUp: "", dropOff: "", DepartureDate: "", ReturnDate: "" },
    inValidate: customValidate,
  });

  const [locationType, setLocationType] = useState(0);

  const [fareType, setFareType] = useState("regular");
  const [travelClass, setTravelClass] = useState("1");
  const [focused, setFocused] = useState("");

  const [dropdown, setDropdown] = useState("");
  const [placeHolder, setPlaceHolder] = useState(
    "1 Adult - 0 Child - 0 Infant"
  );
  const [departure, setDeparture] = useState(
    new Date().setFullYear(new Date().getFullYear())
  );
  const [returnDate, setReturnDate] = useState("");
  const todayMinDate = new Date().setFullYear(new Date().getFullYear());
  const endDateAll = new Date().setFullYear(new Date().getFullYear() + 1);
  const [minReturn, setMinReturn] = useState(todayMinDate);

  const [pickUpList, setPickupList] = useState([]);
  const [dropOffList, setDropoffList] = useState([]);

  const { adultsCount, childsCount, infantsCount } = useSelector(getCounts);
  const airList = useSelector(getAirportsList);
  const loading = useSelector(getLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setPickupList([]);
    setDropoffList([]);
  }, [window.location.pathname]);

  useEffect(() => {
    if (airList.length > 0) {
      if (focused === "pickUp") {
        setPickupList(airList);
      } else if (focused === "dropOff") {
        setDropoffList(airList);
      }
    }
  }, [airList, focused]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(
        flightSearchAsync({
          state,
          adultsCount,
          childsCount,
          infantsCount,
          travelClass,
          tripType,
        })
      );

      sessionStorage.setItem(
        "flightForm",
        JSON.stringify({
          state,
          adultsCount,
          childsCount,
          infantsCount,
          travelClass,
          tripType,
        })
      );

      navigate({
        pathname: "/flight-listing",
      });
    }
  }, [formErrors, isSubmit]);

  useEffect(() => {
    const val = JSON.parse(sessionStorage.getItem("flightForm"));
    if (val !== null) {
      const { pickUp, dropOff, DepartureDate } = val.state || {};
      setPickUp(pickUp.name);
      setDropoff(dropOff.name);
      setState({ ...state, pickUp, dropOff, DepartureDate });

      const { adultsCount, childsCount, infantsCount } = val;
      setPlaceHolder(
        `${adultsCount} Adult - ${childsCount} Child, ${infantsCount} Infants`
      );
      dispatch(setFlightCounts({ adultsCount, childsCount, infantsCount }));
    }
  }, []);

  const handleDepartureDate = (e) => {
    let myDate = new Date(e.getTime() - e.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    setDeparture(e.getTime() - e.getTimezoneOffset() * 60000);
    setState({ ...state, DepartureDate: myDate });

    let tm = moment(myDate).add(1, "days")._d;
    setMinReturn(tm.getTime() - tm.getTimezoneOffset() * 60000);

    if (new Date(myDate) >= new Date(returnDate)) {
      setReturnDate(tm.getTime() - tm.getTimezoneOffset() * 60000);
      setState({
        ...state,
        ReturnDate: new Date(tm).toISOString().split("T")[0],
        DepartureDate: myDate,
      });
    }
  };

  const handleReturnDate = (e) => {
    let myDate = new Date(e.getTime() - e.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    setReturnDate(e.getTime() - e.getTimezoneOffset() * 60000);
    setState({ ...state, ReturnDate: myDate });
  };

  const handleRadioButtonChange = (e) => {
    setTripType(e.target.value);
  };

  const handleFareChange = (e) => {
    setFareType(e.target.value);
  };

  const handleClassChange = (e) => {
    setTravelClass(e.target.value);
  };

  const handleSwipeLocation = () => {
    let tmp = pickUp;
    setPickUp(dropOff);
    setDropoff(tmp);

    tmp = state.pickUp;
    setState({ ...state, pickUp: state.dropOff, dropOff: tmp });
  };

  const hadnleApplyBtn = () => {
    setDropdown("");
    setPlaceHolder(
      `${adultsCount} Adult - ${childsCount} Child, ${infantsCount} Infants`
    );
  };

  const handleInputChange = (e) => {
    if (e.target.value.length < 2) {
      setPickupList([]);
      setDropoffList([]);
    }
    if (e.target.name === "pickUp") {
      setPickUp(e.target.value);
      setState({ ...state, pickUp: "" });
    } else {
      setDropoff(e.target.value);
      setState({ ...state, dropOff: "" });
    }
    setFocused(e.target.name);
    dispatch(fetchAirportsAsync(e.target.value));
  };

  const handleListInput = (value, type) => {
    if (type === "pickUp") {
      setPickupList([]);
      setPickUp(value.name);
      setState({ ...state, pickUp: value });
    } else {
      setDropoff(value.name);
      setDropoffList([]);
      setState({ ...state, dropOff: value });
    }
  };

  return (
    <>
      <div className="catgories-detail position-relative">
        <div className="select-type">
          <label>
            <input
              type="radio"
              name="radio"
              checked={tripType === "1"}
              value="1"
              onChange={handleRadioButtonChange}
            />
            <span>Oneway</span>
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              value="2"
              checked={tripType === "2"}
              onChange={handleRadioButtonChange}
            />
            <span>Round Trip</span>
          </label>
        </div>
        <form action="" className="flight-form">
          <div className="form-group position-relative">
            <button
              type="button"
              className="left-right-arrow position-absolute"
              onClick={handleSwipeLocation}
            >
              <img
                src="assets/images/flight/left-right.svg"
                alt="left-right-arrow"
              />
            </button>
            <div className="categories-icon">
              <img src="assets/images/location.svg" alt="location" />
            </div>
            <div className="categories-detail-list">
              <label htmlFor="">From</label>
              {/* <h5>Ahmedabad</h5> */}
              <input
                type="text"
                placeholder="Sardar Vallabhbhai..."
                onChange={handleInputChange}
                onBlur={(e) => {
                  setPickupList([]);
                  checkErrors(e);
                }}
                name="pickUp"
                value={pickUp}
                autoComplete="off"
              />
              <span className="text-danger">{formErrors?.pickUp}</span>
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
                    onMouseDown={() => handleListInput(val, "pickUp")}
                    key={i}
                  >
                    {val.name}
                  </li>
                ))}
            </ul>
          </div>
          {/*  */}
          <div className="form-group">
            <div className="categories-icon">
              <img src="assets/images/location.svg" alt="location" />
            </div>
            <div className="categories-detail-list">
              <label htmlFor="">To</label>
              {/* <h5>Dubai</h5> */}
              <input
                type="text"
                placeholder="DXB, Dubai Internati..."
                onChange={handleInputChange}
                name="dropOff"
                onBlur={(e) => {
                  setDropoffList([]);
                  checkErrors(e);
                }}
                value={dropOff}
                autoComplete="off"
              />
              <span className="text-danger">{formErrors?.dropOff}</span>
            </div>
            <ul
              className={
                dropOffList.length > 0
                  ? "d-block transferss-detail-list"
                  : "d-none"
              }
            >
              {dropOffList.length > 0 &&
                dropOffList.map((val, i) => (
                  <li
                    onMouseDown={() => handleListInput(val, "dropOff")}
                    key={i}
                  >
                    {val.name}
                  </li>
                ))}
            </ul>
            {/*  */}
          </div>
          <div className="form-group">
            <div className="categories-icon">
              <img src="assets/images/flight/flight.svg" alt="flight" />
            </div>
            <div className="categories-detail-list">
              <div className="categories-detail-list">
                <label htmlFor="">Departure</label>
                <DatePicker
                  onChange={handleDepartureDate}
                  peekNextMonth
                  showMonthDropdown
                  selected={departure}
                  showYearDropdown
                  dropdownMode="select"
                  minDate={todayMinDate}
                  maxDate={endDateAll}
                  dateFormat="yyyy-MM-dd"
                  name="DepartureDate"
                  placeholderText="yyyy/MM/dd"
                  value={state.DepartureDate}
                  // onFocus={(e) => setErrors(e)}
                  className="form-control"
                  style={{ Zindex: "100" }}
                  autoComplete="off"
                  onBlur={(e) => checkErrors(e)}
                />
                <p className="text-danger">{formErrors?.DepartureDate}</p>
              </div>
            </div>
          </div>

          {tripType === "2" && (
            <div className="form-group">
              <div className="categories-icon">
                <img src="assets/images/flight/return.svg" alt="return" />
              </div>
              <div className="categories-detail-list">
                <div className="categories-detail-list">
                  <label htmlFor="">Return</label>
                  <DatePicker
                    onChange={handleReturnDate}
                    peekNextMonth
                    showMonthDropdown
                    selected={returnDate}
                    showYearDropdown
                    dropdownMode="select"
                    minDate={minReturn}
                    maxDate={endDateAll}
                    dateFormat="yyyy-MM-dd"
                    name="ReturnDate"
                    placeholderText="yyyy/MM/dd"
                    value={state.ReturnDate}
                    // onFocus={(e) => setErrors(e)}
                    className="form-control"
                    style={{ Zindex: "100" }}
                    autoComplete="off"
                    onBlur={(e) => checkErrors(e)}
                  />
                  <p className="text-danger">{formErrors?.ReturnDate}</p>
                </div>
              </div>
            </div>
          )}
          <div className="form-group">
            <div className="categories-icon">
              <img src="assets/images/flight/travel.svg" alt="travel" />
            </div>
            <div className="categories-detail-list">
              <label htmlFor="">Travellers &amp; Class</label>
              <div className="btn-group">
                <ul
                  className={`dropdown-menu ${dropdown}`}
                  aria-labelledby="dropdownMenuClickableInside"
                >
                  <li>
                    <div className="dropdown-item" href="#">
                      <div className="people-counter">
                        <div className="input-group text-center">
                          <div>
                            <h5 className="semi16">Adults</h5>
                            <h6 className="medium12">(Aged 12+ yrs)</h6>
                          </div>
                          <Counter
                            count={adultsCount}
                            max={8}
                            min={1}
                            inc={adultInc}
                            dec={adultDec}
                          />
                        </div>
                        <div className="input-group text-center">
                          <div>
                            <h5 className="semi16">Children</h5>
                            <h6 className="medium12">(Aged 2-12 yrs)</h6>
                          </div>
                          <Counter
                            count={childsCount}
                            max={4}
                            min={0}
                            inc={childInc}
                            dec={childDec}
                          />
                        </div>
                        <div className="input-group text-center">
                          <div>
                            <h5 className="semi16">Infants</h5>
                            <h6 className="medium12">(Below 2 yrs)</h6>
                          </div>
                          <Counter
                            count={infantsCount}
                            max={adultsCount}
                            min={0}
                            inc={infantInc}
                            dec={infantDec}
                          />
                        </div>
                      </div>
                      <div className="select-travel-class">
                        <h3 className="title">Travel Class</h3>
                        <div className="select-type">
                          <label>
                            <input
                              type="radio"
                              name="travelClass"
                              value="1"
                              checked={travelClass === "1"}
                              onChange={handleClassChange}
                            />
                            <span>All</span>
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="travelClass"
                              value="2"
                              checked={travelClass === "2"}
                              onChange={handleClassChange}
                            />
                            <span>Economy</span>
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="travelClass"
                              value="3"
                              checked={travelClass === "3"}
                              onChange={handleClassChange}
                            />
                            <span>Premium Economy</span>
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="travelClass"
                              value="4"
                              checked={travelClass === "4"}
                              onChange={handleClassChange}
                            />
                            <span>Business</span>
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="travelClass"
                              value="6"
                              checked={travelClass === "6"}
                              onChange={handleClassChange}
                            />
                            <span>First Class</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <a className="cmn-btn" onClick={hadnleApplyBtn}>
                        Apply
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              <input
                type="text"
                onFocus={() => setDropdown("show")}
                placeholder={placeHolder}
              />
            </div>
          </div>
          <SearchButton func={handleFormSubmit} />
        </form>

        <div className="select-type">
          <label>
            <input
              type="radio"
              name="fareType"
              value="regular"
              onChange={handleFareChange}
              checked={fareType === "regular"}
            />
            <span>Regular</span>
          </label>
          <label>
            <input
              type="radio"
              name="fareType"
              value="armedForces"
              onChange={handleFareChange}
              checked={fareType === "armedForces"}
            />
            <span>Armed Forces</span>
          </label>
          <label>
            <input
              type="radio"
              name="fareType"
              value="student"
              onChange={handleFareChange}
              checked={fareType === "student"}
            />
            <span>Student</span>
          </label>
          <label>
            <input
              type="radio"
              name="fareType"
              value="seniorCitizen"
              onChange={handleFareChange}
              checked={fareType === "seniorCitizen"}
            />
            <span>Senior Citizen</span>
          </label>
          <label>
            <input
              type="radio"
              name="fareType"
              value="doubleSeat"
              onChange={handleFareChange}
              checked={fareType === "doubleSeat"}
            />
            <span>Double Seat</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default FlightForm;
