import React, { useEffect, useState } from "react";
import { callingCode } from "../../../../helpers/helper";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getBookingStatus,
  resetTransferBooked,
  transferBookAsync,
  transferReturnBookAsync,
} from "../../../../features/bookings/transferSlice";
import SuccessModal from "../../../modals/SuccessModal";
import { useForm } from "../../../../hooks/useForm";

const TravellerDetail = () => {
  // const [state, setState] = useState({
  //   Title: "Mr",
  //   FirstName: "",
  //   LastName: "",
  //   MobileNo: "",
  //   Email: "",
  //   countryCode: "",
  //   AirlineCode: "",
  //   HotelAddress: "",
  //   HotelCode: "",
  // });

  const customValidate = (errors) => {
    if (errors.AirlineCode === undefined && state.AirlineCode.length !== 3) {
      errors.AirlineCode = "Airline Code Must be Exact 3 Characters!";
    }

    if (errors.HotelCode === undefined && state.HotelCode.length !== 7) {
      errors.HotelCode = "Hotel Code Must be Exact 7 Characters!";
    }
  };

  const {
    state,
    setState,
    isSubmit,
    formErrors,
    // handleInputChange,
    handleFormSubmit,
    checkErrors,
  } = useForm({
    val: {
      Title: "Mr",
      FirstName: "",
      LastName: "",
      MobileNo: "",
      Email: "",
      CountryCode: "",
      AirlineCode: "",
      HotelAddress: "",
      HotelCode: "",
    },
    // dyncVals: {
    //   items: customers,
    //   setItems: setCustomers,
    //   arrItems: ["Title", "FirstName", "LastName"],
    // },
    inValidate: customValidate,
  });

  // const [isSubmit, setIsSubmit] = useState(false);
  // const [formErrors, setFormErrors] = useState({});

  const [pickUpDesp, setPickupDesp] = useState("");
  const [dropDesp, setdropDesp] = useState("");

  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");

  const [show, setShow] = useState(false);
  const signatureData = JSON.parse(sessionStorage.getItem("signatureData"));
  const { Authorization } = JSON.parse(sessionStorage.getItem("userData"));

  const dispatch = useDispatch();
  const bookingStatus = useSelector(
    (state) => state.transfer.bookingStatus,
    shallowEqual
  );

  useEffect(() => {
    let formDetail = JSON.parse(sessionStorage.getItem("departure"));

    setPickupDesp(formDetail.PickUp.LocationType);
    setdropDesp(formDetail.DropOff.LocationType);
    dispatch(resetTransferBooked());
  }, []);

  useEffect(() => {
    console.log(bookingStatus, "status");
    if (Object?.keys(bookingStatus).length > 0) {
      if (bookingStatus?.IsSuccess) {
        setMsg(
          "Your booking has been Confirmed. Check your emails for details."
        );
        setStatus("Awesome!");
      } else {
        setMsg("Something Went Wrong!");
        setStatus("Failed!");
      }
      setShow(true);
    }
  }, [bookingStatus]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let TrackingId = JSON.parse(sessionStorage.getItem("trackingId"));
      let BookingData = JSON.parse(sessionStorage.getItem("transferSelected"));

      if (JSON.parse(sessionStorage.getItem("roundTrip")) === true) {
        let returnData = JSON.parse(sessionStorage.getItem("returnSelected"));
        console.log("called", returnData);
        returnData !== null &&
          dispatch(
            transferReturnBookAsync({
              state,
              TrackingId,
              BookingData,
              returnData,
              Authorization,
              signatureData,
            })
          );
      } else {
        dispatch(
          transferBookAsync({
            state,
            TrackingId,
            BookingData,
            signatureData,
            Authorization,
          })
        );
      }
    }
  }, [formErrors, isSubmit]);

  const handleInputChange = (e) => {
    e.target.name === "AirlineCode"
      ? setState({ ...state, [e.target.name]: e.target.value.toUpperCase() })
      : setState({ ...state, [e.target.name]: e.target.value });
  };

  // const validate = () => {
  //   let errors = {};
  //   const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  //   Object.keys(state).map((ele) => {
  //     if (state[ele].trim() === "") {
  //       errors[ele] = `${ele} Is Required!`;
  //     }
  //   });

  //   if (errors.MobileNo === undefined && state.MobileNo.length !== 10) {
  //     errors.MobileNo = "Mobile Number Must be 10 Digits!";
  //   }

  //   if (errors.Email === undefined && !emailRegex.test(state.Email)) {
  //     errors.Email = "Please Enter A Valid Email!";
  //   }

  //   if (errors.AirlineCode === undefined && state.AirlineCode.length !== 3) {
  //     errors.AirlineCode = "Airline Code Must be Exact 3 Characters!";
  //   }

  //   if (errors.HotelCode === undefined && state.HotelCode.length !== 7) {
  //     errors.HotelCode = "Hotel Code Must be Exact 7 Characters!";
  //   }

  //   return errors;
  // };

  // const setErrors = (e) => {
  //   let newErrors = {};
  //   Object.keys(formErrors).filter((ele) => {
  //     return ele !== e.target.name
  //       ? Object.assign(newErrors, { [ele]: formErrors[ele] })
  //       : null;
  //   });
  //   setFormErrors(newErrors);
  //   setIsSubmit(false);
  // };

  // const checkErrors = (e) => {
  //   let check = validate();
  //   let name = e.target.name;

  //   if (name in check) {
  //     setFormErrors({ ...formErrors, [name]: check[name] });
  //   }
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate());
  //   setIsSubmit(true);
  // };
  return (
    <>
      <div className="transfer-inner-wrap">
        <h4 className="title mt-5">Travellers Details</h4>
        <div className="transfer-wrap border-0">
          <div className="transfer-inner">
            <div className="row">
              <div className="col-lg-12">
                <ul className="transfer-lists m-0 border-0 guest-details-wrapper">
                  <form className="guest-detail-form guest-detail-form-input">
                    <div>
                      <div
                        className="name-detail "
                        style={{ flexWrap: "wrap" }}
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label htmlFor="">Title</label>
                              <select
                                name="Title"
                                id="title"
                                autoComplete="off"
                                onChange={handleInputChange}
                              >
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label htmlFor="">First Name</label>
                              <input
                                type="text"
                                placeholder="Enter First Name"
                                name="FirstName"
                                value={state.FirstName}
                                onChange={handleInputChange}
                                // onFocus={(e) => setErrors(e)}
                                onBlur={(e) => checkErrors(e)}
                                autoComplete="off"
                              />
                              <span className="error">
                                {formErrors?.FirstName}
                              </span>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group my-2 ">
                              <label htmlFor="">Last Name</label>
                              <input
                                type="text"
                                placeholder="Enter Last Name"
                                name="LastName"
                                value={state.LastName}
                                onChange={handleInputChange}
                                // onFocus={(e) => setErrors(e)}
                                onBlur={(e) => checkErrors(e)}
                                autoComplete="off"
                              />
                              <span className="error">
                                {formErrors?.LastName}
                              </span>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label htmlFor="">Email Address</label>
                              <input
                                type="email"
                                name="Email"
                                placeholder="Enter Email Address"
                                value={state.value}
                                onChange={handleInputChange}
                                // onFocus={(e) => setErrors(e)}
                                onBlur={(e) => checkErrors(e)}
                                autoComplete="off"
                              />
                              <span className="error">{formErrors?.Email}</span>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group mobile-number-wrap">
                              <label htmlFor="">Country Code</label>
                              <div className="d-flex">
                                <div className="d-block">
                                  <select
                                    name="CountryCode"
                                    className="form-control"
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    // onFocus={(e) => setErrors(e)}
                                    onBlur={(e) => checkErrors(e)}
                                  >
                                    <option value="">
                                      Select Country code
                                    </option>
                                    {callingCode.map((ele, ind) => (
                                      <option key={ind} value={ele.value}>
                                        {ele.label}
                                      </option>
                                    ))}
                                  </select>
                                  <span className="error">
                                    {formErrors?.CountryCode}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group ">
                              <label
                                htmlFor=""
                                // className="mb-0 mobile-number-2-fild"
                              >
                                Mobile Number
                              </label>
                              <input
                                type="Number"
                                placeholder="Enter Phone Number"
                                name="MobileNo"
                                value={state.MobileNo}
                                onChange={handleInputChange}
                                // onFocus={(e) => setErrors(e)}
                                onBlur={(e) => checkErrors(e)}
                                autoComplete="off"
                              />
                              <span className="error">
                                {formErrors?.MobileNo}
                              </span>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div>
                              <h6 className="mt-md-4 mt-sm-4 add-pickup-txt">
                                Add Pickup Address
                              </h6>
                              <div className="pickup-address">
                                {pickUpDesp === "TransferAirportDetail" ? (
                                  <>
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        placeholder="Enter Airline Code"
                                        name="AirlineCode"
                                        value={state.AirlineCode}
                                        onChange={handleInputChange}
                                        // onFocus={(e) => setErrors(e)}
                                        onBlur={(e) => checkErrors(e)}
                                        autoComplete="off"
                                      />
                                    </div>
                                    <span className="error">
                                      {formErrors?.AirlineCode}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        placeholder="Enter Hotel Address"
                                        name="HotelAddress"
                                        value={state.HotelAddress}
                                        onChange={handleInputChange}
                                        // onFocus={(e) => setErrors(e)}
                                        onBlur={(e) => checkErrors(e)}
                                        autoComplete="off"
                                      />
                                    </div>
                                    <span className="error">
                                      {formErrors?.HotelAddress}
                                    </span>

                                    <div className="form-group">
                                      <input
                                        type="Number"
                                        placeholder="Enter Zipcode"
                                        name="HotelCode"
                                        value={state.HotelCode}
                                        onChange={handleInputChange}
                                        // onFocus={(e) => setErrors(e)}
                                        onBlur={(e) => checkErrors(e)}
                                        autoComplete="off"
                                      />
                                    </div>
                                    <span className="error">
                                      {formErrors?.HotelCode}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h6>Add Drop off Address</h6>
                            <div className="drop-off-address">
                              {dropDesp === "TransferAirportDetail" ? (
                                <>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      placeholder="Enter Airline Code"
                                      name="AirlineCode"
                                      value={state.AirlineCode}
                                      onChange={handleInputChange}
                                      // onFocus={(e) => setErrors(e)}
                                      onBlur={(e) => checkErrors(e)}
                                      autoComplete="off"
                                    />
                                  </div>
                                  <span className="error">
                                    {formErrors?.AirlineCode}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <div className="form-group">
                                    <label> Address </label>
                                    <input
                                      type="text"
                                      placeholder="Enter Hotel Address"
                                      name="HotelAddress"
                                      value={state.HotelAddress}
                                      onChange={handleInputChange}
                                      // onFocus={(e) => setErrors(e)}
                                      onBlur={(e) => checkErrors(e)}
                                      autoComplete="off"
                                    />
                                  </div>
                                  <span className="error">
                                    {formErrors?.HotelAddress}
                                  </span>

                                  <div className="form-group">
                                    <label> Postal Code </label>
                                    <input
                                      type="Number"
                                      placeholder="Enter Zipcode"
                                      name="HotelCode"
                                      value={state.HotelCode}
                                      onChange={handleInputChange}
                                      // onFocus={(e) => setErrors(e)}
                                      onBlur={(e) => checkErrors(e)}
                                      autoComplete="off"
                                    />
                                  </div>
                                  <span className="error">
                                    {formErrors?.HotelCode}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group mt-0">
                      <input
                        className="cmn-btn form-btn mt-0"
                        // onClick={(e) => {
                        //   checkManualValidation(e);
                        // }}
                        onClick={handleFormSubmit}
                        type="button"
                        value="Submit"
                      />
                    </div>

                    {/*  */}
                  </form>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      {show ? (
        <SuccessModal setShow={setShow} show={show} msg={msg} status={status} />
      ) : null}
    </>
  );
};

export default TravellerDetail;
