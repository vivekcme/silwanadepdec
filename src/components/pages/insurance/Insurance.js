import React, { useEffect, useState } from "react";
import { callingCode, scrollFunc } from "../../../helpers/helper";
import DatePicker from "react-datepicker";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getPassengersCount,
  increment,
  decrement,
  addInsuranceAsync,
  setPassengerCount,
} from "../../../features/bookings/insuranceSlice";
import MainModal from "../../modals/MainModal";
import SuccessModal from "../../modals/SuccessModal";
import { useForm } from "../../../hooks/useForm";

const Insurance = () => {
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  const [passengers, setPassengers] = useState([]);
  //
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
      Title: "",
      FirstName: "",
      LastName: "",
      Country: "",
      StartDate: "",
      EndDate: "",
      MobileNo: "",
      CountryCode: "",
    },
    dyncVals: {
      items: passengers,
      setItems: setPassengers,
      arrItems: ["Age", "Disease"],
    },
    // inValidate: customValidate,
  });
  //
  const [modal, setModal] = useState("insurance");
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);

  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");

  const passengersCount = useSelector(getPassengersCount);
  const insuranceStatus = useSelector(
    (state) => state.insurance.insuranceStatus,
    shallowEqual
  );
  const { Authorization } = JSON.parse(sessionStorage.getItem("userData"));

  const dispatch = useDispatch();

  // scrollFunc();

  // const [state, setState] = useState({
  //   Title: "",
  //   FirstName: "",
  //   LastName: "",
  //   Country: "",
  //   StartDate: "",
  //   EndDate: "",
  //   MobileNo: "",
  //   countryCode: "",
  // });

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(addInsuranceAsync({ state, passengers, Authorization }));
    }
  }, [formErrors, isSubmit]);

  useEffect(() => {
    // if (passengersCount === 1) {
    //   let arr = [];
    //   for (let index = 0; index < passengersCount; index++) {
    //     arr.push({
    //       Age: "",
    //       AgeErr: "",
    //       Disease: "",
    //       DiseaseErr: "",
    //     });
    //   }
    //   setPassengers(arr);
    // } else
    setPassengers([
      {
        Age: "",
        Disease: "",
      },
    ]);
    if (passengers.length < passengersCount) {
      setPassengers([...passengers, { Age: "", Disease: "" }]);
    }
    //  else {
    //   let newArr = passengers.slice(0, -1);
    //   setPassengers(newArr);
    // }
  }, [passengersCount]);

  useEffect(() => {
    if (insuranceStatus !== "") {
      if (insuranceStatus === true) {
        setMsg(
          "Your booking has been Confirmed. Check your emails for details."
        );
        setStatus("Awesome!");
      } else {
        setMsg("Something Went Wrong!");
        setStatus("Failed!");
      }
      setSuccess(true);
      //   setShow(false);
      //   setIsClicked(false);
    }
  }, [insuranceStatus]);

  const [startDate, setStartDate] = useState(
    new Date().setFullYear(new Date().getFullYear())
  );
  const endDateAll = new Date().setFullYear(new Date().getFullYear() + 1);

  const [endDate, setEndDate] = useState(
    new Date().setFullYear(new Date().getFullYear())
  );

  // const handleInputChange = (e) => {
  //   setState({
  //     ...state,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleDyncInput = (ind, e) => {
  //   let name = e.target.name.split("[]")[0];
  //   let update = passengers;
  //   update[ind][name] = e.target.value;

  //   let arr = [
  //     ...passengers.slice(0, ind),
  //     update[ind],
  //     ...passengers.slice(ind + 1),
  //   ];

  //   setPassengers(arr);
  // };

  const handleStartChange = (e) => {
    let myDate = new Date(e.getTime() - e.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    setStartDate(e.getTime() - e.getTimezoneOffset() * 60000);
    setState({ ...state, StartDate: myDate });

    if (new Date(e) >= new Date(endDate)) {
      setEndDate(e.getTime() - e.getTimezoneOffset() * 60000);
      setState({ ...state, EndDate: myDate, StartDate: myDate });
    }
  };

  const handleEndChange = (e) => {
    let myDate = new Date(e.getTime() - e.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    setEndDate(e.getTime() - e.getTimezoneOffset() * 60000);
    setState({ ...state, EndDate: myDate });
  };

  const todayMinDate = new Date().setFullYear(new Date().getFullYear());

  // const validate = () => {
  //   let errors = {};
  //   Object.keys(state).forEach((ele) => {
  //     if (state[ele].trim() === "") {
  //       errors[ele] = `${ele} Is Required!`;
  //     }
  //   });

  //   if (errors.MobileNo === undefined && state.MobileNo.length !== 10) {
  //     errors.MobileNo = "Mobile Number Should be Exactly 10 Digits!";
  //   }

  //   passengers.map((ele, ind) => {
  //     errors[ind] = {};

  //     ["Age", "Disease"].map((val) => {
  //       if (ele[val].trim() === "") {
  //         errors[ind][val] = `${val} Is Required!`;
  //       }
  //     });

  //     Object.keys(errors[ind]).length === 0 && delete errors[ind];
  //   });

  //   // dyncErrors();

  //   return errors;
  // };

  //just to check
  // const checkErrors = (e) => {
  //   let check = validate();
  //   let name = e.target.name;
  //   if (name in check) {
  //     setFormErrors({ ...formErrors, [name]: check[name] });
  //   } else {
  //     setFormErrors({ ...formErrors, [name]: "" });
  //   }
  // };

  const remove = (ind) => {
    let arr = passengers.filter((ele, i) => {
      return i !== ind;
    });

    setPassengers(arr);
  };

  const handleInsuranceModal = () => {
    // setSuccess(true);
    setShow(true);
    setModal("insurance");
  };

  // const checkDyncErrors = (ind, e) => {
  //   console.log("called agaibn");
  //   let name = e.target.name.split("[]")[0];

  //   let obj = {};
  //   if (formErrors[ind] !== undefined) {
  //     // console.log(formErrors, "errors");
  //     // console.log(ind, "ind");
  //     obj = formErrors[ind];
  //   } else {
  //     obj = {};
  //   }

  //   if (passengers[ind][name].trim() === "") {
  //     if (obj !== undefined) {
  //       obj[name] = `${name} Is Required!`;
  //     }
  //   } else {
  //     if (obj !== undefined && obj !== null) {
  //       obj[name] !== undefined && obj[name] !== null && delete obj[name];
  //     }
  //   }

  //   setFormErrors({ ...formErrors, [ind]: obj });
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   // dyncErrors();
  //   setFormErrors(validate());
  //   setIsSubmit(true);
  // };

  return (
    <>
      <section className="insurance-payment-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title d-flex align-items-start justify-content-between">
                <h5 className="blue-b-24 mb-0">Add your Details</h5>
                <button
                  className="cmn-btn insurance-btn"
                  onClick={handleInsuranceModal}
                >
                  My Insurance
                </button>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="review-booking-wrapper guest-details-wrapper my-insurance">
                <form action="" className="guest-detail-form insurance-form">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Title</label>
                        <select
                          name="Title"
                          className="form-control"
                          onChange={handleInputChange}
                          onBlur={(e) => checkErrors(e)}
                          //   autoComplete="off"
                        >
                          <option value="">Title</option>
                          <option value="Mr.">Mr</option>
                          <option value="Mrs.">Mrs</option>
                        </select>
                        <span className="error">{formErrors?.Title}</span>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">First Name</label>
                        <input
                          type="text"
                          placeholder="Enter First Name"
                          name="FirstName"
                          onChange={handleInputChange}
                          value={state.FirstName}
                          onBlur={(e) => checkErrors(e)}
                          autoComplete="off"
                        />

                        <span className="error">{formErrors?.FirstName}</span>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Last Name</label>
                        <input
                          type="text"
                          placeholder="Enter Last Name"
                          name="LastName"
                          onChange={handleInputChange}
                          value={state.LastName}
                          onBlur={(e) => checkErrors(e)}
                          autoComplete="off"
                        />

                        <span className="error">{formErrors?.LastName}</span>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="first-name d-flex">
                        <div className="form-group">
                          <label htmlFor="">Select Country</label>
                          <select
                            name="Country"
                            onChange={handleInputChange}
                            className="form-control"
                            onBlur={(e) => checkErrors(e)}
                          >
                            <option value="">Select Country</option>
                            {callingCode.map((ele, ind) => (
                              <option
                                key={ind}
                                value={ele.label.split(/\s+(.*)/)[1]}
                              >
                                {ele.label.split(/\s+(.*)/)[1]}
                              </option>
                            ))}
                          </select>
                          <span className="error">{formErrors?.Country}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <label htmlFor="">Start Date</label>
                      <DatePicker
                        onChange={handleStartChange}
                        peekNextMonth
                        showMonthDropdown
                        selected={startDate}
                        showYearDropdown
                        dropdownMode="select"
                        minDate={todayMinDate}
                        maxDate={endDateAll}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="yyyy/MM/dd"
                        value={state.StartDate}
                        name="StartDate"
                        // onFocus={(e) => setErrors(e)}
                        onBlur={(e) => checkErrors(e)}
                        className="form-control"
                        style={{ Zindex: "100" }}
                        autoComplete="off"
                      />
                      <span className="error">{formErrors?.StartDate}</span>
                    </div>

                    <div className="col-lg-4">
                      <label htmlFor="">End Date</label>
                      <DatePicker
                        onChange={handleEndChange}
                        peekNextMonth
                        showMonthDropdown
                        selected={endDate}
                        showYearDropdown
                        dropdownMode="select"
                        minDate={startDate}
                        maxDate={endDateAll}
                        dateFormat="yyyy/MM/dd"
                        name="EndDate"
                        placeholderText="yyyy/MM/dd"
                        value={state.EndDate}
                        // onFocus={(e) => setErrors(e)}
                        className="form-control"
                        style={{ Zindex: "100" }}
                        autoComplete="off"
                        onBlur={(e) => checkErrors(e)}
                      />
                      <span className="error">{formErrors?.EndDate}</span>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group mb-0">
                        <label htmlFor="">Mobile Country Code</label>
                        <select
                          name="CountryCode"
                          onChange={handleInputChange}
                          className="form-control"
                          onBlur={(e) => checkErrors(e)}
                        >
                          <option value="">Select Country Code</option>
                          {callingCode.map((ele, ind) => (
                            <option key={ind} value={ele.label.split(" ")[0]}>
                              {ele.label}
                            </option>
                          ))}
                        </select>
                        <span className="error">{formErrors?.CountryCode}</span>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Mobile Number</label>
                        <input
                          type="Number"
                          placeholder="Enter Mobile Number"
                          name="MobileNo"
                          value={state.MobileNo}
                          onChange={handleInputChange}
                          autoComplete="off"
                          onBlur={(e) => checkErrors(e)}
                        />
                        <span className="error">{formErrors?.MobileNo}</span>
                      </div>
                    </div>

                    <p
                      onClick={() =>
                        passengersCount < 8 && dispatch(increment())
                      }
                      className="blue-b-24 mb-0 text-decoration-underline add-more-btn"
                    >
                      Add More
                    </p>
                  </div>

                  {passengers.map((ele, index) => (
                    <div className="row" key={index}>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label htmlFor="">Age</label>
                            <input
                              type="number"
                              name={"Age[]"}
                              onChange={(e) => handleInputDynamic(index, e)}
                              value={ele.Age}
                              onBlur={(e) => checkDyncErrors(index, e)}
                              autoComplete="off"
                            />
                            <span className="error">
                              {formErrors[index]?.Age}
                            </span>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="form-group">
                            <label htmlFor="">Pre - Disease</label>
                            <select
                              className="w-100"
                              value={ele.Disease}
                              onChange={(e) => handleInputDynamic(index, e)}
                              name={"Disease[]"}
                              onBlur={(e) => checkDyncErrors(index, e)}
                            >
                              <option value={""}>Your Choice</option>
                              <option value={"0"}>No</option>
                              <option value={"1"}>yes</option>
                            </select>
                            <span className="error">
                              {formErrors[index]?.Disease}
                            </span>
                          </div>
                        </div>
                        {/*  */}
                      </div>

                      {index > 0 && (
                        <button
                          className="cmn-btn remove-btn"
                          type="button"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="col-lg-12">
                    <button
                      type="submit"
                      className="cmn-btn reserve-btn d-block w-100"
                      onClick={handleFormSubmit}
                    >
                      Proceed For Inquiry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {success ? (
          <SuccessModal
            setShow={setShow}
            show={success}
            msg={msg}
            status={status}
          />
        ) : null}

        {show ? (
          <MainModal
            modal={modal}
            setShow={setShow}
            show={show}
            setModal={setModal}
          />
        ) : null}
      </section>
    </>
  );
};

export default Insurance;
