import React, { useState } from "react";
import DatePicker from "react-datepicker";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllCarsAsync } from "../../features/bookings/carrentSlice";
import SearchButton from "../UI/SearchButton";
import { TimePicker } from "antd";
import { useEffect } from "react";
import moment from "moment";
import { diff_hours } from "../../helpers/helper";
import { useForm } from "../../hooks/useForm";

const CarrentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [state, setState] = useState({
  //   // pickUp: "",
  //   pickupDate: "",
  //   pickupTime: "",
  //   dropDate: "",
  //   dropTime: "",
  // });
  // const [isSubmit, setIsSubmit] = useState(false);
  // const [formErrors, setFormErrors] = useState({});
  const [pickUp, setPickUp] = useState("");

  const customValidate = (errors) => {
    if (pickUp === "") {
      errors.pickupLocation = "Pickup Location Is Required!";
    }
    if (
      diff_hours(
        new Date(state.pickupDate + " " + state.pickupTime),
        new Date(state.dropDate + " " + state.dropTime)
      ) < 5
    )
      errors.hourDiff = "Please atleast 5 hours Journey";
  };

  const {
    state,
    isSubmit,
    formErrors,
    // handleInputChange,
    handleFormSubmit,
    checkErrors,
    setState,
    setFormErrors,
  } = useForm({
    val: {
      pickupDate: "",
      pickupTime: "",
      dropDate: "",
      dropTime: "",
    },
    inValidate: customValidate,
  });

  const [startPickup, setStartPickup] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );
  const endDateAll = new Date().setFullYear(new Date().getFullYear() + 1);

  const [location, setLocation] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickUpTime] = useState("");

  const [dropDate, setDropDate] = useState("");
  const [dropTime, setDropTime] = useState("");

  useEffect(() => {
    let timings = JSON.parse(sessionStorage.getItem("timings"));
    if (timings !== null) {
      setState(timings);
      const { pickupDate, dropDate, pickupTime, dropTime } = timings;

      setPickupDate(
        new Date(pickupDate).getTime() -
          new Date(pickupDate).getTimezoneOffset() * 60000
      );
      setDropDate(
        new Date(dropDate).getTime() -
          new Date(dropDate).getTimezoneOffset() * 60000
      );

      setPickUpTime(moment(pickupTime, "HH:mm"));
      setDropTime(moment(dropTime, "HH:mm"));

      let location = JSON.parse(sessionStorage.getItem("location"));

      if (location !== null) {
        // setPickUp(location.pickUp);
        dispatch(fetchAllCarsAsync());
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let location = {
        latitude,
        longitude,
        pickUp,
      };
      sessionStorage.setItem("location", JSON.stringify(location));
      let timings = state;
      sessionStorage.setItem("timings", JSON.stringify(timings));

      dispatch(fetchAllCarsAsync());
      navigate("/carrent-listing");
    }
  }, [formErrors, isSubmit]);

  const getlatlong = (value) => {
    let total = value.value.terms.length - 1;

    setPickUp(value.label);

    geocodeByAddress(value.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setLatitude(lat);
        setLongitude(lng);
      });
    setLocation({ pickup: value, lat: latitude, lng: longitude });
  };

  const handlePickupdate = (e) => {
    if (e !== null) {
      setPickupDate(e.getTime() - e.getTimezoneOffset() * 60000);
      setState({
        ...state,
        pickupDate: new Date(e.getTime() - e.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0],
      });
      setFormErrors({ ...formErrors, pickupDate: "" });
      //
      if (new Date(e) > new Date(dropDate)) {
        setDropDate(e.getTime() - e.getTimezoneOffset() * 60000);
        setState({
          ...state,
          dropDate: new Date(e.getTime() - e.getTimezoneOffset() * 60000)
            .toISOString()
            .split("T")[0],
        });
        setFormErrors({ ...formErrors, dropDate: "" });
      }
    }
  };

  const handleDropdate = (e) => {
    setDropDate(e.getTime() - e.getTimezoneOffset() * 60000);
    setState({
      ...state,
      dropDate: new Date(e.getTime() - e.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0],
    });
    setFormErrors({ ...formErrors, dropDate: "" });
  };

  const handlePickupTime = (time, timeString) => {
    setPickUpTime(time);
    setState({
      ...state,
      pickupTime: timeString,
    });
  };

  const handleDropTime = (time, timeString) => {
    setDropTime(time);
    setState({
      ...state,
      dropTime: timeString,
    });
  };

  // const validate = () => {
  //   let errors = {};

  //   Object.keys(state).map((ele) => {
  //     if (state[ele].trim() === "") {
  //       errors[ele] = `${ele} is Required!`;
  //     }
  //   });

  //   if (pickUp === "") {
  //     errors.pickupLocation = "Pickup Location Is Required!";
  //   }

  //   if (
  //     diff_hours(
  //       new Date(state.pickupDate + " " + state.pickupTime),
  //       new Date(state.dropDate + " " + state.dropTime)
  //     ) < 5
  //   )
  //     errors.hourDiff = "Please atleast 5 hours Journey";

  //   return errors;
  // };

  // const checkErrors = (name) => {
  //   let check = validate();

  //   if (name in check) {
  //     setFormErrors({ ...formErrors, [name]: check[name] });
  //   } else {
  //     setFormErrors({ ...formErrors, [name]: "" });
  //   }
  // };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate());
  //   setIsSubmit(true);
  // };

  return (
    <>
      <div className="catgories-detail position-relative car-rental">
        <span>{formErrors?.hourDiff}</span>
        <form action="">
          <div className="d-flex flight-form flex-wrap">
            <div className="form-group position-relative add-pickup">
              <div className="categories-icon">
                <img src="assets/images/location.svg" alt="location" />
              </div>
              <div className="categories-detail-list">
                <label htmlFor="">Pickup Location</label>
                <GooglePlacesAutocomplete
                  selectProps={{
                    pickUp,
                    onChange: getlatlong,
                  }}
                  apiKey="AIzaSyBFfyjMZc09fI5_T7rQPS80cJGeh37tclw"
                />
              </div>
              <span className="text-danger">{formErrors?.pickupLocation}</span>
            </div>
            <div className="form-group">
              <div className="categories-icon">
                <img src="assets/images/calendar.svg" alt="flight" />
              </div>
              <div className="categories-detail-list">
                <label htmlFor="">Pickup Date</label>
                <DatePicker
                  placeholderText="YYYY/MM/DD"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="yyyy-MM-dd"
                  name="pickupDate"
                  autoComplete="off"
                  minDate={startPickup}
                  maxDate={endDateAll}
                  selected={pickupDate}
                  onBlur={(e) => checkErrors(e)}
                  className="form-control"
                  onChange={handlePickupdate}
                />
                <span className="text-danger">{formErrors?.pickupDate}</span>
              </div>
            </div>
            {/*  */}
            <div className="form-group ">
              <div className="categories-icon">
                <img src="assets/images/flight/flight.svg" alt="flight" />
              </div>
              <div className="categories-detail-list">
                <label htmlFor="">Pickup Time</label>
                <TimePicker
                  bordered={false}
                  format={"HH:mm"}
                  use12Hours
                  onChange={handlePickupTime}
                  name="pickupTime"
                  className="form-control"
                  onBlur={(e) => checkErrors(e)}
                  value={pickupTime}
                />
                <span className="text-danger">{formErrors?.pickupTime}</span>
              </div>
            </div>
            {/*  */}
            <div className="form-group">
              <div className="categories-icon">
                <img src="assets/images/flight/return.svg" alt="return" />
              </div>
              <div className="categories-detail-list">
                <div className="categories-detail-list">
                  <label htmlFor="">DropOff Date</label>
                  <DatePicker
                    placeholderText="YYYY/MM/DD"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="yyyy-MM-dd"
                    name="dropDate"
                    autoComplete="off"
                    minDate={pickupDate}
                    maxDate={endDateAll}
                    selected={dropDate}
                    onBlur={(e) => checkErrors(e)}
                    className="form-control"
                    onChange={handleDropdate}
                  />
                  <span className="text-danger">{formErrors?.dropDate}</span>
                </div>
              </div>
            </div>

            <div className="form-group ">
              <div className="categories-icon">
                <img src="assets/images/flight/flight.svg" alt="flight" />
              </div>
              <div className="categories-detail-list">
                <div className="categories-detail-list">
                  <label htmlFor="">Drop off Time</label>
                  <TimePicker
                    bordered={false}
                    format={"HH:mm"}
                    use12Hours
                    onChange={handleDropTime}
                    className="form-control"
                    name="dropTime"
                    onBlur={(e) => checkErrors(e)}
                    value={dropTime}
                  />
                  <span className="text-danger">{formErrors?.dropTime}</span>
                </div>
              </div>
            </div>
            {/*  */}
          </div>

          <SearchButton func={handleFormSubmit} />
        </form>
      </div>
    </>
  );
};

export default CarrentForm;
