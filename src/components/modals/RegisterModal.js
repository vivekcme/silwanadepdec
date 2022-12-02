import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callingCode, Nationality } from "../../helpers/helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getKey,
  getRegisterErrors,
  resetErrors,
  resetKey,
  userRegisterAsync,
} from "../../features/userSlice";
// import { toast } from "react-toastify";
import { errorToast, successToast } from "../../helpers/toaster";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({ vals }) => {
  const { show, setShow, setModal } = vals;

  // const [state, setState] = useState({
  //   FirstName: "",
  //   LastName: "",
  //   Dob: "",
  //   Gender: "",
  //   Email: "",
  //   MobileNo: "",
  //   Nationality: "",
  //   CountryCode: "",
  //   Password: "",
  //   cPassword: "",
  //   tc: false,
  // });

  const customValidate = (errors) => {
    if (errors?.cPassword !== undefined) {
      errors.cPassword = "Confirm Password Is Required!";
    }

    if (errors?.Dob !== undefined) {
      errors.Dob = "Date Of Birth Is Required!";
    }

    if (errors?.cPassword === undefined && state.Password !== state.cPassword) {
      errors.cPassword = "Password Must be Same";
    }

    if (errors?.MobileNo === undefined && state.MobileNo?.length !== 10) {
      errors.MobileNo = "Mobile Number must be Exactly 10 Digits!";
    }

    if (state?.tc === false) {
      errors.tc = "Please Agree Terms And Confitions to Register";
    }
    return errors;
  };

  const {
    state,
    setState,
    isSubmit,
    formErrors,
    handleInputChange,
    handleFormSubmit,
    checkErrors,
    setIsSubmit,
  } = useForm({
    val: {
      FirstName: "",
      LastName: "",
      Dob: "",
      Gender: "",
      Email: "",
      MobileNo: "",
      Nationality: "",
      CountryCode: "",
      Password: "",
      cPassword: "",
      tc: false,
    },
    inValidate: customValidate,
  });

  const [startDate, setStartDate] = useState(
    new Date().setFullYear(new Date().getFullYear() - 50)
  );
  const [endDate, setEndDate] = useState(
    new Date().setFullYear(new Date().getFullYear() - 5)
  );

  // const [isSubmit, setIsSubmit] = useState(false);
  // const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const backErrors = useSelector(getRegisterErrors);

  const key = useSelector(getKey);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(userRegisterAsync(state)); //register dispatch here
      setState({
        FirstName: "",
        LastName: "",
        Dob: "",
        Gender: "",
        Email: "",
        MobileNo: "",
        Nationality: "",
        CountryCode: "",
        Password: "",
        cPassword: "",
        tc: false,
      });
      setIsSubmit(false);
    }
  }, [formErrors]);

  useEffect(() => {
    console.log(backErrors, "backErros");
    if (backErrors?.errors?.length > 0) {
      backErrors?.errors?.map((ele) => {
        errorToast(ele.msg);
      });
      setShow(false);
      dispatch(resetErrors());
    }
  }, [backErrors]);

  useEffect(() => {
    if (key !== "") {
      //successToast("User Registered Successfully!");
      //setModal("EmailVarification");
      //setShow(true);
      // dispatch(resetKey());
    }
  }, [key]);

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

  // const handleInputChange = (e) => {
  //   setState({
  //     ...state,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const validate = (state) => {
  //   let errors = {};

  //   Object.keys(state).map((ele) => {
  //     let err = `${ele} Is Required!`;
  //     return state[ele] === "" ? (errors[ele] = err) : null;
  //   });

  //   const EmailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  //   if (!EmailRegex.test(state.Email) && errors.Email === undefined) {
  //     errors.Email = "Please Enter A Valid Email!";
  //   }

  //   if (state.Password.length < 3 && errors.Password === undefined) {
  //     errors.Password = "Password Must Be Greater Than 3!";
  //   } else if (state.Password.length > 10) {
  //     errors.Password = "Password Must Be Less Than  10!";
  //   }

  //   if (errors?.cPassword === undefined && state.Password !== state.cPassword) {
  //     errors.cPassword = "Password Must be Same";
  //   }

  //   if (errors.MobileNo === undefined && state.MobileNo.length !== 10) {
  //     errors.MobileNo = "Mobile Number must be Exactly 10 Digits!";
  //   }

  //   if (state.tc === false) {
  //     errors.tc = "Please Agree Terms And Confitions to Register";
  //   }

  //   return errors;
  // };

  //just to check
  // const checkErrors = (e) => {
  //   let check = validate(state);
  //   let name = e.target.name;

  //   if (name in check) {
  //     setFormErrors({ ...formErrors, [name]: check[name] });
  //   } else {
  //     setFormErrors({ ...formErrors, [name]: "" });
  //   }
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate(state));
  //   setIsSubmit(true);
  // };

  const handleDatePicker = (e) => {
    let myDate = new Date(e.getTime() - e.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    setState({ ...state, Dob: myDate });
  };

  return (
    <>
      <div
        className={`modal my-auto ${true ? "d-flex" : "d-none"}`}
        id="signup-Modal"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <form action="" className="cmn-form login-form">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => setShow(false)}
                ></button>
                <div className="form-title">
                  <h2>Welcome to SilwanaGO</h2>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="">First name</label>
                      <input
                        type="text"
                        placeholder="Enter First name"
                        autoComplete="off"
                        name="FirstName"
                        value={state.FirstName}
                        onChange={handleInputChange}
                        onBlur={(e) => checkErrors(e)}
                      />
                      <p className="text-danger">{formErrors?.FirstName}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="">Last name</label>
                      <input
                        type="text"
                        placeholder="Enter Last name"
                        autoComplete="off"
                        name="LastName"
                        value={state.LastName}
                        onChange={handleInputChange}
                        onBlur={(e) => checkErrors(e)}
                      />
                      <p className="text-danger">{formErrors?.LastName}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="">Date of birth</label>
                      <DatePicker
                        onChange={handleDatePicker}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        minDate={startDate}
                        maxDate={endDate}
                        dateFormat="yyyy/MM/dd"
                        name="Dob"
                        placeholderText="yyyy/MM/dd"
                        value={state.Dob}
                        onBlur={(e) => checkErrors(e)}
                        className={`form-control ${
                          formErrors.Dob && "form-control-danger"
                        }`}
                        style={{ Zindex: "100" }}
                      />
                      <p className="text-danger">{formErrors?.Dob}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group position-relative">
                      <div className="select-arrow"></div>
                      <label htmlFor="">Gender</label>
                      <select
                        name="Gender"
                        onChange={handleInputChange}
                        onBlur={(e) => checkErrors(e)}
                      >
                        <option value="">Select Gender</option>
                        {["Male", "Female", "Others"].map((ele, ind) => (
                          <option value={ele} key={ind}>
                            {ele}
                          </option>
                        ))}
                      </select>
                      <p className="text-danger">{formErrors?.Gender}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="">Email</label>
                      <input
                        type="Email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="Email"
                        value={state.Email}
                        onChange={handleInputChange}
                        onBlur={(e) => checkErrors(e)}
                      />
                      <p className="text-danger">{formErrors?.Email}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
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
                      <p className="text-danger">{formErrors?.MobileNo}</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
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

                  <div className="col-lg-6">
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
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="eye-paassword"></div>
                      <label htmlFor="Password">Password</label>
                      <input
                        type="Password"
                        className="form-control"
                        name="Password"
                        placeholder="Password"
                        value={state.Password}
                        onChange={handleInputChange}
                        onBlur={(e) => checkErrors(e)}
                      />
                      <p className="text-danger">{formErrors?.Password}</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="eye-paassword"></div>
                      <label htmlFor="cPassword">Confirm Password</label>
                      <input
                        type="Password"
                        className="form-control"
                        id="cPassword"
                        name="cPassword"
                        placeholder="Confirm Password"
                        value={state.cPassword}
                        onChange={handleInputChange}
                        onBlur={(e) => checkErrors(e)}
                      />
                      <p className="text-danger">{formErrors?.cPassword}</p>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="check1"
                          className="form-check-input"
                          defaultChecked={state.tc}
                          name="tc"
                          onBlur={(e) => checkErrors(e)}
                          onClick={() => setState({ ...state, tc: !state.tc })}
                        />
                        <label className="form-check-label" htmlFor="check1">
                          Agree terms and condition
                        </label>
                        <p className="text-danger">{formErrors?.tc}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        type="submit"
                        className="cmn-btn form-btn"
                        value="Signup"
                        onClick={handleFormSubmit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="text-center">
                      <p className="already-member">
                        Already a member? Login{" "}
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#loginModal"
                          onClick={() => setModal("login")}
                        >
                          here
                        </a>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
