import React, { useEffect } from "react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { callingCode, Nationality } from "../../../../helpers/helper";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { flightBookAsync } from "../../../../features/bookings/flightSlice";

const FlightGuestForm = () => {
  const [guests, setGuests] = useState([]);

  const dispatch = useDispatch();

  const { adultsCount, childsCount, infantsCount } =
    JSON.parse(sessionStorage.getItem("flightForm")) || {};

  const [startDate, setStartDate] = useState(
    new Date().setFullYear(new Date().getFullYear() - 50)
  );
  const [endDate, setEndDate] = useState(
    new Date().setFullYear(new Date().getFullYear() - 5)
  );

  const customValidate = (errors) => {
    return errors;
  };

  const flightTrackingToken = JSON.parse(
    sessionStorage.getItem("flightTrackingToken")
  );

  const flightResultId = JSON.parse(sessionStorage.getItem("flightResultId"));

  const {
    state,
    setState,
    isSubmit,
    formErrors,
    handleInputChange,
    handleFormSubmit,
    checkErrors,
    handleInputDynamic,
    checkDyncErrors,
  } = useForm({
    val: {
      Email: "",
      MobileNo: "",
      CountryCode: "",
      Nationality: "",
      Address: "",
    },
    dyncVals: {
      items: guests,
      setItems: setGuests,
      arrItems: ["Title", "FirstName", "LastName", "Gender", "Dob"],
    },
    inValidate: customValidate,
  });

  // useEffect(()=>{
  //   dispa
  // },[])

  const handleDatePicker = (e, ind) => {
    let myDate = new Date(e.getTime() - e.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

    let update = guests;
    if (guests !== undefined && guests !== null) {
      update[ind]["Dob"] = myDate;
      let arr = [
        ...guests.slice(0, ind),
        update[ind],
        ...guests.slice(ind + 1),
      ];
      setGuests(arr);
    }
  };

  useEffect(() => {
    let arr = [];

    for (let index = 0; index < adultsCount; index++) {
      arr.push({
        FirstName: "",
        LastName: "",
        PassengerType: 1,
        Title: "",
        Type: "Adult",
        Gender: "",
        Dob: "",
      });
    }

    for (let index = 0; index < childsCount; index++) {
      arr.push({
        FirstName: "",
        LastName: "",
        PassengerType: 2,
        Title: "",
        Type: "Child",
        Gender: "",
        Dob: "",
      });
    }

    for (let index = 0; index < infantsCount; index++) {
      arr.push({
        FirstName: "",
        LastName: "",
        PassengerType: 3,
        Title: "",
        Type: "Infant",
        Gender: "",
        Dob: "",
      });
    }
    setGuests(arr);
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(
        flightBookAsync({
          state,
          guests,
          ResultId: flightResultId,
          TokenId: flightTrackingToken.flightTokenId,
          TrackingId: flightTrackingToken.flightTrackingId,
        })
      );
    }
  }, [formErrors, isSubmit]);

  return (
    <>
      <div className="review-booking-wrapper guest-details-wrapper">
        <form action="" className="guest-detail-form">
          {/*  */}
          {guests.map((ele, ind) => {
            return (
              <div key={ind}>
                <h5 className="">
                  Guest {ind + 1} <span>{ele.Type}</span>
                </h5>
                <div className="name-detail flex-wrap">
                  <div className="form-group">
                    <label htmlFor="">Title</label>
                    <select
                      name="Title[]"
                      className="form-control"
                      onChange={(e) => handleInputDynamic(ind, e)}
                      onBlur={(e) => checkDyncErrors(ind, e)}
                      autoComplete="off"
                    >
                      <option value="">Title</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                    </select>
                    <span className="error">{formErrors[ind]?.Title}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      name="FirstName[]"
                      onChange={(e) => handleInputDynamic(ind, e)}
                      onBlur={(e) => checkDyncErrors(ind, e)}
                      autoComplete="off"
                    />
                    <span className="error">{formErrors[ind]?.FirstName}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      name="LastName[]"
                      onChange={(e) => handleInputDynamic(ind, e)}
                      autoComplete="off"
                      onBlur={(e) => checkDyncErrors(ind, e)}
                    />
                    <span className="error">{formErrors[ind]?.LastName}</span>
                  </div>
                  {/*  */}
                  <div className="form-group">
                    <label htmlFor="">Date of birth</label>
                    <ReactDatePicker
                      onChange={(e) => handleDatePicker(e, ind)}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      minDate={startDate}
                      maxDate={endDate}
                      value={ele.Dob}
                      dateFormat="yyyy/MM/dd"
                      name="Dob"
                      placeholderText="yyyy/MM/dd"
                      onBlur={(e) => checkDyncErrors(ind, e)}
                      className="form-control"
                      style={{ Zindex: "100" }}
                    />
                    <span className="error">{formErrors[ind]?.Dob}</span>
                  </div>
                  {/*  */}
                  <div className="form-group position-relative">
                    <div className="select-arrow"></div>
                    <label htmlFor="">Gender</label>
                    <select
                      name="Gender[]"
                      onChange={(e) => handleInputDynamic(ind, e)}
                      onBlur={(e) => checkDyncErrors(ind, e)}
                    >
                      <option value="">Select Gender</option>
                      {["Male", "Female"].map((ele, ind) => (
                        <option value={ind + 1} key={ind}>
                          {ele}
                        </option>
                      ))}
                    </select>
                    <span className="error">{formErrors[ind]?.Gender}</span>
                  </div>
                  {/*  */}
                </div>
              </div>
            );
          })}

          <div className="form-group my-4">
            <label htmlFor="">
              Email Address{" "}
              <span className="medium14">
                (Your booking voucher will be sent to this email address)
              </span>
            </label>
            <input
              type="Email"
              placeholder="Enter Email Address"
              autoComplete="off"
              name="Email"
              value={state.Email}
              onChange={handleInputChange}
              onBlur={(e) => checkErrors(e)}
            />
            <span className="error">{formErrors?.Email}</span>
          </div>

          <div className="name-detail mobile-number flex-wrap">
            <div className="form-group position-relative">
              <div className="select-arrow"></div>
              <label htmlFor="">Country code</label>
              <select
                name="CountryCode"
                onChange={handleInputChange}
                onBlur={(e) => checkErrors(e)}
              >
                <option value="">Select Country code</option>
                {callingCode.map((ele, ind) => (
                  <option key={ind} value={ele.value}>
                    {ele.label}
                  </option>
                ))}
              </select>
              <p className="text-danger">{formErrors?.CountryCode}</p>
            </div>
            {/*  */}

            <div className="form-group">
              <label htmlFor="">Mobile Number </label>
              <input
                type="text"
                placeholder="Enter Mobile Number"
                autoComplete="off"
                name="MobileNo"
                value={state.MobileNo}
                onChange={handleInputChange}
                onBlur={(e) => checkErrors(e)}
              />
              <span className="error">{formErrors?.MobileNo}</span>
            </div>
            {/*  */}

            <div className="form-group position-relative">
              <div className="select-arrow"></div>
              <label htmlFor="">Nationality</label>
              <select
                name="Nationality"
                onChange={handleInputChange}
                onBlur={(e) => checkErrors(e)}
              >
                <option value="">Select Nationality</option>
                {Nationality.map((ele, ind) => (
                  <option key={ind} value={ele.value}>
                    {ele.label}
                  </option>
                ))}
              </select>
              <p className="text-danger">{formErrors?.Nationality}</p>
            </div>
          </div>
          {/*  */}
          <div className="form-group my-4">
            <label htmlFor="">Address: </label>
            <input
              type="Address"
              placeholder="Enter Your Address"
              autoComplete="off"
              name="Address"
              value={state.Address}
              onChange={handleInputChange}
              onBlur={(e) => checkErrors(e)}
            />
            <span className="error">{formErrors?.Address}</span>
          </div>

          {/*  */}
        </form>
      </div>

      <div>
        <button
          onClick={handleFormSubmit}
          className="cmn-btn reserve-btn d-block w-100"
        >
          Proceed To Payment
        </button>
      </div>
    </>
  );
};

export default FlightGuestForm;
