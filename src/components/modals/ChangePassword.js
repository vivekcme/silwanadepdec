import React, { useEffect, useState } from "react";
import OTPInput from "otp-input-react";
import {
  getKey,
  getUpdatePassword,
  resendOtpAsync,
  resetForgot,
  resetKey,
  resetUpdatePassword,
  varifyAndChangeAsync,
} from "../../features/userSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { successToast } from "../../helpers/toaster";

const ChangePassword = ({ vals }) => {
  const { show, setShow, setModal } = vals;
  const [otp, setOtp] = useState();
  const [state, setState] = useState({
    password: "",
    cpassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const key = useSelector(getKey);
  const resend = useSelector((state) => state.user.resend, shallowEqual);
  const updatePassword = useSelector(
    (state) => state.user.updatePassword,
    shallowEqual
  );
  const update = useSelector(getUpdatePassword);

  useEffect(() => {
    const { password } = state;
    Object.keys(formErrors).length === 0 &&
      isSubmit &&
      dispatch(varifyAndChangeAsync({ password, otp, key }));
  }, [formErrors, isSubmit]);

  // useEffect(() => {
  //   if (resend) {
  //     navigate(window.location.pathname, { state: { otp: true } });
  //   }
  // }, [resend]);

  useEffect(() => {
    if (updatePassword !== "") {
      if (updatePassword === true) {
        successToast("Password Changed Successfully!");
        dispatch(resetUpdatePassword());
        setShow(false);
        setModal("login");
        //dispatch(resetKey());
      } else {
        setShow(false);
      }
      dispatch(resetUpdatePassword());
      dispatch(resetForgot());
    }
  }, [updatePassword]);

  const resetAll = () => {
    setShow(false);
    setModal("login");
    dispatch(resetForgot());
    //dispatch(resetKey());
  };

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

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

  const validate = () => {
    let errors = {};

    if (otp?.length !== 4) {
      errors.otp = "Add a 4 digit code!";
    }
    if (state.password === "") {
      errors.password = "Password Is Required";
      if (state.cpassword === "") {
        errors.cpassword = "Confirm Password Is Required!";
        return errors;
      }
    }

    if (state.password.length < 3 && errors.password === undefined) {
      errors.password = "Password Must Be Greater Than 3!";
    } else if (state.password.length > 10) {
      errors.password = "Password Must Be Less Than  10!";
    }

    if (errors?.cpassword === undefined && state.password !== state.cpassword) {
      errors.cpassword = "Password Must be Same";
    }

    return errors;
  };

  //just to check
  const checkErrors = (e) => {
    let check = validate(state);
    let name = e.target.name;

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
      <div
        className={`modal my-auto ${show ? "d-flex" : "d-none"}`}
        id="loginModal"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <form className="cmn-form login-form change-password-form">
                <button
                  type="button"
                  className="btn-close"
                  onClick={resetAll}
                ></button>

                <div className="form-title">
                  <h2>ChangePassword</h2>
                </div>

                <div className="form-group">
                  <label htmlFor="">Enter OTP</label>
                  <div className="change-password-otp">
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      autoFocus
                      name="otp"
                      OTPLength={4}
                      otpType="number"
                      disabled={false}
                      secure
                      // onFocus={(e) => setErrors(e)}
                      onBlur={(e) => checkErrors(e)}
                    />
                  </div>
                  <p className="text-danger">{formErrors?.otp}</p>
                </div>

                <div className="form-group position-relative mb-0">
                  <div className="form-group">
                    <div className="eye-paassword"></div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={state.password}
                      onChange={handleInputChange}
                      // onFocus={(e) => setErrors(e)}
                      onBlur={(e) => checkErrors(e)}
                    />
                    <p className="text-danger">{formErrors?.password}</p>
                  </div>
                </div>

                <div className="form-group position-relative mb-0">
                  <div className="form-group">
                    <div className="eye-paassword"></div>
                    <label htmlFor="password">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="cpassword"
                      placeholder="Confirm Password"
                      value={state.cpassword}
                      onChange={handleInputChange}
                      // onFocus={(e) => setErrors(e)}
                      onBlur={(e) => checkErrors(e)}
                    />
                    <p className="text-danger">{formErrors?.cpassword}</p>
                  </div>
                </div>

                <p className="not-recive text-end">
                  Didn't Recive OTP?{" "}
                  <span onClick={() => dispatch(resendOtpAsync(key))}>
                    {" "}
                    Resend
                  </span>{" "}
                </p>

                <div className="form-group">
                  <input
                    type="submit"
                    className="cmn-btn form-btn"
                    value="Submit"
                    onClick={handleFormSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
