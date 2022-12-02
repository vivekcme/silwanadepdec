import React, { useState, useEffect } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getKey,
  getRegisterErrors,
  resendOtpAsync,
  resetKey,
  varifyEmailAsync,
} from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { errorToast } from "../../helpers/toaster";
const EmailVarifyModal = ({ vals }) => {
  const navigate = useNavigate();
  const { show, setShow, setModal } = vals;
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const resend = useSelector((state) => state.user.resend, shallowEqual);
  const backErrors = useSelector(getRegisterErrors);

  const key = useSelector(getKey);

  const resetAll = () => {
    setShow(false);
    setModal("login");
    dispatch(resetKey());
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      //   console.log("here");
      dispatch(varifyEmailAsync({ OTP, key }));
       console.log("from here");
      setShow(false);
      setModal("login");
      setIsSubmit(false);
    }
  }, [error]);

  useEffect(() => {
    if (backErrors[0]?.success === false) {
      // setShow(false);
      navigate(
        window.location.pathname,
        {
          state: { otp: false },
        },
        {
          replace: true,
        }
      );
    }
  }, [backErrors]);

  useEffect(() => {

    if (resend === true) {
      navigate(window.location.pathname, { state: { otp: true } });
    }
  }, [resend]);

  const validate = () => {
    let err = {};
    if (OTP.length !== 4) {
      err.otp = "Add 4 digit code";
    }
    return err;
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setError(validate());
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
              <form action="" className="cmn-form login-form">
                <button
                  type="button"
                  className="btn-close"
                  onClick={resetAll}
                ></button>

                <div className="form-title">
                  <h2>Email Verification</h2>
                </div>

                <div className="form-group">
                  <label htmlFor="" className="">
                    Enter OTP
                  </label>
                  <div className="change-password-otp">
                    <OTPInput
                      value={OTP}
                      onChange={setOTP}
                      autoFocus
                      OTPLength={4}
                      otpType="number"
                      disabled={false}
                      secure
                    />
                  </div>
                </div>
                <p className="text-danger">{error?.otp}</p>
                <div className="form-group">
                  <input
                    type="submit"
                    className="cmn-btn form-btn"
                    value="Submit"
                    onClick={handleOtpSubmit}
                  />
                </div>
                <p className="not-recive text-end">
                  Didn't Recive OTP?{" "}
                  <span onClick={() => dispatch(resendOtpAsync(key))}>
                    ResendOTP
                  </span>{" "}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVarifyModal;
